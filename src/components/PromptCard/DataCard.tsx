import React, { useContext, useState, useEffect, useCallback, useMemo } from "react";
import { Tooltip, Button, Typography, Flex, theme } from "antd";
import { BasePromptCard } from "./Base";
import Link from "@docusaurus/Link";
import Translate from "@docusaurus/Translate";
import { useCopyToClipboard } from "@site/src/hooks/useCopyToClipboard";
import { useFavorite } from "@site/src/hooks/useFavorite";
import { CheckOutlined, CopyOutlined, StarOutlined, StarFilled, DownOutlined, LinkOutlined, FireFilled } from "@ant-design/icons";
import styles from "./styles.module.css";
import { AuthContext } from "../AuthContext";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { formatCount } from "@site/src/utils/formatters";
import { PromptRemark } from "./PromptRemark";
import { PromptCardTag } from "./PromptCardTag";

interface DataCardProps {
  data: any;
  isDescription?: boolean;
  copyCount?: number;
}

const DataCardComponent = ({ data: user, isDescription, copyCount, onOpenModal }: DataCardProps & { onOpenModal?: (data: any) => void }) => {
  const { userAuth } = useContext(AuthContext);
  const { i18n } = useDocusaurusContext();
  const { addFavorite, confirmRemoveFavorite } = useFavorite();
  const { token } = theme.useToken();
  const currentLanguage = i18n.currentLocale.split("-")[0];

  const userInfo = useMemo(
    () => ({
      title: user[currentLanguage].title,
      remark: user[currentLanguage].remark,
      prompt: user[currentLanguage].prompt,
      description: user[currentLanguage].description,
    }),
    [user, currentLanguage]
  );

  const canToggle = currentLanguage !== "en" && userInfo.description !== userInfo.prompt;

  const [isFavorite, setIsFavorite] = useState(false);
  const { copied, updateCopy } = useCopyToClipboard();

  const [paragraphText, setParagraphText] = useState(() => (canToggle ? (isDescription ? userInfo.prompt : userInfo.description) : userInfo.prompt));

  useEffect(() => {
    setIsFavorite(userAuth?.data?.favorites?.loves?.includes(user.id) || false);
  }, [userAuth, user.id]);

  useEffect(() => {
    setParagraphText(isDescription ? userInfo.prompt : userInfo.description);
  }, [isDescription, userInfo.prompt, userInfo.description]);

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

  const userDescription = canToggle ? paragraphText : userInfo.prompt;

  const handleCopy = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      updateCopy(userInfo.prompt, user.id);
    },
    [updateCopy, userInfo.prompt, user.id]
  );

  const handleLove = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      addFavorite(user.id, false);
    },
    [addFavorite, user.id]
  );

  const handleRemoveFavorite = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      confirmRemoveFavorite(user.id, false);
    },
    [confirmRemoveFavorite, user.id]
  );

  return (
    <BasePromptCard
      title={
        <Flex justify="space-between" align="start" style={{ width: "100%" }}>
          <Typography.Title level={5} style={{ margin: 0, fontSize: "1rem", flex: 1, marginRight: token.marginXS }} ellipsis={{ rows: 2 }}>
            <Link href={`/prompt/${user.id}`} className={styles.showcaseCardLink} onClick={(e) => e.stopPropagation()}>
              {userInfo.title}
            </Link>
          </Typography.Title>
          <Flex align="center" gap={token.marginXXS} style={{ color: token.colorError, flexShrink: 0 }}>
            <FireFilled />
            <Typography.Text type="danger" style={{ fontSize: token.fontSizeSM, fontWeight: 600 }}>
              {formatCount(copyCount)}
            </Typography.Text>
          </Flex>
        </Flex>
      }
      actions={[
        <Tooltip title={<Translate id="action.copy">复制</Translate>}>
          <Button type="text" icon={copied ? <CheckOutlined /> : <CopyOutlined />} onClick={handleCopy} block />
        </Tooltip>,
        userAuth ? (
          <Tooltip title={isFavorite ? <Translate id="action.removeFavorite">点击移除收藏</Translate> : <Translate id="common.favorites">收藏</Translate>}>
            <Button type="text" icon={isFavorite ? <StarFilled style={{ color: "#faad14" }} /> : <StarOutlined />} onClick={isFavorite ? handleRemoveFavorite : handleLove} block />
          </Tooltip>
        ) : (
          user.tags?.includes("favorite") && <Button type="text" disabled icon={<StarFilled style={{ color: "#faad14" }} />} block />
        ),
      ].filter(Boolean)}
      onCardClick={handleCardClick}>
      <PromptRemark remark={userInfo.remark} />
      <div className={styles.descriptionWrapper} style={{ flex: 1, marginTop: token.marginXS }}>
        <Typography.Paragraph
          ellipsis={{
            rows: 3,
          }}
          className={styles.showcaseCardBody}
          style={{ marginBottom: 0 }}>
          {userDescription}
        </Typography.Paragraph>
      </div>
      <Flex justify="space-between" align="center" style={{ marginTop: token.marginSM }}>
        <div style={{ flex: 1 }}>
          <PromptCardTag tags={user.tags} />
        </div>
        {user.website && (
          <a href={user.website} target="_blank" rel="noopener noreferrer" style={{ marginLeft: token.marginXS }}>
            <LinkOutlined style={{ fontSize: 12, color: "var(--ifm-color-emphasis-500)", opacity: 0.6 }} />
          </a>
        )}
      </Flex>
    </BasePromptCard>
  );
};

export const DataCard = React.memo(DataCardComponent);
