/**
 * Swizzled NavbarItem/ComponentTypes — 只加一个键，其余沿用上游。
 *
 * 用 @theme-original 而不是手抄上游整张表：webpack 会为每个上游主题组件同时注册
 * @theme/X 和指向原始实现的 @theme-original/X，所以这里展开原表再补一项，上游以后
 * 新增内建 navbar item 类型会自动可见，不会因为我们抄漏而报
 * "No NavbarItem component found for type ..."。
 *
 * 自定义 item 的 type 必须以 custom- 开头（theme-classic 的 Joi 只放行该前缀）；
 * dropdown 子项也走这张表，所以 365 那项能放在「应用工具」下拉里。
 */
import upstreamComponentTypes from "@theme-original/NavbarItem/ComponentTypes";
import Hub365NavbarItem from "@site/src/theme/NavbarItem/Hub365NavbarItem";

import type { ComponentTypesObject } from "@theme/NavbarItem/ComponentTypes";

const ComponentTypes: ComponentTypesObject = {
  ...upstreamComponentTypes,
  "custom-hub365": Hub365NavbarItem,
};

export default ComponentTypes;
