# 第一阶段: 构建静态网站
# --platform=$BUILDPLATFORM：静态产物与 CPU 架构无关，固定在原生构建架构（amd64）只构建一次。
# 否则多架构构建会让 arm64 在 QEMU 模拟下也重跑一遍 yarn build，与 amd64 并发 → 双倍内存 → OOM(SIGKILL)。
# 最终 nginx 阶段仍按目标架构出多架构镜像，只是 COPY 同一份静态文件。
FROM --platform=$BUILDPLATFORM node:24-alpine AS builder

# 设置工作目录
WORKDIR /app

# SKIP_GIT_INFO=true：关掉 showLastUpdateTime + 用当前时间作 buildDate（见 docusaurus.config.js），
# 从而完全不依赖 git/.git —— 无需装 git，并可把 .git 排除出构建上下文（context 从 ~1.2GB 大幅缩小）。
ENV SKIP_GIT_INFO=true

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