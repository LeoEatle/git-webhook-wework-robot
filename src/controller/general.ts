import { BaseContext } from "koa";
import ChatRobot from "./chat";
import { config } from "../config";

export default class GeneralController {
    public static async helloWorld(ctx: BaseContext) {
        ctx.body = "Hello World!";
    }

    // silly endpoint to show where the payload data from the token gets stored
    public static async getJwtPayload(ctx: BaseContext) {
        // example just to set a different status
        ctx.status = 201;
        // the body of the response will contain the information contained as payload in the JWT
        ctx.body = ctx.state.user;
    }

    public static async sendText(ctx: BaseContext) {
        const url = ctx.request.url;
        const ROBOTID_REGEX = /key=([a-zA-Z0-9-]+)/g;
        const robotidRe = ROBOTID_REGEX.exec(url);
        const robotid = robotidRe && robotidRe[1];
        const robot: ChatRobot = new ChatRobot(
            robotid || config.chatid
        );
        const body = ctx.request.body;
        console.log("ctx.request.body", body);
        const msg = body.text;
        await robot.sendTextMsg(msg);
        ctx.status = 200;
        ctx.body = {
            res: 0
        };
        return;
    }
}
