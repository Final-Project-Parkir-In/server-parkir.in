const { comparePassword } = require("../helpers/bcrypt");
const { Admin } = require("../models/admin")

// sandbox requirement
// const AdminService = require('../services/admin');
// const adminService = new AdminService()

class Controller {

    static async handleRegister(req, res, next) {
        try {
            const { userName, email, password } = req.body
            // if (!userName || !email || !password) {
            //     throw { name: `BAD REQUEST` }
            // }
            const data = await Admin.createAdmin({
                userName, email, password
            })
            res.status(201).json(data)
        } catch (err) {
            next(err)
        }
    }

    static async handleLogin(req, res, next) {
        try {
            const { email, password } = req.body
            // console.log(req.body, '<<<< data input');
                const dataAdmin = await Admin.findByEmail(email)
                if (!dataAdmin) {
                    throw { name: `invalid Username or Password` }
                }
                const passwordValidation = comparePassword(password, dataAdmin.password)
                if (!passwordValidation) {
                    throw { name: `invalid Username or Password`}
                }
                // console.log(passwordValidation, '<<<<< ketemu wan ? ');
                res.status(200).json({ message: `Succesfully to login` })
            
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
            // _id = data._id
            // console.log(data, '<<<< detail control');
            if (data === "salah id") {
                throw { name: `invalid Username or Password` }
            }

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
            if (findAdmin === "salah id") {
                throw { name: `Data not found` }
            }
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
           
            const findAdmin = await Admin.findByPk(id)
            // console.log(findAdmin, '<<<<< data find edit');
            await Admin.update(findAdmin.userName, { userName, email, password })
            res.status(200).json({ message: `Successfully updated data` })
        } catch (err) {
            next(err)
        }
    }


    // static async sandbox(req, res, next) {
    //     // try {
    //     //     const { id } = req.params
    //     //     const { userName, email, password } = req.body
    //     //     if (!userName || !email || !password) {
    //     //         throw { name: `BAD REQUEST` }
    //     //     }
    //     //     const findAdmin = await Admin.findByPk(id)

    //     //     const test = await Admin.sandbox(findAdmin.userName, { userName, email, password })
    //     //     console.log(test, '<<<< hasilnya');
    //     //     res.status(200).json({ message: `Successfully updated  ${findAdmin.userName} to ${userName}` })
    //     // } catch (err) {
    //     //     next(err)
    //     // }


    //     // try to use schema mongoose
    //     try {
    //         const admin = req.body
    //         const result = await adminService.CreateAdmin(admin)
    //         console.log(admin, '<<<<<< result');
    //         res.status(201).json(admin)

    //         // res.send(result)
    //         // if (result) {
    //         // }
    //         // else {
    //         //     res.send('error>>>>>>>>>>>>')
    //         // }
    //     } catch (err) {
    //         next(err)
    //     }
    // }

}

module.exports = Controller