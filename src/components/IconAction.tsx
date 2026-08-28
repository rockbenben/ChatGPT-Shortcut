import React from "react";
import { Tooltip, Button } from "antd";
import type { ButtonProps } from "antd";

/**
 * 纯图标操作按钮的唯一出口（卡片页脚、评论工具栏、详情页动作条）。
 *
 * 存在的理由是一个静默缺陷：站内原本的写法是
 * `<Tooltip title={<Translate/>}><Button type="text" icon={<XOutlined/>} /></Tooltip>`，
 * 而 antd Tooltip 不会把 title 写进子元素的 aria-label —— 按钮本身没有任何文本，
 * 无障碍名只能回落到 @ant-design/icons 给 `<span role="img">` 的**英文图标名**。
 * 实测读屏拿到的是 "copy" / "heart" / "smile" / "gif" / "share-alt"：
 * 语言错（整站 18 个 locale 都念英文）、语义也错（"heart" 不是"收藏"）。
 * 触屏更糟——Tooltip 根本不出现，图标就是全部信息。
 *
 * 所以这里强制 label 为 **string**：同一个字符串同时喂给 Tooltip 与 aria-label，
 * 两者不可能再漂移。新增图标按钮走这里，别再手写 Tooltip + Button。
 */
interface IconActionProps extends Omit<ButtonProps, "children" | "aria-label" | "title"> {
  /** 动作名。必须是纯字符串（用 translate() 而非 <Translate/>）：aria-label 只接受文本 */
  label: string;
  icon: React.ReactNode;
  /** 图标右侧的附加文本，如投票数。有它时 aria-label 仍只念动作名，数字由文本节点自己念 */
  children?: React.ReactNode;
}

export const IconAction: React.FC<IconActionProps> = ({ label, icon, children, ...rest }) => (
  <Tooltip title={label}>
    <Button type="text" icon={icon} aria-label={label} {...rest}>
      {children}
    </Button>
  </Tooltip>
);

export default IconAction;
