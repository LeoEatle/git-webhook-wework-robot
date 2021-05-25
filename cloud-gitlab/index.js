/**
 * gitlab webhook handler
 * @author LeoEatle
 */
const querystring = require('querystring');
const ChatRobot = require('./chat');

const HEADER_KEY = "x-gitlab-event";

const HEADER_KEY_V2 = "X-Gitlab-Event";

const EVENTS = {
    "Push Hook": "push",
    "Tag Push Hook": "tag_push",
    "Issue Hook": "issue",
    "Note Hook": "note",
    "Merge Request Hook": "merge_request",
    "Review Hook": "review",
    "Wiki Page Hook": "wiki"
};

const actionWords = {
    "open": "发起",
    "close": "关闭",
    "reopen": "重新发起",
    "update": "更新",
    "merge": "合并"
};

/**
 * 处理test事件
 * @param {*} ctx koa context
 * @param {*} robotid 机器人id
 */
async function handleTest(body, robotid) {
    const msg = "收到一次webhook test";
    const robot = new ChatRobot(
        robotid || config.chatid
    );
    await robot.sendTextMsg(msg);
    ctx.status = 200;
    return;
}

/**
 * 处理push事件
 * @param ctx koa context
 * @param robotid 机器人id
 */
async function handlePush(body, robotid) {
    const robot = new ChatRobot(
        robotid || config.chatid
    );
    let msg;
    const { user_name, repository, commits, ref} = body;
    if (repository.name === "project_test" && user_name === "user_test") {
        msg = "收到一次webhook test";
        return await robot.sendTextMsg(msg);
    } else {
        const lastCommit = commits[0];
        const branchName = ref.replace("refs/heads/", "");
        msg = `项目 ${repository.name} 收到了一次push，提交者：${user_name}，最新提交信息：${lastCommit.message}`;
        const mdMsg = `项目 [${repository.name}](${repository.homepage}) 收到一次push提交
                        提交者:  \<font color= \"commit\"\>${user_name}\</font\>
                        分支:  \<font color= \"commit\"\>${branchName}\</font\>
                        最新提交信息: ${lastCommit.message}`;
        await robot.sendMdMsg(mdMsg);
        return;
    }
}

/**
 * 处理merge request事件
 * @param ctx koa context
 */
async function handleMR(body, robotid) {
    const robot = new ChatRobot(
        robotid || config.chatid
    );
    const {user, object_attributes} = body;
    const attr = object_attributes;
    const mdMsg = `${user.name}在 [${attr.source.name}](${attr.source.web_url}) ${actionWords[attr.action]}了一个MR
                    标题：${attr.title}
                    源分支：${attr.source_branch}
                    目标分支：${attr.target_branch}
                    [查看MR详情](${attr.url})`;
    await robot.sendMdMsg(mdMsg);
    return;
}

async function handleIssue(body, robotid) {
    const robot = new ChatRobot(
        robotid || config.chatid
    );
    console.log("[Issue handler]Req Body", body);
    const {user, object_attributes, repository} = body;
    const attr = object_attributes;
    const mdMsg = `有人在 [${repository.name}](${repository.url}) ${actionWords[attr.action]}了一个issue
                    标题：${attr.title}
                    发起人：${user.name}
                    [查看详情](${attr.url})`;
    await robot.sendMdMsg(mdMsg);
    return;
}

async function handleNote(body, robotid) {
    const robot = new ChatRobot(
        robotid || config.chatid
    );
    const { user, project, object_attributes, repository } = body;
    const { noteable_type, url } = object_attributes;
    if (noteable_type === 'Issue') {
        const mdMsg = `${user.name} 在[${repository.name}](${repository.url})评论了一个issue
                        标题：${object_attributes}
                        [查看详情](${url})`
        await robot.sendMdMsg(mdMsg);
    }
    return;
}

async function handleWiki(body, robotid) {
    const robot = new ChatRobot(
        robotid || config.chatid
    );
    const { user, project, object_attributes, wiki } = body;
    const { title, url } = object_attributes;
    const mdMsg = `${user.name} 在[${project.name}](${project.git_http_url})更新了wiki
                    标题：${title}
                    [查看详情](${url})`
    await robot.sendMdMsg(mdMsg);
    
    return;
}

async function handleDefault(event) {
    const msg = `Sorry，暂时还没有处理${event}事件`;
    console.log(msg)
    return;
}

exports.main_handler = async (event, context, callback) => {
    console.log('event', event);
    const gitEvent = event.headers[HEADER_KEY] || event.headers[HEADER_KEY_V2];
    if (!event) {
        return `Sorry，这可能不是一个gitlab的webhook请求`;
    }
    const robotid = event.queryString.id;
    const payload = JSON.parse(event.body); // 我的天啊腾讯云竟然在这里返回一个 string
    console.log('payload', payload);
    // 检查是否是test事件
    if (event.headers["x-event-test"] == "true") {
        // test事件中仅处理push，否则推送太多
        if (EVENTS[gitEvent] == "push") {
            return await handleTest(payload, robotid);
        } else {
            console.log("其他test请求我可不会管");
            return;
        }
    }
    switch (EVENTS[gitEvent]) {
        case "push":
            return await handlePush(payload, robotid);
        case "merge_request":
            return await handleMR(payload, robotid);
        case "issue":
            return await handleIssue(payload, robotid);
        case "note":
            return await handleNote(payload, robotid);
        case "wiki":
            return await handleWiki(payload, robotid);
        default:
            return await handleDefault(gitEvent);
    }
}