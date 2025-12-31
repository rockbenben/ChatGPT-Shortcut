import React, { useContext, useState, useEffect, useCallback, useMemo } from "react";
import { Tooltip, Button, Typography, Flex, Statistic } from "antd";
import { CheckOutlined, CopyOutlined, StarOutlined, StarFilled, LinkOutlined, FireOutlined } from "@ant-design/icons";
import { gold } from "@ant-design/colors";
import { BasePromptCard } from "./Base";
import Link from "@docusaurus/Link";
import Translate from "@docusaurus/Translate";
import { useCopyToClipboard } from "@site/src/hooks/useCopyToClipboard";
import { useFavorite } from "@site/src/hooks/useFavorite";
import styles from "./styles.module.css";
import { AuthContext } from "../AuthContext";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { formatCompactNumber } from "@site/src/utils/formatters";
import { PromptRemark } from "./PromptRemark";
import { PromptCardTag } from "./PromptCardTag";

interface DataCardProps {
  data: any;
  copyCount?: number;
}

const DataCardComponent = ({ data: user, copyCount, onOpenModal }: DataCardProps & { onOpenModal?: (data: any) => void }) => {
  const { userAuth } = useContext(AuthContext);
  const { i18n } = useDocusaurusContext();
  const { addFavorite, confirmRemoveFavorite } = useFavorite();
  const currentLanguage = i18n.currentLocale.split("-")[0];

  const userInfo = useMemo(() => {
    // 支持两种数据格式：
    // 1. 语言分层格式: user.zh.title, user.en.title
    // 2. 扁平格式: user.title (团队提示词等)
    const langData = user[currentLanguage];
    if (langData && typeof langData === "object") {
      return {
        title: langData.title,
        remark: langData.remark,
        prompt: langData.prompt,
        description: langData.description,
      };
    }
    // 扁平格式
    return {
      title: user.title || "",
      remark: user.remark || "",
      prompt: user.description || user.prompt || "",
      description: user.description || "",
    };
  }, [user, currentLanguage]);

  const [isFavorite, setIsFavorite] = useState(false);
  const { copied, updateCopy } = useCopyToClipboard();

  useEffect(() => {
    setIsFavorite(userAuth?.data?.favorites?.loves?.includes(user.id) || false);
  }, [userAuth, user.id]);

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
          <Typography.Title level={5} style={{ margin: 0, fontSize: "1rem", flex: 1, marginRight: 8 }} ellipsis={{ rows: 2 }}>
            <Link href={`/prompt/${user.id}`} className={styles.showcaseCardLink} onClick={(e) => e.stopPropagation()}>
              {userInfo.title}
            </Link>
          </Typography.Title>
          <Statistic
            value={copyCount}
            formatter={(value) => formatCompactNumber(value as number)}
            prefix={<FireOutlined style={{ color: "var(--ifm-color-warning)" }} />}
            styles={{ content: { fontSize: 12, color: "var(--ifm-color-emphasis-500)" } }}
          />
        </Flex>
      }
      actions={[
        <Tooltip title={<Translate id="action.copy">复制</Translate>}>
          <Button type="text" icon={copied ? <CheckOutlined /> : <CopyOutlined />} onClick={handleCopy} block />
        </Tooltip>,
        userAuth && (
          <Tooltip title={isFavorite ? <Translate id="action.removeFavorite">点击移除收藏</Translate> : <Translate id="common.favorites">收藏</Translate>}>
            <Button type="text" icon={isFavorite ? <StarFilled style={{ color: gold[5] }} /> : <StarOutlined />} onClick={isFavorite ? handleRemoveFavorite : handleLove} block />
          </Tooltip>
        ),
      ].filter(Boolean)}
      onCardClick={handleCardClick}>
      <PromptRemark remark={userInfo.remark} style={{ marginBottom: 0 }} />
      <Typography.Paragraph ellipsis={{ rows: 3 }} style={{ flex: 1 }}>
        {userInfo.prompt}
      </Typography.Paragraph>
      <Flex justify="space-between" align="center">
        <div style={{ flex: 1 }}>
          <PromptCardTag tags={user.tags} muted />
        </div>
        {user.website && (
          <a href={user.website} target="_blank" rel="noopener noreferrer" style={{ marginLeft: 8 }}>
            <LinkOutlined style={{ fontSize: 12, color: "var(--ifm-color-emphasis-500)", opacity: 0.6 }} />
          </a>
        )}
      </Flex>
    </BasePromptCard>
  );
};

export const DataCard = React.memo(DataCardComponent);
