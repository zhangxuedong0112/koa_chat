const db_help = require("../../db/mongo/db_help");
const res = require("../../model/res");
const user = require("../../model/user");

module.exports = async (ctx, next)=>{
    let body = ctx.request.body;

    if(!body.user_name){
        return res.error(ctx, "用户名为空");    
    }else if(!body.pwd){
        return res.error(ctx, "密码为空");    
    }

    body.name = body.name || body.user_name;

    //判断用户是否注册
    let w = {user_name: body.user_name};
    let has_user = await db_help.findOne("user", w);
    if(has_user){
        return res.error(ctx, "用户名已存在");    
    }

    //入库
    let user_obj = new user(null, body.user_name, body.pwd, body.name, body.request_start_ts, body.request_start_ts);
    await db_help.insert("user", user_obj);

    res.success(ctx, "success");
};
