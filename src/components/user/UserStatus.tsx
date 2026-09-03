import React, { useContext, useState, useCallback, useMemo, Suspense } from "react";
import { Button, Dropdown, Space } from "antd";
import { useViewMode } from "@site/src/contexts/ViewModeContext";
import { UserOutlined, EditOutlined, SettingOutlined, BookOutlined, HeartOutlined } from "@ant-design/icons";
import Translate, { translate } from "@docusaurus/Translate";
import { AuthContext } from "../AuthContext";
import { useUserPrompt } from "@site/src/hooks/useUserPrompt";
import Link from "@docusaurus/Link";
import { lazyWithRetry } from "@site/src/utils/lazyRetry";

// 创建提示词表单（antd Form/Switch/Alert 一整套）只有点「添加提示词」才用；静态 import 会让
// 首页初始 chunk 组多背 ~15 KB gz。open 时才挂载：Modal 在组件内部，常驻渲染会立刻拉 chunk。
const PromptFormModal = lazyWithRetry(() => import("./modal/PromptFormModal"));

const UserStatus = () => {
  const { userAuth } = useContext(AuthContext);
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

  const menuItems = [
    {
      key: "account",
      label: (
        <Link to="/user">
          <Translate id="link.myAccount">我的账户</Translate>
        </Link>
      ),
      icon: <UserOutlined />,
    },
  ];

  return (
    <>
      <Space wrap size="small">
        <Button icon={viewMode === "collection" ? <BookOutlined /> : <HeartOutlined />} onClick={() => setViewMode(viewMode === "collection" ? "explore" : "collection")}>
          <span className="hideOnSmallScreen">{viewMode === "collection" ? <Translate id="nav.explore">提示词库</Translate> : <Translate id="nav.myCollection">我的收藏</Translate>}</span>
        </Button>
        <Button icon={<EditOutlined />} onClick={() => setOpen(true)}>
          <span className="hideOnSmallScreen">
            <Translate id="link.addprompt">添加提示词</Translate>
          </span>
        </Button>
        <Dropdown menu={{ items: menuItems }} placement="bottomRight">
          <Button icon={<SettingOutlined />} aria-label={translate({ id: "link.myAccount", message: "我的账户" })} />
        </Dropdown>
      </Space>
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
