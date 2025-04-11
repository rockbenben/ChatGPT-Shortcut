import React, { useState } from "react";
import clsx from "clsx";
import Translate from "@docusaurus/Translate";
import { Button, Tooltip } from "antd";
import { CopyOutlined, DownOutlined } from "@ant-design/icons";
import copy from "copy-text-to-clipboard";

import { MAX_LENGTH, truncate } from "@site/src/utils/formatters";
import styles from "./styles.module.css";

export const SearchCommu = ({ commuPrompt }) => {
  const [paragraphText, setParagraphText] = useState(commuPrompt.description);
  const [showFullContent, setShowFullContent] = useState(false);
  const [copied, setCopied] = useState(false);
  const toggleContentDisplay = () => {
    setShowFullContent(!showFullContent);
  };

  const handleCopyClick = () => {
    copy(commuPrompt.description);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleParagraphClick = () => {
    if (commuPrompt.notes) {
      setParagraphText(paragraphText === commuPrompt.description ? commuPrompt.notes : commuPrompt.description);
    }
  };

  const displayText = paragraphText || commuPrompt.description;
  return (
    <li className="card shadow--md">
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
              <span className={styles.showcaseCardLink} style={{ color: "var(--ifm-color-primary)" }}>
                {commuPrompt.title}
              </span>
              <span style={{ fontSize: "12px", color: "#999", marginLeft: "6px" }}>@{commuPrompt.owner}</span>
            </div>
            <Button icon={<CopyOutlined />} type="default" style={{ fontSize: "12px" }} onClick={handleCopyClick}>
              {copied ? <Translate id="theme.CodeBlock.copied">已复制</Translate> : <Translate id="theme.CodeBlock.copy">复制</Translate>}
            </Button>
          </div>
          {commuPrompt.remark && (
            <p className={styles.showcaseCardBody} style={{ maxHeight: 68 }}>
              👉 {commuPrompt.remark}
            </p>
          )}
          <div className={styles.descriptionWrapper}>
            <p onClick={handleParagraphClick} className={`${styles.showcaseCardBody} ${commuPrompt.notes ? styles.clickable : ""}`}>
              {showFullContent ? displayText : truncate(displayText)}
            </p>
            {!showFullContent && displayText.length > MAX_LENGTH && (
              <div className={styles.gradientOverlay}>
                <Tooltip title={<Translate>加载更多</Translate>}>
                  <DownOutlined onClick={toggleContentDisplay} className={styles.downIcon} />
                </Tooltip>
              </div>
            )}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}></div>
      </div>
    </li>
  );
};

export const CommuPagePrompt = ({ commuPrompt }) => {
  const [paragraphText, setParagraphText] = useState(commuPrompt.description);
  const [showFullContent, setShowFullContent] = useState(false);
  const toggleContentDisplay = () => {
    setShowFullContent(!showFullContent);
  };

  const handleParagraphClick = () => {
    if (commuPrompt.notes) {
      setParagraphText(paragraphText === commuPrompt.description ? commuPrompt.notes : commuPrompt.description);
    }
  };

  const displayText = paragraphText || commuPrompt.description;
  return (
    <div>
      <div className={clsx(styles.showcaseCardHeader)}>
        <div className={`${styles.showcaseCardTitle} ${styles.shortEllipsis}`}>
          <span className={styles.showcaseCardLink} style={{ color: "var(--ifm-color-primary)" }}>
            {commuPrompt.title}
          </span>
          <span style={{ fontSize: "12px", color: "#999", marginLeft: "6px" }}>@{commuPrompt.owner}</span>
        </div>
      </div>
      {commuPrompt.remark && (
        <p className={styles.showcaseCardBody} style={{ maxHeight: 68 }}>
          👉 {commuPrompt.remark}
        </p>
      )}
      <div className={styles.descriptionWrapper}>
        <p onClick={handleParagraphClick} className={`${styles.showcaseCardBody} ${commuPrompt.notes ? styles.clickable : ""}`}>
          {showFullContent ? displayText : truncate(displayText)}
        </p>
        {!showFullContent && displayText.length > MAX_LENGTH && (
          <div className={styles.gradientOverlay}>
            <Tooltip title={<Translate>加载更多</Translate>}>
              <DownOutlined onClick={toggleContentDisplay} className={styles.downIcon} />
            </Tooltip>
          </div>
        )}
      </div>
    </div>
  );
};
