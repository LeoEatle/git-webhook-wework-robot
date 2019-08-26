FROM node:8

# 创建 app 目录
WORKDIR /app

# 安装 app 依赖
# RUN npm -g install serve

# 使用通配符复制 package.json 与 package-lock.json
COPY package*.json webpack.config.js .env tsconfig.json tslint.json src ./app/

RUN npm install

# 如需对 react/vue/angular 打包，生成静态文件，使用：
RUN npm run build

EXPOSE 8080
# 如需部署静态文件，使用：
#CMD ["serve", "-s", "dist", "-p", "8080"]
CMD [ "node", "./dist/server.js" ]