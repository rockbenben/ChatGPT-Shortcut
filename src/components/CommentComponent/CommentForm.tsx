import React, { Suspense, useEffect, useMemo } from "react";
import { translate } from "@docusaurus/Translate";
import { Form } from "antd";
import debounce from "lodash/debounce";
import CommentEditor from "./CommentEditor";

// GiphySelector 拉入 @giphy/react-components + styled-components(~3MB lib)；
// 仅用户点 GIF 按钮才渲染，懒加载省 common chunk ~400-700KB gzipped
const GiphySelector = React.lazy(() => import("./GiphySelector").then((m) => ({ default: m.GiphySelector })));
// EmojiPicker 拉入 @emoji-mart/data (27MB raw 表情数据集) + @emoji-mart/react；
// 仅用户点 😀 才渲染，懒加载省 common chunk ~80-120KB gzipped
const EmojiPickerLazy = React.lazy(() => import("./EmojiPickerLazy"));

export type PanelType = "emoji" | "gif";

interface CommentFormProps {
  /** localStorage 草稿键。主评论 draft_comment_<pageId>，回复 draft_reply_<pageId>_<commentId>（沿用旧键，老草稿可恢复） */
  draftKey: string;
  requiredMessage: string;
  submitting: boolean;
  isLoggedIn: boolean;
  isDarkMode: boolean;
  onLogin: () => void;
  /** 返回 true 表示已成功发表 → 清空输入与草稿；false / 抛错则原样保留 */
  onSubmit: (text: string) => Promise<boolean>;
  /** 回复框专用：点取消时清草稿并收起 */
  onCancel?: () => void;
  /** emoji/GIF 面板跨表单全局互斥，由父组件持有唯一 open 状态 */
  activePanel: PanelType | null;
  onTogglePanel: (panel: PanelType) => void;
}

/** 主评论框与回复框的统一实现：草稿持久化、emoji/GIF 插入、校验规则都在这一处 */
const CommentForm: React.FC<CommentFormProps> = ({ draftKey, requiredMessage, submitting, isLoggedIn, isDarkMode, onLogin, onSubmit, onCancel, activePanel, onTogglePanel }) => {
  const [form] = Form.useForm();

  const debouncedDraftSave = useMemo(
    () =>
      debounce((key: string, value: string) => {
        if (value) {
          localStorage.setItem(key, value);
        } else {
          localStorage.removeItem(key);
        }
      }, 500),
    [],
  );

  useEffect(() => {
    return () => {
      // flush 而非 cancel：回复框在切换回复对象时会卸载，此时 pending 的草稿保存必须落盘
      // （否则半成品回复丢失）。submit/cancel 路径已先 cancel 过，flush 此时为 no-op，不会复活已删草稿。
      debouncedDraftSave.flush();
    };
  }, [debouncedDraftSave]);

  // 加载草稿（mount / draftKey 变化时，如切换回复对象）
  useEffect(() => {
    const saved = localStorage.getItem(draftKey);
    form.setFieldsValue({ content: saved || "" });
  }, [draftKey, form]);

  const handleValuesChange = (changedValues: any) => {
    if (changedValues.content !== undefined) {
      debouncedDraftSave(draftKey, changedValues.content);
    }
  };

  // 取消在途的草稿保存再删除，避免 removeItem 后草稿被 debounce 重新写回
  const clearDraft = () => {
    debouncedDraftSave.cancel();
    localStorage.removeItem(draftKey);
  };

  const handleFinish = async (values: any) => {
    const ok = await onSubmit(values.content);
    if (ok) {
      clearDraft();
      form.resetFields();
    }
  };

  const handleCancel = onCancel
    ? () => {
        clearDraft();
        form.resetFields();
        onCancel();
      }
    : undefined;

  const handleEmojiSelect = (emoji: any) => {
    form.setFieldsValue({ content: (form.getFieldValue("content") || "") + emoji.native });
  };

  const handleGiphySelect = (giphy: any) => {
    form.setFieldsValue({ content: (form.getFieldValue("content") || "") + `![Gif](${giphy.images.fixed_height.url})` });
  };

  return (
    <Form form={form} onFinish={handleFinish} onValuesChange={handleValuesChange}>
      <Form.Item
        name="content"
        rules={[
          { required: true, message: requiredMessage },
          {
            max: 2000,
            message: translate({
              id: "validation.comment.maxLength",
              message: "评论内容不应超过2000个字符",
            }),
          },
        ]}>
        <CommentEditor
          onSubmit={form.submit}
          submitting={submitting}
          isLoggedIn={isLoggedIn}
          onLogin={onLogin}
          onEmojiToggle={() => onTogglePanel("emoji")}
          onGifToggle={() => onTogglePanel("gif")}
          onCancel={handleCancel}
          placeholder={translate({
            id: "placeholder.comment",
            message: "在此输入评论…… 支持使用 Markdown 和 HTML 语法",
          })}
        />
      </Form.Item>
      {activePanel === "emoji" && (
        <Suspense fallback={null}>
          <EmojiPickerLazy isDarkMode={isDarkMode} onEmojiSelect={handleEmojiSelect} />
        </Suspense>
      )}
      {activePanel === "gif" && (
        <Suspense fallback={null}>
          <GiphySelector onGifSelect={handleGiphySelect} />
        </Suspense>
      )}
    </Form>
  );
};

export default CommentForm;
