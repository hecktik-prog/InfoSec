const Router = require('express')
const router = new Router()

const {registration, login, regVerification, authVerification, test, submitCode} = require('../controllers/auth')
const {fieldShield, regValidation, authValidation, codeValidation} = require('../middleware/fieldsCheckMiddleware')

// 1) Экранирование символов
// 2) Валидация полей
// 3) Добавление в бд
router.post('/registration', fieldShield, regValidation, registration)

router.post('/registration/verification', codeValidation, regVerification)

router.post('/login', fieldShield, authValidation, login)

router.post('/login/verification',codeValidation, authVerification)

router.post('/test', test)

router.post('/submit',submitCode)

module.exports = router