import { Input, Typography, Alert } from "antd";
import { useMemo } from "react";
import Translate, { translate } from "@docusaurus/Translate";
import { orange, red } from "@ant-design/colors";
import { estimateTokens } from "@site/src/utils/promptRender";

// Token 阈值设计（基于现代大模型 128K+ 上下文窗口）
const WARNING_LIMIT = 7500; // 偏长，建议精简
const DANGER_LIMIT = 10000; // 过长，建议拆分
const SAFE_CHAR_LIMIT = 40000;

// 计数颜色：默认中性，仅超阈值时染色（不再为"正常长度"铺 4 色渐变）。
const getStatusColor = (tokens: number) => {
  if (tokens >= DANGER_LIMIT) return red[5];
  if (tokens >= WARNING_LIMIT) return orange[5];
  return "var(--ifm-color-emphasis-600)";
};

interface Props {
  value?: string;
  onChange?: (v: string) => void;
}

const PromptEditorFormItem: React.FC<Props> = ({ value = "", onChange }) => {
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
          message: "在此输入详细的提示词内容...",
        })}
        showCount={{
          formatter: () => <Typography.Text style={{ color: statusColor, fontSize: 12 }}>≈ {tokens.toLocaleString()} tokens</Typography.Text>,
        }}
        status={isDanger ? "warning" : undefined}
      />
      <div style={{ textAlign: "right" }}>
        <Typography.Text style={{ color: statusColor, fontSize: 12, fontVariantNumeric: "tabular-nums" }}>≈ {tokens.toLocaleString()} tokens</Typography.Text>
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
