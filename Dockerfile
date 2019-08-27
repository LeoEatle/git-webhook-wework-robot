FROM node:8

# 创建 app 目录
WORKDIR /app

# 直接复制整个源项目
COPY ./ /app/

RUN npm install

RUN npm run build

EXPOSE 8080

CMD [ "node", "./dist/server.js" ]