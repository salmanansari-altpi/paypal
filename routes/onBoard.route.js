const express = require('express')
const { onBoard } = require('../controller/onBoard.controller')
const router = express.Router()

router.post('/onboard', onBoard)

module.exports = router