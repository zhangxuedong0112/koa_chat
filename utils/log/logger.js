const log4js = require("log4js");
const log_path = `/data/logs/koa_chat/`;

class Logger{
    constructor(){
        log4js.configure({
            replaceConsole: true,
            appenders: {
                stdout: {//控制台输出
                    type: 'stdout'
                },
                req: {//请求日志
                    type: 'dateFile',
                    filename: `${log_path}/req/req`,
                    pattern: '-yyyy-MM-dd.log',
                    alwaysIncludePattern: true
                },
                err: {//错误日志
                    type: 'dateFile',
                    filename: `${log_path}/err/err`,
                    pattern: '-yyyy-MM-dd.log',
                    alwaysIncludePattern: true
                },
                oth: {//其他日志
                    type: 'dateFile',
                    filename: `${log_path}/oth/oth`,
                    pattern: '-yyyy-MM-dd.log',
                    alwaysIncludePattern: true
                },
                warn: {//debug
                    type: 'dateFile',
                    filename: `${log_path}/warn/warn`,
                    pattern: '-yyyy-MM-dd.log',
                    alwaysIncludePattern: true
                }
            },
            categories: {
                debug: { appenders: ['stdout'], level: 'debug' },
                warn: { appenders: ['stdout', 'warn'], level: 'warn' },
                info: { appenders: ['stdout', 'oth'], level: 'debug' },//appenders:采用的appender,取appenders项,level:设置级别
                err: { appenders: ['stdout', 'err'], level: 'error' },
                req: { appenders: ['stdout', 'req'], level: 'info' },
                default: { appenders: ['stdout', 'oth'], level: 'debug' },
            }
        });

    }

    get_log(name){
        return log4js.getLogger(name || "default");
    }

    debug(){//不计入文件
        log4js.getLogger("debug").debug(...arguments);
    }

    info(){//计入其他文件
        log4js.getLogger("default").info(...arguments);
    }

    error(){//计入错误文件
        log4js.getLogger("err").error(...arguments);
    }

    warn(){//线上警告
        log4js.getLogger("warn").warn(...arguments);
    }

    req(){//请求使用
        log4js.getLogger("req").info(...arguments);
    }
}

module.exports = new Logger();