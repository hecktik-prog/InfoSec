const Router = require('express')
const router = new Router()

const {registration, login, regVerification, authVerification} = require('../controllers/auth')
const {fieldShield, regValidation, authValidation, codeValidation} = require('../middleware/fieldsCheckMiddleware')

router.post('/registration', fieldShield, regValidation, registration)

router.post('/registration/verification', codeValidation, regVerification)

router.post('/login', fieldShield, authValidation, login)

router.post('/login/verification',codeValidation, authVerification)

module.exports = router