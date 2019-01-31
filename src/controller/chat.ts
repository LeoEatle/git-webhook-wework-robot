/**
 * 企业微信机器人
 * @author LeoEatle
 */
// const request = require("request");
import * as request from "request";
import * as winston from "winston";
// 默认的企业微信机器人webhook地址
const defaultUrl = "https://qyapi.weixin.qq.com/cgi-bin/webhook/";

// 企业机器人发送textMsg的格式
interface TextMsgInfo {
    msgtype: String;
    chatid?: String; // 当只想通知某个群的时候，才需要用到chatid
    text: {
        content: String;
        mentioned_list?: Array<String>; // 提醒群中的指定成员
        mentioned_mobile_list?: Array<String>; // 提醒某个手机号的成员
    };
}

// 企业机器人发送markdown格式
interface MarkdownMsgInfo {
    msgtype: String;
    chatid?: String;
    markdown: {
        content: String;
    };
}

// 企业机器人返回的body体
interface ResponseBody {
    errcode: Number;
    errmsg: String;
}

export default class ChatRobot {
    readonly robotId: String;
    readonly url: String = defaultUrl;
    constructor(robotId: String, options?) {
        this.robotId = robotId;
        if (options) {
            this.url = options.url || defaultUrl;
        }
    }

    /**
     * 向机器人webhook发出请求
     * @param json json信息
     */
    private async sendHttpRequest(json) {
        request.post(
            `${this.url}send?key=${this.robotId}`,
            {
                json: json
            },
            function (error, response, body: ResponseBody) {
                if (!error && response.statusCode == 200) {
                    if (body.errcode === 0 && body.errmsg === "ok") {
                        winston.info("机器人成功发送通知", body);
                        return (response);
                    } else {
                        winston.error("机器人发送通知失败", body);
                        throw (body);
                    }
                } else {
                    winston.error("调用机器人webhook失败", error);
                    throw (error);
                }
            }
        );
    }

    /**
     * 发送文本消息
     * @param msg 文本信息
     * @param chatid 单独通知的群聊id，默认undefined
     * @param options 对应参数，请参考官方文档
     */
    public async sendTextMsg(msg, chatid = undefined, options?) {
        const textMsgInfo: TextMsgInfo = {
            msgtype: "text",
            chatid,
            text: {
                "content": msg,
                ...options
            }
        };
        return await this.sendHttpRequest(textMsgInfo);
    }

    /**
     * 发送markdown信息
     * @param content Markdown内容
     * @param chatid 单独通知的群聊id，默认undefined
     * @param options 其他参数，请参考官方文档
     */
    public async sendMdMsg(content, chatid = undefined, options?) {
        const markdownMsgInfo: MarkdownMsgInfo = {
            "msgtype": "markdown",
            "chatid": chatid,
            "markdown": {
                "content": content
            }
        };
        return await this.sendHttpRequest(markdownMsgInfo);
    }

    // TODO: 发送图文消息

    // TODO: 接受@消息

    // TODO: 获取群消息
}