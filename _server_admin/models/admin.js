const { getDatabase } = require("../configs/mongoConnection")
const { ObjectId } = require('mongodb');
const { hashPassword } = require("../helpers/bcrypt");

class Admin {
    static getCollections() {
        const db = getDatabase()
        const admins = db.collection("admins")
        return admins
    }

    static async createAdmin(admin) {
        return this.getCollections().insertOne({
            ...admin,
            password: hashPassword(admin.password)
        })
    }


}


module.exports = { Admin }