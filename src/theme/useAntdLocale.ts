import { useEffect, useState } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { ANTD_LOCALE } from "@site/src/utils/i18n";

/**
 * antd 语言包按需加载。唯一还漏英文的是 Pagination（showQuickJumper 显示 "Go to __ Page"），
 * 其余组件都已在 callsite 用 <Translate> 覆盖。动态 import 让每种语言各成懒加载 chunk，
 * 运行时只取当前语言那份（~3KB gzip）；首帧到落地之间 Pagination 短暂英文，可接受。
 *
 * ⚠ 单独成文件而不是写在 Root.tsx 里：Root.tsx 是主题分支的定义文件（单色分支是
 * zeroRuntime + 静态抽取，双主题分支是明暗算法切换），跨分支 cherry-pick 必然冲突。
 * 本文件与主题无关，两个分支保持逐字节一致，改动可以干净地 cherry-pick。
 */
export function useAntdLocale() {
  const { i18n } = useDocusaurusContext();
  const [locale, setLocale] = useState<any>(undefined);

  useEffect(() => {
    const name = ANTD_LOCALE[i18n.currentLocale];
    if (!name) return;
    let alive = true;
    // webpackInclude 必须与 ANTD_LOCALE 的 value 一致：不加会把 antd/locale 下全部
    // 75 个语言包各编成一个 chunk（运行时只用 1 个，其余是死文件）
    import(
      /* webpackChunkName: "antd-locale" */
      /* webpackInclude: /(ar_EG|bn_BD|de_DE|en_US|es_ES|fr_FR|hi_IN|id_ID|it_IT|ja_JP|ko_KR|pt_BR|ru_RU|th_TH|tr_TR|vi_VN|zh_CN|zh_TW)\.js$/ */
      `antd/locale/${name}.js`
    )
      .then((mod) => {
        if (alive) setLocale(mod.default);
      })
      .catch(() => {
        // 语言包拉取失败只让 Pagination 退回英文，不该连累整个应用
      });
    return () => {
      alive = false;
    };
  }, [i18n.currentLocale]);

  return locale;
}
