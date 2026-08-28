import React, { useCallback } from "react";
import { Button, Tooltip } from "antd";
import type { ButtonProps } from "antd";
import { CopyOutlined, CheckOutlined } from "@ant-design/icons";
import Translate, { translate } from "@docusaurus/Translate";
import { useCopyToClipboard } from "@site/src/hooks/useCopyToClipboard";
import styles from "./styles.module.css";

export type CopyButtonVariant = "iconOnly" | "outlined" | "primary";

interface CopyButtonProps {
  /** Text to copy. Required. */
  text: string;
  /** Visual variant. iconOnly→Tooltip+text type; outlined→default; primary→primary. */
  variant: CopyButtonVariant;
  /**
   * Tracking id. When provided, uses updateCopy which increments the server-side copy counter
   * for this id (typically a prompt id). When omitted/undefined/null, uses copyText for a
   * local-only copy with no API call. Named distinctly from antd Button's `id` (HTML id)
   * to avoid conceptual collision.
   */
  trackingId?: number | string;
  /** Antd Button size pass-through. */
  size?: ButtonProps["size"];
  /** Antd Button block pass-through. */
  block?: boolean;
  /** Disabled state pass-through. */
  disabled?: boolean;
  /** External className to layer on top of the built-in copyButton classes. */
  className?: string;
  /** Tooltip label for iconOnly variant. Defaults to <Translate id="action.copy">复制</Translate>. */
  tooltipLabel?: React.ReactNode;
  /** Label for outlined/primary variants (idle state). Defaults to <Translate id="action.copyPrompt">复制提示词</Translate>. */
  children?: React.ReactNode;
  /** Label for outlined/primary variants (copied state). Defaults to <Translate id="message.copied">已复制</Translate>. */
  copiedLabel?: React.ReactNode;
  /**
   * Side-effect fired immediately after copy is initiated (e.g. close a modal).
   * Does NOT await the server-side `updateCopyCount` upload — fires right after
   * the local clipboard write, regardless of the API call outcome.
   */
  onCopy?: () => void;
}

const variantToButtonType: Record<CopyButtonVariant, ButtonProps["type"]> = {
  iconOnly: "text",
  outlined: "default",
  primary: "primary",
};

/**
 * Unified copy button for the "copy prompt" interaction across cards, modal, and detail pages.
 *
 * Scope: dedicated to prompt-content copy (with optional usage-count upload via `id`).
 *        Other copy scenarios (e.g. share-link copy in ShareButtons) intentionally stay independent
 *        because they have different UX (reversed icon/text swap, mono font, no upload).
 *
 * Feedback layers (no toast — copy is sync/instant; toast would be redundant noise):
 *   L1 in-place icon swap (CopyOutlined → CheckOutlined) + label swap
 *   L2 atmospheric pulse ring (::after, 720ms) + variant-specific glow
 *
 * Three variants encode the visual hierarchy of the surrounding context:
 *   - iconOnly: text-type icon button inside a Tooltip (for card actions)
 *   - outlined: default-type bordered button (for modal headers)
 *   - primary:  primary-type large button preserving its hierarchy when copied
 */
export const CopyButton: React.FC<CopyButtonProps> = ({
  text,
  variant,
  trackingId,
  size,
  block,
  disabled,
  className,
  tooltipLabel,
  children,
  copiedLabel,
  onCopy,
}) => {
  const { copied, copyText, updateCopy } = useCopyToClipboard();

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      // 卡片场景：阻止冒泡到外层 Card onClick（打开 modal）。
      // 详情页/modal 场景无害（外层无 click handler）。
      e.stopPropagation();
      if (trackingId !== undefined && trackingId !== null && trackingId !== "") {
        updateCopy(text, trackingId);
      } else {
        copyText(text);
      }
      onCopy?.();
    },
    [text, trackingId, copyText, updateCopy, onCopy]
  );

  const composedClassName = [styles.button, styles[variant], copied && styles.copied, className].filter(Boolean).join(" ");

  const icon = copied ? <CheckOutlined /> : <CopyOutlined />;

  // iconOnly 没有文本子节点：不显式给 aria-label，读屏只能念 @ant-design/icons 写在
  // <span role="img"> 上的英文图标名 "copy"（18 个 locale 全都念英文），触屏还完全看不到
  // Tooltip。整站最主要的动作不能只靠一个悬停提示存在。
  const button = (
    <Button
      type={variantToButtonType[variant]}
      size={size}
      block={block}
      disabled={disabled}
      icon={icon}
      onClick={handleClick}
      aria-label={variant === "iconOnly" ? translate({ id: "action.copy", message: "复制" }) : undefined}
      className={composedClassName}>
      {variant !== "iconOnly" &&
        (copied ? copiedLabel ?? <Translate id="message.copied">已复制</Translate> : children ?? <Translate id="action.copyPrompt">复制提示词</Translate>)}
    </Button>
  );

  if (variant === "iconOnly") {
    return <Tooltip title={tooltipLabel ?? <Translate id="action.copy">复制</Translate>}>{button}</Tooltip>;
  }

  return button;
};
