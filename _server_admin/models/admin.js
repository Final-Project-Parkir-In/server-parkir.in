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

    static async findAll() {
        return this.getCollections().find().toArray()
    }

    static async findByPk(objectId) {
        return this.getCollections().findOne({
            _id: new ObjectId(objectId),
        })
    }

    static async deleteAdmin(id) {
        return this.getCollections().deleteOne({
            _id: new ObjectId(id)
        })
    }

    static async update(find, data) {

        const filter = { userName: find }; // find document(s) with firstName = 'John'
        const update = {
            $set: {
                ...data,
            password: hashPassword(data.password)
            }
        }; // update the lastName field to 'Doe'

        const result = await this.getCollections().updateOne(filter, update);
        return result
    }
     
    // sandbox >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    static async sandbox(find, data) {
        console.log(data.userName, '<<<< data update');

        const filter = { userName: find }; // find document(s) with firstName = 'John'
        const update = {
            $set: {
                userName: data.userName,
                email: data.email,
                password: data.password
            }
        }; // update the lastName field to 'Doe'

        const result = await this.getCollections().updateOne(filter, update);
        return result
    }

}


module.exports = { Admin }