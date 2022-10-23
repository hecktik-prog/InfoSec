const Router = require('express')
const router = new Router()
const {getAllUsers} = require('../controllers/user')

router.get('/', getAllUsers)

module.exports = router