const db_help = require("../../db/mongo/db_help");
const res = require("../../model/res");

module.exports = async (ctx, next)=>{
    let body = ctx.request.body;

    if(!body.user_name){
        return res.error(ctx, "用户名为空");    
    }else if(!body.pwd){
        return res.error(ctx, "密码为空");    
    }

    // console.log(ctx.cookies.get("token"))

    //判断用户是否注册
    let w = {user_name: body.user_name, pwd: body.pwd};
    let options = {fields: {"user_name":1, "name": 1}};
    let has_user = await db_help.findOne("user", w, options);
    if(!has_user){
        return res.error(ctx, "用户名密码错误");
    }

    // ctx.cookies.set(
    //         'token', new Buffer(has_user.user_name).toString('base64'),{
    //         domain:'localhost:8888', // 写cookie所在的域名
    //         path:'/',       // 写cookie所在的路径
    //         maxAge: 60*1000,   // cookie有效时长
    //         expires: body.request_start_ts+3600000, // cookie失效时间 1小时
    //         httpOnly:false,  // 是否只用于http请求中获取
    //         overwrite:false,  // 是否允许重写
    //         // signed: true
    //     }
    // );

    

    res.success(ctx, has_user);
};
