const {User, Password, RegDates, Unverified} = require('../models/models')
const {generateCode} = require('../utils/utils')
const {Op} =require('sequelize')
const crypto = require('crypto')

const registration = async (req, res) => {

    const {email, username, password, role} = req.body
    
    //Если пользователь с такой почтой уже есть
    let candidate = await User.findOne({where: {email}})

    if (candidate) {
        return res.status(406).json({message: 'Пользователь с такой электронной почтой уже есть.'})
    }

    //Если пользователь с таким юзернеймом уже есть
    candidate = await User.findOne({where: {username}})
    
    if (candidate) {
        return res.status(406).json({message: 'Пользователь с таким пользовательским именем уже есть.'})
    }

    //Генерация 6ти значного кода
    let code = generateCode()

    //отправка письма

    //Хеширование пароля
    const hashPassword = crypto.createHmac('sha256',process.env.SECRET).update(password).digest('hex')

    //Формирование даты удаления
    let deleteTime = new Date()

    //Очистка лишних записей
    await Unverified.destroy({where: {
            deletedAt: {
                [Op.lte] : deleteTime
            }
        }, force:true
    })

    deleteTime.setMinutes(deleteTime.getMinutes() + 3)

    //Добавление во временную таблицу
    candidate = await Unverified.create({
        username: username,
        email: email,
        role: role,
        code: code,
        password: hashPassword,
        deletedAt:deleteTime,
    })

    return res.status(200).json({message:'Письмо отправлено.'})
}

const login = async (req, res) => {
    return res.json({message:'OK'})
}

const verification = async (req, res) => {
    const {code} = req.body

    //проверка кода - обязательно сначала выключить paranoid, иначе будет искать только там где deletedAt = NULL
    const candidate = await Unverified.findOne({paranoid:false},{where: {
        code: {
            [Op.eq] : code
        },
    }})
    console.log(candidate)

    if (!candidate) {
        return res.status(406).json({message: 'Код введён неверно или устарел.'})
    }

    //создание пользователя
    const user = await User.create({
        username: candidate.username,
        email: candidate.email,
        role: candidate.role,
    })

    //сохранение его пароля
    await Password.create({
        password: candidate.password,
        userId: user.id,
    })

    //сохранение даты регистрации
    await RegDates.create({
        regdate: user.createdAt,
        userId: user.id,
    })

    return res.status(200).json({message:'Аккаунт успешно создан.'})
}

module.exports = {
    registration,
    login,
    verification,
}