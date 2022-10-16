const {User, Password, RegDates, Unverified} = require('../models/models')

const registration = async (req, res) => {

    const {login, username} = req.body
    
    //Если пользователь с такой почтой уже есть
    const user = await User.findOne({where: {login}})
    if (user) {
        return res.status(406).json({message: 'Пользователь с такой электронной почтой уже есть.'})
    }

    //Если пользователь с таким юзернеймом уже есть
    user = await User.findOne({where: {username}})
    if (user) {
        return res.status(406).json({message: 'Пользователь с таким пользовательским именем уже есть.'})
    }

    //Отправка письма

    return res.status(200).json({message:'Письмо отправлено.'})
}

const login = async (req, res) => {
    return res.json({message:'OKI'})
}

const verification = async (req, res) => {
    return res.status(200).json({message:'Аккаунт успешно создан.'})
}

module.exports = {
    registration,
    login,
    verification,
}