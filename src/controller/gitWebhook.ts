import { BaseContext } from 'koa';

export default class GeneralController {

    public static async getWebhook (ctx: BaseContext) {
        console.log('git webhook req', ctx.request);
        ctx.body = '收到了';
    }


}