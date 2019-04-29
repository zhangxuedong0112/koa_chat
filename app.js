const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require("./utils/log/logger");

const index = require('./routes/index')
const users = require('./routes/users')

let req_num = 0;
// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))

app.use(json())

app.use(require('koa-static')(__dirname + '/public'))

app.use(async (ctx, next)=>{
    const start = Date.now();
    ctx.request.body.request_start_ts = start;
    req_num++;

    await next();
    const ms = Date.now() - start;
    logger.req(`${req_num} ${ctx.method} ${ctx.url} ${ctx.status} ${(ctx.body && ctx.body.msg) || ""} - ${ms} ms`);
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
//   console.error('server error', err, ctx)
  logger.error('server error', err, ctx)
});

module.exports = app
