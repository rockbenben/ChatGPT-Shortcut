import React, { useCallback, useRef, useState } from "react";
import Translate, { translate } from "@docusaurus/Translate";
import { App } from "antd";
import { submitPrompt, patchFavorites, getPrompts, updateMySpaceOrder, updateCustomTags, loadTags, loadPrompts, loadOrder, getInstanceId, updatePrompt } from "@site/src/api";
import { deriveLoves, deriveCommLoves } from "@site/src/utils/myspaceUtils";

interface UseImportExportParams {
  userAuth: any;
  getUserAuth: () => any;
  currentLanguage: string;
  refreshUserAuth: () => Promise<any>;
}

/** 用户中心的提示词导出（JSON 下载）与导入（更新/新建/合并收藏）流程 */
export function useImportExport({ userAuth, getUserAuth, currentLanguage, refreshUserAuth }: UseImportExportParams) {
  const { message } = App.useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importing, setImporting] = useState(false);

  const handleExportPrompts = useCallback(async () => {
    try {
      // 从 userAuth.data.items 获取用户提示词和收藏
      const userPromptItems = userAuth?.data?.items?.filter((item) => item.type === "prompt") || [];
      const favoriteItems = userAuth?.data?.items?.filter((item) => item.type === "favorite") || [];

      if (userPromptItems.length === 0 && favoriteItems.length === 0) {
        message.warning(<Translate id="message.export.noPrompts">暂无可导出的提示词，先创建或收藏一些吧</Translate>);
        return;
      }

      // 获取提示词和收藏的详细数据
      const promptIds = userPromptItems.map((item) => item.id);
      const cardFavoriteIds = favoriteItems.filter((item) => item.source === "card").map((item) => item.id);
      const commFavoriteIds = favoriteItems.filter((item) => item.source === "community").map((item) => item.id);

      const [userPromptsData, cardFavoritesData, commFavoritesData] = await Promise.all([
        promptIds.length > 0 ? getPrompts("userprompts", promptIds) : [],
        cardFavoriteIds.length > 0 ? getPrompts("cards", cardFavoriteIds, currentLanguage) : [],
        commFavoriteIds.length > 0 ? getPrompts("commus", commFavoriteIds) : [],
      ]);

      // favorites: 只包含 ID 数组（用于导入）
      const favorites = {
        card: cardFavoriteIds,
        community: commFavoriteIds,
      };

      // favoriteDetails: 详细内容供用户查看（导入时忽略）
      const favoriteDetails = [
        ...cardFavoritesData.map((p: any) => {
          const langData = p[currentLanguage] || p["zh-Hans"] || p["en"] || {};
          return {
            id: p.id,
            source: "card" as const,
            ...(langData.title && { title: langData.title }),
            ...(langData.prompt && { prompt: langData.prompt }),
            ...(langData.remark && { remark: langData.remark }),
          };
        }),
        ...commFavoritesData.map((p: any) => ({
          id: p.id,
          source: "community" as const,
          ...(p.title && { title: p.title }),
          ...(p.description && { prompt: p.description }),
          ...(p.remark && { remark: p.remark }),
        })),
      ];

      // MySpace 排序和自定义标签（导入时可恢复布局）
      const items = userAuth?.data?.items || [];
      const myspaceOrder = items.map((item: any) => ({
        id: item.id,
        type: item.type,
        source: item.source,
      }));
      const customTags = userAuth?.data?.customTags || [];
      // 标签归属（哪个条目挂了哪个标签）。只导 definitions 不导它，备份恢复回来就是
      // “标签还在、但没任何条目挂着它”，而部署文档承诺的是「完整恢复…排序和标签」。
      const itemTags = loadTags().itemTags;

      const exportData = {
        exportTime: new Date().toISOString(),
        // 标记这份文件出自哪个浏览器，导入时据此决定能不能相信里面的 id。
        instanceId: getInstanceId(),
        prompts: userPromptsData.map((prompt: any) => ({
          id: prompt.id,
          title: prompt.title,
          prompt: prompt.description,
          ...(prompt.remark && { remark: prompt.remark }),
          ...(prompt.notes && { notes: prompt.notes }),
          share: prompt.share,
        })),
        favorites,
        ...(favoriteDetails.length > 0 && { favoriteDetails }),
        ...(myspaceOrder.length > 0 && { myspaceOrder }),
        ...(customTags.length > 0 && { customTags }),
        ...(Object.keys(itemTags).length > 0 && { itemTags }),
      };

      const dataStr = JSON.stringify(exportData, null, 2);
      const dataBlob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(dataBlob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `my-prompts-${new Date().toISOString().split("T")[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      message.success(<Translate id="message.export.success">提示词已导出</Translate>);
    } catch (error) {
      console.error("Export error:", error);
      message.error(<Translate id="message.export.error">导出失败，请稍后重试</Translate>);
    }
  }, [userAuth, message, currentLanguage]);

  // 导入提示词处理
  const handleImportPrompts = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      // 重置 input 以允许重复选择同一文件
      event.target.value = "";

      try {
        const content = await file.text();
        const parsed = JSON.parse(content);

        // 解析数据
        let prompts: any[] = [];
        let favorites: { card: number[]; community: number[] } = { card: [], community: [] };

        if (Array.isArray(parsed)) {
          prompts = parsed;
        } else if (parsed.prompts) {
          prompts = parsed.prompts;
          if (parsed.favorites) {
            favorites.card = parsed.favorites.card || [];
            favorites.community = parsed.favorites.community || [];
          }
        } else if (parsed.title && (parsed.prompt || parsed.description)) {
          prompts = [parsed];
        }

        // 标准化 prompt 字段
        prompts = prompts.map((p) => ({ ...p, prompt: p.prompt || p.description || "" })).filter((p) => p.title && p.prompt);

        // 【离线版专属】社区收藏 → 本地自建提示词。
        //
        // 在线版把 favorites.community 的 id 交给 patchFavorites 的 commLoves 就完事；
        // 离线版没有社区、也没有后端能按 id 取回内容，那批收藏会静默消失 ——
        // 而部署文档明确承诺「社区收藏（community）→ 自动转为本地自建提示词」。
        //
        // 内容只存在于导出文件的 favoriteDetails 里（在线版导出时写入、自己导入时忽略），
        // patchFavorites 只拿得到 id，所以这一步必须留在这里，不能下沉到 api 层。
        const communityDetails: any[] = Array.isArray(parsed.favoriteDetails) ? parsed.favoriteDetails : [];
        const convertedFromCommunity = communityDetails
          .filter((d) => d?.source === "community" && d?.title)
          .map((d) => ({
            title: d.title,
            prompt: d.prompt || "",
            description: d.prompt || "",
            remark: d.remark || "",
            notes: `从在线版社区收藏导入（原ID: ${d.id}）`,
            // 内容是别人发到社区的，必须显式置 false：下面无 id 的分支默认 share ?? true，
            // 离线版看不出差别，但这份导出再导回在线版就是以自己的名义重发别人的提示词。
            share: false,
          }))
          .filter((p) => p.title && p.prompt);
        if (convertedFromCommunity.length > 0) {
          prompts = [...prompts, ...convertedFromCommunity];
        }
        // 转换后就不再当收藏处理：离线版 patchFavorites 恒忽略 commLoves，
        // 留着只会让下面的 hasFavorites 把「只有社区收藏」的文件误判成有收藏可导。
        favorites.community = [];

        const hasFavorites = favorites.card.length > 0 || favorites.community.length > 0;
        if (prompts.length === 0 && !hasFavorites) {
          message.error(<Translate id="message.import.invalid">无效的数据格式</Translate>);
          return;
        }

        setImporting(true);

        // 就绪守卫：冷缓存时 userAuth 还是 {pending, data:null} 占位，下面收藏那一步要用
        // getUserAuth().data.items 推导已有收藏，拿到空数组会把用户已收藏的 id 重新塞进 PATCH。
        // （提示词去重不依赖它 —— 那边直接读 loadPrompts()。）
        if (!getUserAuth()?.data) {
          await refreshUserAuth();
        }

        let successCount = 0;
        let errorCount = 0;

        /**
         * 【离线版专属】导入永不覆盖已有条目。分两种文件走两条路。
         *
         * 在线版这里一律按 id 匹配、命中就 updatePrompt 覆盖 —— 那是因为 id 由服务端发放、
         * 全局唯一，撞号确实就是同一条。离线版的 id 是本机发的负时间戳：在**自己的**备份里
         * 它确实唯一标识一条提示词，但换成别人的文件，同一个 id 指向的是完全不同的东西。
         * 靠 instanceId 把这两种情况分开，就不必在「能原地恢复」和「不覆盖别人」之间二选一。
         *
         *  - 本机备份：按 id 原地更新。内容改过也能从备份还原，两条同名的也不会互相吞。
         *    id 在本地找不到的（已删除的条目）当新建处理。
         *  - 外来文件（含旧版导出、手工拼的、无 instanceId 的）：id 不代表本机身份，一律新建，
         *    按标题去重以免同一份文件导两次多出副本。
         *
         * 两条路都没有能碰到「本地已有、且文件里不认识」的条目的写入路径。
         */
        const isOwnBackup = typeof parsed.instanceId === "string" && parsed.instanceId !== "" && parsed.instanceId === getInstanceId();
        const localPrompts = loadPrompts();

        let promptTasks: Array<Promise<"changed" | "skipped">>;

        if (isOwnBackup) {
          const localById = new Map(localPrompts.map((p) => [p.id, p]));
          promptTasks = prompts.map(async (prompt) => {
            const existing = prompt.id ? localById.get(prompt.id) : undefined;
            if (existing) {
              const isSame =
                existing.title === prompt.title &&
                existing.description === prompt.prompt &&
                (existing.remark || "") === (prompt.remark || "") &&
                (existing.notes || "") === (prompt.notes || "") &&
                existing.share === (prompt.share ?? false);
              if (isSame) return "skipped" as const;
              await updatePrompt(prompt.id, {
                title: prompt.title,
                description: prompt.prompt,
                remark: prompt.remark,
                notes: prompt.notes,
                share: prompt.share ?? false,
              });
              return "changed" as const;
            }
            await submitPrompt({
              title: prompt.title,
              description: prompt.prompt,
              remark: prompt.remark,
              notes: prompt.notes,
              share: prompt.share ?? true,
            });
            return "changed" as const;
          });
        } else {
          const existingTitles = new Set<string>(localPrompts.map((p) => p.title));
          promptTasks = prompts
            .filter((prompt) => !existingTitles.has(prompt.title))
            .map(async (prompt) => {
              await submitPrompt({
                title: prompt.title,
                description: prompt.prompt,
                remark: prompt.remark,
                notes: prompt.notes,
                // 文件里写了就听文件的（社区转换那批已在上面显式置 false）；
                // 没写的沿用表单默认值 true，与手动新建保持一致。
                share: prompt.share ?? true,
              });
              return "changed" as const;
            });
        }

        // 内容完全相同而跳过的、以及被标题去重掉的，都不算失败也不计入 successCount：
        // 成功提示必须对应真发生过的事（见下方消息分支的注释）。
        const promptResults = await Promise.allSettled(promptTasks);
        for (const result of promptResults) {
          if (result.status === "rejected") {
            errorCount++;
          } else if (result.value === "changed") {
            successCount++;
          }
        }

        // 处理收藏（合并模式）—— 一次 PATCH 处理 loves 和 commLoves 的增量
        // server 端 merge 保证多设备并发安全（无 lost-update 风险）
        if (hasFavorites) {
          // 读权威值：上面导入提示词的循环里已 await 过多次，闭包里的渲染期快照已经过时。
          // 用旧快照去重会把服务端已有的 id 重新塞进 PATCH，白白加大请求体。
          const items = getUserAuth()?.data?.items || [];
          const existingLoves = new Set(deriveLoves(items));
          const existingCommLoves = new Set(deriveCommLoves(items));

          const cardAdds = (favorites.card || []).map(Number).filter((id) => !existingLoves.has(id));
          const commAdds = (favorites.community || []).map(Number).filter((id) => !existingCommLoves.has(id));

          if (cardAdds.length > 0 || commAdds.length > 0) {
            try {
              await patchFavorites({
                loves: { add: cardAdds, remove: [] },
                commLoves: { add: commAdds, remove: [] },
              });
              if (cardAdds.length > 0) successCount++;
              if (commAdds.length > 0) successCount++;
            } catch {
              errorCount++;
            }
          }
        }

        /**
         * 恢复排序与自定义标签。在线版这里是刻意不做的（排序里的 prompt id 是源用户的、
         * 覆盖写入会破坏目标账号已有的体系），但离线版就一个人、写的是自己的 localStorage，
         * 不存在多用户冲突。且 docs/deploy/offline.md 明写「离线版导出的文件：完整恢复收藏、
         * 提示词、排序和标签」—— 而导出确实把这两个字段写进了 JSON，不恢复就是导出了一份
         * 自己读不回去的数据。旧离线版也是恢复的，不做就是回退。
         *
         * 排序整份覆盖（同旧版）；文件里对不上号的条目会落到末尾，不会报错。
         * 标签只追加新 definition、保留已有 itemTags，对应文档的「追加合并（不覆盖已有）」。
         */
        if (Array.isArray(parsed.myspaceOrder) && parsed.myspaceOrder.length > 0) {
          // 先比一下再写：排序恢复若无条件 successCount++，重复导入同一份文件会报
          // 「已导入」而实际一字未变 —— 下面那段注释要的就是「提示要对应真发生过的事」。
          // 两边都把旧版的 source:"prompt" 归一化，否则旧文件每次都会被判成有变化。
          const key = (o: any) => `${o.type}:${o.source === "prompt" ? "userprompt" : o.source}:${o.id}`;
          if (parsed.myspaceOrder.map(key).join("|") !== loadOrder().map(key).join("|")) {
            await updateMySpaceOrder(parsed.myspaceOrder);
            successCount++;
          }
        }
        const incomingDefs: any[] = Array.isArray(parsed.customTags) ? parsed.customTags : [];
        // 归属只在**本机备份**上恢复：外来文件里的 id 指向的是对方的提示词，
        // 导入后那些条目在本机会拿到全新的 id，照搬只会把标签挂到不相干的条目上。
        const incomingItemTags =
          isOwnBackup && parsed.itemTags && typeof parsed.itemTags === "object" && !Array.isArray(parsed.itemTags) ? (parsed.itemTags as Record<string, string[]>) : null;

        if (incomingDefs.length > 0 || incomingItemTags) {
          const existing = loadTags();
          const existingIds = new Set(existing.definitions.map((t) => t.id));
          const added = incomingDefs.filter((t: any) => t?.id && !existingIds.has(t.id));
          // 合并而非覆盖：备份之后新建并打了标签的条目不该因为一次恢复而丢掉归属；
          // 文件里提到的 id 以文件为准（那才是用户要恢复的那一份）。
          const mergedItemTags = incomingItemTags ? { ...existing.itemTags, ...incomingItemTags } : existing.itemTags;
          if (added.length > 0 || JSON.stringify(mergedItemTags) !== JSON.stringify(existing.itemTags)) {
            await updateCustomTags({ definitions: [...existing.definitions, ...added], itemTags: mergedItemTags });
            successCount++;
          }
        }

        setImporting(false);

        // successCount === 0 && errorCount === 0 是「一条都没导入」——不是失败，而是文件里的东西
        // 目标账号已经全有了（收藏去重后 cardAdds/commAdds 皆空，patchFavorites 整块被跳过）。
        // 这一支此前也落进下面的 success，于是导入一份自己刚导出的文件会提示「已导入」，
        // 而计数一个没变。实测复现过：报成功，实际零变更。成功提示必须对应真的发生过的事。
        if (errorCount === 0 && successCount === 0) {
          message.info(<Translate id="message.import.nothing">文件里的内容都已存在，没有需要导入的</Translate>);
        } else if (errorCount === 0) {
          message.success(<Translate id="message.import.success">已导入</Translate>);
        } else if (successCount > 0) {
          message.warning(`${translate({ id: "message.import.partial", message: "部分提示词已导入" })} (${successCount}/${successCount + errorCount})`);
        } else {
          message.error(<Translate id="message.import.failed">导入失败</Translate>);
        }

        // 刷新 MySpace 数据（prompts 和 favorites）
        await refreshUserAuth();
      } catch (error) {
        setImporting(false);
        console.error("Import error:", error);
        message.error(<Translate id="message.import.parseError">JSON 解析失败，请检查文件格式</Translate>);
      }
    },
    [userAuth, message, refreshUserAuth],
  );

  return { fileInputRef, importing, handleExportPrompts, handleImportPrompts };
}
