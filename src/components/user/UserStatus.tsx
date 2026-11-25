import React, { useContext, useState, useCallback, useMemo, useEffect, useLayoutEffect, useRef, useId, Suspense } from "react";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import { Button, App, Dropdown, Space, Skeleton, Segmented } from "antd";
import type { MenuProps } from "antd";
import { useViewMode, type ViewMode } from "@site/src/contexts/ViewModeContext";
import { UserOutlined, PlusOutlined, LogoutOutlined, CompassOutlined, SettingOutlined, BookOutlined, HeartOutlined } from "@ant-design/icons";
import Translate, { translate } from "@docusaurus/Translate";
import { AuthContext } from "../AuthContext";
import { persistAuthToken } from "@site/src/api";
import { useUserPrompt } from "@site/src/hooks/useUserPrompt";
import Link from "@docusaurus/Link";
import { ActionLink } from "@site/src/components/ActionLink";
import { LoginModal } from "./LoginModal";
import { lazyWithRetry } from "@site/src/utils/lazyRetry";
import styles from "./UserStatus.module.css";

// 创建提示词表单（antd Form/Switch/Alert 一整套）只有登录用户点「创建提示词」才用；静态 import 会让
// 首页初始 chunk 组多背 ~15 KB gz。open 时才挂载：Modal 在组件内部，常驻渲染会立刻拉 chunk。
const PromptFormModal = lazyWithRetry(() => import("./modal/PromptFormModal"));

// data-auth-ready 必须在 paint 前置位：SPA 从非首页跳进首页时，useEffect（paint 后）会先闪一帧
// boot 骨架再换按钮。useLayoutEffect 在 commit 后、paint 前跑，首帧即正确。SSR 上退化为 useEffect 避免告警。
const useIsoLayoutEffect = ExecutionEnvironment.canUseDOM ? useLayoutEffect : useEffect;

const UserStatus = () => {
  const { userAuth, clearAuth, refreshUserAuth, authLoading } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const accountMenuButton = useRef<HTMLButtonElement>(null);
  const accountMenuId = useId();
  const { modal } = App.useApp();
  const { addPrompt, loading } = useUserPrompt();

  // 使用视图模式上下文
  const { viewMode, setViewMode } = useViewMode();

  // 水合/挂载后给 <html> 加 data-auth-ready：撤掉内联脚本（auth-boot-flag）设的 boot 占位，
  // 露出 React 渲染的真实按钮。此后 data-auth-boot 残留也无害（CSS 仅在 :not([data-auth-ready]) 时生效）。
  useIsoLayoutEffect(() => {
    document.documentElement.setAttribute("data-auth-ready", "");
  }, []);

  useIsoLayoutEffect(() => {
    if (!accountMenuOpen) return;

    // 菜单经 portal 挂载。Esc 在菜单接管焦点前也要能取消聚焦。
    const focusFrame = requestAnimationFrame(() => {
      document.getElementById(accountMenuId)?.querySelector<HTMLElement>('[role="menuitem"]')?.focus({ preventScroll: true });
    });
    const onEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      event.stopPropagation();
      cancelAnimationFrame(focusFrame);
      accountMenuButton.current?.focus({ preventScroll: true });
      setAccountMenuOpen(false);
    };

    window.addEventListener("keydown", onEscape, true);
    return () => {
      cancelAnimationFrame(focusFrame);
      window.removeEventListener("keydown", onEscape, true);
    };
  }, [accountMenuOpen, accountMenuId]);

  const onFinish = useCallback(
    async (values) => {
      const success = await addPrompt(values, () => {
        // 成功后自动切换到"我的收藏"视图
        setViewMode("collection");
      });
      if (success) {
        setOpen(false);
      }
    },
    [addPrompt, setViewMode]
  );

  // 全同步：这些模块（api barrel、utils/cache）已随 useUserPrompt / AuthContext 静态入图，
  // 曾经的 await import() 省不下任何字节，却让清 token 落在 await 之后 ——
  // chunk 加载失败会中断整个函数，导致点了退出却仍是登录态。
  const handleLogout = useCallback(() => {
    if (ExecutionEnvironment.canUseDOM) {
      persistAuthToken(null);
    }
    // 走 clearAuth（纯本地：清会话缓存 + 降登录态）；在飞的 GET /myspace 由写回前的
    // token 比对作废——上面已 persistAuthToken(null)，旧响应回来时 token 失配，不会把
    // 登录态连同 30 天 TTL 的缓存快照写回去。
    clearAuth();
    window.location.reload();
  }, [clearAuth]);

  const menuItems = useMemo<MenuProps["items"]>(
    () =>
      [
        {
          key: "account",
          label: (
            <Link to="/user" tabIndex={-1}>
              <Translate id="link.myAccount">我的账户</Translate>
            </Link>
          ),
          icon: <UserOutlined />,
          onClick: ({ domEvent }) => {
            // 键盘激活或点击图标时，将操作交给 Docusaurus Link 处理本地化导航。
            if (domEvent.target instanceof Element && domEvent.target.closest("a")) return;
            domEvent.currentTarget.querySelector("a")?.click();
          },
        },
        {
          type: "divider" as const,
        },
        {
          key: "logout",
          label: <Translate id="button.logout">退出登录</Translate>,
          icon: <LogoutOutlined />,
          danger: true,
          onClick: () => {
            modal.confirm({
              title: <Translate id="message.logout.confirm.title">确认退出</Translate>,
              content: <Translate id="message.logout.confirm.content">确定要退出登录吗？</Translate>,
              icon: null,
              width: 400,
              onOk: handleLogout,
              okText: <Translate id="button.confirm">确认</Translate>,
              cancelText: <Translate id="action.cancel">取消</Translate>,
              centered: true,
            });
          },
        },
      ],
    [modal, handleLogout],
  );

  const loggedInButtons = useMemo(
    () => (
      <div className={styles.loggedInBar}>
        <Segmented<ViewMode>
          value={viewMode}
          onChange={(value) => setViewMode(value)}
          options={[
            {
              value: "explore",
              label: (
                <span className={styles.segLabel}>
                  <BookOutlined className={styles.segIcon} />
                  <span className={styles.segText}>
                    <Translate id="nav.explore">提示词库</Translate>
                  </span>
                </span>
              ),
            },
            {
              value: "collection",
              label: (
                <span className={styles.segLabel}>
                  <HeartOutlined className={styles.segIcon} />
                  <span className={styles.segText}>
                    <Translate id="nav.myCollection">我的收藏</Translate>
                  </span>
                </span>
              ),
            },
          ]}
        />
        <div className={styles.utilityGroup}>
          <Button
            icon={<PlusOutlined />}
            className={styles.createBtn}
            aria-label={translate({ id: "link.addprompt", message: "创建提示词" })}
            onClick={() => setOpen(true)}>
            <span className={styles.createLabel}>
              <Translate id="link.addprompt">创建提示词</Translate>
            </span>
          </Button>
          <Dropdown
            menu={{
              items: menuItems,
              id: accountMenuId,
              "aria-label": translate({ id: "link.myAccount", message: "我的账户" }),
              onKeyDown: (event) => {
                if (event.key === "Tab") {
                  event.stopPropagation();
                  accountMenuButton.current?.focus({ preventScroll: true });
                  setAccountMenuOpen(false);
                  return;
                }
                const target = event.target;
                if (event.key !== " " || !(target instanceof HTMLElement) || target.getAttribute("role") !== "menuitem") return;
                event.preventDefault();
                target.click();
              },
            }}
            placement="bottomRight"
            trigger={["click"]}
            open={accountMenuOpen}
            onOpenChange={setAccountMenuOpen}
            destroyOnHidden>
            <Button
              ref={accountMenuButton}
              icon={<SettingOutlined />}
              aria-label={translate({ id: "link.myAccount", message: "我的账户" })}
              aria-haspopup="menu"
              aria-expanded={accountMenuOpen}
              aria-controls={accountMenuOpen ? accountMenuId : undefined}
              onKeyDown={(event) => {
                if (event.key !== "ArrowDown" || accountMenuOpen) return;
                event.preventDefault();
                setAccountMenuOpen(true);
              }}
            />
          </Dropdown>
        </div>
      </div>
    ),
    [menuItems, viewMode, setViewMode, accountMenuOpen, accountMenuId]
  );

  const loggedOutButtons = useMemo(
    () => (
      <div className={styles.loggedOutBar}>
        <ActionLink to="/community-prompts" icon={<CompassOutlined />}>
          <Translate id="link.communityPrompts">社区提示词</Translate>
        </ActionLink>
        <Button type="primary" size="middle" icon={<UserOutlined />} onClick={() => setOpen(true)}>
          <Translate id="button.login">登录</Translate>
        </Button>
      </div>
    ),
    []
  );

  const authSkeleton = (
    <Space wrap size="small" align="center">
      <Skeleton.Button active size="medium" style={{ width: 112 }} />
      <Skeleton.Button active size="medium" style={{ width: 80 }} />
    </Space>
  );

  if (authLoading) {
    return authSkeleton;
  }

  return (
    <>
      {/* boot 占位：仅「已登录且尚未水合」时由 CSS 显示（见 custom.css + auth-boot-flag 内联脚本），
          避免发版冷缓存下已登录用户首屏几秒看到 SSR 静态 HTML 里的「登录」CTA。
          display:contents 包装，不产生布局盒子（零 CLS）。 */}
      <div className="userstatus-boot" aria-hidden>
        {authSkeleton}
      </div>
      <div className="userstatus-live">
        {userAuth ? (
          <>
            {loggedInButtons}
            {open && (
              <Suspense fallback={null}>
                <PromptFormModal
                  open={open}
                  mode="add"
                  loading={loading}
                  onSubmit={onFinish}
                  onClose={() => {
                    if (!loading) setOpen(false);
                  }}
                />
              </Suspense>
            )}
          </>
        ) : (
          <>
            {loggedOutButtons}
            <LoginModal open={open} onCancel={() => setOpen(false)} />
          </>
        )}
      </div>
    </>
  );
};

export default UserStatus;
