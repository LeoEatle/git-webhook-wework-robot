FROM node:8
RUN mkdir -p /usr/workspace/wework-robot
WORKDIR /usr/workspace/wework-robot

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# COPY package*.json ./

# RUN npm install
# # If you are building your code for production
# # RUN npm install --only=production
# # Bundle app source
# COPY . .

# 感觉没必要用开发环境来启动docker，直接把dist放进去好了

COPY ./dist .

EXPOSE 8080
CMD [ "node", "server.js" ]
