const asyncHandler = require('express-async-handler');

const { dbConnection } = require('../config/db');

// @desc Get patient history records
// @route GET /api/patient-history/:id
// @access Public
const getPatientHistory = asyncHandler(async (req, res) => {
	const pId = req.params.id;
	if (!pId) {
		res.status(400);
		throw new Error(
			'Invalid get patientHistory request! Kindly provide valid data!'
		);
	}
	let sql = `SELECT name as patientName, gender as patientGender from patients WHERE pId = '${pId}'`;
	dbConnection.query(sql, (err, result) => {
		if (err) throw err;
		if (result.length === 0) {
			res.status(404).send('This patient Id does not exists!');
			return;
		}
		const patientDetails = result[0];
		let response = { ...patientDetails };
		sql = `SELECT CONVERT_TZ(apt.apptDate , '+00:00', '+05:30') as apptDate,apt.type,apt.information,dt.name as doctorName, dt.department, apt.status, ph.symptoms,ph.prescription,ph.reports,ph.comments FROM patientHistory as ph join appointment as apt on ph.aId = apt.aId join doctors as dt on ph.dId = dt.dId where ph.pId = '${pId}';`;
		dbConnection.query(sql, (err, result) => {
			if (err) throw err;
			res.status(200).json({
				...response,
				appointments: [...result],
			});
		});
	});
});

module.exports = { getPatientHistory };
