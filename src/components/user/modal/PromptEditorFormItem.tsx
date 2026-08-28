import { Input, Typography, Alert } from "antd";
import { useMemo } from "react";
import Translate, { translate } from "@docusaurus/Translate";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { estimateTokens } from "@site/src/utils/promptRender";
import { toBcp47 } from "@site/src/utils/i18n";

// Token 阈值设计（基于现代大模型 128K+ 上下文窗口）
const WARNING_LIMIT = 7500; // 偏长，建议精简
const DANGER_LIMIT = 10000; // 过长，建议拆分
const SAFE_CHAR_LIMIT = 40000;

// 计数颜色：默认中性，仅超阈值时染色（不再为"正常长度"铺 4 色渐变）。
//
// 原本直接取 @ant-design/colors 的 red[5] / orange[5]。那是固定 hex，两个主题共用一个值，
// 11px 下必然只能顾一头 —— 实测 red[5] #f5222d 浅 4.08 / 暗 3.41 两边都不到 4.5，
// orange[5] #fa8c16 暗色 5.85 没问题但浅色只有 2.38。改用配对 token，各模式各取各的值。
const getStatusColor = (tokens: number) => {
  if (tokens >= DANGER_LIMIT) return "var(--site-color-error-text)";
  if (tokens >= WARNING_LIMIT) return "var(--site-color-warning-text)";
  return "var(--site-color-text-tertiary)";
};

interface Props {
  value?: string;
  onChange?: (v: string) => void;
}

const PromptEditorFormItem: React.FC<Props> = ({ value = "", onChange }) => {
  const { i18n } = useDocusaurusContext();
  const bcp47Locale = toBcp47(i18n.currentLocale, i18n.localeConfigs);
  const tokens = useMemo(() => estimateTokens(value), [value]);
  const statusColor = getStatusColor(tokens);
  const showWarning = tokens >= WARNING_LIMIT;
  const isDanger = tokens >= DANGER_LIMIT;

  return (
    <>
      <Input.TextArea
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        autoSize={{ minRows: 6, maxRows: 16 }}
        maxLength={SAFE_CHAR_LIMIT}
        placeholder={translate({
          id: "placeholder.promptContent",
          message: "在此输入详细的提示词内容…",
        })}
        // 本组件返回 Fragment（TextArea + token 计数 + Alert），antd Form.Item 只会把
        // 生成的 id 挂到单一子控件上，这里挂不上 —— label 的 htmlFor 落空，读屏念不出字段名。
        // 同表单其余三个字段都有 label[for]，只有最主要的内容框是空的。复用同一个 label id。
        aria-label={translate({ id: "label.promptContent", message: "提示词内容" })}
        status={isDanger ? "warning" : undefined}
      />
      <div style={{ textAlign: "right" }}>
        <Typography.Text style={{ color: statusColor, fontSize: 11, fontFamily: "var(--site-font-mono)", fontVariantNumeric: "tabular-nums" }}>≈ {tokens.toLocaleString(bcp47Locale)} tokens</Typography.Text>
      </div>

      {showWarning && (
        <Alert
          type={isDanger ? "error" : "warning"}
          title={isDanger ? <Translate id="prompt.tokenDanger">提示词很长，不便于分享和复用，建议拆分</Translate> : <Translate id="prompt.tokenWarning">提示词较长，建议精简或拆分</Translate>}
          showIcon
          banner
        />
      )}
    </>
  );
};

export default PromptEditorFormItem;
