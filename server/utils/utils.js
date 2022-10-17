const crypto = require('crypto')

//функция для экранирования символов
const addSlashes = (field) => {

    field = field.replace(/\\/g,'\\\\')
    field = field.replace(/\//g,'\\\/')
    field = field.replace(/\'/g,'\\\'')
    field = field.replace(/\"/g,'\\"')
    field = field.replace(/\0/g,'\\0')

    //для избежания sql-инъекций через OR (number=number)
    field = field.replace(/\(/g,'\\(')
    field = field.replace(/\)/g,'\\)')

    return field
}

//функция для генерации 6ти значного кода
const generateCode = () => {
    const str="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let result =""

    for (let i = 0; i < 6; i++) {
        let num = parseInt(Math.random()*str.length)
        result = result + str.charAt(num)
    }

    return result
}

//хеширование пароля
const hash = (password) => {
    const hashPassword = crypto.createHmac('sha256',process.env.SECRET).update(password).digest('hex')
    return hashPassword
}

module.exports = {
    addSlashes,
    generateCode,
    hash,
}