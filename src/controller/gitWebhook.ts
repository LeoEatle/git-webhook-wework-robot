/**
 * git webhook handler
 * @author LeoEatle
 */
import { BaseContext } from "koa";
import ChatRobot from "./chat";
import { config } from "../config";
interface Repository {
    name: string;
    description: string;
    homepage: string;
    git_http_url: string;
    git_ssh_url: string;
    url: string;
    visibility_level: number;
}

interface Commit {
    id: string;
    message: string;
    timestamp: string;
    url: string;
    author: object;
    added: Array<any>;
    modified: Array<any>;
    removed: Array<any>;
}

// 这是webhook中request.body的接口
interface Body {
    object_kind: string;
    before: string;
    after: string;
    ref: string;
    checkout_sha: string;
    user_name: string;
    user_id: number;
    user_email: string;
    project_id: number;
    repository: Repository;
    commits: Array<Commit>;
    total_commits_count: number;
}

const HEADER_KEY: string = "x-event";

const EVENTS = {
    "Push Hook": "push",
    "Tag Push Hook": "tag_push",
    "Issue Hook": "issue",
    "Note Hook": "note",
    "Merge Request Hook": "merge_request",
    "Review Hook": "review"
};
export default class GitWebhookController {
    public static async getWebhook(ctx: BaseContext) {
        console.log("git webhook req", ctx.request);
        const event: string = ctx.request.header[HEADER_KEY];
        if (!event) {
            ctx.body = `Sorry，这可能不是一个gitlab的webhook请求`;
        }
        switch (EVENTS[event]) {
            case "push":
                await GitWebhookController.handlePush(ctx);
            default:
                await GitWebhookController.handleDefault(ctx, event);
        }
    }

    public static async handlePush(ctx: BaseContext) {
        const body: Body = ctx.request.body;
        const robot: ChatRobot = new ChatRobot(
            config.chatid
        );
        let msg: String;
        console.log("http body", body);
        const { user_name, repository, commits} = body;
        const lastCommit: Commit = commits[0];
        if (repository.name === "project_test" && user_name === "user_test") {
            msg = "收到一次webhook test";
            ctx.body = msg;
            return await robot.sendTextMsg(msg);
        } else {
            msg = `项目 ${repository.name} 收到了一次push，提交者：${user_name}，最新提交信息：${lastCommit.message}`;
            ctx.body = msg;
            return await robot.sendTextMsg(msg);
        }
    }

    public static handleDefault(ctx: BaseContext, event: String) {
        ctx.body = `Sorry，暂时还没有处理${event}事件`;
    }
}
