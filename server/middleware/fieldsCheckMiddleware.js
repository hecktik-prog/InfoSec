const {addSlashes} = require('../utils/utils')
const {validationSchema} = require('../utils/validationSchema')
const Joi = require('joi')

//экранирование 
const fieldShield = async(req,res,next) => {
    let {username,email,password} = req.body

    username = addSlashes(username)
    req.body.username = username

    email = addSlashes(email)
    req.body.email = email

    password = addSlashes(password)
    req.body.password = password

    next()
}

//валидация
const formValidation = async (req,res,next) => {
    const {username,email,password} = req.body

    const payload = {
        username: username,
        email: email,
        password: password,
        confirmation_password: password,
    }

    const {error} = validationSchema.validate(payload)
    //если валидация не прошла успешно
    if (error) {
        return res.status(400).json({message:error.details[0].message})
    }

    next()
}

module.exports = {
    fieldShield,
    formValidation,
}