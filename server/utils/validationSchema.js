const Joi = require('joi')

const validationSchema = Joi.object({
    username: Joi.string()
        .empty()
        .alphanum()
        .min(5)
        .max(32)
        .messages({
            "string.min":"Минимум допустимо 5 символов в пользовательском имени.",
            "string.max":"Максимум допустимо 32 символов в пользовательском имени.",
            "string.alphanum":"Пользовательское имя должно состоять только из букв и цифр.",
            "string.empty":"Пользовательское имя не может быть пустым.",
        }),

    email: Joi.string()
        .empty()
        .max(100)
        .ruleset
        .regex(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/)
        .rule({message:'У адреса электронной почты структура: example@example.ru .'})
        .email({tlds: {allow: ['com','net','ru']}})
        .messages({
            "string.max":"Максимум допустимо 100 символов в адресе электронной почты.",
            "string.email":"Домен верхнего уровня может быть .com, .net, .ru",
            "string.empty":"Email не может быть пустым.",
        }),

    password: Joi.string()
        .min(8)
        .max(32)
        .empty()
        .ruleset
        .regex(/^[a-zA-Z0-9$#%&*+=@_~\{\}\!\?\-]{8,32}$/)
        .rule({message:'Пароль может состоять из строчных и заглавных букв, а также из символов $#%&*+=-@_~}{!? и цифр.'})
        .messages({
            "string.min":"Минимум допустимо 8 символов в пароле.",
            "string.max":"Максимум допустимо 32 символов в пароле.",
            "string.empty":"Пароль не может быть пустым.",
        }),
    
    confirmation_password: Joi.string()
        .ruleset
        .regex(/^(?=.*?[a-z]).{1,32}$/)
        .rule({message:'Пароль должен содержать минимум 1 строчную букву.'})
        .regex(/^(?=.*?[A-Z]).{1,32}$/)
        .rule({message:'Пароль должен содержать минимум 1 заглавную букву.'})
        .regex(/^(?=.*?[0-9]).{1,32}$/)
        .rule({message:'Пароль должен содержать минимум 1 цифру.'})
        .regex(/^(?=.*?[#%&*+=@_~\{\}\!\?\-]).{1,32}$/)
        .rule({message:'Пароль должен содержать минимум один специальный символ из #%&*+=@_~}{!?-.'}),

    code: Joi.string()
        .empty()
        .min(6)
        .max(6)
        .alphanum()
        .messages({
            "string.min":"Минимум допустимо 6 символов в коде.",
            "string.max":"Максимум допустимо 6 символов в коде.",
            "string.alphanum":"Код должен состоять только из букв и цифр.",
            "string.empty":"Код не может быть пустым.",
        }),
})

module.exports = {
    validationSchema,
}