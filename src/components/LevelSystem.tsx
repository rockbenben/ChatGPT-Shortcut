import React from "react";
import Translate from "@docusaurus/Translate";

/**
 * User Level System (10-tier)
 *
 * 设计语言：Editorial spec card / 矿物标本卡。
 *
 * 名称体系：
 *   L0 萌新探索者（onboarding 友好的特异点）
 *   L1-L5 金属：青铜 / 白银 / 黄金 / 铂金 / 钻石
 *   L6-L8 宝石：蓝宝石 / 红宝石 / 翡翠
 *   L9 星辉（破矿物，进 cosmic 域，标记顶级）
 *
 * 视觉累积（LevelIcon）：每升一级新增一种几何元素，让攀登有视觉节拍感
 *   L0-L5: outer polygon 边数 +1 (3→8)，L3+ 增加 1 个内嵌副多边形
 *   L6: 新增第 2 个内嵌副多边形（嵌套深度 +1）
 *   L7: + 中心 dot（"宝石之眼"）
 *   L8: + 粗描边（厚重感）
 *   L9: + 8 条径向 rays（星辉辐射，破出 polygon 的物质形态）
 *
 * 阈值曲线: 0 / 1 / 3 / 8 / 18 / 35 / 60 / 100 / 160 / 260
 *   各级跨距 1,2,5,10,17,25,40,60,100，比率 ~1.6-2x，曲线平滑递增不陡跳。
 *   L9 (260) 定位为"传奇" tier，预期 <0.1% 用户达到。
 */

export interface LevelInfo {
  /** Level number (0-9) */
  level: number;
  /** Single muted color for icon, halo, accent line, progress fill, mono spec id */
  accentColor: string;
  /** Next level threshold, null if max level */
  next: number | null;
}

/** 10 个级别的"shared prompts"阈值——用于 progress / 进度计算 */
export const LEVEL_THRESHOLDS = [0, 1, 3, 8, 18, 35, 60, 100, 160, 260];

/**
 * Get level information based on shared prompts count
 * 等级保留各自宝石色（语义化的成就梯度，用户确认不并入单 accent 体系）
 */
export function getLevelInfo(sharedCount: number): LevelInfo {
  if (sharedCount >= 260) return { level: 9, accentColor: "#f0d896", next: null }; // 星辉——warm starlight gold
  if (sharedCount >= 160) return { level: 8, accentColor: "#5fb088", next: 260 }; // 翡翠——deep emerald green
  if (sharedCount >= 100) return { level: 7, accentColor: "#d97a8e", next: 160 }; // 红宝石——rose ruby
  if (sharedCount >= 60) return { level: 6, accentColor: "#6f95d0", next: 100 }; // 蓝宝石——cool sapphire blue
  if (sharedCount >= 35) return { level: 5, accentColor: "#cdb8ff", next: 60 }; // 钻石——pale violet prism
  if (sharedCount >= 18) return { level: 4, accentColor: "#b0c8d8", next: 35 }; // 铂金——cool light platinum
  if (sharedCount >= 8) return { level: 3, accentColor: "#d8a55a", next: 18 }; // 黄金——warm muted gold
  if (sharedCount >= 3) return { level: 2, accentColor: "#a8b8c5", next: 8 }; // 白银——cool silver
  if (sharedCount >= 1) return { level: 1, accentColor: "#c8956b", next: 3 }; // 青铜——warm bronze
  return { level: 0, accentColor: "#94a3a8", next: 1 }; // 萌新——neutral graphite
}

// ============ React Components ============

interface LevelIconProps {
  /** Level 0-9 */
  level: number;
  /** Box size in px (square viewport) */
  size?: number;
  /** Stroke color, defaults to currentColor */
  color?: string;
  /** Stroke width — scaled with size if not provided */
  strokeWidth?: number;
}

/**
 * 几何等级图标——视觉复杂度随级别累积。
 * L0 三角 → L5 八边形+1 inner → L6 +2 inner → L7 +center dot → L8 +thick stroke → L9 +radial rays
 *
 * 跨平台单色 stroke 渲染（不依赖 emoji 字体），配 accentColor 干净有矿物标本感。
 */
export function LevelIcon({ level, size = 48, color = "currentColor", strokeWidth }: LevelIconProps): React.ReactElement {
  const baseSw = strokeWidth ?? Math.max(1, size / 32);
  // 小 size（chip / 内联）退化复杂度：只画 outer polygon + 颜色，避免密集糊成一团
  const isMicro = size < 20;
  const sides = Math.min(8, Math.max(3, level + 3));
  const innerCount = isMicro ? 0 : level >= 6 ? 2 : level >= 3 ? 1 : 0;
  const showCenterDot = !isMicro && level >= 7;
  const isThickStroke = !isMicro && level >= 8;
  const showRays = !isMicro && level >= 9;

  const outerSw = baseSw * (isThickStroke ? 1.4 : 1.0);
  // L9 polygon 略缩给 rays 让空间，scale 调到 0.82 让"主体收缩感"更轻微
  const polygonScale = showRays ? 0.82 : 1.0;
  const radius = ((size - baseSw * 2) / 2) * polygonScale;
  const center = size / 2;

  const polygon = (r: number, rotate = 0) =>
    Array.from({ length: sides }, (_, i) => {
      const angle = (i / sides) * Math.PI * 2 - Math.PI / 2 + rotate;
      return `${(center + r * Math.cos(angle)).toFixed(2)},${(center + r * Math.sin(angle)).toFixed(2)}`;
    }).join(" ");

  const innerPolygons = Array.from({ length: innerCount }, (_, i) => {
    const ratio = 0.62 - i * 0.22; // 0.62, 0.40
    const rot = (Math.PI / sides) * (i + 1);
    return { points: polygon(radius * ratio, rot), opacity: 0.55 - i * 0.12 };
  });

  // L9 rays: 落在 polygon 边的 midpoint 法线上（halo 辐射感），不在顶点上（避免 dagger 尖刺感）
  const rays = showRays
    ? Array.from({ length: sides }, (_, i) => {
        const angle = (i / sides) * Math.PI * 2 - Math.PI / 2 + Math.PI / sides;
        const rEdge = radius * Math.cos(Math.PI / sides);
        const startR = rEdge * 1.06;
        const endR = size / 2 - baseSw / 2;
        return {
          x1: (center + startR * Math.cos(angle)).toFixed(2),
          y1: (center + startR * Math.sin(angle)).toFixed(2),
          x2: (center + endR * Math.cos(angle)).toFixed(2),
          y2: (center + endR * Math.sin(angle)).toFixed(2),
        };
      })
    : [];

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden focusable="false" style={{ display: "block" }}>
      <polygon points={polygon(radius)} fill="none" stroke={color} strokeWidth={outerSw} strokeLinejoin="round" strokeLinecap="round" />
      {innerPolygons.map((p, i) => (
        <polygon
          key={i}
          points={p.points}
          fill="none"
          stroke={color}
          strokeWidth={baseSw * 0.7}
          strokeLinejoin="round"
          strokeLinecap="round"
          opacity={p.opacity}
        />
      ))}
      {showCenterDot && <circle cx={center} cy={center} r={baseSw * 1.4} fill={color} />}
      {rays.map((r, i) => (
        <line key={i} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2} stroke={color} strokeWidth={baseSw * 0.7} strokeLinecap="round" opacity={0.7} />
      ))}
    </svg>
  );
}

interface LevelNameProps {
  level: number;
}

/**
 * Renders the localized level name based on level number
 */
export function LevelName({ level }: LevelNameProps): React.ReactElement {
  return (
    <>
      {level === 9 && <Translate id="level.stardust">星辉</Translate>}
      {level === 8 && <Translate id="level.emerald">翡翠</Translate>}
      {level === 7 && <Translate id="level.ruby">红宝石</Translate>}
      {level === 6 && <Translate id="level.sapphire">蓝宝石</Translate>}
      {level === 5 && <Translate id="level.diamond">钻石</Translate>}
      {level === 4 && <Translate id="level.platinum">铂金</Translate>}
      {level === 3 && <Translate id="level.gold">黄金</Translate>}
      {level === 2 && <Translate id="level.silver">白银</Translate>}
      {level === 1 && <Translate id="level.bronze">青铜</Translate>}
      {level === 0 && <Translate id="level.newcomer">萌新探索者</Translate>}
    </>
  );
}
