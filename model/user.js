class User{
    constructor(_id, user_name, pwd, name, update_ts, create_ts){
        if(_id){
            this._id = _id || "";
        }
        
        this.user_name = user_name || "";
        this.pwd = pwd || "";
        this.name = name || "";
        this.update_ts = update_ts || 0;
        this.create_ts = create_ts || 0;
    }

}

module.exports = User;