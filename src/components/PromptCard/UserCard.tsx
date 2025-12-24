import React, { useCallback, ReactNode } from "react";
import { Tooltip, Button, Typography, Flex, theme, Statistic } from "antd";
import { BasePromptCard } from "./Base";
import Translate from "@docusaurus/Translate";
import { useCopyToClipboard } from "@site/src/hooks/useCopyToClipboard";
import { CheckOutlined, CopyOutlined, EditOutlined, DeleteOutlined, HolderOutlined, LinkOutlined, LikeFilled, LockOutlined } from "@ant-design/icons";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { PromptRemark } from "./PromptRemark";
import { PromptCardTag } from "./PromptCardTag";
import { formatCompactNumber } from "@site/src/utils/formatters";

interface UserCardProps {
  data: any;
  sortableId?: string | number;
  isFiltered?: boolean;
  onEdit?: (data: any) => void;
  onDelete?: (id: string) => void;
  onOpenModal?: (data: any) => void;
  extraActions?: ReactNode;
}

const UserCardComponent = ({ data: user, sortableId, isFiltered, onEdit, onDelete, onOpenModal, extraActions }: UserCardProps) => {
  const { token } = theme.useToken();
  const { copied, copyText } = useCopyToClipboard();

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: sortableId ?? user.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    height: "100%",
  };

  const handleCopy = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      copyText(user.description);
    },
    [copyText, user.description]
  );

  const handleEdit = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onEdit?.(user);
    },
    [onEdit, user]
  );

  const handleDelete = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onDelete?.(user.id);
    },
    [onDelete, user.id]
  );

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
    <BasePromptCard
      ref={setNodeRef}
      style={style}
      {...attributes}
      title={
        <Flex justify="space-between" align="start" style={{ width: "100%" }}>
          <Flex align="start" style={{ flex: 1, minWidth: 0, marginRight: token.marginXS, overflow: "hidden" }}>
            {!isFiltered && (
              <div {...listeners} style={{ cursor: "grab", marginRight: token.marginXS, display: "flex", alignItems: "center", flexShrink: 0, paddingTop: 6 }}>
                <HolderOutlined style={{ color: token.colorTextSecondary }} />
              </div>
            )}
            <Typography.Title level={5} style={{ margin: 0, fontSize: "1rem", flex: 1, minWidth: 0 }} ellipsis={{ rows: 2 }}>
              <span style={{ color: "var(--ifm-color-primary)" }}>{user.title}</span>
            </Typography.Title>
          </Flex>
        </Flex>
      }
      titleExtra={
        <>
          {!user.share && <LockOutlined style={{ color: token.colorTextSecondary }} />}
          {user.upvoteDifference > 0 && (
            <Statistic
              value={user.upvoteDifference}
              formatter={(value) => formatCompactNumber(value as number)}
              prefix={<LikeFilled style={{ color: token.colorWarning }} />}
              styles={{ content: { fontSize: token.fontSizeSM, color: token.colorWarning } }}
            />
          )}
        </>
      }
      actions={[
        <Tooltip title={<Translate id="action.copy">复制</Translate>}>
          <Button type="text" icon={copied ? <CheckOutlined /> : <CopyOutlined />} onClick={handleCopy} block />
        </Tooltip>,
        <Tooltip title={<Translate id="action.edit">编辑</Translate>}>
          <Button type="text" icon={<EditOutlined />} onClick={handleEdit} block />
        </Tooltip>,
        <Tooltip title={<Translate id="action.delete">删除</Translate>}>
          <Button type="text" danger icon={<DeleteOutlined />} onClick={handleDelete} block />
        </Tooltip>,
        extraActions,
      ].filter(Boolean)}
      onCardClick={handleCardClick}>
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <PromptRemark remark={user.remark} />
        <Typography.Paragraph ellipsis={{ rows: 3 }} style={{ marginBottom: 0, color: token.colorTextSecondary }}>
          {user.description}
        </Typography.Paragraph>
        <Flex justify="space-between" align="center">
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
  );
};

export const UserCard = React.memo(UserCardComponent);
