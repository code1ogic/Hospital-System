const express = require('express');
const router = express.Router();

const {
	getPatients,
	getPatient,
	addPatient,
	findPatient,
} = require('../controllers/patientController');

router.route('/').get(getPatients).post(addPatient);
router.route('/find').get(findPatient);
router.route('/:id').get(getPatient);

module.exports = router;
