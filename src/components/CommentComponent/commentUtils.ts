import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";

// JWT payload 解析——仅取 id 判断"是否已登录"。有效期校验在 AuthContext.isValidToken，职责不同勿合并
export const parseJwt = (token: string) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join(""),
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
};

// Get current user ID
export const getCurrentUserId = () => {
  if (!ExecutionEnvironment.canUseDOM) return 0;

  const token = localStorage.getItem("auth_token");
  if (!token) return 0;

  const payload = parseJwt(token);
  return payload?.id || 0;
};

// 把 /flat 端点返回的平铺评论嵌套成树
export const nestComments = (flatComments: any[]) => {
  const commentMap = new Map();
  const sortedComments = [...flatComments].sort((a, b) => a.id - b.id);

  const dateCache = new Map();
  const getDate = (id: any) => {
    if (!dateCache.has(id)) {
      dateCache.set(id, new Date(id).getTime());
    }
    return dateCache.get(id);
  };

  for (const comment of sortedComments) {
    comment.children = [];
    commentMap.set(comment.id, comment);
  }

  const rootComments: any[] = [];
  for (const comment of sortedComments) {
    if (comment.threadOf) {
      const parentComment = commentMap.get(comment.threadOf.id);
      if (parentComment) {
        parentComment.children.push(comment);
        continue;
      }
      // 父评论不在当前分页内（/flat 端点对全部评论分页），
      // 提升为 root 避免孤立 reply 被静默丢弃导致整页为空
    }
    rootComments.push(comment);
  }

  return rootComments.sort((a, b) => getDate(b.id) - getDate(a.id));
};
