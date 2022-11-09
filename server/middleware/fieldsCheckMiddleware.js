const {addSlashes} = require('../utils/utils')
const {validationSchema} = require('../utils/validationSchema')
const Joi = require('joi')

// Экранирование 
const fieldShield = async(req,res,next) => {
    let {username,email,password} = req.body

    username = addSlashes(username)
    req.body.username = username

    if (req.body.email) {
        email = addSlashes(email)
        req.body.email = email
    }

    password = addSlashes(password)
    req.body.password = password

    next()
}

// Валидация
const regValidation = async (req,res,next) => {
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

const authValidation = async (req,res,next) => {
    const {username,password} = req.body

    const payload = {
        username: username,
        password: password,
    }

    const {error} = validationSchema.validate(payload)
    //если валидация не прошла успешно
    if (error) {
        return res.status(400).json({message:error.details[0].message})
    }

    next()
}

// Проверка кода
const codeValidation = async (req,res,next) => {
    let {code} = req.body

    //экранирование
    code = addSlashes(code)

    const payload = {
        code:code
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
    regValidation,
    authValidation,
    codeValidation,
}