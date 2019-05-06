class Msg{
    constructor(_id, from, to, msg_type, txt, file, update_ts, create_ts){
        if(_id){
            this._id = _id || "";
        }
        
        this.from = from;
        this.to = to;
        this.txt = txt || "";
        this.file = file || "";
        this.msg_type = msg_type;
        this.update_ts = update_ts;
        this.create_ts = create_ts;
    }

}

module.exports = Msg;