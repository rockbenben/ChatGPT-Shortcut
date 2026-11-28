import React, { Suspense } from "react";
import { lazyOptional } from "@site/src/utils/lazyRetry";

const AdComponent = lazyOptional(() => import("./AdComponent"));

export function TransverseAdSlot({ style }: { style?: React.CSSProperties }) {
  // 广告未填充、脚本失败或分块加载失败时，保留已经绘制的空间。
  return (
    <div className="ad-slot-transverse" style={style}>
      <Suspense fallback={null}>
        <AdComponent type="transverse" />
      </Suspense>
    </div>
  );
}
