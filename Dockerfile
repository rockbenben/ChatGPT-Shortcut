# 使用 nodejs 作为基础镜像
FROM node:16-alpine

# 设置工作目录
WORKDIR /app

# 配置环境 yarn
# RUN npm install -g yarn

# 复制项目中的 package.json 和 yarn.lock 到工作目录中
COPY package.json yarn.lock ./

# 安装依赖包
RUN yarn install

# 复制项目源代码到工作目录
COPY . .

# 构建静态站点
RUN yarn build

# 使用NGINX作为Web服务器
FROM nginx:stable-alpine

# 将Docusaurus静态站点文件复制到NGINX默认目录
COPY --from=0 /app/build /usr/share/nginx/html

# 暴露端口80
EXPOSE 80

# 启动NGINX
CMD ["nginx", "-g", "daemon off;"]

# 容器构建&运行命令
# docker build -t chatgpt-shortcut .
# docker run -d -p 80:80 --name chatgpt-shortcut chatgpt-shortcut