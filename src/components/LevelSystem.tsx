import React from "react";
import Translate from "@docusaurus/Translate";

/**
 * User Level System
 * Calculates user level based on shared prompts count
 */

export interface LevelInfo {
  /** Level number (0-5) */
  level: number;
  /** Emoji icon for the level */
  emoji: string;
  /** Gradient color for visual display */
  color: string;
  /** Tag color for Ant Design Tag component */
  tagColor: string;
  /** Icon identifier */
  icon: string;
  /** Next level threshold, null if max level */
  next: number | null;
}

/**
 * Get level information based on shared prompts count
 */
export function getLevelInfo(sharedCount: number): LevelInfo {
  if (sharedCount >= 50) {
    return {
      level: 5,
      emoji: "💎",
      color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      tagColor: "purple",
      icon: "crown",
      next: null,
    };
  }
  if (sharedCount >= 20) {
    return {
      level: 4,
      emoji: "🏆",
      color: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
      tagColor: "cyan",
      icon: "trophy",
      next: 50,
    };
  }
  if (sharedCount >= 10) {
    return {
      level: 3,
      emoji: "⭐",
      color: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      tagColor: "gold",
      icon: "star",
      next: 20,
    };
  }
  if (sharedCount >= 3) {
    return {
      level: 2,
      emoji: "🚀",
      color: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      tagColor: "blue",
      icon: "rocket",
      next: 10,
    };
  }
  if (sharedCount >= 1) {
    return {
      level: 1,
      emoji: "🌟",
      color: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      tagColor: "orange",
      icon: "fire",
      next: 3,
    };
  }
  return {
    level: 0,
    emoji: "🌱",
    color: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    tagColor: "green",
    icon: "thunderbolt",
    next: 1,
  };
}

/**
 * Calculate progress percentage to next level
 */
export function getProgressPercent(sharedCount: number, nextLevel: number | null): number {
  if (!nextLevel) return 100;
  return Math.min(100, Math.round((sharedCount / nextLevel) * 100));
}

/**
 * Get remaining count to next level
 */
export function getRemainingToNextLevel(sharedCount: number, nextLevel: number | null): number {
  if (!nextLevel) return 0;
  return nextLevel - sharedCount;
}

// ============ React Components ============

interface LevelNameProps {
  level: number;
  emoji?: string;
  showEmoji?: boolean;
}

/**
 * Renders the localized level name based on level number
 */
export function LevelName({ level, emoji, showEmoji = true }: LevelNameProps): React.ReactElement {
  return (
    <>
      {showEmoji && emoji && <>{emoji} </>}
      {level === 5 && <Translate id="level.diamond">钻石传说</Translate>}
      {level === 4 && <Translate id="level.platinum">铂金大师</Translate>}
      {level === 3 && <Translate id="level.gold">黄金专家</Translate>}
      {level === 2 && <Translate id="level.silver">白银精英</Translate>}
      {level === 1 && <Translate id="level.bronze">青铜新星</Translate>}
      {level === 0 && <Translate id="level.newcomer">萌新探索者</Translate>}
    </>
  );
}

interface LevelDescriptionProps {
  level: number;
}

/**
 * Renders the localized level description based on level number
 */
export function LevelDescription({ level }: LevelDescriptionProps): React.ReactElement {
  return (
    <>
      {level === 5 && <Translate id="level.diamond.desc">顶级贡献者，社区传奇！</Translate>}
      {level === 4 && <Translate id="level.platinum.desc">资深专家，影响力非凡！</Translate>}
      {level === 3 && <Translate id="level.gold.desc">经验丰富，值得信赖！</Translate>}
      {level === 2 && <Translate id="level.silver.desc">活跃贡献者，持续成长中！</Translate>}
      {level === 1 && <Translate id="level.bronze.desc">已迈出第一步，继续加油！</Translate>}
      {level === 0 && <Translate id="level.newcomer.desc">分享第一个提示词，开启创作之旅！</Translate>}
    </>
  );
}
