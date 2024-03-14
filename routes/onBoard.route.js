const express = require('express')
const { onBoard, onBoardWebhook } = require('../controller/onBoard.controller')
const router = express.Router()

router.post('/onboard', onBoard)
router.post('/onboard-webhook', onBoardWebhook)

module.exports = router