import React, { useContext, useCallback } from "react";
import { Tooltip, Button, Typography, Flex, theme } from "antd";
import { BasePromptCard } from "./Base";
import Translate from "@docusaurus/Translate";
import { useCopyToClipboard } from "@site/src/hooks/useCopyToClipboard";
import { CheckOutlined, CopyOutlined, EditOutlined, DeleteOutlined, HolderOutlined, LinkOutlined, LikeFilled, FireFilled, LockOutlined } from "@ant-design/icons";
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

const UserCardComponent = ({ data: user, isFiltered, onEdit, onDelete, onOpenModal }: UserCardProps) => {
  const { userAuth } = useContext(AuthContext);
  const { i18n } = useDocusaurusContext();
  const { token } = theme.useToken();
  const { copied, copyText } = useCopyToClipboard();

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: user.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    height: "100%",
    listStyle: "none",
  };

  const handleCopy = useCallback(() => {
    copyText(user.description);
  }, [copyText, user.description]);

  const handleCardClick = useCallback(() => {
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
      share: user.share,
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
              <Typography.Title level={5} style={{ margin: 0, fontSize: "1rem", display: "inline" }} ellipsis={{ rows: 2 }}>
                <span style={{ color: "var(--ifm-color-primary)" }}>{user.title}</span>
              </Typography.Title>
            </div>
            <Flex align="center" gap={token.marginXXS} style={{ flexShrink: 0, marginLeft: token.marginXS }}>
              {!user.share && <LockOutlined style={{ color: token.colorTextSecondary }} />}
              {user.upvoteDifference > 0 && (
                <Flex align="center" gap={token.marginXXS} style={{ color: token.colorWarning, flexShrink: 0 }}>
                  <LikeFilled />
                  <Typography.Text type="warning" style={{ fontSize: token.fontSizeSM, fontWeight: 600 }}>
                    {formatCompactNumber(user.upvoteDifference)}
                  </Typography.Text>
                </Flex>
              )}
            </Flex>
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
        ]}
        onCardClick={handleCardClick}>
        <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <PromptRemark remark={user.remark} />
          <div className={styles.descriptionWrapper} style={{ flex: 1, marginTop: token.marginXS }}>
            <Typography.Paragraph
              ellipsis={{
                rows: 3,
              }}
              className={styles.showcaseCardBody}
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

export const UserCard = React.memo(UserCardComponent);
