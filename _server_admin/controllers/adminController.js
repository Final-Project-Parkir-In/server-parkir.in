const { Admin } = require("../models/admin")

class Controller {

    static async createAdmin(req, res, next) {
        try {
            const { userName, email, password } = req.body
            if (!userName || !email || !password) {
                throw { name: `BAD REQUEST` }
            }
            const data = await Admin.createAdmin({
                userName, email, password
            })
            res.status(201).json({ message: `Successfully add ${userName} to new Admin` })
        } catch (err) {
            next(err)
        }
    }

    static async allAdmin(req, res, next) {
        try {
            const data = await Admin.findAll({
                attributes: ['id', 'userName', 'email']
            });
            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }

    static async detailAdmin(req, res, next) {
        try {
            const { id } = req.params
            const data = await Admin.findByPk(id)
            const output = {
                id: data._id,
                userName: data.userName,
                email: data.email
            }
            res.status(200).json(output)
        } catch (err) {
            next(err)
        }
    }
    static async deleteAdmin(req, res, next) {
        try {
            const { id } = req.params
            const findAdmin = await Admin.findByPk(id)
            await Admin.deleteAdmin(id)
            res.status(200).json({ message: `Successfully removed ${findAdmin.userName} from database` })
        } catch (err) {
            next(err)
        }
    }

    static async updateAdmin(req, res, next) {
        try {
            const { id } = req.params
            const { userName, email, password } = req.body
            if (!userName || !email || !password) {
                throw { name: `BAD REQUEST` }
            }
            const findAdmin = await Admin.findByPk(id)
            await Admin.update(findAdmin.userName, { userName, email, password })
            res.status(200).json({ message: `Successfully updated ${findAdmin.userName}` })
        } catch (err) {
            next(err)
        }
    }

    static async sandbox(req, res, next) {
        try {
            const { id } = req.params
            const { userName, email, password } = req.body
            if (!userName || !email || !password) {
                throw { name: `BAD REQUEST` }
            }
            const findAdmin = await Admin.findByPk(id)

            const test = await Admin.sandbox(findAdmin.userName, { userName, email, password })
            console.log(test, '<<<< hasilnya');
            res.status(200).json({ message: `Successfully updated  ${findAdmin.userName} to ${userName}` })
        } catch (err) {
            next(err)
        }
    }

}

module.exports = Controller