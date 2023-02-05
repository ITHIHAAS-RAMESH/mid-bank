const express = require('express')

const router = express.Router()
const loginRoute = require('./login')
const {postData,loadPage} = require('../controllers/signup')
router.get('/',loadPage)
router.post('/',postData)

module.exports = router