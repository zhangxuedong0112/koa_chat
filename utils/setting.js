module.exports = {
    mongo: {
        // url: "mongodb://zhangxd:zhangxd@127.0.0.1:27017/test?w=0&readPreference=secondaryPreferred&replicaSet=mgset-5645185",
        url: "mongodb://zhangxd:zhangxd@127.0.0.1:27017/test",
        option: {
            reconnectTries: 86400,
            auto_reconnect: true,
            poolSize : 40,
            connectTimeoutMS: 500,
            useNewUrlParser: true
        }
    }
}