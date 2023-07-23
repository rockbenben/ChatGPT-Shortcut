import React, { useState } from "react";
import { Tabs } from "antd";
import { EditOutlined, StarOutlined } from "@ant-design/icons";
import Layout from "@theme/Layout";
import { translate } from "@docusaurus/Translate";
import UserStatus from "../_components/user/UserStatus";
import UserPrompts from "../_components/user/UserPrompts";
import UserFavorite from "../_components/user/UserFavorite";
import { AuthProvider } from "../_components/AuthContext";

function UserBookmark() {
  const [activeKey, setActiveKey] = useState("status");

  const onChange = (key) => {
    setActiveKey(key);
  };

  return (
    <Layout>
      <main
        className='margin-vert--lg'
        style={{ maxWidth: "1200px", margin: "auto" }}>
        <div className={"text--center"}>
          <UserStatus hideLinks={{ userCenter: false, myFavorite: true }} />
        </div>
        <div style={{ margin: "0 auto", maxWidth: "90%"}}>
          <Tabs defaultActiveKey='status' onChange={onChange} tabBarStyle={{color:"var(--ifm-font-color-base)"}} >
            <Tabs.TabPane
              key='status'
              tab={
                <span style={{}}>
                  <StarOutlined style={{ marginRight: "5px" }} />
                  {translate({ message: "收藏" })}
                </span>
              }
            />
            <Tabs.TabPane
              key='prompts'
              tab={
                <span>
                  <EditOutlined style={{ marginRight: "5px" }} />
                  {translate({ message: "你的提示词" })}
                </span>
              }
            />
          </Tabs>
          {activeKey === 'status' && <UserFavorite />}
          {activeKey === 'prompts' && <UserPrompts />}
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
