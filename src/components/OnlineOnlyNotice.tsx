import React, { useEffect, useState } from "react";
import Layout from "@theme/Layout";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { Button, Result, Space } from "antd";
import { GlobalOutlined } from "@ant-design/icons";

/**
 * 「这个功能要联网」的落地页 —— 给离线版里那几条依赖后端的路由用。
 *
 * 之前这些页面是 `window.location.replace("https://www.aishort.top/…")` 的裸跳转桩。
 * 换成页内提示的原因有两条，都只在离线版成立：
 *  1. 这个分支是给别人自建 / docker 部署的，很多部署本来就没有外网 —— 自动跳转会把用户
 *     甩到一个连不上的域名，页面直接白掉，而且看不出发生了什么；
 *  2. 有外网的部署里，用户点一下导航就被静默送出自己的站点，没有任何选择余地。
 * 改成提示 + 显式链接后，两种情况都退化得体面：断网时至少看得懂为什么，联网时是用户自己点的。
 *
 * 文案硬编码英文、不走 i18n：新增 key 就要铺 17 个 locale，而这几页只是引流到主站的兜底。
 */

/** 社区、账号这些东西只存在于主站，自建部署也没有自己的后端，所以这里固定指向上游 */
const ONLINE_ORIGIN = "https://www.aishort.top";

interface OnlineOnlyNoticeProps {
  /** 浏览器标签页标题 */
  pageTitle: string;
  title: string;
  description: string;
  /** 主站上的目标路径，以 / 开头，不带 locale 前缀 */
  path: string;
  /** 带上当前的 query / hash——重置密码与 OAuth 回调的令牌都在那里，丢了链接就失效 */
  keepQuery?: boolean;
}

export default function OnlineOnlyNotice({ pageTitle, title, description, path, keepQuery = false }: OnlineOnlyNoticeProps) {
  const { i18n } = useDocusaurusContext();
  const localePrefix = i18n.currentLocale === i18n.defaultLocale ? "" : `/${i18n.currentLocale}`;
  // useBaseUrl("/") 已含当前 locale 前缀（非默认语言的构建 baseUrl 就是 /<locale>/）
  const homeHref = useBaseUrl("/");
  const base = `${ONLINE_ORIGIN}${localePrefix}${path}`;

  // query/hash 只能在客户端拿到。若在渲染期直接读 window，SSR 产出的 href 与首帧不一致，
  // React 会报 hydration mismatch；所以首帧先渲染 base，挂载后再补上。
  const [href, setHref] = useState(base);
  useEffect(() => {
    if (!keepQuery) return;
    setHref(`${base}${window.location.search}${window.location.hash}`);
  }, [base, keepQuery]);

  return (
    <Layout title={pageTitle}>
      <main>
        <Result
          icon={<GlobalOutlined style={{ color: "var(--ifm-color-primary)" }} />}
          title={title}
          subTitle={description}
          extra={
            <Space wrap>
              {/* 两个都用 Button 的 href（渲染成 <a class="ant-btn">）。
                  不用 <Link><Button/></Link>：那会嵌出 <a><button>，既是无效 HTML，
                  读屏也会把它当成「链接里套了个按钮」报两次。 */}
              <Button type="primary" href={href} rel="noopener">
                Open on aishort.top
              </Button>
              <Button href={homeHref}>Back to prompts</Button>
            </Space>
          }
        />
      </main>
    </Layout>
  );
}
