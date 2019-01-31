/**
 * 企业微信机器人
 * @author LeoEatle
 */
// const request = require("request");
import * as request from "request";

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

    // 发送文本消息
    public sendTextMsg(msg, options) {
        const {chatid, ...restOptions} = options || {chatid: undefined};
        const textMsgInfo: TextMsgInfo = {
            "msgtype": "text",
            chatid: options && options.chatid,
            "text": {
                "content": msg,
                ...restOptions
            }
        };
        console.log("this.robotId", this.robotId);
        console.log("this.url", this.url);
        return new Promise((resolve, reject) => {
            request.post(
                `${this.url}send?key=${this.robotId}`,
                {
                    json: textMsgInfo
                },
                function (error, response, body: ResponseBody) {
                    if (!error && response.statusCode == 200) {
                        if (body.errcode === 0 && body.errmsg === "ok") {
                            console.log("机器人成功发送通知", body);
                            resolve(response);
                        } else {
                            console.log("机器人发送通知失败", body);
                            reject(body);
                        }
                    } else {
                        console.log("error", error);
                        reject(error);
                    }
                }
            );
        });
    }

    // TODO: 发送markdown消息

    // TODO: 发送图文消息

    // TODO: 接受@消息

    // TODO: 获取群消息
}