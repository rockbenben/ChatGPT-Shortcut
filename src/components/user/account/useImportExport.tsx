import React, { useCallback, useRef, useState } from "react";
import Translate, { translate } from "@docusaurus/Translate";
import { App } from "antd";
import { submitPrompt, updatePrompt, patchFavorites, getPrompts } from "@site/src/api";
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

      const exportData = {
        exportTime: new Date().toISOString(),
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

      message.success(<Translate id="message.export.success">提示词导出成功！</Translate>);
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

        const hasFavorites = favorites.card.length > 0 || favorites.community.length > 0;
        if (prompts.length === 0 && !hasFavorites) {
          message.error(<Translate id="message.import.invalid">无效的数据格式</Translate>);
          return;
        }

        setImporting(true);

        // 就绪守卫：冷缓存/刚登录时 userAuth 还是 {pending, data:null} 占位，
        // 此刻读 userPromptIds 会得到空数组，让**每一条**带 id 的提示词都走新建分支，
        // 把用户整个提示词库静默复制一份私有副本。先把 /myspace 拉完再读。
        // 只在 data 未就绪时等待（pending/null）；用户本就没有提示词时 data 已就绪、userprompts 为空，不触发。
        if (!getUserAuth()?.data) {
          await refreshUserAuth();
        }
        // 读权威即时值（refreshUserAuth 走 startTransition，await 后 state 未必已 commit，但 ref 已更新）
        const userPromptIds = getUserAuth()?.data?.userprompts?.map((p: any) => p.id) || [];

        // 获取现有提示词详情（用于对比内容）
        const conflictIds = prompts.filter((p) => p.id && userPromptIds.includes(p.id)).map((p) => p.id);
        let existingPromptsMap: Record<number, any> = {};
        if (conflictIds.length > 0) {
          try {
            const existingPrompts = await getPrompts("userprompts", conflictIds);
            existingPromptsMap = existingPrompts.reduce((acc: Record<number, any>, p: any) => {
              acc[p.id] = p;
              return acc;
            }, {});
          } catch {
            // 获取失败时继续导入，只是无法跳过相同内容
          }
        }

        let successCount = 0;
        let errorCount = 0;

        // 处理提示词（并发执行，提升性能）
        const promptTasks = prompts.map(async (prompt) => {
          if (prompt.id && userPromptIds.includes(prompt.id)) {
            // 检查内容是否相同，相同则跳过
            const existing = existingPromptsMap[prompt.id];
            if (existing) {
              const isSame =
                existing.title === prompt.title &&
                existing.description === prompt.prompt &&
                (existing.remark || "") === (prompt.remark || "") &&
                (existing.notes || "") === (prompt.notes || "") &&
                existing.share === (prompt.share ?? false);
              if (isSame) {
                return { status: "skipped" as const };
              }
            }
            // 更新现有提示词
            await updatePrompt(prompt.id, {
              title: prompt.title,
              description: prompt.prompt,
              remark: prompt.remark,
              notes: prompt.notes,
              share: prompt.share ?? false,
            });
            return { status: "success" as const };
          } else if (!prompt.id) {
            // 没有 id：新创建提示词，默认公开
            await submitPrompt({
              title: prompt.title,
              description: prompt.prompt,
              remark: prompt.remark,
              notes: prompt.notes,
              share: prompt.share ?? true,
            });
            return { status: "success" as const };
          } else {
            // 有 id 但不属于当前用户：导入为新提示词，强制私密
            await submitPrompt({
              title: prompt.title,
              description: prompt.prompt,
              remark: prompt.remark,
              notes: prompt.notes,
              share: false,
            });
            return { status: "success" as const };
          }
        });

        const promptResults = await Promise.allSettled(promptTasks);
        for (const result of promptResults) {
          if (result.status === "fulfilled") {
            if (result.value.status !== "skipped") {
              successCount++;
            }
          } else {
            errorCount++;
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

        // myspaceOrder 和 customTags 仅作为导出备份数据保留在 JSON 中
        // 联网版导入时不恢复排序和标签：
        // - 排序中的 prompt ID 是源用户的，导入后新建 prompt 有新 ID，无法对应
        // - 覆盖式写入会破坏目标用户已有的排序和标签体系
        // 本地版可安全使用这些字段（写入 localStorage，不涉及多用户冲突）

        setImporting(false);

        if (errorCount === 0) {
          message.success(<Translate id="message.import.success">导入成功！</Translate>);
        } else if (successCount > 0) {
          message.warning(`${translate({ id: "message.import.partial", message: "部分导入成功" })} (${successCount}/${successCount + errorCount})`);
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
