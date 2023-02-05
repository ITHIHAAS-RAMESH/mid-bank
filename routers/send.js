const express = require('express')
const router = express.Router()
const {getSendMoney,postMoney} = require('../controllers/send')
router.get('/',getSendMoney)
router.post('/',postMoney)

module.exports = router