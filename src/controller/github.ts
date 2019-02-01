/**
 * github webhook handler
 * github 的webhook格式跟gitlab的不一样，天啊
 * 所以这里是需要重新开发的！注意！
 * @author LeoEatle
 */
import { BaseContext } from "koa";
import ChatRobot from "./chat";
import { config } from "../config";
const log = require("../log")("github handler");
import { Issues, Push, PullRequest } from "github-webhook-event-types";

const HEADER_KEY: string = "X-GitHub-Event";

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
            default:
                return await GithubWebhookController.handleDefault(ctx, event);
        }
    }

    /**
     * 处理push事件
     * @param ctx koa context
     */
    public static async handlePush(ctx: BaseContext) {
        const body: Push = ctx.request.body;
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
            return await robot.sendMdMsg(mdMsg);
        }
    }

    /**
     * 处理merge request事件
     * @param ctx koa context
     */
    public static async handlePR(ctx: BaseContext) {
        const body: PullRequest = ctx.request.body;
        const robot: ChatRobot = new ChatRobot(
            config.chatid
        );
        log.info("pr http body", body);
        // 陷入了沉思，为什么gitlab这里没有过去式，而github这里的action全加上了过去式
        const actionWords = {
            "opened": "发起",
            "closed": "关闭",
            "reopened": "重新发起",
            "edited": "更新",
            "merge": "合并"
        };
        const {action, sender, pull_request, repository} = body;
        const mdMsg = `${sender.login}在 [${repository.full_name}](${repository.html_url}) ${actionWords[action]}了PR
                        标题：${pull_request.title}
                        源分支：${pull_request.base.label}
                        目标分支：${pull_request.head.label}
                        [查看PR详情](${pull_request.url})`;
        return await robot.sendMdMsg(mdMsg);
    }

    public static handleDefault(ctx: BaseContext, event: String) {
        ctx.body = `Sorry，暂时还没有处理${event}事件`;
    }
}
