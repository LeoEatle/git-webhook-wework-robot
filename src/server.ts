import * as Koa from "koa";
import * as jwt from "koa-jwt";
import * as bodyParser from "koa-bodyparser";
import * as helmet from "koa-helmet";
import * as cors from "@koa/cors";
import * as winston from "winston";
import * as dotenv from "dotenv";
// import { createConnection } from 'typeorm';
// import 'reflect-metadata';
// import * as PostgressConnectionStringParser from 'pg-connection-string';

import { logger } from "./middleware/logging";
import { config } from "./config";
import { router } from "./routes";
const log = require("./log")("server");

log.info("开始加载配置");
// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: ".env" });

const app = new Koa();

// Provides important security headers to make your app more secure
app.use(helmet());

// Enable cors with default options
app.use(cors());

// Logger middleware -> use winston as logger (logging.ts with config)
app.use(logger(winston));

// Enable bodyParser with default options
app.use(bodyParser());

// JWT middleware -> below this line routes are only reached if JWT token is valid, secret as env variable
// app.use(jwt({ secret: config.jwtSecret }));

// this routes are protected by the JWT middleware, also include middleware to respond with "Method Not Allowed - 405".
app.use(router.routes());

// 企业微信机器人中间件 待实践
// 这里的设想是通过存储一些变量在ctx上，最后让中间件去负责通知
// 缺点：可读性可能不太好？还是更喜欢命令式的调用
// 优点：机器人通知逻辑单独分离，也许可以把中间件单独作为开源的一部分
// app.use()

app.listen(config.port);

console.log(`Server running on port ${config.port}`);
