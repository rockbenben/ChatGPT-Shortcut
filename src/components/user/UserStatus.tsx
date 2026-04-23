import React, { useContext, useState, useCallback, useMemo } from "react";
import { Button, Dropdown, Space } from "antd";
import { useViewMode } from "@site/src/contexts/ViewModeContext";
import { UserOutlined, EditOutlined, SettingOutlined, BookOutlined, HeartOutlined } from "@ant-design/icons";
import Translate from "@docusaurus/Translate";
import { AuthContext } from "../AuthContext";
import { useUserPrompt } from "@site/src/hooks/useUserPrompt";
import PromptFormModal from "./modal/PromptFormModal";
import Link from "@docusaurus/Link";

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
          <Translate id="link.myaccount">我的账户</Translate>
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
          <Button icon={<SettingOutlined />} aria-label="Settings" />
        </Dropdown>
      </Space>
      <PromptFormModal
        open={open}
        mode="add"
        loading={loading}
        onSubmit={onFinish}
        onClose={() => {
          if (!loading) setOpen(false);
        }}
      />
    </>
  );
};

export default UserStatus;
