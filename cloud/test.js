const handler = require("./index").main_handler;
const event = {
    body:
        "id=82c08203-82a6-4824-8319-04a361bc0b2a&payload=%7B%22zen%22%3A%22Anything+added+dilutes+everything+else.%22%2C%22hook_id%22%3A175190809%2C%22hook%22%3A%7B%22type%22%3A%22Repository%22%2C%22id%22%3A175190809%2C%22name%22%3A%22web%22%2C%22active%22%3Atrue%2C%22events%22%3A%5B%22%2A%22%5D%2C%22config%22%3A%7B%22content_type%22%3A%22form%22%2C%22insecure_ssl%22%3A%220%22%2C%22url%22%3A%22https%3A%2F%2Fservice-5mv1fv1k-1251767583.gz.apigw.tencentcs.com%2Frelease%2Fwechatwork_git_robot%3Fid%3D82c08203-82a6-4824-8319-04a361bc0b2a%22%7D%2C%22updated_at%22%3A%222020-01-15T13%3A33%3A36Z%22%2C%22created_at%22%3A%222020-01-15T13%3A33%3A36Z%22%2C%22url%22%3A%22https%3A%2F%2Fapi.github.com%2Frepos%2FLeoEatle%2Fgit-webhook-wework-robot%2Fhooks%2F175190809%22%2C%22test_url%22%3A%22https%3A%2F%2Fapi.github.com%2Frepos%2FLeoEatle%2Fgit-webhook-wework-robot%2Fhooks%2F175190809%2Ftest%22%2C%22ping_url%22%3A%22https%3A%2F%2Fapi.github.com%2Frepos%2FLeoEatle%2Fgit-webhook-wework-robot%2Fhooks%2F175190809%2Fpings%22%2C%22last_response%22%3A%7B%22code%22%3Anull%2C%22status%22%3A%22unused%22%2C%22message%22%3Anull%7D%7D%2C%22repository%22%3A%7B%22id%22%3A166331677%2C%22node_id%22%3A%22MDEwOlJlcG9zaXRvcnkxNjYzMzE2Nzc%3D%22%2C%22name%22%3A%22git-webhook-wework-robot%22%2C%22full_name%22%3A%22LeoEatle%2Fgit-webhook-wework-robot%22%2C%22private%22%3Afalse%2C%22owner%22%3A%7B%22login%22%3A%22LeoEatle%22%2C%22id%22%3A14247110%2C%22node_id%22%3A%22MDQ6VXNlcjE0MjQ3MTEw%22%2C%22avatar_url%22%3A%22https%3A%2F%2Favatars0.githubusercontent.com%2Fu%2F14247110%3Fv%3D4%22%2C%22gravatar_id%22%3A%22%22%2C%22url%22%3A%22https%3A%2F%2Fapi.github.com%2Fusers%2FLeoEatle%22%2C%22html_url%22%3A%22https%3A%2F%2Fgithub.com%2FLeoEatle%22%2C%22followers_url%22%3A%22https%3A%2F%2Fapi.github.com%2Fusers%2FLeoEatle%2Ffollowers%22%2C%22following_url%22%3A%22https%3A%2F%2Fapi.github.com%2Fusers%2FLeoEatle%2Ffollowing%7B%2Fother_user%7D%22%2C%22gists_url%22%3A%22https%3A%2F%2Fapi.github.com%2Fusers%2FLeoEatle%2Fgists%7B%2Fgist_id%7D%22%2C%22starred_url%22%3A%22https%3A%2F%2Fapi.github.com%2Fusers%2FLeoEatle%2Fstarred%7B%2Fowner%7D%7B%2Frepo%7D%22%2C%22subscriptions_url%22%3A%22https%3A%2F%2Fapi.github.com%2Fusers%2FLeoEatle%2Fsubscriptions%22%2C%22organizations_url%22%3A%22https%3A%2F%2Fapi.github.com%2Fusers%2FLeoEatle%2Forgs%22%2C%22repos_url%22%3A%22https%3A%2F%2Fapi.github.com%2Fusers%2FLeoEatle%2Frepos%22%2C%22events_url%22%3A%22https%3A%2F%2Fapi.github.com%2Fusers%2FLeoEatle%2Fevents%7B%2Fprivacy%7D%22%2C%22received_events_url%22%3A%22https%3A%2F%2Fapi.github.com%2Fusers%2FLeoEatle%2Freceived_events%22%2C%22type%22%3A%22User%22%2C%22site_admin%22%3Afalse%7D%2C%22html_url%22%3A%22https%3A%2F%2Fgithub.com%2FLeoEatle%2Fgit-webhook-wework-robot%22%2C%22description%22%3A%22%E4%BC%81%E4%B8%9A%E5%BE%AE%E4%BF%A1github%2Fgitlab%E6%9C%BA%E5%99%A8%E4%BA%BA%22%2C%22fork%22%3Afalse%2C%22url%22%3A%22https%3A%2F%2Fapi.github.com%2Frepos%2FLeoEatle%2Fgit-webhook-wework-robot%22%2C%22forks_url%22%3A%22https%3A%2F%2Fapi.github.com%2Frepos%2FLeoEatle%2Fgit-webhook-wework-robot%2Fforks%22%2C%22keys_url%22%3A%22https%3A%2F%2Fapi.github.com%2Frepos%2FLeoEatle%2Fgit-webhook-wework-robot%2Fkeys%7B%2Fkey_id%7D%22%2C%22collaborators_url%22%3A%22https%3A%2F%2Fapi.github.com%2Frepos%2FLeoEatle%2Fgit-webhook-wework-robot%2Fcollaborators%7B%2Fcollaborator%7D%22%2C%22teams_url%22%3A%22https%3A%2F%2Fapi.github.com%2Frepos%2FLeoEatle%2Fgit-webhook-wework-robot%2Fteams%22%2C%22hooks_url%22%3A%22https%3A%2F%2Fapi.github.com%2Frepos%2FLeoEatle%2Fgit-webhook-wework-robot%2Fhooks%22%2C%22issue_events_url%22%3A%22https%3A%2F%2Fapi.github.com%2Frepos%2FLeoEatle%2Fgit-webhook-wework-robot%2Fissues%2Fevents%7B%2Fnumber%7D%22%2C%22events_url%22%3A%22https%3A%2F%2Fapi.github.com%2Frepos%2FLeoEatle%2Fgit-webhook-wework-robot%2Fevents%22%2C%22assignees_url%22%3A%22https%3A%2F%2Fapi.github.com%2Frepos%2FLeoEatle%2Fgit-webhook-wework-robot%2Fassignees%7B%2Fuser%7D%22%2C%22branches_url%22%3A%22https%3A%2F%2Fapi.github.com%2Frepos%2FLeoEatle%2Fgit-webhook-wework-robot%2Fbranches%7B%2Fbranch%7D%22%2C%22tags_url%22%3A%22https%3A%2F%2Fapi.github.com%2Frepos%2FLeoEatle%2Fgit-webhook-wework-robot%2Ftags%22%2C%22blobs_url%22%3A%22https%3A%2F%2Fapi.github.com%2Frepos%2FLeoEatle%2Fgit-webhook-wework-robot%2Fgit%2Fblobs%7B%2Fsha%7D%22%2C%22git_tags_url%22%3A%22https%3A%2F%2Fapi.github.com%2Frepos%2FLeoEatle%2Fgit-webhook-wework-robot%2Fgit%2Ftags%7B%2Fsha%7D%22%2C%22git_refs_url%22%3A%22https%3A%2F%2Fapi.github.com%2Frepos%2FLeoEatle%2Fgit-webhook-wework-robot%2Fgit%2Frefs%7B%2Fsha%7D%22%2C%22trees_url%22%3A%22https%3A%2F%2Fapi.github.com%2Frepos%2FLeoEatle%2Fgit-webhook-wework-robot%2Fgit%2Ftrees%7B%2Fsha%7D%22%2C%22statuses_url%22%3A%22https%3A%2F%2Fapi.github.com%2Frepos%2FLeoEatle%2Fgit-webhook-wework-robot%2Fstatuses%2F%7Bsha%7D%22%2C%22languages_url%22%3A%22https%3A%2F%2Fapi.github.com%2Frepos%2FLeoEatle%2Fgit-webhook-wework-robot%2Flanguages%22%2C%22stargazers_url%22%3A%22https%3A%2F%2Fapi.github.com%2Frepos%2FLeoEatle%2Fgit-webhook-wework-robot%2Fstargazers%22%2C%22contributors_url%22%3A%22https%3A%2F%2Fapi.github.com%2Frepos%2FLeoEatle%2Fgit-webhook-wework-robot%2Fcontributors%22%2C%22subscribers_url%22%3A%22https%3A%2F%2Fapi.github.com%2Frepos%2FLeoEatle%2Fgit-webhook-wework-robot%2Fsubscribers%22%2C%22subscription_url%22%3A%22https%3A%2F%2Fapi.github.com%2Frepos%2FLeoEatle%2Fgit-webhook-wework-robot%2Fsubscription%22%2C%22commits_url%22%3A%22https%3A%2F%2Fapi.github.com%2Frepos%2FLeoEatle%2Fgit-webhook-wework-robot%2Fcommits%7B%2Fsha%7D%22%2C%22git_commits_url%22%3A%22https%3A%2F%2Fapi.github.com%2Frepos%2FLeoEatle%2Fgit-webhook-wework-robot%2Fgit%2Fcommits%7B%2Fsha%7D%22%2C%22comments_url%22%3A%22https%3A%2F%2Fapi.github.com%2Frepos%2FLeoEatle%2Fgit-webhook-wework-robot%2Fcomments%7B%2Fnumber%7D%22%2C%22issue_comment_url%22%3A%22https%3A%2F%2Fapi.github.com%2Frepos%2FLeoEatle%2Fgit-webhook-wework-robot%2Fissues%2Fcomments%7B%2Fnumber%7D%22%2C%22contents_url%22%3A%22https%3A%2F%2Fapi.github.com%2Frepos%2FLeoEatle%2Fgit-webhook-wework-robot%2Fcontents%2F%7B%2Bpath%7D%22%2C%22compare_url%22%3A%22https%3A%2F%2Fapi.github.com%2Frepos%2FLeoEatle%2Fgit-webhook-wework-robot%2Fcompare%2F%7Bbase%7D...%7Bhead%7D%22%2C%22merges_url%22%3A%22https%3A%2F%2Fapi.github.com%2Frepos%2FLeoEatle%2Fgit-webhook-wework-robot%2Fmerges%22%2C%22archive_url%22%3A%22https%3A%2F%2Fapi.github.com%2Frepos%2FLeoEatle%2Fgit-webhook-wework-robot%2F%7Barchive_format%7D%7B%2Fref%7D%22%2C%22downloads_url%22%3A%22https%3A%2F%2Fapi.github.com%2Frepos%2FLeoEatle%2Fgit-webhook-wework-robot%2Fdownloads%22%2C%22issues_url%22%3A%22https%3A%2F%2Fapi.github.com%2Frepos%2FLeoEatle%2Fgit-webhook-wework-robot%2Fissues%7B%2Fnumber%7D%22%2C%22pulls_url%22%3A%22https%3A%2F%2Fapi.github.com%2Frepos%2FLeoEatle%2Fgit-webhook-wework-robot%2Fpulls%7B%2Fnumber%7D%22%2C%22milestones_url%22%3A%22https%3A%2F%2Fapi.github.com%2Frepos%2FLeoEatle%2Fgit-webhook-wework-robot%2Fmilestones%7B%2Fnumber%7D%22%2C%22notifications_url%22%3A%22https%3A%2F%2Fapi.github.com%2Frepos%2FLeoEatle%2Fgit-webhook-wework-robot%2Fnotifications%7B%3Fsince%2Call%2Cparticipating%7D%22%2C%22labels_url%22%3A%22https%3A%2F%2Fapi.github.com%2Frepos%2FLeoEatle%2Fgit-webhook-wework-robot%2Flabels%7B%2Fname%7D%22%2C%22releases_url%22%3A%22https%3A%2F%2Fapi.github.com%2Frepos%2FLeoEatle%2Fgit-webhook-wework-robot%2Freleases%7B%2Fid%7D%22%2C%22deployments_url%22%3A%22https%3A%2F%2Fapi.github.com%2Frepos%2FLeoEatle%2Fgit-webhook-wework-robot%2Fdeployments%22%2C%22created_at%22%3A%222019-01-18T02%3A39%3A47Z%22%2C%22updated_at%22%3A%222020-01-15T03%3A24%3A24Z%22%2C%22pushed_at%22%3A%222019-10-17T07%3A14%3A22Z%22%2C%22git_url%22%3A%22git%3A%2F%2Fgithub.com%2FLeoEatle%2Fgit-webhook-wework-robot.git%22%2C%22ssh_url%22%3A%22git%40github.com%3ALeoEatle%2Fgit-webhook-wework-robot.git%22%2C%22clone_url%22%3A%22https%3A%2F%2Fgithub.com%2FLeoEatle%2Fgit-webhook-wework-robot.git%22%2C%22svn_url%22%3A%22https%3A%2F%2Fgithub.com%2FLeoEatle%2Fgit-webhook-wework-robot%22%2C%22homepage%22%3Anull%2C%22size%22%3A151%2C%22stargazers_count%22%3A56%2C%22watchers_count%22%3A56%2C%22language%22%3A%22TypeScript%22%2C%22has_issues%22%3Atrue%2C%22has_projects%22%3Atrue%2C%22has_downloads%22%3Atrue%2C%22has_wiki%22%3Atrue%2C%22has_pages%22%3Afalse%2C%22forks_count%22%3A21%2C%22mirror_url%22%3Anull%2C%22archived%22%3Afalse%2C%22disabled%22%3Afalse%2C%22open_issues_count%22%3A3%2C%22license%22%3Anull%2C%22forks%22%3A21%2C%22open_issues%22%3A3%2C%22watchers%22%3A56%2C%22default_branch%22%3A%22master%22%7D%2C%22sender%22%3A%7B%22login%22%3A%22LeoEatle%22%2C%22id%22%3A14247110%2C%22node_id%22%3A%22MDQ6VXNlcjE0MjQ3MTEw%22%2C%22avatar_url%22%3A%22https%3A%2F%2Favatars0.githubusercontent.com%2Fu%2F14247110%3Fv%3D4%22%2C%22gravatar_id%22%3A%22%22%2C%22url%22%3A%22https%3A%2F%2Fapi.github.com%2Fusers%2FLeoEatle%22%2C%22html_url%22%3A%22https%3A%2F%2Fgithub.com%2FLeoEatle%22%2C%22followers_url%22%3A%22https%3A%2F%2Fapi.github.com%2Fusers%2FLeoEatle%2Ffollowers%22%2C%22following_url%22%3A%22https%3A%2F%2Fapi.github.com%2Fusers%2FLeoEatle%2Ffollowing%7B%2Fother_user%7D%22%2C%22gists_url%22%3A%22https%3A%2F%2Fapi.github.com%2Fusers%2FLeoEatle%2Fgists%7B%2Fgist_id%7D%22%2C%22starred_url%22%3A%22https%3A%2F%2Fapi.github.com%2Fusers%2FLeoEatle%2Fstarred%7B%2Fowner%7D%7B%2Frepo%7D%22%2C%22subscriptions_url%22%3A%22https%3A%2F%2Fapi.github.com%2Fusers%2FLeoEatle%2Fsubscriptions%22%2C%22organizations_url%22%3A%22https%3A%2F%2Fapi.github.com%2Fusers%2FLeoEatle%2Forgs%22%2C%22repos_url%22%3A%22https%3A%2F%2Fapi.github.com%2Fusers%2FLeoEatle%2Frepos%22%2C%22events_url%22%3A%22https%3A%2F%2Fapi.github.com%2Fusers%2FLeoEatle%2Fevents%7B%2Fprivacy%7D%22%2C%22received_events_url%22%3A%22https%3A%2F%2Fapi.github.com%2Fusers%2FLeoEatle%2Freceived_events%22%2C%22type%22%3A%22User%22%2C%22site_admin%22%3Afalse%7D%7D",

    headerParameters: {},

    headers: {
        accept: "*/*",

        "content-length": "9853",

        "content-type": "application/x-www-form-urlencoded",

        host: "service-5mv1fv1k-1251767583.gz.apigw.tencentcs.com",

        "user-agent": "GitHub-Hookshot/7ea4e29",

        "x-anonymous-consumer": "true",

        "x-api-requestid": "f4195f0a498ba9d9e997aca082338fb8",

        "x-b3-traceid": "f4195f0a498ba9d9e997aca082338fb8",

        "x-github-delivery": "a1aab800-379b-11ea-87cc-2eb3ac5508aa",

        "x-github-event": "ping",

        "x-qualifier": "$LATEST"
    },

    httpMethod: "POST",

    path: "/wechatwork_git_robot",

    pathParameters: {},

    queryString: { id: "82c08203-82a6-4824-8319-04a361bc0b2a" },

    queryStringParameters: {},

    requestContext: {
        httpMethod: "ANY",

        identity: {},

        path: "/wechatwork_git_robot",

        serviceId: "service-5mv1fv1k",

        sourceIp: "192.30.252.99",

        stage: "release"
    }
};
const context = {
    hello: "hello"
};

const callback = function(param) {
    console.log("param", param);
};
let result = handler(event, context, callback);
console.log("result: ", result);
