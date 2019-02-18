/**
 * customed log via winston
 * @author LeoEatle
 */

// const logger =  (label: string) => winston.createLogger({
//     transports: [new winston.transports.Console()],
//     format: winston.format.combine(
//         winston.format.timestamp({
//             format: "YYYY-MM-DD HH:mm:ss"
//         }),
//         winston.format.colorize({ all: true }),
//         winston.format.json(),
//         winston.format.label({label}),
//         winston.format.printf(info => `${info.level} ${info.timestamp} ${info.label} : ${info.message}`)
//     )
// });

const logger2 = (label: string) => {
    return {
        info: (...args) => console.log(label, args)
    };
};

export default logger2;