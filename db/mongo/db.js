let MongoClient = require('mongodb').MongoClient;
let setting = require("./../../utils/setting");

class Mongo{

	constructor(){
		this.instance = null;
	}

	static get_db(){
		return new Promise( async (resolve, reject) => {

			MongoClient.connect(setting.mongo.url, setting.mongo.option, function(err, client){
				if(err) return reject(err)

				return resolve(client);
			})

		})
	}

	static getInstance(){
		return new Promise( async (resolve, reject) => {
	        let db ;
	        if(!this.instance) {
	        	// console.log("init db 1")

	        	try{
	        		this.instance = await Mongo.get_db();

					db = this.instance.db("test");
	        		return resolve(db);
	        	}catch(e){
	        		return reject(e);
	        	}
	        }

			// console.log("init db 2")
			db = this.instance.db("test");
	        return resolve(db);
        })
	}

	static close(){
		this.instance = null;
	}
	
}

// setInterval(async ()=>{
// 	await Mongo.getInstance();
// },1000);

module.exports = Mongo;