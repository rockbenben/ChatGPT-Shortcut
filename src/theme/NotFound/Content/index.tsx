/**
 * 404 正文改写。
 *
 * 原版是左对齐的三段文字，没有任何出口：第三段（theme.NotFound.p2）还让访客
 * 「联系把你链过来的那个站点的所有者」——站内失效链接占多数时这句是无效指路。
 * 这里换成全站统一的 <EmptyState>：说清发生了什么 + 给两个能立刻点的去处。
 *
 * 文案复用已在 18 个 locale 翻译好的 id（theme.NotFound.* / link.home /
 * showcase.header.button），不新增翻译键，避免非中文 locale 回退成中文。
 */
import React, { type ReactNode } from "react";
import clsx from "clsx";
import Translate from "@docusaurus/Translate";
import { Space } from "antd";
import { HomeOutlined, CompassOutlined } from "@ant-design/icons";
import { EmptyState } from "@site/src/components/EmptyState";
import { ActionLink } from "@site/src/components/ActionLink";

export default function NotFoundContent({ className }: { className?: string }): ReactNode {
  return (
    <main className={clsx("container margin-vert--md", className)}>
      <EmptyState
        fullPage
        icon={<CompassOutlined />}
        title={
          <Translate id="theme.NotFound.title" description="The title of the 404 page">
            Page Not Found
          </Translate>
        }
        description={
          <Translate id="theme.NotFound.p1" description="The first paragraph of the 404 page">
            We could not find what you were looking for.
          </Translate>
        }
        action={
          <Space wrap size="middle">
            <ActionLink to="/" variant="primary" icon={<HomeOutlined />}>
              <Translate id="link.home">首页</Translate>
            </ActionLink>
            <ActionLink to="/community-prompts" icon={<CompassOutlined />}>
              <Translate id="link.communityPrompts">社区提示词</Translate>
            </ActionLink>
          </Space>
        }
      />
    </main>
  );
}
