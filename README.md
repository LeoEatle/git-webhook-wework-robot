企业微信github / gitlab机器人

[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)
[![docker build](https://img.shields.io/docker/automated/leoeatle/wxwork-git-robot)](https://cloud.docker.com/repository/docker/leoeatle/wxwork-git-robot/builds)

# Changelog
2020-1
支持了腾讯云云函数的创建

使用方式：
在github中的`Webhook`配置
```
http://link.zhihu.com/?target=https%3A//service-5mv1fv1k-1251767583.gz.apigw.tencentcs.com/release/wechatwork_git_robot?id={robotid}
```
其中robotid是你需要推送的机器人id

`id`参数代表自定义的机器人id，可以在企业微信的机器人列表中查看，见图：

![](https://tuchuang-1251767583.cos.ap-guangzhou.myqcloud.com/wework-demo.jpg)

自建云函数方式：
1. `git clone https://github.com/LeoEatle/git-webhook-wework-robot.git`
2. 注册并登陆腾讯云管理后台，新建一个云函数，可以先选个Node的Helloworld模板
3. 将代码中的`cloud`目录上传，见图
![](https://tuchuang-1251767583.cos.ap-guangzhou.myqcloud.com/git-robot/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202020-01-16%20%E4%B8%8A%E5%8D%8811.03.40.png)

4. 点击保存（保存后🉑️测试试试）
![](https://tuchuang-1251767583.cos.ap-guangzhou.myqcloud.com/git-robot/%E4%BC%81%E4%B8%9A%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_0dc98a64-9a31-4bcb-bf67-dbba9ed2327f.png)

5. 选择触发方式，添加新的触发方式，类型选择API网关，保存后得到url
![](https://tuchuang-1251767583.cos.ap-guangzhou.myqcloud.com/git-robot/add_new.png)

![](https://tuchuang-1251767583.cos.ap-guangzhou.myqcloud.com/git-robot/save_new.png)

6. ok!可以填到Github的webhook里了，类型选择`Send me everything`，也可以自定义，url填上上面的url，**别忘了要在后面加上`?id={你的机器人id}`作为参数**。

可见下面[如何使用](https://github.com/LeoEatle/git-webhook-wework-robot#%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8)。

2019-8
1. docker镜像上传到新地址：https://cloud.docker.com/repository/docker/leoeatle/wxwork-git-robot

2019-7
1. 由于一直在维护公司内的机器人，有些改动不适用于外部使用。单独分开两个项目，不再作为两个分支管理。

2019-6
1. 重新审视之前的`dockerfile`感觉过于臃肿，不如直接把dist打包进docker，所以进行了修改
2. 之前的腾讯云服务器没钱了，wework-robot.xyz 宣告停止服务，如有需要请自行搭建

# 目前支持的事件
## Push event 示例

![](https://tuchuang-1251767583.cos.ap-guangzhou.myqcloud.com/git-robot/WeWork%20Helper20190823102904.png)

## Issue event 示例

![](https://tuchuang-1251767583.cos.ap-guangzhou.myqcloud.com/git-robot/issue2.png)

## Merge Request 示例

![](https://tuchuang-1251767583.cos.ap-guangzhou.myqcloud.com/git-robot/mr2.png)

Merge Request 会有发起、合并、关闭、重新发起等几种情况，文案会有所不同。

# 如何使用

## Github

如果是使用github，在github项目中的`Setting`中选择`Webhooks`，选择`Add Webhooks`，填写url，如`http://{{你的域名或者IP}}/github?id=7048958e-8b4b-4381-9758-af84347c240c`。

![](https://tuchuang-1251767583.cos.ap-guangzhou.myqcloud.com/github-demo.png)

`/github`用来区分github和gitlab，这两者的处理方式不同。

`id`参数代表自定义的机器人id，可以在企业微信的机器人列表中查看，见图：

![](https://tuchuang-1251767583.cos.ap-guangzhou.myqcloud.com/wework-demo.jpg)

## Gitlab

如果是gitlab，将webhook地址改为`http://{{你的域名或者IP}}/git?id={{机器人id}}`

注意这里的路由是**git**

2019-10-17 更新
现在**gitlab**路由也会指向同样的功能了，所以两种路由都可以


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
# 项目介绍 && 开发（热烈欢迎提PR）

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

* ~~进一步考虑是不是可以用GUI统一管理项目和机器人id的关系~~

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
