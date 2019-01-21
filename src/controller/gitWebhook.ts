import { BaseContext } from "koa";

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
        const body: Body = ctx.request.body;
        console.log("http body", body);
        const event: string = ctx.request.header["x-gitlab-event"];
        const { user_name: string, repository, commits } = body;

        // switch (event)
        ctx.body = "收到了";
    }
}
