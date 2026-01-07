import React, { useContext, useCallback, ReactNode } from "react";
import { Tooltip, Button, Typography, Flex, Statistic } from "antd";
import { gold } from "@ant-design/colors";
import { BasePromptCard } from "./Base";
import Link from "@docusaurus/Link";
import Translate from "@docusaurus/Translate";
import { useCopyToClipboard } from "@site/src/hooks/useCopyToClipboard";
import { CheckOutlined, CopyOutlined, StarFilled, LinkOutlined, UserOutlined, FireOutlined, LikeFilled, HolderOutlined, ExclamationCircleOutlined, StopOutlined } from "@ant-design/icons";
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
  sortableId?: string | number;
  isFiltered?: boolean;

  onRemoveFavorite?: (id: string, isComm?: boolean) => void;
  onOpenModal?: (data: any) => void;
  onConvertToPrivate?: (data: any) => void; // New: convert unavailable prompt to private
  extraActions?: ReactNode;
}

const FavoriteCardComponent = ({ data: user, sortableId, isFiltered, onRemoveFavorite, onOpenModal, onConvertToPrivate, extraActions }: FavoriteCardProps) => {
  const { userAuth } = useContext(AuthContext);
  const { i18n } = useDocusaurusContext();
  const { copied, copyText, updateCopy } = useCopyToClipboard();

  // Check if prompt is unavailable (unshared by author)
  const isUnavailable = user._unavailable === true;
  const hasCache = !user._noCache;
  const unavailableReason = user._unavailableReason;

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: sortableId ?? user.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    height: "100%",
  };

  const currentLanguage = i18n.currentLocale;
  const itemData = user[currentLanguage] || user["zh-Hans"] || user["en"];
  const isDataCard = !!(itemData && itemData.title);

  // Map data based on card type
  const title = isDataCard ? itemData.title : user.title;
  // For Community Cards: description field is prompt, note field is description
  const prompt = isDataCard ? itemData.prompt : user.description;
  const description = isDataCard ? itemData.description : user.note || user.description;
  const remark = isDataCard ? itemData.remark : user.remark;
  const tags = user.tags;
  const website = user.website;
  const owner = user.owner;
  const copyCount = getWeight(user);

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

  // Render unavailable warning banner
  const renderUnavailableBanner = () => {
    if (!isUnavailable) return null;

    const handleConvertToPrivate = (e: React.MouseEvent) => {
      e.stopPropagation();
      onConvertToPrivate?.(user);
    };

    const handleRemove = (e: React.MouseEvent) => {
      e.stopPropagation();
      onRemoveFavorite?.(user.id, !isDataCard);
    };

    return (
      <div
        style={{
          padding: "12px 16px",
          background: hasCache ? "#fff7e6" : "#fff2f0",
          border: `1px solid ${hasCache ? "#ffa940" : "#ff7875"}`,
          borderRadius: 8,
          marginBottom: 12,
        }}>
        <Flex vertical gap="small">
          <Flex align="center" gap="small">
            {hasCache ? <ExclamationCircleOutlined style={{ color: "#faad14", fontSize: 18, flexShrink: 0 }} /> : <StopOutlined style={{ color: "#ff4d4f", fontSize: 18, flexShrink: 0 }} />}
            <Typography.Text style={{ fontSize: 14, color: "var(--ifm-color-content)", flex: 1 }}>
              {hasCache ? <Translate id="unavailable.unshared">原作者已取消分享</Translate> : <Translate id="unavailable.unsharedNoCache">原作者已取消分享且无本地缓存</Translate>}
            </Typography.Text>
          </Flex>
          <Flex gap="small" justify="end">
            {hasCache && (
              <Button size="small" type="primary" onClick={handleConvertToPrivate} style={{ minWidth: 80 }}>
                <Translate id="action.convertToPrivate">转为私有</Translate>
              </Button>
            )}
            <Button size="small" onClick={handleRemove} style={{ minWidth: 80 }}>
              <Translate id="message.removeFavorite.confirm.title">移除收藏</Translate>
            </Button>
          </Flex>
        </Flex>
      </div>
    );
  };

  return (
    <BasePromptCard
      ref={setNodeRef}
      style={style}
      {...attributes}
      title={
        <Flex justify="space-between" align="start" style={{ width: "100%" }}>
          <Flex align="start" style={{ flex: 1, minWidth: 0, marginRight: 8, overflow: "hidden" }}>
            {!isFiltered && (
              <div {...listeners} style={{ cursor: "grab", marginRight: 8, display: "flex", alignItems: "center", flexShrink: 0, paddingTop: 6 }}>
                <HolderOutlined style={{ color: "var(--ifm-color-emphasis-500)" }} />
              </div>
            )}
            <Typography.Title level={5} style={{ margin: 0, fontSize: "1rem", flex: 1, minWidth: 0 }} ellipsis={{ rows: 2 }}>
              {isDataCard ? (
                <Link href={`/prompt/${user.id}`} className={styles.showcaseCardLink} onClick={(e) => e.stopPropagation()}>
                  {title}
                </Link>
              ) : (
                <span style={{ color: "var(--ifm-color-primary)" }}>{title}</span>
              )}
            </Typography.Title>
          </Flex>
          <Flex align="center" gap={4} style={{ color: "var(--ifm-color-danger)", flexShrink: 0 }}></Flex>
        </Flex>
      }
      titleExtra={
        <>
          {copyCount > 0 && (
            <Statistic
              value={copyCount}
              formatter={(value) => formatCompactNumber(value as number)}
              prefix={<FireOutlined style={{ color: "var(--ifm-color-warning)" }} />}
              styles={{ content: { fontSize: 12, color: "var(--ifm-color-emphasis-500)" } }}
            />
          )}
          {user.upvoteDifference > 0 && (
            <Statistic
              value={user.upvoteDifference}
              formatter={(value) => formatCompactNumber(value as number)}
              prefix={<LikeFilled style={{ color: "var(--ifm-color-warning)" }} />}
              styles={{ content: { fontSize: 12, color: "var(--ifm-color-warning)" } }}
            />
          )}
        </>
      }
      actions={[
        <Tooltip title={<Translate id="action.copy">复制</Translate>}>
          <Button type="text" icon={copied ? <CheckOutlined /> : <CopyOutlined />} onClick={handleCopy} block />
        </Tooltip>,
        <Tooltip title={<Translate id="action.removeFavorite">点击移除收藏</Translate>}>
          <Button type="text" icon={<StarFilled style={{ color: gold[5] }} />} onClick={handleRemoveFavorite} block />
        </Tooltip>,
        extraActions,
      ].filter(Boolean)}
      onCardClick={handleCardClick}>
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        {renderUnavailableBanner()}
        <PromptRemark remark={remark} />
        <Typography.Paragraph ellipsis={{ rows: 3 }} style={{ marginBottom: 0, color: "var(--ifm-color-emphasis-600)" }}>
          {prompt}
        </Typography.Paragraph>
        <Flex justify="space-between" align="center" style={{ marginTop: "auto", paddingTop: 12 }}>
          <div style={{ flex: 1, overflow: "hidden" }}>
            {owner && (
              <Typography.Text type="secondary" style={{ fontSize: "12px", display: "flex", alignItems: "center", maxWidth: 75 }} ellipsis={{ tooltip: true }}>
                <UserOutlined style={{ marginRight: 4 }} />
                {owner}
              </Typography.Text>
            )}
            <PromptCardTag tags={tags} muted />
          </div>

          {website && (
            <a href={website} target="_blank" rel="noopener noreferrer" style={{ marginLeft: 8 }}>
              <LinkOutlined style={{ fontSize: 14, color: "var(--ifm-color-emphasis-500)" }} />
            </a>
          )}
        </Flex>
      </div>
    </BasePromptCard>
  );
};

export const FavoriteCard = React.memo(FavoriteCardComponent);
