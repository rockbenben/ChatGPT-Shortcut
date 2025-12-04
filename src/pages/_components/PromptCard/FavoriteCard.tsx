import React, { useContext, useCallback } from "react";
import clsx from "clsx";
import { Tooltip, Button, Typography, Flex, theme } from "antd";
import { BasePromptCard } from "./Base";
import Link from "@docusaurus/Link";
import Translate from "@docusaurus/Translate";
import { useCopyToClipboard } from "@site/src/hooks/useCopyToClipboard";
import { CheckOutlined, CopyOutlined, StarFilled, LinkOutlined, HolderOutlined, UserOutlined, FireFilled, LikeFilled } from "@ant-design/icons";
import styles from "./styles.module.css";
import { AuthContext } from "../AuthContext";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { PromptRemark } from "./PromptRemark";
import { PromptCardTag } from "./PromptCardTag";
import { getWeight, formatCompactNumber } from "@site/src/utils/formatters";

interface FavoriteCardProps {
  data: any;
  isFiltered?: boolean;
  isDescription?: boolean;
  onRemoveFavorite?: (id: string) => void;
  onOpenModal?: (data: any) => void;
}

export const FavoriteCard = ({ data: user, isFiltered, isDescription, onRemoveFavorite, onOpenModal }: FavoriteCardProps) => {
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

  const currentLanguage = i18n.currentLocale.split("-")[0];
  const isDataCard = user[currentLanguage] && user[currentLanguage].title;

  // Map data based on card type
  const title = isDataCard ? user[currentLanguage].title : user.title;
  // For Community Cards: description field is prompt, note field is description
  const prompt = isDataCard ? user[currentLanguage].prompt : user.description;
  const description = isDataCard ? user[currentLanguage].description : user.note || user.description;
  const remark = isDataCard ? user[currentLanguage].remark : user.remark;
  const tags = user.tags;
  const website = user.website;
  const owner = user.owner;
  const copyCount = getWeight(user);

  const contentToShow = isDescription ? prompt : description;

  const handleCopy = useCallback(() => {
    updateCopy(prompt, user.id);
  }, [updateCopy, prompt, user.id]);

  const handleParagraphClick = useCallback(() => {
    if (isDataCard) {
      onOpenModal?.({
        id: user.id,
        title: title,
        prompt: prompt,
        description: description,
        remark: remark,
        tags: tags,
        website: website,
        copyCount: copyCount,
      });
    } else {
      onOpenModal?.({
        id: user.id,
        title: title,
        prompt: prompt,
        description: description,
        remark: remark,
        tags: tags,
        owner: owner,
        vote: user.upvoteDifference,
      });
    }
  }, [onOpenModal, isDataCard, user, title, prompt, description, remark, tags, website, owner]);

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
                {isDataCard ? (
                  <Link href={`/prompt/${user.id}`} style={{ color: "var(--ifm-color-primary)" }}>
                    {title}
                  </Link>
                ) : (
                  <span style={{ color: "var(--ifm-color-primary)" }}>{title}</span>
                )}
              </Typography.Title>
            </div>
            {copyCount > 0 && (
              <Typography.Text type="secondary" style={{ fontSize: "12px", marginLeft: token.marginXS, display: "inline-flex", alignItems: "center", gap: 2, flexShrink: 0 }}>
                <FireFilled style={{ color: "#ff6b6b" }} />
                {formatCompactNumber(copyCount)}
              </Typography.Text>
            )}
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
        titleExtra={
          owner && (
            <Typography.Text type="secondary" style={{ fontSize: "12px", display: "flex", alignItems: "center" }}>
              <UserOutlined style={{ marginRight: 4 }} />
              {owner}
            </Typography.Text>
          )
        }
        actions={[
          <Tooltip title={<Translate id="action.copy">复制</Translate>}>
            <Button type="text" icon={copied ? <CheckOutlined /> : <CopyOutlined />} onClick={handleCopy} block />
          </Tooltip>,
          <Tooltip title={<Translate id="action.removeFavorite">点击移除收藏</Translate>}>
            <Button type="text" icon={<StarFilled style={{ color: "#faad14" }} />} onClick={() => onRemoveFavorite?.(user.id)} block />
          </Tooltip>,
        ]}>
        <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <PromptRemark remark={remark} />
          <div className={styles.descriptionWrapper} style={{ flex: 1, marginTop: token.marginXS }}>
            <Typography.Paragraph
              ellipsis={{
                rows: 3,
              }}
              className={clsx(styles.showcaseCardBody, styles.clickable)}
              onClick={handleParagraphClick}
              style={{ marginBottom: 0, color: token.colorTextSecondary }}>
              {contentToShow}
            </Typography.Paragraph>
          </div>
          <Flex justify="space-between" align="center" style={{ marginTop: "auto", paddingTop: token.marginSM }}>
            <div style={{ flex: 1, overflow: "hidden" }}>
              <PromptCardTag tags={tags} />
            </div>
            {website && (
              <a href={website} target="_blank" rel="noopener noreferrer" style={{ marginLeft: token.marginXS }}>
                <LinkOutlined style={{ fontSize: 14, color: token.colorTextSecondary }} />
              </a>
            )}
          </Flex>
        </div>
      </BasePromptCard>
    </li>
  );
};
