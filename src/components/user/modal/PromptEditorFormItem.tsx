import { Input, Typography, Alert } from "antd";
import { useMemo } from "react";
import Translate, { translate } from "@docusaurus/Translate";
import { green, blue, orange, red } from "@ant-design/colors";
import { estimateTokens } from "@site/src/utils/promptRender";

// Token 阈值设计（基于现代大模型 128K+ 上下文窗口）
const OPTIMAL_LIMIT = 2500; // 常规提示词
const RECOMMEND_LIMIT = 5000; // 复杂提示词（含示例/多步指令）
const WARNING_LIMIT = 7500; // 偏长，建议精简
const DANGER_LIMIT = 10000; // 过长，建议拆分
const SAFE_CHAR_LIMIT = 40000;

// 渐进式颜色：绿 → 蓝 → 橙 → 红
const getStatusColor = (tokens: number) => {
  if (tokens >= DANGER_LIMIT) return red[5];
  if (tokens >= WARNING_LIMIT) return orange[5];
  if (tokens >= RECOMMEND_LIMIT) return orange[3];
  if (tokens >= OPTIMAL_LIMIT) return blue[5];
  return green[6];
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
        rows={6}
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

      {showWarning && (
        <Alert
          type={isDanger ? "error" : "warning"}
          title={isDanger ? <Translate id="prompt.tokenDanger">提示词很长，不便于分享和复用，建议拆分</Translate> : <Translate id="prompt.tokenWarning">提示词较长，建议精简或拆分</Translate>}
          style={{ marginTop: 20 }}
          showIcon
          banner
        />
      )}
    </>
  );
};

export default PromptEditorFormItem;
