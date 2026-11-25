import React, { useCallback, useMemo } from "react";
import { Typography, Flex, Statistic } from "antd";
import { HeartOutlined, HeartFilled, FireOutlined } from "@ant-design/icons";
import { BasePromptCard, ClampBox, PromptSourceLink } from "./Base";
import Link from "@docusaurus/Link";
import { translate } from "@docusaurus/Translate";
import { IconAction } from "@site/src/components/IconAction";
import { CopyButton } from "@site/src/components/CopyButton";
import styles from "./styles.module.css";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { formatCompactNumber } from "@site/src/utils/formatters";
import { PromptRemark } from "./PromptRemark";
import { PromptCardTag } from "./PromptCardTag";

interface DataCardProps {
  data: any;
  copyCount?: number;
  isFavorite?: boolean;
  isLoggedIn?: boolean;
  onToggleFavorite?: (id: number, isComm: boolean) => void;
}

const DataCardComponent = ({ data: user, copyCount, isFavorite, isLoggedIn, onToggleFavorite, onOpenModal }: DataCardProps & { onOpenModal?: (data: any) => void }) => {
  const { i18n } = useDocusaurusContext();
  const currentLanguage = i18n.currentLocale;

  const userInfo = useMemo(() => {
    const langData = user[currentLanguage];
    if (langData && typeof langData === "object") {
      return {
        title: langData.title,
        remark: langData.remark,
        prompt: langData.prompt,
        description: langData.description,
      };
    }
    return {
      title: user.title || "",
      remark: user.remark || "",
      prompt: user.description || user.prompt || "",
      description: user.description || "",
    };
  }, [user, currentLanguage]);

  const handleCardClick = useCallback(() => {
    onOpenModal?.({
      id: user.id,
      title: userInfo.title,
      prompt: userInfo.prompt,
      description: userInfo.description,
      remark: userInfo.remark,
      tags: user.tags,
      website: user.website,
      copyCount: copyCount,
    });
  }, [onOpenModal, user.id, userInfo, user.tags, user.website, copyCount]);

  const handleToggleFav = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onToggleFavorite?.(user.id, false);
    },
    [onToggleFavorite, user.id],
  );

  const hasRemark = Boolean(userInfo.remark?.trim());

  return (
    <BasePromptCard
      title={
        <Typography.Title level={3} style={{ margin: 0, fontSize: 15.5, fontWeight: 600, letterSpacing: "-0.01em", lineHeight: 1.4 }} ellipsis={{ rows: 2 }}>
          <Link href={`/prompt/${user.id}`} className={styles.showcaseCardLink} onClick={(e) => e.stopPropagation()}>
            {userInfo.title}
          </Link>
        </Typography.Title>
      }
      titleExtra={
        copyCount !== undefined && (
          <Statistic
            value={copyCount}
            formatter={(value) => formatCompactNumber(value as number)}
            prefix={<FireOutlined style={{ color: "var(--site-color-text-tertiary)" }} />}
            styles={{ content: { fontSize: 11, color: "var(--site-color-text-tertiary)", fontFamily: "var(--site-font-mono)", fontVariantNumeric: "tabular-nums" } }}
          />
        )
      }
      footer={
        <>
          <Flex align="center" gap={4} style={{ flex: 1, minWidth: 0, overflow: "hidden" }}>
            <PromptCardTag tags={user.tags} muted maxVisible={2} />
            <PromptSourceLink href={user.website} />
          </Flex>
          <Flex align="center" gap={4} style={{ flexShrink: 0 }}>
            {isLoggedIn && onToggleFavorite && (
              <IconAction
                key="fav"
                size="small"
                label={isFavorite ? translate({ id: "action.removeFavorite", message: "从收藏中移除" }) : translate({ id: "common.favorites", message: "收藏" })}
                icon={isFavorite ? <HeartFilled style={{ color: "var(--site-color-svg-icon-favorite)" }} /> : <HeartOutlined />}
                onClick={handleToggleFav}
              />
            )}
            <CopyButton key="copy" text={userInfo.prompt} trackingId={user.id} variant="iconOnly" size="small" />
          </Flex>
        </>
      }
      onCardClick={handleCardClick}>
      <PromptRemark remark={userInfo.remark} />
      <div className={hasRemark ? styles.promptBodyAfterRemark : undefined}>
        <ClampBox>
          <Typography.Paragraph
            ellipsis={{ rows: hasRemark ? 3 : 4 }}
            style={{
              color: hasRemark ? "var(--site-color-text-tertiary)" : "var(--ifm-color-content-secondary)",
              fontSize: hasRemark ? 12.5 : 13,
              lineHeight: hasRemark ? 1.68 : 1.7,
              marginBottom: 0,
            }}>
            {userInfo.prompt}
          </Typography.Paragraph>
        </ClampBox>
      </div>
    </BasePromptCard>
  );
};

export const DataCard = React.memo(DataCardComponent);
