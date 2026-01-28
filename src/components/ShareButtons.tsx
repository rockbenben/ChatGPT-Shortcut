import React, { useMemo } from "react";
import { FloatButton } from "antd";
import { ShareAltOutlined } from "@ant-design/icons";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  XIcon,
  TelegramShareButton,
  TelegramIcon,
  WhatsappShareButton,
  WhatsappIcon,
  RedditShareButton,
  RedditIcon,
  LinkedinShareButton,
  LinkedinIcon,
  WeiboShareButton,
  WeiboIcon,
} from "react-share";

interface ShareButtonsProps {
  shareUrl: string;
  title: string;
  popOver?: boolean;
}

const ICON_SIZE = 32;

function ShareButtons({ shareUrl, title, popOver }: ShareButtonsProps) {
  const buttons = useMemo(
    () => (
      <>
        <TwitterShareButton url={shareUrl} title={title}>
          <XIcon size={ICON_SIZE} round />
        </TwitterShareButton>
        <FacebookShareButton url={shareUrl} hashtag={title}>
          <FacebookIcon size={ICON_SIZE} round />
        </FacebookShareButton>
        <TelegramShareButton url={shareUrl} title={title}>
          <TelegramIcon size={ICON_SIZE} round />
        </TelegramShareButton>
        <WhatsappShareButton url={shareUrl} title={title}>
          <WhatsappIcon size={ICON_SIZE} round />
        </WhatsappShareButton>
        <RedditShareButton url={shareUrl} title={title}>
          <RedditIcon size={ICON_SIZE} round />
        </RedditShareButton>
        <LinkedinShareButton url={shareUrl} title={title}>
          <LinkedinIcon size={ICON_SIZE} round />
        </LinkedinShareButton>
        <WeiboShareButton url={shareUrl} title={title}>
          <WeiboIcon size={ICON_SIZE} round />
        </WeiboShareButton>
      </>
    ),
    [shareUrl, title],
  );

  if (popOver) {
    return <div style={{ display: "flex", gap: "8px" }}>{buttons}</div>;
  }

  return (
    <FloatButton.Group trigger="hover" type="primary" style={{ right: 24 }} className="hideOnSmallScreen" icon={<ShareAltOutlined />}>
      {buttons}
    </FloatButton.Group>
  );
}

export default ShareButtons;
