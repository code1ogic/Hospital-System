const moment = require('moment');
const jwt = require('jsonwebtoken');

const generateJWT = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: '12h' });
};

const { DATE_FORMAT_STRING } = require('./constants');

const getStartOfDay = (date = new moment()) =>
	moment(moment(date).startOf('day')).format(DATE_FORMAT_STRING);

const getEndofDay = (date = new moment()) =>
	moment(moment(date).endOf('day')).format(DATE_FORMAT_STRING);

const getDate = (date = new moment()) =>
	moment(date).format(DATE_FORMAT_STRING);

const isDateValid = (date) => moment(date).isValid();

const getAlertSMS = (appointment, queueNumber) => {
	return `Currently your number in queue is ${queueNumber}! Appointment details : 
	${appointment} `;
};

module.exports = {
	generateJWT,
	getDate,
	getStartOfDay,
	getEndofDay,
	isDateValid,
	getAlertSMS,
};
