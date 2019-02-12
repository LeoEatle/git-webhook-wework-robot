/**
 * github webhook handler
 * github 的webhook格式跟gitlab的不一样，天啊
 * 所以这里是需要重新开发的！注意！
 * @author LeoEatle
 */
import { BaseContext } from "koa";
import ChatRobot from "./chat";
import { config } from "../config";
import customLog from "../log";
const log = customLog("github handler");
import { Issues, Push, PullRequest } from "github-webhook-event-types";

const HEADER_KEY: string = "x-github-event";
// 陷入了沉思，为什么gitlab这里没有过去式，而github这里的action全加上了过去式
const actionWords = {
    "opened": "发起",
    "closed": "关闭",
    "reopened": "重新发起",
    "edited": "更新",
    "merge": "合并",
    "created": "创建",
    "requested": "请求",
    "completed": "完成"
};
export default class GithubWebhookController {
    public static async getWebhook(ctx: BaseContext) {
        console.log("git webhook req", ctx.request);
        const event: string = ctx.request.header[HEADER_KEY];
        if (!event) {
            ctx.status = 403;
            ctx.body = `Sorry，这可能不是一个来自 Github 的webhook请求`;
            log.info(ctx.body);
            return;
        }
        switch (event) {
            case "push":
                return await GithubWebhookController.handlePush(ctx);
            case "pull_request":
                return await GithubWebhookController.handlePR(ctx);
            case "ping":
                return await GithubWebhookController.handlePing(ctx);
            case "issues":
                return await GithubWebhookController.handleIssue(ctx);
            default:
                return await GithubWebhookController.handleDefault(ctx, event);
        }
    }

    /**
     * 处理ping事件
     * @param ctx koa context
     */
    public static async handlePing(ctx: BaseContext) {
        const robot: ChatRobot = new ChatRobot(
            config.chatid
        );
        const body: any = ctx.request.body;
        console.log(body);
        const { payload } = body;
        const { repository } = JSON.parse(payload);
        return await robot.sendTextMsg("成功收到了来自Github的Ping请求，项目名称：" + repository.name);
    }

    /**
     * 处理push事件
     * @param ctx koa context
     */
    public static async handlePush(ctx: BaseContext) {
        const body: Push = JSON.parse(ctx.request.body.payload);
        const robot: ChatRobot = new ChatRobot(
            config.chatid
        );
        let msg: String;
        log.info("push http body", body);
        const { pusher, repository, commits, ref} = body;
        const user_name = pusher.name;
        if (repository.name === "project_test" && user_name === "user_test") {
            msg = "收到一次webhook test";
            ctx.body = msg;
            return await robot.sendTextMsg(msg);
        } else {
            const lastCommit = commits[0];
            const branchName = repository.default_branch;
            msg = `项目 ${repository.name} 收到了一次push，提交者：${user_name}，最新提交信息：${lastCommit.message}`;
            ctx.body = msg;
            const mdMsg = `项目 [${repository.name}](${repository.url}) 收到一次push提交
                           提交者:  \<font color= \"commit\"\>${user_name}\</font\>
                           分支:  \<font color= \"commit\"\>${branchName}\</font\>
                           最新提交信息: ${lastCommit.message}`;
            await robot.sendMdMsg(mdMsg);
            ctx.status = 200;
            return;
        }
    }

    /**
     * 处理merge request事件
     * @param ctx koa context
     */
    public static async handlePR(ctx: BaseContext) {
        const body: PullRequest = JSON.parse(ctx.request.body.payload);
        const robot: ChatRobot = new ChatRobot(
            config.chatid
        );
        log.info("pr http body", body);
        const {action, sender, pull_request, repository} = body;
        const mdMsg = `${sender.login}在 [${repository.full_name}](${repository.html_url}) ${actionWords[action]}了PR
                        标题：${pull_request.title}
                        源分支：${pull_request.head.ref}
                        目标分支：${pull_request.base.ref}
                        [查看PR详情](${pull_request.html_url})`;
        await robot.sendMdMsg(mdMsg);
        ctx.status = 200;
        return;
    }

    /**
     * 处理issue 事件
     * @param ctx koa context
     */
    public static async handleIssue(ctx: BaseContext) {
        const body: Issues = JSON.parse(ctx.request.body.payload);
        const robot: ChatRobot = new ChatRobot(
            config.chatid
        );
        log.info("issues", body);
        console.log(body);
        const { action, issue, repository } = body;
        if (action !== "opened") {
            ctx.body = `除非有人开启新的issue，否则无需通知机器人`;
            return;
        }
        const mdMsg = `有人在 [${repository.name}](${repository.html_url}) ${actionWords[action]}了一个issue
                        标题：${issue.title}
                        发起人：[${issue.user.login}](${issue.user.html_url})
                        [查看详情](${issue.html_url})`;
        await robot.sendMdMsg(mdMsg);
        ctx.status = 200;
        return;
    }

    /**
     * 对于未处理的事件，统一走这里
     * @param ctx koa context
     * @param event 事件名
     */
    public static handleDefault(ctx: BaseContext, event: String) {
        console.log(ctx.request.body);
        ctx.body = `Sorry，暂时还没有处理${event}事件`;
    }
}
