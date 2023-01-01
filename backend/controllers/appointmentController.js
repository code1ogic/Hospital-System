const asyncHandler = require('express-async-handler');
const uuid = require('uuid');

const { dbConnection } = require('../config/db');
const { validateDoctorId } = require('./doctorController');

// @desc Get all appointments for given doctor and date
// @route GET /api/appointments?dId=something&date=something
// @access Public
const getAppointments = asyncHandler(async (req, res) => {
	const { dId, date } = req.query;
	if (!dId || !date) {
		res.status(400);
		throw new Error('Invalid get all Appointments request!');
	}

	//check if valid dId is provided TODO: Fix this
	const temp = await validateDoctorId(dId);

	if (!temp) {
		res.status(404).send('Doctor does not exists!');
	} else {
		const sql = `SELECT * from appointment WHERE dId='${dId}' and apptDate='${date}';`;
		dbConnection.query(sql, (err, result) => {
			if (err) throw err;

			res.status(200).json(result);
		});
	}
});

// @desc Create a appointment
// @route POST /api/appointments
// @access Public

const createAppointment = asyncHandler(async (req, res) => {
	const { pId, dId, date } = req.body;

	if (!pId || !dId || !date) {
		res.status(400);
		throw new Error(
			'Invalid create Appointment request, Please enter valid data..!'
		);
	}
	let response;
	//check doctorId,patientId is present and get the details

	//check if user already has a appointment with doctor
	dbConnection.query(
		`SELECT * from appointment WHERE pid='${pId}' and dId='${dId}' and apptDate='${date}';`,
		(err, result) => {
			if (err) throw err;
			if (result.length !== 0)
				res.status(400).send('This Patient has already an appointment today!');
			else {
				const aId = uuid.v4();
				const sql = `INSERT INTO appointment (aId,dId,pId,apptDate,status) VALUES ('${aId}','${dId}','${pId}','${date}',0)`;

				dbConnection.query(sql, (err, result) => {
					if (err) throw new Error(err);
					res.status(200).json({
						aId,
						pId,
						dId,
						date,
						status: 'pending',
					});
				});
			}
		}
	);
});

module.exports = { getAppointments, createAppointment };
