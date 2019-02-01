企业微信github / gitlab机器人

# 使用效果

## Push event
如果有人push了新的提交，群里推送如图

![](https://tuchuang-1251767583.cos.ap-guangzhou.myqcloud.com/push-demo.jpg)

点击项目名称可以跳转到项目页面。

## Merge Request
如果有人发起了Merge Request，群里推送如图

![](https://tuchuang-1251767583.cos.ap-guangzhou.myqcloud.com/mr-demo.png)

Merge Request 会有发起、合并、关闭、重新发起等几种情况，文案会有所不同。

# 如何使用

打开gitcode项目（gitlab项目通用），在`Setting` 中选择`Advanced Setting`，选中`Web Hooks`tab ，添加一个webhook。

![](https://tuchuang-1251767583.cos.ap-guangzhou.myqcloud.com/demo.png)

目前在`10.125.60.95`这台机器上试水，所以可以配置url为`http://10.125.60.95:8080/git`


## 机器人id配置
目前这台机器上配置的机器人id为`7048958e-8b4b-4381-9758-af84347c240c`

如果需要自定义机器人id，请修改项目根目录下的`.env`

```conf
PORT=8080
NODE_ENV=development
JWT_SECRET=your-secret-whatever
DATABASE_URL=postgres://user:pass@localhost:5432/apidb
CHAT_ID=82c08203-82a6-4824-8319-04a361bc0b2a # 改这里！
```
# 项目介绍

此项目用于连接git webhook和企业微信机器人webhook，采用koa2 + typescript开发，大部分git webhook 和 企业微信机器人的数据结构已经定义好typing，如：

```typescript
interface Repository {
    name: string;
    description: string;
    homepage: string;
    git_http_url: string;
    git_ssh_url: string;
    url: string;
    visibility_level: number;
}
```

并且项目有配置严格的tslint和lint-staged等检查。

异步解决方案为`async/await`

git事件handler: `gitWebhook.ts`

chatRobot推送信息相关: `chat.ts`

# 如何部署

**建议将此服务部署在自己的机器上**

1. 使用pm2

使用pm2的方式比较简单，对于这种推送服务已经足够使用。

```shell
npm install -g pm2
npm run dist # 先用webpack生成js代码比较好，或者也可以使用node-ts
pm2 start process.yml
```

2. 使用docker

目前已经编译出了一份镜像文件为`leoytliu/wework-robot`
```
docker start leoytliu/wework-robot
```
当然，也可以使用pm2-docker来同时利用到pm2和docker。


# TODO

* 目前只做了`push`和`merge request`事件的handler，以及只做了文字和mardown信息的推送，其余事件和其他类型的推送还需开发。

* 为了方便其他团队甚至外面开源的使用，考虑使用docker方便自己部署。

* 考虑是不是可以在配置webhook的地方直接配置机器人id，分别推送

* 进一步考虑是不是可以用GUI统一管理项目和机器人id的关系