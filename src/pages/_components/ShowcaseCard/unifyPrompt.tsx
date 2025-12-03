import React, { useState, useCallback } from "react";
import clsx from "clsx";
import Translate from "@docusaurus/Translate";
import { Button, Tooltip } from "antd";
import { CheckOutlined, CopyOutlined, DownOutlined } from "@ant-design/icons";
import { useCopyToClipboard } from "@site/src/hooks/useCopyToClipboard";

import { MAX_LENGTH, truncate } from "@site/src/utils/formatters";
import styles from "./styles.module.css";
export { styles };
import { ShowcaseRemark } from "./ShowcaseRemark";

export interface CommuPrompt {
  title: string;
  description: string;
  owner: string;
  remark?: string;
  notes?: string;
}

interface SearchCommuProps {
  commuPrompt: CommuPrompt;
}

export const SearchCommu = React.memo<SearchCommuProps>(({ commuPrompt }) => {
  const { copied, copyText } = useCopyToClipboard();
  const [paragraphText, setParagraphText] = useState(commuPrompt.description);
  const [showFullContent, setShowFullContent] = useState(false);

  const toggleContentDisplay = useCallback(() => {
    setShowFullContent((prev) => !prev);
  }, []);

  const handleParagraphClick = useCallback(() => {
    if (commuPrompt.notes) {
      setParagraphText((prev) => (prev === commuPrompt.description ? commuPrompt.notes : commuPrompt.description));
    }
  }, [commuPrompt.notes, commuPrompt.description]);

  const handleCopy = useCallback(() => {
    copyText(commuPrompt.description);
  }, [copyText, commuPrompt.description]);

  const displayText = paragraphText || commuPrompt.description;
  return (
    <li className={clsx("card", styles.showcaseCard)}>
      <div
        className={clsx("card__body")}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}>
        <div>
          <div className={clsx(styles.showcaseCardHeader)}>
            <div className={`${styles.showcaseCardTitle} ${styles.shortEllipsis}`}>
              <span className={styles.showcaseCardLink}>{commuPrompt.title}</span>
              <span style={{ fontSize: "12px", color: "#999", marginLeft: "6px" }}>@{commuPrompt.owner}</span>
            </div>
            <Tooltip title={<Translate id="theme.CodeBlock.copy">复制</Translate>}>
              <Button icon={copied ? <CheckOutlined /> : <CopyOutlined />} onClick={handleCopy} />
            </Tooltip>
          </div>
          {commuPrompt.remark && <ShowcaseRemark remark={commuPrompt.remark} />}
          <div className={styles.descriptionWrapper}>
            <p onClick={handleParagraphClick} className={`${styles.showcaseCardBody} ${commuPrompt.notes ? styles.clickable : ""}`}>
              {showFullContent ? displayText : truncate(displayText)}
            </p>
            {!showFullContent && displayText.length > MAX_LENGTH && (
              <div className={styles.gradientOverlay}>
                <div className={styles.loadMoreBtn} onClick={toggleContentDisplay}>
                  <DownOutlined className={styles.downIcon} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </li>
  );
});

export const CommuPagePrompt = React.memo<SearchCommuProps>(({ commuPrompt }) => {
  const [paragraphText, setParagraphText] = useState(commuPrompt.description);
  const [showFullContent, setShowFullContent] = useState(false);

  const toggleContentDisplay = useCallback(() => {
    setShowFullContent((prev) => !prev);
  }, []);

  const handleParagraphClick = useCallback(() => {
    if (commuPrompt.notes) {
      setParagraphText((prev) => (prev === commuPrompt.description ? commuPrompt.notes : commuPrompt.description));
    }
  }, [commuPrompt.notes, commuPrompt.description]);

  const displayText = paragraphText || commuPrompt.description;
  return (
    <div>
      {commuPrompt.remark && <ShowcaseRemark remark={commuPrompt.remark} />}
      <div className={styles.descriptionWrapper}>
        <p onClick={handleParagraphClick} className={`${styles.showcaseCardBody} ${commuPrompt.notes ? styles.clickable : ""}`}>
          {showFullContent ? displayText : truncate(displayText)}
        </p>
        {!showFullContent && displayText.length > MAX_LENGTH && (
          <div className={styles.gradientOverlay}>
            <div className={styles.loadMoreBtn} onClick={toggleContentDisplay}>
              <DownOutlined className={styles.downIcon} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
});
