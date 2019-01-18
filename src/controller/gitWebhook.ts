import { BaseContext } from "koa";

const HEADER_KEY = "x-event";

const EVENTS = {
    "Push Hook": "push",
    "Tag Push Hook": "tag_push",
    "Issue Hook": "issue",
    "Note Hook": "note",
    "Merge Request Hook": "merge_request",
    "Review Hook": "review"
};
export default class GeneralController {
    public static async getWebhook(ctx: BaseContext) {
        console.log("git webhook req", ctx.request);
        const body = ctx.request.body;
        console.log("http body", body);
        const event = ctx.request.header["x-gitlab-event"];
        // switch (event)
        ctx.body = "收到了";
    }
}
