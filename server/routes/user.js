const Router = require('express')
const router = new Router()
const { getAllUsers, encodeText, decodeText, getAllTexts } = require('../controllers/user')

router.get('/', getAllUsers)

router.post('/encode', encodeText)

router.post('/decode', decodeText)

router.get('/records', getAllTexts)

module.exports = router