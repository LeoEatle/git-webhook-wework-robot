企业微信github / gitlab机器人

# 如何使用

打开gitcode项目，在`Setting` 中选择`Advanced Setting`，选中`Web Hooks`tab ，添加一个webhook。

![](https://tuchuang-1251767583.cos.ap-guangzhou.myqcloud.com/%E4%BC%81%E4%B8%9A%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_8329e5fe-4d4e-4566-9571-f7891bf2daf0.png)

目前在`10.125.60.95`这台机器上试水，所以可以配置url为`http://10.125.60.95:8080/git`

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

并且项目有配置严格的tslint 和 lint - staged等检查。

# TODO

目前只做了`push`和`merge request`事件的handler，以及只做了文字和mardown信息的推送，其余事件和其他类型的推送还需开发。

并且为了方便其他团队甚至外面开源的使用，考虑使用docker方便自己部署。