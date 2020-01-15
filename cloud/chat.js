/**
 * 企业微信机器人
 * @author LeoEatle
 */
const request = require("request");
// 默认的企业微信机器人webhook地址
const defaultUrl = "https://qyapi.weixin.qq.com/cgi-bin/webhook/";


class ChatRobot {
    constructor(robotId, options) {
        this.robotId = robotId;
        this.url = defaultUrl;
        console.log('defaultUrl: ', defaultUrl);
    }

    /**
     * 向机器人webhook发出请求
     * @param json json信息
     */
    async sendHttpRequest(json) {
        let self = this;
        return new Promise(function(resolve, reject) {
            request.post(
                `${self.url}send?key=${self.robotId}`,
                {
                    json: json
                },
                function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        if (body.errcode === 0 && body.errmsg === "ok") {
                            console.log("机器人成功发送通知", body);
                            resolve (response);
                        } else {
                            console.error("机器人发送通知失败", body);
                            reject (body);
                        }
                    } else {
                        console.error("调用机器人webhook失败", error);
                        reject (error);
                    }
                }
            );

        });
    }

    /**
     * 发送文本消息
     * @param msg 文本信息
     * @param chatid 单独通知的群聊id，默认undefined
     * @param options 对应参数，请参考官方文档
     */
    async sendTextMsg(msg, chatid = undefined, options) {
        const textMsgInfo = {
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
    async sendMdMsg(content, chatid = undefined, options) {
        const markdownMsgInfo = {
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

module.exports = ChatRobot;