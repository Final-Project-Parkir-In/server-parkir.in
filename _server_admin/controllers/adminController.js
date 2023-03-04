const { Admin } = require("../models/admin")

class Controller {

    static async createAdmin(req, res, next) {
        try {
            const { userName, email, password } = req.body 
            if(!userName || !email || !password ){
                throw { name : `BAD REQUEST`}
            }
            const data = await Admin.createAdmin({
                userName, email, password
            })

            // const output = {
            //     id: data.dataValues.id,
            //     userName: data.dataValues.userName,
            //     email: data.dataValues.email
            // }
            res.status(201).json(data)
        } catch (err) {
            next(err)
        }
    }

    // static async allAdmin(req, res, next) {
    //     try {
    //         const data = await Admin.findAll({
    //             attributes: ['id', 'userName', 'email']
    //         });
    //         res.status(200).json(data)
    //     } catch (err) {
    //         next(err)
    //     }
    // }

    // static async detailAdmin(req, res, next) {
    //     try {
    //         const { id } = req.params
    //         const data = await Admin.findByPk(id)
    //         if (!data) {
    //             throw { name: "NotFound" }
    //         }
    //         const output = {
    //             id: data.dataValues.id,
    //             userName: data.dataValues.userName,
    //             email: data.dataValues.email
    //         }
    //         res.status(200).json(output)
    //     } catch (err) {
    //         next(err)
    //     }
    // }
    // static async deleteAdmin(req, res, next) {
    //     try {
    //         const { id } = req.params
    //         const findAdmin = await Admin.findByPk(id)
    //         if (!findAdmin) {
    //             throw { name: "NotFound" }
    //         }
    //         await Admin.destroy({
    //             where: {
    //                 id
    //             }
    //         })
    //         res.status(200).json({ message: `Successfully removed ${findAdmin.userName} from database` })
    //     } catch (err) {
    //         next(err)
    //     }
    // }

    // static async updateAdmin(req, res, next) {
    //     try {
    //         const { id } = req.params
    //         const { userName, email, password } = req.body
    //         const findAdmin = await Admin.findByPk(id)
    //         if (!findAdmin) {
    //             throw { name: "NotFound" }
    //         }
    //         const updateAdmin = await Admin.update({
    //             userName, email, password
    //         },
    //             {
    //                 where: {
    //                     id
    //                 }
    //             })
    //         res.status(200).json({ message: `Successfully updated id : ${id}` })
    //     } catch (err) {
    //         next(err)
    //     }
    // }
}


module.exports = Controller