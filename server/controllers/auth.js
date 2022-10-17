const {User, Password, RegDates, Unverified, Verified} = require('../models/models')
const {generateCode, hash} = require('../utils/utils')
const {Op} =require('sequelize')

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
    const hashPassword = hash(password)

    //Формирование даты удаления
    let deleteTime = new Date()

    //Очистка лишних записей
    await Unverified.destroy({where: {
            [Op.or] : [
                {deletedAt: deleteTime},
                {username: username},
            ]
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
    const {username, password} = req.body

    //проверка существования пользователя
    const user = await User.findOne(
        {
            where: {username},
            include: [
                {model: Password, as: "password"}
            ],
        }
    )

    if (!user) {
        return res.status(406).json({message: 'Введено неверное пользовательское имя.'})
    }

    //проверка пароля пользователя
    const hashPassword = hash(password)

    if (hashPassword !== user.password.password) {
        return res.status(406).json({message: 'Пароль введён неверно.'})
    }

    //Генерация 6ти значного кода
    let code = generateCode()

    //отправка письма

    //Формирование даты удаления
    let deleteTime = new Date()
    
    //Очистка лишних записей
    await Verified.destroy({where: {
            [Op.or] : [
                {deletedAt: deleteTime},
                {username: username},
            ]
        }, force:true
    })

    deleteTime.setMinutes(deleteTime.getMinutes() + 3)

    //Добавление во временную таблицу
    await Verified.create({
        username: user.username,
        code: code,
        deletedAt:deleteTime,
    })

    return res.json({ message:'Письмо отправлено.'})
}

const regVerification = async (req, res) => {
    const {code} = req.body

    //проверка кода - обязательно сначала выключить paranoid, иначе будет искать только там где deletedAt = NULL
    const candidate = await Unverified.findOne({paranoid:false},{where: {
        code: {
            [Op.eq] : code
        },
    }})

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

const authVerification = async (req, res) => {
    const {code} = req.body

    const checker = await Verified.findOne({paranoid:false},{where: {
        code: {
            [Op.eq] : code
        },
    }})

    if (!checker) {
        return res.status(406).json({message: 'Код введён неверно или устарел.'})
    }

    return res.status(200).json({message:'Пользователь успешно зашел.'})
}

module.exports = {
    registration,
    login,
    regVerification,
    authVerification,
}