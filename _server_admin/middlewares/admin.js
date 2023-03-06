const joi = require('joi');

const adminValidator = {
    createOrUpdateAdmin : {
        body : joi.object({
            userName : joi.string().required(),
            email : joi.string().email().required(),
            password : joi.string().min(3).required()
        })
    }, 
    handleLogin : {
        body : joi.object({
            email : joi.string().required(), 
            password : joi.string().required()
        })
    }
}


module.exports = {adminValidator}