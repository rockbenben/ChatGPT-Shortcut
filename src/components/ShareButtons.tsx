import React, { useState, useEffect, useCallback } from "react";
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
import Translate, { translate } from "@docusaurus/Translate";
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

// Channel 定义：视觉用 antd outlined icon + label；分享链接由下方 SHARE_URL_BUILDERS 构造。
// 两条渲染路径（浮动按钮组 / 面板网格）共用同一份定义，避免渠道列表两处漂移。
type Channel = {
  key: keyof typeof SHARE_URL_BUILDERS;
  Icon: React.ElementType;
  label: string;
};

const CHANNELS: Channel[] = [
  { key: "x", Icon: XOutlined, label: "X" },
  { key: "tg", Icon: SendOutlined, label: "Telegram" },
  { key: "linkedin", Icon: LinkedinOutlined, label: "LinkedIn" },
  { key: "wa", Icon: WhatsAppOutlined, label: "WhatsApp" },
  { key: "facebook", Icon: FacebookOutlined, label: "Facebook" },
  { key: "reddit", Icon: RedditOutlined, label: "Reddit" },
  { key: "weibo", Icon: WeiboOutlined, label: "Weibo" },
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
        aria-label={translate({ id: "share.copy", message: "复制" })}
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

function ChannelsGrid({ shareUrl, title }: { shareUrl: string; title: string }) {
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
      {CHANNELS.map(({ key, Icon, label }) => (
        <button
          key={key}
          type="button"
          onClick={() => openShareWindow(key, shareUrl, title)}
          className="share-channel-btn"
          // 图标按钮的唯一可访问名，必须走 translate()：全站 18 语言，硬编码英文会让其余 17 个
          // locale（含 RTL 阿拉伯语）的读屏用户听到英文，而同一面板的 share.shareTo 是翻译过的。
          // id/message 必须是字面量，write-translations 才扫得到。
          aria-label={translate({ id: "share.shareOn", message: "分享到 {channel}" }, { channel: label })}>
          <Icon />
          <span style={channelLabelStyle}>{label}</span>
        </button>
      ))}
    </div>
  );
}

// === 分享链接构造 === //

const SHARE_URL_BUILDERS = {
  x: (u: string, t: string) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(u)}&text=${encodeURIComponent(t)}`,
  tg: (u: string, t: string) => `https://t.me/share/url?url=${encodeURIComponent(u)}&text=${encodeURIComponent(t)}`,
  linkedin: (u: string) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(u)}`,
  wa: (u: string, t: string) => `https://wa.me/?text=${encodeURIComponent(`${t} ${u}`)}`,
  facebook: (u: string, t: string) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(u)}&hashtag=${encodeURIComponent(t)}`,
  reddit: (u: string, t: string) => `https://www.reddit.com/submit?url=${encodeURIComponent(u)}&title=${encodeURIComponent(t)}`,
  weibo: (u: string, t: string) => `https://service.weibo.com/share/share.php?url=${encodeURIComponent(u)}&title=${encodeURIComponent(t)}`,
};

const openShareWindow = (key: Channel["key"], url: string, title: string) => {
  window.open(SHARE_URL_BUILDERS[key](url, title), "_blank", "noopener,noreferrer,width=600,height=500");
};

// === popOver=false 子组件（FloatButton.Group） === //

function ShareFloatGroup({ shareUrl, title }: { shareUrl: string; title: string }) {
  return (
    <FloatButton.Group
      trigger="hover"
      type="primary"
      style={{ right: 24 }}
      className="hideOnSmallScreen"
      icon={<ShareAltOutlined />}
      // 不给名字的话读屏念的是 @ant-design/icons 的英文图标名 "share-alt"
      aria-label={translate({ id: "share.shareTo", message: "分享到" })}>
      {CHANNELS.map(({ key, Icon, label }) => (
        <Tooltip key={key} title={label} placement="left">
          <FloatButton
            icon={<Icon />}
            aria-label={translate({ id: "share.shareOn", message: "分享到 {channel}" }, { channel: label })}
            onClick={() => openShareWindow(key, shareUrl, title)}
          />
        </Tooltip>
      ))}
    </FloatButton.Group>
  );
}

// === 入口 === //

function ShareButtons({ shareUrl, title, popOver }: ShareButtonsProps) {
  if (popOver) {
    return (
      <Flex vertical gap={6} style={{ minWidth: 240, maxWidth: 300 }}>
        <span className="comp-sheet-eyebrow">URL</span>
        <CopyLinkBar url={shareUrl} />
        <span className="comp-sheet-eyebrow" style={{ marginTop: 8 }}>
          <Translate id="share.shareTo">分享到</Translate>
        </span>
        <ChannelsGrid shareUrl={shareUrl} title={title} />
      </Flex>
    );
  }

  return <ShareFloatGroup shareUrl={shareUrl} title={title} />;
}

export default ShareButtons;
