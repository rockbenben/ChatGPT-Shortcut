import { useEffect } from "react";
import { useLocation } from "@docusaurus/router";
import { loginWithToken } from "@site/src/api";

const CallbackPage = () => {
  const location = useLocation();

  useEffect(() => {
    const params = mergeSearchAndHashParams(location.search, location.hash);

    try {
      const loginToken = params.get("loginToken");
      if (loginToken) {
        loginUserWithToken(loginToken);
        return;
      }

      const jwt = params.get("access_token") || params.get("jwt") || params.get("token") || params.get("id_token");
      const state = params.get("state");
      const provider = params.get("provider") || "google";
      const code = params.get("code");

      if (jwt || code) {
        if (window.opener) {
          const userRaw = params.get("user");
          const user = parseUserParam(userRaw);
          const rawParams = Object.fromEntries(params.entries());

          window.opener.postMessage(
            {
              provider,
              jwt,
              access_token: jwt,
              code,
              state,
              user,
              id_token: params.get("id_token"),
              rawParams,
            },
            "*"
          );
          window.close();
        } else {
          console.error("Please do not close the main login page during the login process");
        }
      }
    } catch (error) {
      console.error("An error occurred while handling the OAuth callback:", error);
    }
  }, [location]);

  const loginUserWithToken = async (token: string) => {
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

const mergeSearchAndHashParams = (search: string, hash: string): URLSearchParams => {
  const merged = new URLSearchParams(search || "");
  const hashParams = new URLSearchParams((hash || "").replace(/^#/, ""));
  hashParams.forEach((value, key) => {
    if (!merged.has(key)) {
      merged.set(key, value);
    }
  });
  return merged;
};

const parseUserParam = (rawValue: string | null) => {
  if (!rawValue) {
    return undefined;
  }

  try {
    const decoded = decodeURIComponent(rawValue);
    return JSON.parse(decoded);
  } catch (error) {
    console.error("Failed to parse user data from OAuth callback:", error);
    return undefined;
  }
};

export default CallbackPage;
