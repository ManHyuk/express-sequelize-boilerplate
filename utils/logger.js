const winston = require('winston');
const moment = require('moment');

const logger = new winston.Logger({
    transports : [
        new (winston.transports.Console)({
            level: 'info',
            colorize: true
        })
        /* only used server */
        //new (require('winston-daily-rotate-file'))({
        //    level: 'info',
        //    filename: './logFiles/logging-',
        //    maxsize: 1000 * 1024,
        //    datePattern: 'yyyy-MM-dd.log',
        //    json: false,
        //    timestamp: () => {return moment().format('YYYY-MM-DD HH:mm:ss');}
        //})
    ]
});

module.exports = logger;