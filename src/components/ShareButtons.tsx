import React, { useMemo, useState, useEffect, useCallback } from "react";
import { Button, FloatButton, Flex, Typography, Tooltip } from "antd";
import {
  ShareAltOutlined,
  LinkOutlined,
  CheckOutlined,
  MobileOutlined,
  XOutlined,
  FacebookOutlined,
  SendOutlined,
  WhatsAppOutlined,
  LinkedinOutlined,
  RedditOutlined,
  WeiboOutlined,
} from "@ant-design/icons";
import {
  TwitterShareButton,
  FacebookShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  RedditShareButton,
  LinkedinShareButton,
  WeiboShareButton,
} from "react-share";
import Translate from "@docusaurus/Translate";
import { useCopyToClipboard } from "@site/src/hooks/useCopyToClipboard";

interface ShareButtonsProps {
  shareUrl: string;
  title: string;
  popOver?: boolean;
}

// 检测 Web Share API 是否可用 — SSR 安全（serverside 返回 false 避免 hydration mismatch）
const useWebShareSupport = () => {
  const [supported, setSupported] = useState(false);
  useEffect(() => {
    setSupported(typeof navigator !== "undefined" && typeof (navigator as any).share === "function");
  }, []);
  return supported;
};

// Channel 定义：react-share *ShareButton 提供 share URL 构造 + window.open + a11y，
// 我们只接管视觉（用 antd outlined icon + label 取代默认彩色 SocialIcon）
type Channel = {
  key: string;
  Btn: React.ElementType;
  Icon: React.ElementType;
  label: string;
  props: Record<string, any>;
};

const buildChannels = (shareUrl: string, title: string): Channel[] => [
  { key: "x", Btn: TwitterShareButton, Icon: XOutlined, label: "X", props: { url: shareUrl, title } },
  { key: "tg", Btn: TelegramShareButton, Icon: SendOutlined, label: "Telegram", props: { url: shareUrl, title } },
  { key: "linkedin", Btn: LinkedinShareButton, Icon: LinkedinOutlined, label: "LinkedIn", props: { url: shareUrl, title } },
  { key: "wa", Btn: WhatsappShareButton, Icon: WhatsAppOutlined, label: "WhatsApp", props: { url: shareUrl, title } },
  { key: "facebook", Btn: FacebookShareButton, Icon: FacebookOutlined, label: "Facebook", props: { url: shareUrl, hashtag: title } },
  { key: "reddit", Btn: RedditShareButton, Icon: RedditOutlined, label: "Reddit", props: { url: shareUrl, title } },
  { key: "weibo", Btn: WeiboShareButton, Icon: WeiboOutlined, label: "Weibo", props: { url: shareUrl, title } },
];

// 共用 inline style ——————————————————————————————

const tertiary: React.CSSProperties = { color: "var(--site-color-text-tertiary)" };
const monoFont: React.CSSProperties = { fontFamily: "var(--site-font-mono)" };
const channelLabelStyle: React.CSSProperties = {
  fontSize: 11,
  fontFamily: "var(--site-font-mono)",
  letterSpacing: "0.02em",
  whiteSpace: "nowrap",
};

// === popOver=true 子组件 === //

function CopyLinkBar({ url }: { url: string }) {
  const { copied, copyText } = useCopyToClipboard();
  return (
    <Flex
      align="center"
      gap={8}
      style={{
        padding: "6px 6px 6px 10px",
        border: "1px solid var(--site-color-hairline)",
        borderRadius: 6,
        background: "var(--site-color-ghost-border)",
      }}>
      <LinkOutlined style={{ ...tertiary, flexShrink: 0, fontSize: 13 }} />
      <Typography.Text ellipsis style={{ ...tertiary, ...monoFont, flex: 1, fontSize: 12, minWidth: 0 }}>
        {url}
      </Typography.Text>
      <Button
        type="text"
        size="small"
        icon={copied ? <CheckOutlined /> : null}
        onClick={() => copyText(url)}
        aria-label="Copy link"
        style={{ ...monoFont, flexShrink: 0, height: 24, fontSize: 12 }}>
        {copied ? null : <Translate id="share.copy">复制</Translate>}
      </Button>
    </Flex>
  );
}

function NativeShareButton({ shareUrl, title }: { shareUrl: string; title: string }) {
  const onShare = useCallback(async () => {
    try {
      await (navigator as any).share({ url: shareUrl, title });
    } catch (err) {
      // user dismissed / 不支持 / 安全错误 — 静默
    }
  }, [shareUrl, title]);

  return (
    <button type="button" onClick={onShare} className="share-channel-btn share-channel-native">
      <MobileOutlined />
      <span style={channelLabelStyle}>
        <Translate id="share.native">系统</Translate>
      </span>
    </button>
  );
}

function ChannelsGrid({ channels, shareUrl, title }: { channels: Channel[]; shareUrl: string; title: string }) {
  const webShareSupported = useWebShareSupport();
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(72px, 1fr))",
        gap: 4,
        marginTop: 4,
      }}>
      {webShareSupported && <NativeShareButton shareUrl={shareUrl} title={title} />}
      {channels.map(({ key, Btn, Icon, label, props }) => (
        <Btn key={key} {...props} className="share-channel-btn">
          <Icon />
          <span style={channelLabelStyle}>{label}</span>
        </Btn>
      ))}
    </div>
  );
}

// === popOver=false 子组件（FloatButton.Group） === //
//
// 注意：FloatButton 是 antd 的 button 组件，不能嵌在 react-share 的 *ShareButton 内部
// （HTML 不允许 button-in-button）。所以这里手写 share URL + onClick，react-share 仅在
// popOver=true 路径使用。

const SHARE_URL_BUILDERS: Record<string, (u: string, t: string) => string> = {
  x: (u, t) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(u)}&text=${encodeURIComponent(t)}`,
  tg: (u, t) => `https://t.me/share/url?url=${encodeURIComponent(u)}&text=${encodeURIComponent(t)}`,
  linkedin: (u) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(u)}`,
  wa: (u, t) => `https://wa.me/?text=${encodeURIComponent(`${t} ${u}`)}`,
  facebook: (u, t) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(u)}&hashtag=${encodeURIComponent(t)}`,
  reddit: (u, t) => `https://www.reddit.com/submit?url=${encodeURIComponent(u)}&title=${encodeURIComponent(t)}`,
  weibo: (u, t) => `https://service.weibo.com/share/share.php?url=${encodeURIComponent(u)}&title=${encodeURIComponent(t)}`,
};

const openShareWindow = (key: string, url: string, title: string) => {
  const builder = SHARE_URL_BUILDERS[key];
  if (!builder) return;
  window.open(builder(url, title), "_blank", "noopener,noreferrer,width=600,height=500");
};

function ShareFloatGroup({ channels, shareUrl, title }: { channels: Channel[]; shareUrl: string; title: string }) {
  return (
    <FloatButton.Group trigger="hover" type="primary" style={{ right: 24 }} className="hideOnSmallScreen" icon={<ShareAltOutlined />}>
      {channels.map(({ key, Icon, label }) => (
        <Tooltip key={key} title={label} placement="left">
          <FloatButton icon={<Icon />} onClick={() => openShareWindow(key, shareUrl, title)} />
        </Tooltip>
      ))}
    </FloatButton.Group>
  );
}

// === 入口 === //

function ShareButtons({ shareUrl, title, popOver }: ShareButtonsProps) {
  const channels = useMemo(() => buildChannels(shareUrl, title), [shareUrl, title]);

  if (popOver) {
    return (
      <Flex vertical gap={6} style={{ minWidth: 240, maxWidth: 300 }}>
        <span className="comp-sheet-eyebrow">URL</span>
        <CopyLinkBar url={shareUrl} />
        <span className="comp-sheet-eyebrow" style={{ marginTop: 8 }}>
          <Translate id="share.shareTo">分享到</Translate>
        </span>
        <ChannelsGrid channels={channels} shareUrl={shareUrl} title={title} />
      </Flex>
    );
  }

  return <ShareFloatGroup channels={channels} shareUrl={shareUrl} title={title} />;
}

export default ShareButtons;
