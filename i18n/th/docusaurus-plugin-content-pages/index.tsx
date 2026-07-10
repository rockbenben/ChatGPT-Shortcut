import HomePage from "@site/src/components/HomePage";

// 静态导入必须留在本文件（而非共享组件）：每个 locale 独立构建，
// 这样各语言首页才只打包自己的 JSON —— 首页按 locale 拆页的初衷
import defaultFavorData from "@site/src/data/default/favor_th.json";
import defaultOtherData from "@site/src/data/default/other_th.json";

export default function Home() {
  return <HomePage defaultFavorData={defaultFavorData} defaultOtherData={defaultOtherData} />;
}
