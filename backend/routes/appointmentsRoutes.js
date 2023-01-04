const express = require('express');
const {
	getAppointments,
	createAppointment,
} = require('../controllers/appointmentController');

const router = express.Router();

router.route('/').get(getAppointments).post(createAppointment);

module.exports = router;
