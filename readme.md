企业微信github / gitlab机器人

# 使用效果

## Push event
如果有人push了新的提交，群里推送如图

![](https://tuchuang-1251767583.cos.ap-guangzhou.myqcloud.com/push-demo.jpg)

点击项目名称可以跳转到项目页面。

## Issue event

![](https://tuchuang-1251767583.cos.ap-guangzhou.myqcloud.com/issue-demo.png)

## Merge Request
如果有人发起了Merge Request，群里推送如图

![](https://tuchuang-1251767583.cos.ap-guangzhou.myqcloud.com/mr-demo.png)

Merge Request 会有发起、合并、关闭、重新发起等几种情况，文案会有所不同。

# 如何使用

## Github

如果是使用github，在github项目中的`Setting`中选择`Webhooks`，选择`Add Webhooks`，填写url，如`http://weworkrobot.xyz/github?id=7048958e-8b4b-4381-9758-af84347c240c`。

![](https://tuchuang-1251767583.cos.ap-guangzhou.myqcloud.com/github-demo.png)

域名`weworkrobot.xyz`指向我在腾讯云搭建的通用服务器。

`/github`用来区分github和gitlab，这两者的处理方式不同。

`id`参数代表自定义的机器人id

可以在企业微信中查看你的机器人id

![](https://tuchuang-1251767583.cos.ap-guangzhou.myqcloud.com/wework-demo.jpg)


## Gitlab/自建Gitlab

打开gitcode项目（gitlab项目通用），在`Setting` 中选择`Advanced Setting`，选中`Web Hooks`tab ，添加一个webhook。

请在域名后加上`/git`路径

## 机器人id配置
目前这台机器上配置的机器人id为`7048958e-8b4b-4381-9758-af84347c240c`，这是我的测试机器人。

如果需要修改服务器端的默认机器人id设置，请修改项目根目录下的`.env`

```conf
PORT=8080
NODE_ENV=development
JWT_SECRET=your-secret-whatever
DATABASE_URL=postgres://user:pass@localhost:5432/apidb
CHAT_ID=82c08203-82a6-4824-8319-04a361bc0b2a # 改这里！
```
# 项目介绍 && 开发

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

github事件handler: `github.ts`

gitlab事件handler: `gilab.ts`

chatRobot推送信息相关: `chat.ts`

## 提交

```bash
git add .
npm run commit # 让commitlint自动生成commit信息
```

# 如何部署

**建议将此服务部署在自己的机器上**

## 最简单的方式

```bash
# 在服务器上
git pull http://git.code.oa.com/leoytliu/gitcode-wework-robot.git
npm install
npm run build
pm2 start ./dist/server.js
```

## 使用pm2

使用pm2的方式比较简单，对于这种推送服务已经足够使用。

```shell
# 在本地编辑好配置文件
npm install -g pm2
pm2 deploy production setup
pm2 deploy production
```

## 使用docker

目前已经编译出了一份镜像文件为`leoytliu/wework-robot`
```
docker start leoytliu/wework-robot
```
当然，也可以使用pm2-docker来同时利用到pm2和docker。


# TODO

* 目前gitlab只做了`push`和`merge request`事件的handler，以及只做了文字和mardown信息的推送，其余事件和其他类型的推送还需开发。

* github推送目前只考虑`push` `pr` `issue`，其他有待添加

* 为了方便其他团队甚至外面开源的使用，考虑使用docker方便自己部署。

* 考虑是不是可以在配置webhook的地方直接配置机器人id，分别推送

* 进一步考虑是不是可以用GUI统一管理项目和机器人id的关系

* 考虑可以补全gitlab的typing，实在太多了，有人帮忙就好了，github已经使用了有人开源整理的typing依赖库