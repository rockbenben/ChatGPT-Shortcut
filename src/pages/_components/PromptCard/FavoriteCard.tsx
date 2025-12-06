import React, { useContext, useCallback } from "react";
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
  onRemoveFavorite?: (id: string, isComm?: boolean) => void;
  onOpenModal?: (data: any) => void;
}

const FavoriteCardComponent = ({ data: user, isFiltered, isDescription, onRemoveFavorite, onOpenModal }: FavoriteCardProps) => {
  const { userAuth } = useContext(AuthContext);
  const { i18n } = useDocusaurusContext();
  const { token } = theme.useToken();
  const { copied, copyText, updateCopy } = useCopyToClipboard();

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

  const handleCopy = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (isDataCard) {
        updateCopy(prompt, user.id);
      } else {
        copyText(prompt);
      }
    },
    [isDataCard, updateCopy, copyText, prompt, user.id]
  );

  const handleRemoveFavorite = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onRemoveFavorite?.(user.id, !isDataCard);
    },
    [onRemoveFavorite, user.id, isDataCard]
  );

  const handleCardClick = useCallback(() => {
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
            <Typography.Title level={5} style={{ margin: 0, fontSize: "1rem", flex: 1, marginRight: token.marginXS }} ellipsis={{ rows: 2 }}>
              {isDataCard ? (
                <Link href={`/prompt/${user.id}`} className={styles.showcaseCardLink} onClick={(e) => e.stopPropagation()}>
                  {title}
                </Link>
              ) : (
                <span style={{ color: "var(--ifm-color-primary)" }}>{title}</span>
              )}
            </Typography.Title>
            <Flex align="center" gap={token.marginXXS} style={{ color: token.colorError, flexShrink: 0 }}>
              {copyCount > 0 && (
                <Flex align="center" gap={token.marginXXS} style={{ color: token.colorError }}>
                  <FireFilled />
                  <Typography.Text type="danger" style={{ fontSize: token.fontSizeSM, fontWeight: 600 }}>
                    {formatCompactNumber(copyCount)}
                  </Typography.Text>
                </Flex>
              )}
              {user.upvoteDifference > 0 && (
                <Flex align="center" gap={token.marginXXS} style={{ color: token.colorWarning }}>
                  <LikeFilled />
                  <Typography.Text type="warning" style={{ fontSize: token.fontSizeSM, fontWeight: 600 }}>
                    {formatCompactNumber(user.upvoteDifference)}
                  </Typography.Text>
                </Flex>
              )}
            </Flex>
          </Flex>
        }
        titleExtra={
          owner && (
            <Typography.Text type="secondary" style={{ fontSize: "12px", display: "flex", alignItems: "center", maxWidth: 75 }} ellipsis={{ tooltip: true }}>
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
            <Button type="text" icon={<StarFilled style={{ color: "#faad14" }} />} onClick={handleRemoveFavorite} block />
          </Tooltip>,
        ]}
        onCardClick={handleCardClick}>
        <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <PromptRemark remark={remark} />
          <div className={styles.descriptionWrapper} style={{ flex: 1, marginTop: token.marginXS }}>
            <Typography.Paragraph
              ellipsis={{
                rows: 3,
              }}
              className={styles.showcaseCardBody}
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

export const FavoriteCard = React.memo(FavoriteCardComponent);
