const moment = require('moment');

const { DATE_FORMAT_STRING } = require('./constants');

const getStartOfDay = (date = new moment()) =>
	moment(moment(date).startOf('day')).format(DATE_FORMAT_STRING);

const getEndofDay = (date = new moment()) =>
	moment(moment(date).endOf('day')).format(DATE_FORMAT_STRING);

const getDate = (date = new moment()) =>
	moment(date).format(DATE_FORMAT_STRING);

const isDateValid = (date) => moment(date).isValid();

module.exports = { getDate, getStartOfDay, getEndofDay, isDateValid };
