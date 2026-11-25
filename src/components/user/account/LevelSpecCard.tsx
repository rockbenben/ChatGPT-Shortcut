import React from "react";
import Translate from "@docusaurus/Translate";
import { Typography, Flex } from "antd";
import { getLevelInfo, LevelName, LevelIcon, MAX_LEVEL, type LevelInfo } from "@site/src/components/LevelSystem";

const { Title } = Typography;

/** Level spec card — calm workbench specimen card（用户中心左栏，等级 + 升级进度） */
const LevelSpecCard: React.FC<{ sharedCount: number }> = ({ sharedCount }) => {
  const levelInfo = getLevelInfo(sharedCount);
  const progressPercent = levelInfo.next ? Math.min(100, Math.round((sharedCount / levelInfo.next) * 100)) : 100;
  const nextLevelInfo: LevelInfo | null = levelInfo.next ? getLevelInfo(levelInfo.next) : null;

  return (
    <div
      style={{
        position: "relative",
        padding: "20px 16px",
        borderRadius: 10,
        background: "var(--site-color-preview-bg)",
        border: "1px solid var(--site-color-hairline)",
      }}>
      <Flex vertical align="center" gap={12}>
        {/* Spec line: LEVEL + index */}
        <Flex justify="space-between" align="baseline" style={{ width: "100%" }}>
          <span
            style={{
              fontSize: 11.5,
              fontWeight: 500,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "var(--site-color-text-tertiary)",
            }}>
            <Translate id="userPage.level.specLabel">LEVEL</Translate>
          </span>
          <span
            style={{
              fontSize: 11.5,
              fontFamily: "var(--site-font-mono)",
              letterSpacing: "0.04em",
              color: "var(--site-color-text-tertiary)",
              fontVariantNumeric: "tabular-nums",
            }}>
            <span style={{ color: levelInfo.accentColor, fontWeight: 600 }}>{String(levelInfo.level).padStart(2, "0")}</span>
            <span style={{ opacity: 0.5 }}> / {String(MAX_LEVEL).padStart(2, "0")}</span>
          </span>
        </Flex>

        {/* Geometric icon with level-tinted radial halo */}
        <div style={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center", padding: 12, color: levelInfo.accentColor }}>
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background: `radial-gradient(circle, color-mix(in srgb, ${levelInfo.accentColor} 20%, transparent) 0%, transparent 70%)`,
              pointerEvents: "none",
              filter: "blur(2px)",
            }}
          />
          <LevelIcon level={levelInfo.level} size={60} strokeWidth={1.5} />
        </div>

        {/* Level name */}
        <div style={{ textAlign: "center" }}>
          <Title level={3} style={{ margin: 0, fontSize: 20, fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.25 }}>
            <LevelName level={levelInfo.level} />
          </Title>
        </div>

        {/* Progress / Max-state */}
        {levelInfo.next ? (
          <Flex vertical gap={8} style={{ width: "100%", marginTop: 4 }}>
            <div style={{ height: 6, background: "var(--site-color-hairline)", borderRadius: 999, overflow: "hidden" }}>
              <div
                style={{
                  height: "100%",
                  width: `${progressPercent}%`,
                  borderRadius: 999,
                  background: levelInfo.accentColor,
                  transition: "width 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              />
            </div>
            <Flex justify="space-between" align="center" style={{ width: "100%" }}>
              <span
                style={{
                  fontSize: 11.5,
                  fontFamily: "var(--site-font-mono)",
                  fontVariantNumeric: "tabular-nums",
                  color: "var(--ifm-color-content-secondary)",
                }}>
                {sharedCount} / {levelInfo.next}
              </span>
              <span style={{ fontSize: 11.5, color: "var(--site-color-text-tertiary)" }}>
                <Translate id="userPage.level.toNext" values={{ next: <LevelName level={(nextLevelInfo as LevelInfo).level} /> }}>
                  {"距「{next}」"}
                </Translate>
              </span>
            </Flex>
          </Flex>
        ) : (
          <Flex vertical align="center" gap={4} style={{ marginTop: 4 }}>
            <span
              style={{
                fontSize: 11,
                fontFamily: "var(--site-font-mono)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: levelInfo.accentColor,
                fontWeight: 600,
              }}>
              <Translate id="userPage.level.maxReached">MAX REACHED</Translate>
            </span>
            <span style={{ fontSize: 11.5, fontFamily: "var(--site-font-mono)", color: "var(--site-color-text-tertiary)" }}>
              <span style={{ fontVariantNumeric: "tabular-nums" }}>{sharedCount}</span> <Translate id="userPage.level.sharedSuffix">shared</Translate>
            </span>
          </Flex>
        )}
      </Flex>
    </div>
  );
};

export default LevelSpecCard;
