import { useState, useCallback, useRef, useEffect } from "react";
import copy from "copy-text-to-clipboard";
import { updateCopyCount } from "@site/src/api";

/**
 * 复制到剪贴板：原生优先，copy-text-to-clipboard（execCommand）兜底。
 *
 * **必须先判 navigator.clipboard 是否存在**：非安全上下文下它是 undefined，
 * 直接 `.writeText()` 会同步抛 TypeError —— `.catch()` 挂不上，异常冲出 React
 * 事件处理器，复制静默失效。而本项目**确有 http 部署**：企业内网离线版跑在
 * http://192.168.x.x 这类地址上（docs/deploy/offline.md），复制又是本站核心功能。
 *
 * 兜底选 copy-text-to-clipboard 而非自己写：它处理了 iOS 的显式 selectionStart/End
 * （select() 不够）与 12pt 防缩放、style.all=unset 隔离外部 CSS、white-space:pre
 * 保留提示词里的换行与缩进，并在复制后恢复用户原有选区与焦点。这些边界无法在自动化里
 * 验证（execCommand 需要真实用户激活，CDP 合成点击不授予），核心功能不该赌手写实现。
 *
 * 选它而不是 copy-to-clipboard：Docusaurus 自己的代码块复制按钮就用这个（见
 * @docusaurus/theme-classic 的 CodeBlock/Buttons/CopyButton），已随 preset-classic 装好，
 * 本站早就在跑；且零依赖、631B gzip（对方 1381B 且带 toggle-selection），无 IE 死代码，
 * 也没有失败时弹 window.prompt 让用户手抄 559 字提示词的末级兜底。
 */
/** execCommand 兜底。两条调用路径共用，保证异常永远不会冲出 React 事件处理器。 */
function safeCopy(text: string): boolean {
  try {
    return copy(text);
  } catch {
    // 库本身只对非字符串 throw（上游已挡），但它还会碰 DOM 与 Selection，
    // 留个兜底比让异常逃出去好。
    return false;
  }
}

function writeClipboard(text: string): Promise<boolean> {
  // copy-text-to-clipboard 对非字符串直接 throw TypeError（旧的 copy-to-clipboard 会强转）。
  // 卡片可能缺 prompt/description（unavailable 占位条目），在唯一入口挡掉，
  // 好过让每个调用点各写一遍 ?? ""，也避免异常冲出 React onClick。
  if (typeof text !== "string" || text.length === 0) return Promise.resolve(false);

  if (!navigator.clipboard?.writeText) {
    // 非安全上下文（内网 http 部署走的正是这条）：同步执行，仍处在用户手势的激活窗口内
    return Promise.resolve(safeCopy(text));
  }

  return navigator.clipboard.writeText(text).then(
    () => true,
    // reject（权限被拒 / 文档失焦）时补一发 execCommand。注意此时已在**后续 task**，
    // 用户激活多半已失效：Safari 必失败，Chrome 仅在 5s 瞬时激活窗口内可能成功。
    // 所以这是尽力而为，不是保证——关键是把真实结果返回上去，绝不谎报成功。
    () => safeCopy(text),
  );
}

export const useCopyToClipboard = (timeout: number = 2000) => {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const copyText = useCallback(
    (text: string) => {
      // writeClipboard 内部同步发起写入（保证 execCommand 仍在用户手势窗口内），
      // 这里只等它的**真实结果**：失败就不点亮按钮。
      // 曾经无条件 setCopied(true)，剪贴板没变按钮却显示"已复制"，用户会粘贴到上一次的内容。
      void writeClipboard(text).then((ok) => {
        if (!ok) {
          console.error("Clipboard copy failed");
          return;
        }
        setCopied(true);
        // 反馈策略：按钮自身（icon swap + label swap + pulse ring + glow）已提供完整反馈，
        // 不再叠加 toast。业界惯例（GitHub/Vercel/Linear/Stripe）一致：复制不用 toast。
        // Clear previous timer to prevent stacking on rapid clicks
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
          setCopied(false);
        }, timeout);
      });
    },
    [timeout]
  );

  const updateCopy = useCallback(
    // updateCopyCount 内部已吞掉失败并返回 null，这里无需再包一层 try/catch
    async (text: string, id: number | string) => {
      copyText(text);
      await updateCopyCount(Number(id));
    },
    [copyText]
  );

  return { copied, copyText, updateCopy };
};
