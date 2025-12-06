import React, { useContext, useCallback } from "react";
import clsx from "clsx";
import { Tooltip, Button, Typography, Flex, theme } from "antd";
import { BasePromptCard } from "./Base";
import Translate from "@docusaurus/Translate";
import { useCopyToClipboard } from "@site/src/hooks/useCopyToClipboard";
import { CheckOutlined, CopyOutlined, StarOutlined, StarFilled, UserOutlined, DownOutlined, LinkOutlined, UpOutlined } from "@ant-design/icons";
import styles from "./styles.module.css";
import { AuthContext } from "../AuthContext";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { PromptRemark } from "./PromptRemark";
import { PromptCardTag } from "./PromptCardTag";

interface CommunityCardProps {
  data: any;
  isFavorite?: boolean;
  onToggleFavorite?: (id: number, isComm: boolean) => void;
  onVote?: (id: number, action: "upvote" | "downvote") => void;
  onEdit?: (data: any) => void;
  onDelete?: (id: number) => void;
}

export const CommunityCard = ({ data: user, isFavorite, onToggleFavorite, onVote, onEdit, onDelete, onOpenModal }: CommunityCardProps & { onOpenModal?: (data: any) => void }) => {
  const { userAuth } = useContext(AuthContext);
  const { i18n } = useDocusaurusContext();
  const { token } = theme.useToken();
  const { copied, copyText } = useCopyToClipboard();

  const handleCopy = useCallback(() => {
    copyText(user.description);
  }, [copyText, user.description]);

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
    <li key={user.id} style={{ height: "100%", listStyle: "none" }}>
      <BasePromptCard
        title={
          <Flex justify="space-between" align="start" style={{ width: "100%" }}>
            <Typography.Title level={5} style={{ margin: 0, fontSize: "1rem", flex: 1, marginRight: token.marginXS }} ellipsis={{ rows: 2 }}>
              <span style={{ color: "var(--ifm-color-primary)" }}>{user.title}</span>
            </Typography.Title>
          </Flex>
        }
        titleExtra={
          <Typography.Text type="secondary" style={{ fontSize: "12px", display: "flex", alignItems: "center", maxWidth: 75 }} ellipsis={{ tooltip: true }}>
            <UserOutlined style={{ marginRight: 4 }} />
            {user.owner}
          </Typography.Text>
        }
        actions={[
          <Tooltip title={<Translate id="action.copy">复制</Translate>}>
            <Button type="text" icon={copied ? <CheckOutlined /> : <CopyOutlined />} onClick={handleCopy} block />
          </Tooltip>,
          userAuth && onToggleFavorite && (
            <Tooltip title={isFavorite ? <Translate id="action.removeFavorite">点击移除收藏</Translate> : <Translate id="common.favorites">收藏</Translate>}>
              <Button type="text" icon={isFavorite ? <StarFilled style={{ color: "#faad14" }} /> : <StarOutlined />} onClick={() => onToggleFavorite(user.id, true)} block />
            </Tooltip>
          ),
          onVote && (
            <Tooltip title={<Translate id="action.upvote">赞</Translate>}>
              <Button type="text" icon={<UpOutlined />} onClick={() => onVote(user.id, "upvote")} block>
                {user.upvotes || 0}
              </Button>
            </Tooltip>
          ),
          onVote && (
            <Tooltip title={<Translate id="action.downvote">踩</Translate>}>
              <Button type="text" icon={<DownOutlined />} onClick={() => onVote(user.id, "downvote")} block>
                {user.downvotes || 0}
              </Button>
            </Tooltip>
          ),
        ].filter(Boolean)}>
        <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <PromptRemark remark={user.remark} />
          <div className={styles.descriptionWrapper} style={{ flex: 1, marginTop: token.marginXS }}>
            <Typography.Paragraph
              ellipsis={{
                rows: 5,
              }}
              className={clsx(styles.showcaseCardBody, styles.clickable)}
              onClick={handleParagraphClick}
              style={{ marginBottom: 0, color: token.colorTextSecondary }}>
              {user.description}
            </Typography.Paragraph>
          </div>
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
    </li>
  );
};
