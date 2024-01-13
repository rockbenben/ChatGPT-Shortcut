import React from "react";
import { Tabs } from "antd";
import { EditOutlined, HeartOutlined } from "@ant-design/icons";
import Layout from "@theme/Layout";
import { translate } from "@docusaurus/Translate";
import UserStatus from "../_components/user/UserStatus";
import UserPrompts from "../_components/user/UserPrompts";
import UserFavorite from "../_components/user/UserFavorite";
import { AuthProvider } from "../_components/AuthContext";

function UserBookmark() {
  const items = [
    {
      key: "favorites",
      label: (
        <span>
          <HeartOutlined style={{ marginRight: "5px" }} />
          {translate({ message: "收藏" })}
        </span>
      ),
      children: <UserFavorite />,
    },
    {
      key: "prompts",
      label: (
        <span>
          <EditOutlined style={{ marginRight: "5px" }} />
          {translate({ id: "myprompt", message: "我的提示词" })}
        </span>
      ),
      children: <UserPrompts />,
    },
  ];

  return (
    <Layout>
      <main className="margin-vert--lg" style={{ maxWidth: "1200px", margin: "auto" }}>
        <div className={"text--center"}>
          <UserStatus hideLinks={{ userCenter: false, myFavorite: true }} />
        </div>
        <div style={{ margin: "0 auto", maxWidth: "90%" }}>
          <Tabs defaultActiveKey="favorites" tabBarStyle={{ color: "var(--ifm-font-color-base)" }} items={items} />
        </div>
      </main>
    </Layout>
  );
}

export default function FavoritePage() {
  return (
    <AuthProvider>
      <UserBookmark />
    </AuthProvider>
  );
}
