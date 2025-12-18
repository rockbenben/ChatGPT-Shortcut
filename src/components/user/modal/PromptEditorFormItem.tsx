import { Input, Typography, Alert } from "antd";
import { useMemo } from "react";
import Translate, { translate } from "@docusaurus/Translate";
import { green, blue, orange, red } from "@ant-design/colors";

// Token 阈值设计（基于业界最佳实践）
const OPTIMAL_LIMIT = 1500; // 最佳：精炼高效
const RECOMMEND_LIMIT = 2500; // 建议：适中，可考虑精简
const WARNING_LIMIT = 3400; // 偏长：建议拆分
const DANGER_LIMIT = 3800; // 接近4K上限：警告
const SAFE_CHAR_LIMIT = 20000;

const estimateTokens = (text: string): number => {
  let tokens = 0;

  for (const ch of text) {
    const code = ch.charCodeAt(0);

    if (code >= 0x4e00 && code <= 0x9fa5) {
      tokens += 2.0; // 中文
    } else if (code >= 0x3040 && code <= 0x30ff) {
      tokens += 1.8; // 日文
    } else if (code >= 0xac00 && code <= 0xd7af) {
      tokens += 1.8; // 韩文
    } else if ((code >= 65 && code <= 90) || (code >= 97 && code <= 122)) {
      tokens += 0.25; // 拉丁字母
    } else {
      tokens += 0.5; // 其他
    }
  }

  return Math.ceil(tokens);
};

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
          title={isDanger ? <Translate id="prompt.tokenDanger">提示词过长，强烈建议拆分为多个 Prompt</Translate> : <Translate id="prompt.tokenWarning">提示词较长，建议精简或拆分</Translate>}
          style={{ marginTop: 20 }}
          showIcon
          banner
        />
      )}
    </>
  );
};

export default PromptEditorFormItem;
