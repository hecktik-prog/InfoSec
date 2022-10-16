const Router = require('express')
const router = new Router()

const {registration, login, verification} = require('../controllers/auth')
const {fieldShield, formValidation, codeValidation} = require('../middleware/fieldsCheckMiddleware')

// 1) Экранирование символов
// 2) Валидация полей
// 3) Добавление в бд
router.post('/registration', fieldShield, formValidation, registration)
router.post('/verification', codeValidation, verification)
router.post('/login', login)

module.exports = router