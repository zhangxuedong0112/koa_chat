const db_help = require("../../db/mongo/db_help");
const res = require("../../model/res");

module.exports = async (ctx, next)=>{
    let body = ctx.request.body;
    //判断用户是否注册
    let w = {user_name:{$ne: body.user_name}};
    let options = {fields: {"user_name":1, "name": 1}, sort:{name: 1}};
    let has_user = await db_help.find("user", w, options);

    res.success(ctx, has_user);
};
