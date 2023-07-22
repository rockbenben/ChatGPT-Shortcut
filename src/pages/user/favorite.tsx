import React from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import { EditOutlined, StarOutlined } from "@ant-design/icons";
import Layout from "@theme/Layout";
import { translate } from "@docusaurus/Translate";
import UserStatus from "../_components/user/UserStatus";
import UserPrompts from "../_components/user/UserPrompts";
import UserFavorite from "../_components/user/UserFavorite";
import { AuthProvider } from "../_components/AuthContext";

const items: TabsProps["items"] = [
  {
    key: "status",
    label: (
      <span>
        <StarOutlined style={{ marginRight: "6px" }} />
        {translate({ message: "收藏" })}
      </span>
    ),
    children: <UserFavorite />,
  },
  {
    key: "prompts",
    label: (
      <span>
        <EditOutlined style={{ marginRight: "6px" }} />
        {translate({ message: "你的提示词" })}
      </span>
    ),
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
        <div className={"text--center"}>
          <UserStatus hideLinks={{ userCenter: false, myFavorite: true }} />
        </div>
        <div style={{ margin: "0 auto", maxWidth: "90%" }}>
          <Tabs defaultActiveKey='status' items={items} onChange={onChange} />
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
