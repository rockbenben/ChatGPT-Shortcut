# 第一阶段: 构建静态网站
FROM node:24-alpine AS builder

# 设置工作目录
WORKDIR /app

# 安装 git：showLastUpdateTime 需要 git 读取文档的最后更新时间，
# 缺失会报 "This Docusaurus site is outside any Git worktree" 并中断构建
RUN apk add --no-cache git

# 复制项目中的 package.json 和 yarn.lock 到工作目录中
COPY package.json yarn.lock ./

# 安装依赖包
RUN yarn install --frozen-lockfile --network-timeout 100000

# 复制项目源代码到工作目录
COPY . .

# 构建静态站点：全部 locale 由 scripts/i18nLocales.mjs 单一数据源提供，
# yarn build 走分段构建（每进程 ≤3 个 locale），避免单进程 18 语言 OOM。
RUN yarn build

# 第二阶段: 使用 Nginx 作为静态服务器
FROM nginx:stable-alpine

# 删除默认的 Nginx 配置文件
RUN rm /etc/nginx/conf.d/default.conf

# 复制自定义 Nginx 配置文件
COPY nginx.conf /etc/nginx/conf.d

# 将第一阶段构建的 Docusaurus 静态站点文件复制到 Nginx 目录
COPY --from=builder /app/build /usr/share/nginx/html

# 暴露端口 3000
EXPOSE 3000

# 启动NGINX
CMD ["nginx", "-g", "daemon off;"]

# 容器构建&运行命令
# docker build -t chatgpt-shortcut .
# docker run -d -p 3000:3000 --name chatgpt-shortcut chatgpt-shortcut