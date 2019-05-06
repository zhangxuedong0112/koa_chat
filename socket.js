const Koa = require('koa');
const app = new Koa();
const server = require('http').createServer(app.callback());
const io = require('socket.io')(server);
const db_help = require("./db/mongo/db_help");
const Msg = require("./model/msg");
const moment = require("moment")

server.listen(3001, ()=>{
    console.log("socket run in 3001");
})

io.on('connection', function (socket) {
    socket.join("socket_server");
    socket.emit("connection", {});

    //绑定设备到用户身上
    socket.on('bind', async (msg) => {
        try{
            socket.join(msg._id);

            console.log("绑定成功=>", msg);

            socket.emit("bind", {
                code: 200,
                msg: "success"
            });
        }catch(e){
            console.error("绑定失败=>", e, msg);
            socket.emit("bind", {
                code: 500,
                error: e
            });
        }

    });

    socket.on('send_to_user', async (msg) => {
        console.log("@@@@@@@", msg);
        let now = new Date().getTime();
        let id = await db_help.object_id();
        //入库
        let msg_obj = new Msg(id, msg.from, msg.to, msg.msg_type, msg.txt, msg.file, now, now);

        db_help.insert("msg_list", msg_obj);

        msg_obj.time = moment(msg_obj.create_ts).format('hh:mm a');

        io.to(msg.to._id).emit('user_msg', msg_obj);
        io.to(msg.from._id).emit('user_msg', msg_obj);
        
    })
    
});
   