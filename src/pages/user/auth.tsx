import { useEffect } from "react";
import { useLocation } from "@docusaurus/router";
import { loginWithToken } from "@site/src/api";

const CallbackPage = () => {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);

  useEffect(() => {
    try {
      const code = urlParams.get("code");

      if (code) {
        if (window.opener) {
          window.opener.postMessage({ code }, "*");
          window.close();
        } else {
          // Handle the situation where window.opener is null
          console.error("Please do not close the main login page during the login process");
        }
      } else {
        // 从 URL 查询参数中获取 token
        const token = urlParams.get("loginToken");

        if (token) {
          loginUserWithToken(token);
        }
      }
    } catch (e) {
      console.error("An error occurred:", e);
    }
  }, [location, urlParams]);

  const loginUserWithToken = async (token) => {
    try {
      const response = await loginWithToken(token);
      console.log("Login successful:", response);
    } catch (error) {
      console.error("Login failed, token is invalid or expired:", error);
    } finally {
      window.location.replace("/");
    }
  };

  return null; // or a loading spinner, or whatever you want to show while waiting
};

export default CallbackPage;
