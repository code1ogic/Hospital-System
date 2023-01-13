const express = require('express');
const {
	getAppointments,
	createAppointment,
	updateAppointment,
} = require('../controllers/appointmentController');

const router = express.Router();

router.route('/').get(getAppointments).post(createAppointment);
router.route('/:id').put(updateAppointment);

module.exports = router;
