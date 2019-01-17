import * as Koa from 'koa';
import * as jwt from 'koa-jwt';
import * as bodyParser from 'koa-bodyparser';
import * as helmet from 'koa-helmet';
import * as cors from '@koa/cors';
import * as winston from 'winston';
import * as dotenv from 'dotenv';
// import { createConnection } from 'typeorm';
// import 'reflect-metadata';
// import * as PostgressConnectionStringParser from 'pg-connection-string';

import { logger } from './logging';
import { config } from './config';
import { router } from './routes';

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: '.env' });

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
app.use(router.routes()).use(router.allowedMethods());

app.listen(config.port);

console.log(`Server running on port ${config.port}`);