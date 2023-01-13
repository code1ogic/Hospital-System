const express = require('express');

const {
	getPatientHistory,
} = require('../controllers/patientHistoryController');

const router = express.Router();

//Get all patients
router.get('/:id', getPatientHistory);

module.exports = router;
