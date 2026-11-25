import React, { useState, useCallback, Suspense } from "react";
import { Button, Dropdown, type MenuProps } from "antd";
import { useViewMode } from "@site/src/contexts/ViewModeContext";
import { UserOutlined, PlusOutlined, SettingOutlined, BookOutlined, HeartOutlined } from "@ant-design/icons";
import Translate, { translate } from "@docusaurus/Translate";
import { useUserPrompt } from "@site/src/hooks/useUserPrompt";
import Link from "@docusaurus/Link";
import { lazyWithRetry } from "@site/src/utils/lazyRetry";
import styles from "./UserStatus.module.css";

// 创建提示词表单（antd Form/Switch/Alert 一整套）只有点「添加提示词」才用；静态 import 会让
// 首页初始 chunk 组多背 ~15 KB gz。open 时才挂载：Modal 在组件内部，常驻渲染会立刻拉 chunk。
const PromptFormModal = lazyWithRetry(() => import("./modal/PromptFormModal"));

const UserStatus = () => {
  const [open, setOpen] = useState(false);
  const { addPrompt, loading } = useUserPrompt();

  const { viewMode, setViewMode } = useViewMode();

  const onFinish = useCallback(
    async (values) => {
      const success = await addPrompt(values, () => {
        setViewMode("collection");
      });
      if (success) {
        setOpen(false);
      }
    },
    [addPrompt, setViewMode]
  );

  const menuItems: MenuProps["items"] = [
    {
      key: "account",
      label: (
        <Link to="/user" tabIndex={-1}>
          <Translate id="link.myAccount">我的账户</Translate>
        </Link>
      ),
      icon: <UserOutlined />,
      onClick: ({ domEvent }) => {
        if (domEvent.target instanceof Element && domEvent.target.closest("a")) return;
        domEvent.currentTarget.querySelector("a")?.click();
      },
    },
  ];

  return (
    <>
      <div className={styles.localBar}>
        <Button icon={viewMode === "collection" ? <BookOutlined /> : <HeartOutlined />} onClick={() => setViewMode(viewMode === "collection" ? "explore" : "collection")}>
          <span>{viewMode === "collection" ? <Translate id="nav.explore">提示词库</Translate> : <Translate id="nav.myCollection">我的收藏</Translate>}</span>
        </Button>
        <div className={styles.utilityGroup}>
          <Button
            type="primary"
            className={styles.createBtn}
            icon={<PlusOutlined />}
            aria-label={translate({ id: "link.addprompt", message: "创建提示词" })}
            onClick={() => setOpen(true)}>
            <span className={styles.createLabel}>
              <Translate id="link.addprompt">创建提示词</Translate>
            </span>
          </Button>
          <Dropdown menu={{ items: menuItems }} placement="bottomRight" trigger={["click"]} autoFocus>
            <Button icon={<SettingOutlined />} aria-haspopup="menu" aria-label={translate({ id: "link.myAccount", message: "我的账户" })} />
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

export default UserStatus;
