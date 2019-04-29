const _code = require("./code");

class Res{
    constructor(code, msg, data){
        this.code = code;
        this.msg = msg;
        this.data = data;
    }
}

const response = (ctx, result)=>{
    ctx.status = result.code;
    ctx.body = result;
}

module.exports = {
    success: (ctx, data, code)=>{
        code = code || _code.success;
        const result = new Res(code, "", data);
        response(ctx, result);
    },
    error: (ctx, msg, code)=>{
        code = code || _code.error;
        const result = new Res(code, msg)
        response(ctx, result);

    },
    not_found:(ctx)=>{
        code = code || _code.not_found;
        const result = new Res(code, msg)
        response(ctx, result);
    }
}