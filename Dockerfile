FROM node:8
RUN mkdir -p /usr/workspace/wework-robot
WORKDIR /usr/workspace/wework-robot

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
RUN npm run build
COPY ./dist .

EXPOSE 8080
CMD ["node", "server.js" ]
