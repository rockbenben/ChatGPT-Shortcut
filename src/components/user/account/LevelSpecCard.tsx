import React from "react";
import Translate from "@docusaurus/Translate";
import { Typography, Flex } from "antd";
import { getLevelInfo, LevelName, LevelIcon, type LevelInfo } from "@site/src/components/LevelSystem";

const { Title } = Typography;

/** Level spec card — editorial / mineral specimen style（用户中心左栏，等级 + 升级进度） */
const LevelSpecCard: React.FC<{ sharedCount: number }> = ({ sharedCount }) => {
  const levelInfo = getLevelInfo(sharedCount);
  const progressPercent = levelInfo.next ? Math.min(100, Math.round((sharedCount / levelInfo.next) * 100)) : 100;
  const nextLevelInfo: LevelInfo | null = levelInfo.next ? getLevelInfo(levelInfo.next) : null;

  return (
    <div style={{ position: "relative", paddingTop: 28, borderTop: "1px solid var(--site-color-hairline)" }}>
      {/* level-tinted hairline accent at top */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: -1,
          left: "20%",
          right: "20%",
          height: 1,
          background: `linear-gradient(90deg, transparent, ${levelInfo.accentColor}, transparent)`,
          opacity: 0.7,
        }}
      />

      <Flex vertical align="center" gap={14}>
        {/* Spec line: LEVEL + index */}
        <Flex justify="space-between" align="baseline" style={{ width: "100%" }}>
          <span
            style={{
              fontSize: 10,
              fontFamily: "var(--site-font-mono)",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--site-color-text-tertiary)",
            }}>
            <Translate id="userPage.level.specLabel">LEVEL</Translate>
          </span>
          <span
            style={{
              fontSize: 10,
              fontFamily: "var(--site-font-mono)",
              letterSpacing: "0.08em",
              color: "var(--site-color-text-tertiary)",
              fontVariantNumeric: "tabular-nums",
            }}>
            <span style={{ color: levelInfo.accentColor }}>{String(levelInfo.level).padStart(2, "0")}</span>
            <span style={{ opacity: 0.5 }}> / 05</span>
          </span>
        </Flex>

        {/* Geometric icon with level-tinted radial halo */}
        <div style={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center", padding: 14 }}>
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background: `radial-gradient(circle, ${levelInfo.accentColor}33 0%, transparent 70%)`,
              pointerEvents: "none",
              filter: "blur(2px)",
            }}
          />
          <LevelIcon level={levelInfo.level} size={64} color={levelInfo.accentColor} strokeWidth={1.5} />
        </div>

        {/* Level name — display weight, no emoji */}
        <div style={{ textAlign: "center" }}>
          <Title level={3} style={{ margin: 0, fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.2 }}>
            <LevelName level={levelInfo.level} />
          </Title>
        </div>

        {/* Progress / Max-state */}
        {levelInfo.next ? (
          <Flex vertical gap={8} style={{ width: "100%", marginTop: 6 }}>
            <div style={{ height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
              <div
                style={{
                  height: "100%",
                  width: `${progressPercent}%`,
                  background: levelInfo.accentColor,
                  transition: "width 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                  boxShadow: `0 0 8px ${levelInfo.accentColor}66`,
                }}
              />
            </div>
            <Flex justify="space-between" align="center" style={{ width: "100%" }}>
              <span
                style={{
                  fontSize: 11,
                  fontFamily: "var(--site-font-mono)",
                  fontVariantNumeric: "tabular-nums",
                  color: "var(--ifm-color-content-secondary)",
                  letterSpacing: "0.04em",
                }}>
                {sharedCount} / {levelInfo.next}
              </span>
              <span style={{ fontSize: 11, color: "var(--site-color-text-tertiary)", letterSpacing: "0.04em" }}>
                <Translate id="userPage.level.toNext" values={{ next: <LevelName level={(nextLevelInfo as LevelInfo).level} /> }}>
                  {"距「{next}」"}
                </Translate>
              </span>
            </Flex>
          </Flex>
        ) : (
          <Flex vertical align="center" gap={4} style={{ marginTop: 6 }}>
            <span
              style={{
                fontSize: 10,
                fontFamily: "var(--site-font-mono)",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: levelInfo.accentColor,
                fontWeight: 500,
              }}>
              <Translate id="userPage.level.maxReached">MAX REACHED</Translate>
            </span>
            <span style={{ fontSize: 11, fontFamily: "var(--site-font-mono)", color: "var(--site-color-text-tertiary)", letterSpacing: "0.04em" }}>
              <span style={{ fontVariantNumeric: "tabular-nums" }}>{sharedCount}</span> <Translate id="userPage.level.sharedSuffix">shared</Translate>
            </span>
          </Flex>
        )}
      </Flex>
    </div>
  );
};

export default LevelSpecCard;
