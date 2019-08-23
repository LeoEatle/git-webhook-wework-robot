企业微信github / gitlab机器人

[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)
[![docker build](https://img.shields.io/docker/automated/leoeatle/wxwork-git-robot)](https://cloud.docker.com/repository/docker/leoeatle/wxwork-git-robot/builds)

# Changelog
2019-8
1. docker镜像上传到新地址：https://cloud.docker.com/repository/docker/leoeatle/wxwork-git-robot

2019-7
1. 由于一直在维护公司内的机器人，有些改动不适用于外部使用。单独分开两个项目，不再作为两个分支管理。

2019-6
1. 重新审视之前的`dockerfile`感觉过于臃肿，不如直接把dist打包进docker，所以进行了修改
2. 之前的腾讯云服务器没钱了，wework-robot.xyz 宣告停止服务，如有需要请自行搭建（没错，作为腾讯员工没有腾讯云可以用很正常）

# 使用效果

![](https://tuchuang-1251767583.cos.ap-guangzhou.myqcloud.com/push-demo2.png)

# 目前支持的事件
## Push event 示例

如上，点击链接会直接跳转到项目。

## Issue event 示例

![](https://tuchuang-1251767583.cos.ap-guangzhou.myqcloud.com/git-robot/issue2.png)

## Merge Request 示例

![](https://tuchuang-1251767583.cos.ap-guangzhou.myqcloud.com/git-robot/mr2.png)

Merge Request 会有发起、合并、关闭、重新发起等几种情况，文案会有所不同。

# 如何使用

## Github

如果是使用github，在github项目中的`Setting`中选择`Webhooks`，选择`Add Webhooks`，填写url，如`http://weworkrobot.xyz/github?id=7048958e-8b4b-4381-9758-af84347c240c`。

![](https://tuchuang-1251767583.cos.ap-guangzhou.myqcloud.com/github-demo.png)

`/github`用来区分github和gitlab，这两者的处理方式不同。

`id`参数代表自定义的机器人id


# 如何部署

**建议将此服务部署在自己的机器上**

## 最简单的方式

```bash
# 在服务器上
git pull https://github.com/LeoEatle/git-webhook-wework-robot.git
npm install
npm run build
pm2 start ./dist/server.js
```

## 使用docker

目前已经编译出了一份镜像文件，地址：https://cloud.docker.com/repository/docker/leoeatle/wxwork-git-robot
```shell
// 先登录
sudo docker pull https://cloud.docker.com/repository/docker/leoeatle/wxwork-git-robot:latest
docker run -d leoeatle/wxwork-git-robot
```
当然，也可以使用pm2-docker来同时利用到pm2和docker。

## 机器人id配置

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

# TODO

* 目前gitlab只做了`push`和`merge request`事件的handler，以及只做了文字和mardown信息的推送，其余事件和其他类型的推送还需开发。

* github推送目前只考虑`push` `pr` `issue`，其他有待添加

* ~~为了方便其他团队甚至外面开源的使用，考虑使用docker方便自己部署。~~

* ~~考虑是不是可以在配置webhook的地方直接配置机器人id，分别推送~~

* 进一步考虑是不是可以用GUI统一管理项目和机器人id的关系

* 考虑可以补全gitlab的typing，实在太多了，有人帮忙就好了，github已经使用了有人开源整理的typing依赖库

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table>
  <tr>
    <td align="center"><a href="http://blog.soul11201.com"><img src="https://avatars1.githubusercontent.com/u/8514816?v=4" width="100px;" alt="soul11201"/><br /><sub><b>soul11201</b></sub></a><br /><a href="https://github.com/LeoEatle/git-webhook-wework-robot/issues?q=author%3Anoname007" title="Bug reports">🐛</a> <a href="https://github.com/LeoEatle/git-webhook-wework-robot/commits?author=noname007" title="Code">💻</a></td>
    <td align="center"><a href="https://liubiantao.github.io"><img src="https://avatars1.githubusercontent.com/u/3268218?v=4" width="100px;" alt="Haitao"/><br /><sub><b>Haitao</b></sub></a><br /><a href="https://github.com/LeoEatle/git-webhook-wework-robot/issues?q=author%3Aliubiantao" title="Bug reports">🐛</a> <a href="https://github.com/LeoEatle/git-webhook-wework-robot/commits?author=liubiantao" title="Code">💻</a></td>
  </tr>
</table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!