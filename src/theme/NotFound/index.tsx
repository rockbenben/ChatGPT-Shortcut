/**
 * 包裹原版 404 页，注入 noindex。
 *
 * EdgeOne Pages 会用 build/404.html 以真正的 HTTP 404 状态响应未匹配路由，
 * 但 JS 渲染型爬虫仍可能瞬时渲染该页并顺着导航栏链接抓取。加 noindex,nofollow
 * 作为纵深防御：明确告诉搜索引擎不要索引、不要跟随 404 页上的任何链接，
 * 配合切语言下拉的前缀归一化，杜绝 /th/es/zh-Hant//th 这类脏 URL 进入索引。
 */
import React, {type ReactNode} from "react";
import Head from "@docusaurus/Head";
import NotFound from "@theme-original/NotFound";
import type NotFoundType from "@theme/NotFound";
import type {WrapperProps} from "@docusaurus/types";

type Props = WrapperProps<typeof NotFoundType>;

export default function NotFoundWrapper(props: Props): ReactNode {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <NotFound {...props} />
    </>
  );
}
