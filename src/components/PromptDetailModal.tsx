import React, { useMemo, useState, useEffect, useCallback } from "react";
import { Modal, Typography, Space, Flex } from "antd";
import { LinkOutlined, InfoCircleOutlined, FireFilled, LikeFilled, UserOutlined, LockOutlined } from "@ant-design/icons";
import Translate, { translate } from "@docusaurus/Translate";
import { ActionLink } from "@site/src/components/ActionLink";
import { CopyButton } from "@site/src/components/CopyButton";
import { PromptPlaceholderBar } from "@site/src/components/PromptPlaceholderBar";
import { PromptCardTag } from "./PromptCard/PromptCardTag";
import { formatCompactNumber } from "@site/src/utils/formatters";
import { extractPlaceholders, applyPlaceholders, getPlaceholderValue, renderPromptWithPlaceholders } from "@site/src/utils/promptRender";
import modalStyles from "./PromptDetailModal.module.css";

import { TagType } from "@site/src/data/tags";

interface PromptDetailModalProps {
  open: boolean;
  onCancel: () => void;
  /** 退场动画和焦点归还完成后，页面才能卸载弹窗。 */
  afterClose: () => void;
  data: {
    id: string | number;
    title: string;
    description?: string;
    prompt: string;
    remark?: string;
    tags?: TagType[];
    website?: string;
    owner?: string;
    vote?: number;
    copyCount?: number;
    share?: boolean;
  };
}

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <Typography.Text
    style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--site-color-text-tertiary)", fontFamily: "var(--site-font-mono)", flexShrink: 0 }}>
    {children}
  </Typography.Text>
);

const PromptDetailModalComponent: React.FC<PromptDetailModalProps> = ({ open, onCancel, afterClose, data }) => {
  const [placeholderValues, setPlaceholderValues] = useState<Record<string, string>>({});
  const [focusState, setFocusState] = useState<{ key: string | null; nonce: number }>({ key: null, nonce: 0 });

  useEffect(() => {
    setPlaceholderValues({});
    setFocusState({ key: null, nonce: 0 });
  }, [data?.id, data?.prompt]);

  const rawPrompt = data?.prompt || "";
  const placeholders = useMemo(() => extractPlaceholders(rawPrompt), [rawPrompt]);
  const hasFilledValues = useMemo(
    () => placeholders.some((key) => Boolean(getPlaceholderValue(placeholderValues, key)?.trim())),
    [placeholders, placeholderValues],
  );
  const filledPrompt = useMemo(() => applyPlaceholders(rawPrompt, placeholderValues), [rawPrompt, placeholderValues]);
  const filledTranslation = applyPlaceholders(data?.description || "", placeholderValues);

  const handleSelectPlaceholder = useCallback((key: string) => {
    setFocusState((prev) => ({ key, nonce: prev.nonce + 1 }));
  }, []);

  const handlePlaceholderChange = useCallback((key: string, val: string) => {
    setPlaceholderValues((prev) => ({ ...prev, [key]: val }));
  }, []);

  const handleClearPlaceholders = useCallback(() => {
    setPlaceholderValues({});
  }, []);

  const renderedPrompt = useMemo(
    () => renderPromptWithPlaceholders(rawPrompt, { values: placeholderValues, onSelectPlaceholder: handleSelectPlaceholder }),
    [rawPrompt, placeholderValues, handleSelectPlaceholder],
  );

  if (!data) return null;

  const isDataCard = !data.owner;
  const showViewDetails = !data.owner;

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      afterClose={afterClose}
      footer={null}
      width={800}
      key={data?.id}
      destroyOnHidden
      centered
      title={
        <Typography.Title level={2} className={modalStyles.modalTitle}>
          {data.title}
        </Typography.Title>
      }
      closable={{ "aria-label": translate({ id: "action.close", message: "关闭" }) }}
      classNames={{
        root: modalStyles.modalRoot,
        header: modalStyles.modalHeader,
        close: modalStyles.modalClose,
      }}
      styles={{
        container: {
          padding: 0,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          maxHeight: "85dvh",
        },
        header: {
          margin: 0,
        },
        body: {
          padding: 0,
          minHeight: 0,
          display: "flex",
        },
      }}>
      <Flex vertical style={{ flex: 1, minWidth: 0, minHeight: 0 }}>
        {/* Header metadata */}
        <div className={modalStyles.metaStrip}>
          <Space separator={<span style={{ color: "var(--site-color-hairline)" }}>|</span>} size="small" wrap>
            {data.share === false && (
              <Space size={4}>
                <LockOutlined style={{ color: "var(--site-color-text-tertiary)" }} />
                <Typography.Text style={{ fontSize: 11, color: "var(--site-color-text-tertiary)" }}>
                  <Translate id="prompt.private">私密</Translate>
                </Typography.Text>
              </Space>
            )}
            {data.owner && (
              <Space size={4}>
                <UserOutlined style={{ color: "var(--site-color-text-tertiary)" }} />
                <Typography.Text style={{ fontSize: 11, color: "var(--site-color-text-tertiary)" }}>
                  {data.owner}
                </Typography.Text>
              </Space>
            )}
            {data.vote > 0 && (
              <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, color: "var(--site-color-text-tertiary)", fontFamily: "var(--site-font-mono)", fontVariantNumeric: "tabular-nums" }}>
                <LikeFilled aria-hidden style={{ color: "var(--site-color-text-tertiary)" }} />
                <span>{formatCompactNumber(data.vote)}</span>
              </span>
            )}
            {data.copyCount > 0 && (
              <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, color: "var(--site-color-text-tertiary)", fontFamily: "var(--site-font-mono)", fontVariantNumeric: "tabular-nums" }}>
                <FireFilled aria-hidden style={{ color: "var(--site-color-text-tertiary)" }} />
                <span>{formatCompactNumber(data.copyCount)}</span>
              </span>
            )}
            {data.website && (
              <a href={data.website} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 4, color: "var(--site-color-tag-selected-text)" }}>
                <LinkOutlined style={{ fontSize: 11 }} />
                <Typography.Text style={{ fontSize: 11, color: "inherit" }}>
                  <Translate id="prompt.source">来源</Translate>
                </Typography.Text>
              </a>
            )}
          </Space>
        </div>

        {/* Content area */}
        <div className={modalStyles.scrollBody}>
          <Flex vertical gap={16}>
            {data.remark && (
              <div
                style={{
                  borderInlineStart: "3px solid rgba(var(--ifm-color-primary-rgb), 0.45)",
                  background: "linear-gradient(var(--site-fade-dir), rgba(var(--ifm-color-primary-rgb), 0.06) 0%, transparent 100%)",
                  borderRadius: "0 8px 8px 0",
                  padding: "8px 14px",
                }}>
                <Typography.Text style={{ fontSize: 13.5, color: "var(--ifm-color-content-secondary)", lineHeight: 1.6, whiteSpace: "pre-line" }}>
                  {data.remark}
                </Typography.Text>
              </div>
            )}

            {/* Prompt Content Block */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Flex justify="space-between" align="center" wrap gap={10}>
                <Eyebrow>
                  <Translate id="prompt.content">提示词内容</Translate>
                </Eyebrow>
                <CopyButton text={filledPrompt} trackingId={isDataCard ? data.id : undefined} variant="primary" size="middle">
                  {hasFilledValues ? <Translate id="prompt.copyFilled">复制已填内容</Translate> : undefined}
                </CopyButton>
              </Flex>

              <PromptPlaceholderBar
                placeholders={placeholders}
                values={placeholderValues}
                onChange={handlePlaceholderChange}
                onClear={handleClearPlaceholders}
                focusKey={focusState.key}
                focusNonce={focusState.nonce}
              />

              <div className={modalStyles.promptBox}>
                <div className={modalStyles.promptText}>
                  {renderedPrompt}
                </div>
              </div>
            </div>

            {/* Translation */}
            {data.description && data.description !== data.prompt && (
              <div className={modalStyles.translationBox}>
                <Flex justify="space-between" align="center" gap={8}>
                  <Eyebrow>
                    <Translate id="prompt.translation">译文</Translate>
                  </Eyebrow>
                  <CopyButton text={filledTranslation} variant="iconOnly" size="small" />
                </Flex>
                <Typography.Paragraph
                  style={{
                    margin: "6px 0 0",
                    lineHeight: 1.65,
                    fontSize: 13.5,
                    color: "var(--ifm-color-content-secondary)",
                    whiteSpace: "pre-wrap",
                    overflowWrap: "anywhere",
                  }}>
                  {filledTranslation}
                </Typography.Paragraph>
              </div>
            )}
          </Flex>
        </div>

        {/* Footer Section */}
        {(Boolean(data.tags?.length) || showViewDetails) && (
          <div className={modalStyles.modalFooter}>
            <Flex justify="space-between" align="center" wrap="wrap" gap={12}>
              <div style={{ flex: 1, minWidth: 0 }}>{data.tags && <PromptCardTag tags={data.tags} />}</div>

              {showViewDetails && (
                <ActionLink to={`/prompt/${data.id}`} variant="plain" icon={<InfoCircleOutlined />}>
                  <Translate id="action.viewDetails">查看详情</Translate>
                </ActionLink>
              )}
            </Flex>
          </div>
        )}
      </Flex>
    </Modal>
  );
};

export const PromptDetailModal = React.memo(PromptDetailModalComponent);
