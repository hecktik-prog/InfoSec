const Router = require('express')
const router = new Router()

const {registration, login} = require('../controllers/auth')
const {fieldShield, formValidation} = require('../middleware/fieldsCheckMiddleware')

// 1) Экранирование символов
// 2) Валидация полей
// 3) Добавление в бд
router.post('/registration', fieldShield, formValidation, registration)
router.post('/login', login)

module.exports = router