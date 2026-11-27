import React, { useCallback, ReactNode } from "react";
import { Button, Typography, Flex } from "antd";
import clsx from "clsx";
import { BasePromptCard, ClampBox, PromptSourceLink } from "./Base";
import Link from "@docusaurus/Link";
import Translate, { translate } from "@docusaurus/Translate";
import { IconAction } from "@site/src/components/IconAction";
import { CopyButton } from "@site/src/components/CopyButton";
import { HeartFilled, UserOutlined, FireOutlined, LikeFilled, HolderOutlined, ExclamationCircleOutlined, StopOutlined } from "@ant-design/icons";
import styles from "./styles.module.css";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import type { SortableCardProps } from "./types";
import { PromptRemark } from "./PromptRemark";
import { PromptCardTag } from "./PromptCardTag";
import { getWeight, formatCompactNumber } from "@site/src/utils/formatters";

interface FavoriteCardProps {
  data: any;
  sortable?: SortableCardProps;

  onRemoveFavorite?: (id: number, isComm?: boolean) => void;
  onOpenModal?: (data: any) => void;
  onConvertToPrivate?: (data: any) => void;
  extraActions?: ReactNode;
}

const FavoriteCardComponent = ({ data: user, sortable, onRemoveFavorite, onOpenModal, onConvertToPrivate, extraActions }: FavoriteCardProps) => {
  const { i18n } = useDocusaurusContext();

  const isUnavailable = user._unavailable === true;
  const hasCache = !user._noCache;

  const currentLanguage = i18n.currentLocale;
  const itemData = user[currentLanguage] || user["zh-Hans"] || user["en"];
  const isDataCard = !!(itemData && itemData.title);

  const title = isDataCard ? itemData.title : user.title;
  const prompt = isDataCard ? itemData.prompt : user.description;
  const description = isDataCard ? itemData.description : user.notes || user.description;
  const remark = isDataCard ? itemData.remark : user.remark;
  const tags = user.tags;
  const website = user.website;
  const owner = user.owner;
  const copyCount = getWeight(user);

  const handleRemoveFavorite = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onRemoveFavorite?.(user.id, !isDataCard);
    },
    [onRemoveFavorite, user.id, isDataCard],
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
  }, [onOpenModal, isDataCard, user, title, prompt, description, remark, tags, website, owner, copyCount]);

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
          padding: "10px 12px",
          background: hasCache ? "rgba(250, 173, 20, 0.1)" : "rgba(255, 77, 79, 0.1)",
          border: `1px solid ${hasCache ? "rgba(250, 173, 20, 0.35)" : "rgba(255, 77, 79, 0.35)"}`,
          borderRadius: 8,
        }}>
        <Flex vertical gap="small">
          <Flex align="center" gap="small">
            {hasCache ? <ExclamationCircleOutlined style={{ color: "#faad14", fontSize: 16, flexShrink: 0 }} /> : <StopOutlined style={{ color: "#ff4d4f", fontSize: 16, flexShrink: 0 }} />}
            <Typography.Text style={{ fontSize: 13, color: "var(--ifm-color-content)", flex: 1 }}>
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

  const hasRemark = Boolean(remark?.trim());

  return (
    <BasePromptCard
      ref={sortable?.setNodeRef}
      style={{ height: "100%", ...sortable?.style }}
      {...sortable?.attributes}
      title={
        <Flex align="start" style={{ overflow: "hidden" }}>
          {sortable && (
            <div {...sortable.listeners} className={styles.dragHandle} onClick={(e) => e.stopPropagation()}>
              <HolderOutlined />
            </div>
          )}
          <ClampBox>
            <h3 className={clsx(styles.cardTitle, styles.clampLines, styles.clamp2)}>
              {isDataCard ? (
                <Link href={`/prompt/${user.id}`} className={styles.showcaseCardLink} onClick={(e) => e.stopPropagation()}>
                  {title}
                </Link>
              ) : (
                <Link href={`/community-prompt?id=${user.id}`} className={styles.showcaseCardLink} onClick={(e) => e.stopPropagation()}>
                  {title}
                </Link>
              )}
            </h3>
          </ClampBox>
        </Flex>
      }
      titleExtra={
        <>
          {copyCount > 0 && (
            <span className={styles.cardStat}>
              <FireOutlined aria-hidden />
              <span>{formatCompactNumber(copyCount)}</span>
            </span>
          )}
          {user.upvoteDifference > 0 && (
            <span className={styles.cardStat}>
              <LikeFilled aria-hidden />
              <span>{formatCompactNumber(user.upvoteDifference)}</span>
            </span>
          )}
        </>
      }
      footer={
        <>
          <Flex align="center" gap={4} style={{ minWidth: 0 }}>
            {extraActions}
            <PromptSourceLink href={website} />
          </Flex>
          <Flex align="center" gap={4} style={{ flexShrink: 0 }}>
            <IconAction
              key="remove"
              size="small"
              label={translate({ id: "action.removeFavorite", message: "从收藏中移除" })}
              icon={<HeartFilled style={{ color: "var(--site-color-svg-icon-favorite)" }} />}
              onClick={handleRemoveFavorite}
            />
            <CopyButton text={prompt} trackingId={isDataCard ? user.id : undefined} variant="iconOnly" size="small" />
          </Flex>
        </>
      }
      onCardClick={handleCardClick}>
      {renderUnavailableBanner()}
      <PromptRemark remark={remark} />
      <div className={hasRemark ? styles.promptBodyAfterRemark : undefined}>
        <ClampBox>
          <p className={clsx(styles.cardBody, hasRemark ? styles.cardBodyMuted : styles.cardBodyPrimary, styles.clampLines, hasRemark ? styles.clamp3 : styles.clamp4)}>
            {prompt}
          </p>
        </ClampBox>
      </div>
      {(owner || Boolean(tags?.length)) && (
        <Flex align="center" gap={8} wrap="wrap" style={{ marginTop: "auto" }}>
          {owner && (
            <span style={{ fontSize: 11.5, color: "var(--site-color-text-tertiary)", display: "inline-flex", alignItems: "center", maxWidth: 80, minWidth: 0 }} title={owner}>
              <UserOutlined style={{ marginInlineEnd: 4, flexShrink: 0 }} />
              <span className={styles.cardOwnerName}>{owner}</span>
            </span>
          )}
          {Boolean(tags?.length) && <PromptCardTag tags={tags} muted clickable={false} maxVisible={2} />}
        </Flex>
      )}
    </BasePromptCard>
  );
};

export const FavoriteCard = React.memo(FavoriteCardComponent);
