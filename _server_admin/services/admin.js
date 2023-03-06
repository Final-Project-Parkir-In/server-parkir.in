const adminModel = require('../models/admin_');

module.exports = class AdminService {

    async CreateAdmin(data) {
        console.log(data, '<<< masuk service');
        const adminToAdd = await new adminModel(data).save();
        console.log(adminToAdd, 'amdintoadd>>>>');
        return adminToAdd
    }
}