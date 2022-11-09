const {User, Password, RegDates, Unverified, Verified} = require('../models/models')
const {generateCode, hash} = require('../utils/utils')
const {Op} = require('sequelize')

const registration = async (req, res) => {

    try {
        const {email, username, password} = req.body
        
        //Если пользователь с такой почтой уже есть
        let candidate = await User.findOne({where: {email}})

        if (candidate) {
            return res.status(406).json({message: 'Пользователь с такой электронной почтой уже есть.'})
        }

        //Если пользователь с таким именем уже есть
        candidate = await User.findOne({where: {username}})
        
        if (candidate) {
            return res.status(406).json({message: 'Пользователь с таким пользовательским именем уже есть.'})
        }

        //Генерация шестизначного кода подтверждения
        let code = generateCode()

        //Хеширование пароля
        const hashPassword = hash(password)

        //Формирование даты удаления
        let deleteTime = new Date()

        //Очистка лишних записей
        await Unverified.destroy({where: {
                [Op.or] : [
                    {deleteTime: {
                        [Op.lt]: deleteTime,
                    }},
                    {username:username}
                ]
            }, force:true
        })

        deleteTime.setMinutes(deleteTime.getMinutes() + 3)

        //Добавление во временную таблицу
        candidate = await Unverified.create({
            username: username,
            email: email,
            role: 'ADMIN',
            code: code,
            password: hashPassword,
            deleteTime:deleteTime,
        })

        return res.status(200).json({code: code, role: candidate.role, message:'Введите код с Qr-кода.'})

    } catch(error) {
        res.status(408).json({message:'При регистрации произошла непредвиденная ошибка.'})
    }
}

const login = async (req, res) => {

    try {
        const {username, password} = req.body

        //проверка на существование пользователя
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

        //Генерация шестизначного кода
        let code = generateCode()

        //Формирование даты удаления
        let deleteTime = new Date()
        
        //Очистка лишних записей
        await Verified.destroy({where: {
                [Op.or] : [
                    {deleteTime: {
                        [Op.lt]: deleteTime,
                    }},
                    {username:username}
                ]
            }, force:true
        })

        deleteTime.setMinutes(deleteTime.getMinutes() + 3)

        //Добавление во временную таблицу
        await Verified.create({
            username: user.username,
            code: code,
            deleteTime: deleteTime,
        })

        return res.json({code: code, role: user.role, message:'Введите код с Qr-кода.'})

    } catch(error) {
        res.status(408).json({message:'При авторизации произошла непредвиденная ошибка.'})
    }
}

const regVerification = async (req, res) => {
    try {
        const {code} = req.body

        const data = new Date()

        //поиск введённого пользователем кода во временной таблице
        const candidate = await Unverified.findOne({where:{
            [Op.and]:[{ code: code },
            {deleteTime:{
                [Op.gte]: data,
            }}]
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

    } catch(error) {
        res.status(408).json({message:'При подтверждении кода произошла непредвиденная ошибка.'})
    }
}

const authVerification = async (req, res) => {
    try {
        const {code} = req.body
        const data = new Date()

        //поиск кода во временной таблице для авторизации
        const checker = await Verified.findOne({where:{
            [Op.and]:[{ code: code },
            {deleteTime:{
                [Op.gte]: data,
            }}]
        }})
        
        if (!checker) {
            return res.status(406).json({message: 'Код введён неверно или устарел.'})
        }

        return res.status(200).json({message:'Пользователь успешно зашел.'})
        
    } catch(error) {
        res.status(408).json({message:'При подтверждении кода произошла непредвиденная ошибка.'})
    }
}

module.exports = {
    registration,
    login,
    regVerification,
    authVerification,
}