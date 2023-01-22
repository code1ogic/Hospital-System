const asyncHandler = require('express-async-handler');

const { sendSMS } = require('../config/sms');
const { getAlertSMS } = require('../utils/helpers');

// @desc send a sms
// @route POST /api/sendSMS
// @access Public
// Need to send SMS_API_KEY in header
const sendSMSAlerts = asyncHandler(async (req, res) => {
	const { appointment, contacts, queueNumber } = req.body;
	if (!appointment || !contacts || !queueNumber) {
		res.status(400);
		throw new Error('Invalid data for sendSMS!');
	}
	const numberArray = contacts.split(',').map(Number);
	const appointmentAlertmsg = getAlertSMS(appointment, queueNumber);

	await sendSMS(appointmentAlertmsg, numberArray);
	res.status(201).send('SMS has been sent!');
});

module.exports = { sendSMSAlerts };
