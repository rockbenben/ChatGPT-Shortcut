import React, { useContext, useCallback } from "react";
import clsx from "clsx";
import { Tooltip, Button, Typography, Flex, theme } from "antd";
import { BasePromptCard } from "./Base";
import Translate from "@docusaurus/Translate";
import { useCopyToClipboard } from "@site/src/hooks/useCopyToClipboard";
import { CheckOutlined, CopyOutlined, EditOutlined, DeleteOutlined, HolderOutlined, LinkOutlined, LikeFilled } from "@ant-design/icons";
import styles from "./styles.module.css";
import { AuthContext } from "../AuthContext";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { PromptRemark } from "./PromptRemark";
import { PromptCardTag } from "./PromptCardTag";
import { formatCompactNumber } from "@site/src/utils/formatters";

interface UserCardProps {
  data: any;
  isFiltered?: boolean;
  onEdit?: (data: any) => void;
  onDelete?: (id: string) => void;
  onOpenModal?: (data: any) => void;
}

export const UserCard = ({ data: user, isFiltered, onEdit, onDelete, onOpenModal }: UserCardProps) => {
  const { userAuth } = useContext(AuthContext);
  const { i18n } = useDocusaurusContext();
  const { token } = theme.useToken();
  const { copied, updateCopy } = useCopyToClipboard();

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: user.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    height: "100%",
    listStyle: "none",
  };

  const handleCopy = useCallback(() => {
    updateCopy(user.prompt, user.id);
  }, [updateCopy, user.prompt, user.id]);

  const handleParagraphClick = useCallback(() => {
    onOpenModal?.({
      id: user.id,
      title: user.title,
      prompt: user.description,
      description: user.note,
      remark: user.remark,
      tags: user.tags,
      owner: user.owner,
      vote: user.upvoteDifference,
      copyCount: user.copyCount,
    });
  }, [onOpenModal, user]);

  return (
    <li ref={setNodeRef} style={style} {...attributes}>
      <BasePromptCard
        title={
          <Flex justify="space-between" align="start" style={{ width: "100%" }}>
            <div style={{ flex: 1, minWidth: 0, marginRight: token.marginXS }}>
              {!isFiltered && (
                <div {...listeners} style={{ cursor: "grab", marginRight: token.marginXS, display: "inline-flex", alignItems: "center", verticalAlign: "middle" }}>
                  <HolderOutlined style={{ color: token.colorTextSecondary }} />
                </div>
              )}
              <Typography.Title level={5} style={{ margin: 0, fontSize: "1rem", lineHeight: 1.4, display: "inline" }} ellipsis={{ rows: 2 }}>
                {user.title}
              </Typography.Title>
            </div>
            {user.upvoteDifference > 0 && (
              <Flex align="center" gap={4} style={{ color: token.colorWarning, flexShrink: 0, marginLeft: token.marginXS }}>
                <LikeFilled />
                <Typography.Text type="warning" style={{ fontSize: "12px", fontWeight: 600 }}>
                  {formatCompactNumber(user.upvoteDifference)}
                </Typography.Text>
              </Flex>
            )}
          </Flex>
        }
        actions={[
          <Tooltip title={<Translate id="action.copy">复制</Translate>}>
            <Button type="text" icon={copied ? <CheckOutlined /> : <CopyOutlined />} onClick={handleCopy} block />
          </Tooltip>,
          <Tooltip title={<Translate id="action.edit">编辑</Translate>}>
            <Button type="text" icon={<EditOutlined />} onClick={() => onEdit?.(user)} block />
          </Tooltip>,
          <Tooltip title={<Translate id="action.delete">删除</Translate>}>
            <Button type="text" danger icon={<DeleteOutlined />} onClick={() => onDelete?.(user.id)} block />
          </Tooltip>,
        ]}>
        <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <PromptRemark remark={user.remark} />
          <div className={styles.descriptionWrapper} style={{ flex: 1, marginTop: token.marginXS }}>
            <Typography.Paragraph
              ellipsis={{
                rows: 3,
              }}
              className={clsx(styles.showcaseCardBody, styles.clickable)}
              onClick={handleParagraphClick}
              style={{ marginBottom: 0, color: token.colorTextSecondary }}>
              {user.description}
            </Typography.Paragraph>
          </div>
          <Flex justify="space-between" align="center" style={{ marginTop: "auto", paddingTop: token.marginSM }}>
            <div style={{ flex: 1, overflow: "hidden" }}>
              <PromptCardTag tags={user.tags} />
            </div>
            {user.website && (
              <a href={user.website} target="_blank" rel="noopener noreferrer" style={{ marginLeft: token.marginXS }}>
                <LinkOutlined style={{ fontSize: 14, color: token.colorTextSecondary }} />
              </a>
            )}
          </Flex>
        </div>
      </BasePromptCard>
    </li>
  );
};
