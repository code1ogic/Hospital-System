const express = require('express');

const { sendSMSAlerts } = require('../controllers/smsController');

const router = express.Router();

router.route('/').post(sendSMSAlerts);

module.exports = router;
