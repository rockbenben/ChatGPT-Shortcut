import React, { useState } from "react";
import Layout from "@theme/Layout";
import UserStatus from "../_components/user/UserStatus";
import UserPrompts from "../_components/user/UserPrompts";
import UserFavorite from "../_components/user/UserFavorite";
import { AuthProvider } from "../_components/AuthContext";
import { HeartOutlined, EditOutlined } from "@ant-design/icons";
import { translate } from "@docusaurus/Translate";

function UserBookmark() {
  const [activeTab, setActiveTab] = useState("favorites");

  return (
    <Layout>
      <main className="margin-vert--lg" style={{ maxWidth: "1200px", margin: "auto" }}>
        <div className={"text--center"}>
          <UserStatus hideLinks={{ userCenter: false, myFavorite: true }} />
        </div>
        <div style={{ margin: "0 auto", maxWidth: "90%" }}>
          <div className="tabs" style={{ margin: "18px" }}>
            <span
              style={{
                marginRight: "10px",
                cursor: "pointer",
                color: activeTab === "favorites" ? "var(--ifm-color-primary)" : "",
              }}
              onClick={() => setActiveTab("favorites")}>
              <HeartOutlined style={{ marginRight: "5px" }} />
              {translate({ message: "收藏" })}
            </span>
            <span
              style={{
                cursor: "pointer",
                color: activeTab === "prompts" ? "var(--ifm-color-primary)" : "",
              }}
              onClick={() => setActiveTab("prompts")}>
              <EditOutlined style={{ marginRight: "5px" }} />
              {translate({ id: "myprompt", message: "我的提示词" })}
            </span>
          </div>

          {activeTab === "favorites" && <UserFavorite />}
          {activeTab === "prompts" && <UserPrompts />}
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
