const {getDatabase} = require('../config/mongodb')
const { ObjectId } = require("bson");

class User {
    static findAll(){
      return getDatabase().collection("Users").find().toArray()
    }

    static async login(email) {
      try {
        let data = await getDatabase().collection("Users").findOne({ "email": email })
        return data
      } catch (error) {
        return {
          name:"Not Found",
          message:error
        }
      }
    } 

    static addUser(payload) {
      return getDatabase().collection("Users").insertOne(payload);
    }
    
    static editUser(payload, id) {
      return getDatabase().collection("Users").updateOne({
        _id: ObjectId(id)
      },{
        $set: payload,
      }
      );
    }
    
    static deleteUser(id) {
      return getDatabase().collection("Users").deleteOne({ _id: ObjectId(id) });
    }

    static deleteDbUser() {
      return getDatabase().collection("Users").drop();
    }    
}

module.exports = User