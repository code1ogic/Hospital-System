const asyncHandler = require('express-async-handler');

const { sendSMS } = require('../config/sms');
const { getAlertSMS } = require('../utils/helpers');

const sendSMSAlerts = asyncHandler(async (req, res) => {
	const { appointment, contact, queueNumber } = req.body;
	if (!appointment || !contact || !queueNumber) {
		res.status(400);
		throw new Error('Invalid data for sendSMS!');
	}
	const appointmentAlertmsg = getAlertSMS(appointment, queueNumber);
	await sendSMS(appointmentAlertmsg, [contact]);
	res.status(201);
});

module.exports = { sendSMSAlerts };
