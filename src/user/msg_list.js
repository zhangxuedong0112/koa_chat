const db_help = require("../../db/mongo/db_help");
const res = require("../../model/res");
const moment = require("moment")

module.exports = async (ctx, next)=>{
    let body = ctx.request.body;
    let from = body.from;
    let to = body.to;
    // console.log(from, to);
    //判断用户是否注册
    let w = {$or:[{"from.user_name": from, "to.user_name": to}, {"from.user_name": to, "to.user_name": from}]};
    let options = {sort:{create_ts: -1}, limit: 20};
    let msg_list = await db_help.find("msg_list", w, options);

    for (let index = 0; index < msg_list.length; index++) {
        const m = msg_list[index];

        m.time = moment(m.create_ts).format('hh:mm a');
    }

    msg_list.sort((a, b)=>{
        return a.create_ts - b.create_ts;
    })

    res.success(ctx, msg_list);
};
