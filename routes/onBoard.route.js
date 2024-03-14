const express = require('express')
const { onBoard, onBoardWebhook } = require('../controller/onBoard.controller')
const router = express.Router()

router.post('/onboard', onBoard)
router.post('/event/webhook', onBoardWebhook)

module.exports = router