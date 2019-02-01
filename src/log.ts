/**
 * customed log via winston
 * @author LeoEatle
 */
import * as winston from "winston";

export default (label: string) => winston.createLogger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
        winston.format.timestamp({
            format: "YYYY-MM-DD HH:mm:ss"
        }),
        winston.format.colorize({ all: true }),
        winston.format.json(),
        winston.format.label({label}),
        winston.format.printf(info => `${info.level} ${info.timestamp} ${info.label} : ${info.message}`)
    )
});