import React, { useContext, useState, useCallback, useMemo, useEffect, useLayoutEffect, useRef, useId, Suspense } from "react";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import { Button, Dropdown, Segmented } from "antd";
import type { MenuProps } from "antd";
import { useViewMode, type ViewMode } from "@site/src/contexts/ViewModeContext";
import { useAppFeedback } from "@site/src/contexts/AppFeedbackContext";
import { UserOutlined, PlusOutlined, LogoutOutlined, SettingOutlined, BookOutlined, HeartOutlined } from "@ant-design/icons";
import Translate, { translate } from "@docusaurus/Translate";
import { AuthContext } from "../AuthContext";
import { persistAuthToken } from "@site/src/api/token";
import { useUserPrompt } from "@site/src/hooks/useUserPrompt";
import Link from "@docusaurus/Link";
import { lazyWithRetry } from "@site/src/utils/lazyRetry";
import styles from "./UserStatus.module.css";

// 创建提示词表单（antd Form/Switch/Alert 一整套）只有登录用户点「创建提示词」才用；静态 import 会让
// 首页初始 chunk 组多背 ~15 KB gz。open 时才挂载：Modal 在组件内部，常驻渲染会立刻拉 chunk。
const PromptFormModal = lazyWithRetry(() => import("./modal/PromptFormModal"));

const useIsoLayoutEffect = ExecutionEnvironment.canUseDOM ? useLayoutEffect : useEffect;

const LoggedInUserStatus: React.FC = () => {
  const { clearAuth } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const accountMenuButton = useRef<HTMLButtonElement>(null);
  const accountMenuId = useId();
  const { modal } = useAppFeedback();
  const { addPrompt, loading } = useUserPrompt();
  const { viewMode, setViewMode } = useViewMode();

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
    [addPrompt, setViewMode],
  );

  // 全同步：清 token 后立即清除会话缓存并重载，避免异步 chunk 失败中断退出流程
  const handleLogout = useCallback(() => {
    if (ExecutionEnvironment.canUseDOM) {
      persistAuthToken(null);
    }
    clearAuth();
    window.location.reload();
  }, [clearAuth]);

  const menuItems = useMemo<MenuProps["items"]>(
    () => [
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
          modal.confirm("logout", {
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

  return (
    <>
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
  );
};

export default LoggedInUserStatus;
