import React from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import Layout from "@theme/Layout";
import { translate } from "@docusaurus/Translate";
import UserStatus from "../_components/user/UserStatus";
import UserPrompts from "../_components/user/UserPrompts";
import UserFavorite from "../_components/user/UserFavorite";
import { AuthProvider } from "../_components/AuthContext";

const items: TabsProps["items"] = [
  {
    key: "status",
    label: translate({ message: "收藏" }),
    children: <UserFavorite />,
  },
  {
    key: "prompts",
    label: translate({ message: "你的提示词" }),
    children: <UserPrompts />,
  },
];

function UserBookmark() {
  const onChange = (key: string) => {
    console.log(key);
  };

  return (
    <Layout>
      <main
        className='margin-vert--lg'
        style={{ maxWidth: "1200px", margin: "auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}>
          <UserStatus hideLinks={{ userCenter: false, myFavorite: true }} />
        </div>
        <Tabs defaultActiveKey='status' items={items} onChange={onChange} />
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
