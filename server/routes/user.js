const Router = require('express')
const router = new Router()
const { getAllUsers, encodeText, decodeText } = require('../controllers/user')

router.get('/', getAllUsers)

router.post('/encode', encodeText)

router.post('/decode', decodeText)

module.exports = router