const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const onerror = require('koa-onerror')
const cors = require("koa-cors")
const bodyparser = require('koa-bodyparser')
const logger = require("./utils/log/logger");

const index = require('./routes/index')
const users = require('./routes/users')
// const socket = require('./socket');

let req_num = 0;
// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))

app.use(json())

app.use(cors())

app.use(require('koa-static')(__dirname + '/public'))

app.use(async (ctx, next)=>{
    ctx.set("Access-Control-Allow-Credentials", true);
    const start = Date.now();
    ctx.request.body.request_start_ts = start;
    req_num++;

    await next();
    const ms = Date.now() - start;
    logger.req(`${req_num} ${ctx.method} ${ctx.url} ${ctx.status} ${(ctx.body && ctx.body.msg) || ""} - ${ms} ms`);
})

// 创建socket服务
// socket.init_socket(app);

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
//   console.error('server error', err, ctx)
  logger.error('server error', err, ctx)
});

module.exports = app
