import React from "react";
import classNames from "classnames";
import { ConfigProvider, theme } from "antd";
import type { ReactNode } from "react";

export interface CommentComponentProps {
  /** List of action items rendered below the comment content */
  actions?: ReactNode[];
  /** The element to display as the comment author */
  author?: ReactNode;
  /** The element to display as the comment avatar */
  avatar?: ReactNode;
  /** The main content of the comment */
  content: ReactNode;
  /** Nested comments should be provided as children */
  children?: ReactNode;
  /** Additional style for the comment */
  style?: React.CSSProperties;
  /** A datetime element containing the time to be displayed */
  datetime?: ReactNode;
  /** Additional className */
  className?: string;
}

const CommentComponent: React.FC<CommentComponentProps> = ({ actions, author, avatar, children, className, content, datetime, style }) => {
  const { getPrefixCls, direction } = React.useContext(ConfigProvider.ConfigContext);
  const { token } = theme.useToken();

  const prefixCls = getPrefixCls("comment");

  const avatarDom = avatar ? (
    <div
      className={`${prefixCls}-avatar`}
      style={{
        marginInlineEnd: token.marginXS,
        flexShrink: 0,
      }}>
      {typeof avatar === "string" ? (
        <img
          src={avatar}
          alt="comment-avatar"
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
          }}
        />
      ) : (
        avatar
      )}
    </div>
  ) : null;

  const actionDom = actions?.length ? (
    <ul
      className={`${prefixCls}-actions`}
      style={{
        paddingInlineStart: 0,
        listStyle: "none",
      }}>
      {actions.map((action, index) => (
        <li
          key={`action-${index}`}
          style={{
            display: "inline-block",
            color: token.colorTextSecondary,
            fontSize: token.fontSizeSM,
          }}>
          <span
            style={{
              cursor: "pointer",
              transition: "all 0.3s",
              userSelect: "none",
            }}>
            {action}
          </span>
        </li>
      ))}
    </ul>
  ) : null;

  const authorContent = (author || datetime) && (
    <div
      className={`${prefixCls}-content-author`}
      style={{
        marginBottom: token.marginXXS,
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: token.marginXXS,
      }}>
      {author && (
        <span
          className={`${prefixCls}-content-author-name`}
          style={{
            color: token.colorTextSecondary,
            fontSize: token.fontSize,
            marginInlineEnd: token.marginXS,
          }}>
          {author}
        </span>
      )}
      {datetime && (
        <span
          className={`${prefixCls}-content-author-time`}
          style={{
            color: token.colorTextTertiary,
            fontSize: token.fontSizeSM,
            whiteSpace: "nowrap",
          }}>
          {datetime}
        </span>
      )}
    </div>
  );

  const contentDom = (
    <div
      className={`${prefixCls}-content`}
      style={{
        flex: "1 1 auto",
        minWidth: 0,
        overflow: "hidden",
      }}>
      {authorContent}
      <div
        className={`${prefixCls}-content-detail`}
        style={{
          marginTop: token.marginXXS,
        }}>
        {content}
      </div>
      {actionDom}
    </div>
  );

  const cls = classNames(
    prefixCls,
    {
      [`${prefixCls}-rtl`]: direction === "rtl",
    },
    className
  );

  return (
    <div
      className={cls}
      style={{
        ...style,
        position: "relative",
      }}>
      <div
        className={`${prefixCls}-inner`}
        style={{
          display: "flex",
          padding: `${token.paddingXS}px 0`,
          gap: token.marginXS,
          minWidth: 0,
        }}>
        {avatarDom}
        {contentDom}
      </div>
      {children && (
        <div
          className={`${prefixCls}-nested`}
          style={{
            marginInlineStart: 32,
            marginTop: token.marginXS,
            paddingInlineStart: 8,
          }}>
          {children}
        </div>
      )}
    </div>
  );
};

export default CommentComponent;
