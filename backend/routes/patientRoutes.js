const express = require('express');
const router = express.Router();

const {
	getPatients,
	getPatient,
	addPatient,
} = require('../controllers/patientController');

router.route('/').get(getPatients).post(addPatient);
router.route('/:id').get(getPatient);

module.exports = router;
