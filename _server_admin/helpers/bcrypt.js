const bcrypt = require('bcryptjs');

const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(10)
    return hash = bcrypt.hashSync(password, salt)


}

const comparePassword = (password, hash) => {
    return compare = bcrypt.compareSync(password, hash)
}

module.exports = { hashPassword, comparePassword }