import { Input, Typography, Alert } from "antd";
import { useMemo } from "react";
import type { ComponentPropsWithRef } from "react";
import Translate, { translate } from "@docusaurus/Translate";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { estimateTokens, extractPlaceholders } from "@site/src/utils/promptRender";
import { toBcp47 } from "@site/src/utils/i18n";

// Token 阈值设计（基于现代大模型 128K+ 上下文窗口）
const WARNING_LIMIT = 7500; // 偏长，建议精简
const DANGER_LIMIT = 10000; // 过长，建议拆分
const SAFE_CHAR_LIMIT = 40000;

const getStatusColor = (tokens: number) => {
  if (tokens >= DANGER_LIMIT) return "var(--site-color-error-text)";
  if (tokens >= WARNING_LIMIT) return "var(--site-color-warning-text)";
  return "var(--site-color-text-tertiary)";
};

interface Props extends Pick<ComponentPropsWithRef<typeof Input.TextArea>, "id" | "ref" | "aria-describedby" | "aria-invalid" | "aria-required"> {
  value?: string;
  onChange?: (v: string) => void;
}

const PromptEditorFormItem: React.FC<Props> = ({ value = "", onChange, ...inputProps }) => {
  const { i18n } = useDocusaurusContext();
  const bcp47Locale = toBcp47(i18n.currentLocale, i18n.localeConfigs);
  const tokens = useMemo(() => estimateTokens(value), [value]);
  const placeholders = useMemo(() => extractPlaceholders(value), [value]);
  const statusColor = getStatusColor(tokens);
  const showWarning = tokens >= WARNING_LIMIT;
  const isDanger = tokens >= DANGER_LIMIT;

  return (
    <>
      <Input.TextArea
        {...inputProps}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        autoSize={{ minRows: 5, maxRows: 14 }}
        maxLength={SAFE_CHAR_LIMIT}
        placeholder={translate({
          id: "placeholder.promptContent",
          message: "在此输入详细的提示词内容…",
        })}
        aria-label={translate({ id: "label.promptContent", message: "提示词内容" })}
        status={isDanger ? "warning" : undefined}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 8,
          marginTop: 6,
        }}>
        <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 4, minWidth: 0, flex: 1 }}>
          {placeholders.map((key) => (
            <span key={key} className="prompt-placeholder-chip" style={{ fontSize: 11.5 }}>
              [{key}]
            </span>
          ))}
        </div>
        <Typography.Text
          style={{
            color: statusColor,
            fontSize: 11.5,
            fontFamily: "var(--site-font-mono)",
            fontVariantNumeric: "tabular-nums",
            flexShrink: 0,
            marginInlineStart: "auto",
          }}>
          {value.length.toLocaleString(bcp47Locale)} <Translate id="prompt.charsLabel">字符</Translate> · ≈ {tokens.toLocaleString(bcp47Locale)} tokens
        </Typography.Text>
      </div>

      {showWarning && (
        <Alert
          type={isDanger ? "error" : "warning"}
          title={isDanger ? <Translate id="prompt.tokenDanger">提示词很长，不便于分享和复用，建议拆分</Translate> : <Translate id="prompt.tokenWarning">提示词较长，建议精简或拆分</Translate>}
          showIcon
          banner
          style={{ marginTop: 8, borderRadius: 8 }}
        />
      )}
    </>
  );
};

export default PromptEditorFormItem;
