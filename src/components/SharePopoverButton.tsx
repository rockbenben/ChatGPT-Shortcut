import React, { useState } from "react";
import { Button, Popover, Spin } from "antd";
import { ShareAltOutlined } from "@ant-design/icons";
import Translate from "@docusaurus/Translate";
import { retryImport } from "@site/src/utils/lazyRetry";

interface SharePopoverButtonProps {
  shareUrl: string;
  title: string;
  placement?: "topLeft" | "topRight";
  block?: boolean;
}

export function SharePopoverButton({ shareUrl, title, placement = "topRight", block = false }: SharePopoverButtonProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [SharePanel, setSharePanel] = useState<typeof import("./ShareButtons").default>();

  async function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);
    if (!nextOpen || SharePanel || loading) return;

    setLoading(true);
    try {
      const { default: Panel } = await retryImport(() => import("./ShareButtons"));
      setSharePanel(() => Panel);
    } catch (error) {
      console.error("Failed to load sharing controls:", error);
      setOpen(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Popover
      trigger="click"
      placement={placement}
      open={open}
      onOpenChange={handleOpenChange}
      content={SharePanel ? <SharePanel shareUrl={shareUrl} title={title} popOver /> : <Spin size="small" />}>
      <Button icon={<ShareAltOutlined />} className="comp-sheet-share-btn" block={block} aria-expanded={open}>
        <Translate id="action.share">分享</Translate>
      </Button>
    </Popover>
  );
}
