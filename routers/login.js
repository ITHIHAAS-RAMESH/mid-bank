
const express = require('express')
const router = express.Router()
const {getLogin,postLogin} = require('../controllers/login')
require('dotenv').config()
router.get('/',getLogin)
router.post('/',postLogin)


module.exports = router