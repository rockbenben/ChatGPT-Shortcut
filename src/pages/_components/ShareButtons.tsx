import React, { useMemo } from "react";
import styles from "@site/src/pages/styles.module.css";
import { ConfigProvider, FloatButton } from "antd";
import { ShareAltOutlined } from "@ant-design/icons";
import { FacebookShareButton, TelegramShareButton, TumblrShareButton, TwitterShareButton, WeiboShareButton, FacebookIcon, TelegramIcon, TumblrIcon, TwitterIcon, WeiboIcon } from "react-share";

function ShareButtons({ shareUrl, title, popOver }) {
  const buttons = useMemo(
    () => (
      <>
        <FacebookShareButton url={shareUrl} hashtag={title}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <TwitterShareButton url={shareUrl} title={title}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        <TelegramShareButton url={shareUrl} title={title}>
          <TelegramIcon size={32} round />
        </TelegramShareButton>
        <TumblrShareButton url={shareUrl} title={title}>
          <TumblrIcon size={32} round />
        </TumblrShareButton>
        <WeiboShareButton url={shareUrl} title={title}>
          <WeiboIcon size={32} round />
        </WeiboShareButton>
      </>
    ),
    [shareUrl, title]
  );

  const floatButtons = (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#397e6a",
        },
      }}>
      <FloatButton.Group trigger="hover" type="primary" style={{ right: 24 }} className={styles.hideOnMobile} icon={<ShareAltOutlined />}>
        {buttons}
      </FloatButton.Group>
    </ConfigProvider>
  );

  if (popOver) {
    return <div style={{ display: "flex", gap: "5px" }}>{buttons}</div>;
  }

  return floatButtons;
}

export default ShareButtons;
