# 使用 nodejs 作为基础镜像
FROM node:16-slim

# 设置工作目录
RUN mkdir -p /usr/src
WORKDIR /usr/src

# 配置环境 yarn
# RUN npm install -g yarn

# 复制项目中的 package.json 和 yarn.lock 到工作目录中
COPY package.json yarn.lock /usr/src/

# 安装依赖包
RUN yarn install

# 复制项目中的所有文件到工作目录中
COPY . /usr/src

# 构建应用程序
RUN yarn build

# 暴露 3000 端口
EXPOSE 3000
ENV NODE_ENV=production

ENTRYPOINT yarn run serve -- --build --port 3000 --host localhost

# 容器构建&运行命令
# docker build -f Dockerfile -t chatgpt-shortcut .
# docker run -p 3000:3000 chatgpt-shortcut