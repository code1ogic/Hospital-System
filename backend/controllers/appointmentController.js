const asyncHandler = require('express-async-handler');
const uuid = require('uuid');

const { dbConnection } = require('../config/db');

// @desc Get all appointments. if date is not passed , API will return todays appointments
// if date is passed, it will return appointments after that date till todays date
// @route GET /api/appointments?dId=id&date=date
// @access Public
const getAppointments = asyncHandler(async (req, res) => {
	const { dId } = req.query;
	//set here todays date
	const todaysDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
	const date = req.query.date ? req.query.date : todaysDate;

	let response = {};
	//check doctorId present and get the details
	dbConnection.query(
		`SELECT name as doctorName, department FROM doctors WHERE dId='${dId}'`,
		(err, result) => {
			if (err) throw err;
			if (result.length === 0) {
				res.status(404).send('Doctor user do not exist! Invalid doctor Id');
			} else {
				response = result[0];
				const sql = `SELECT appt.aId, pt.name as patientName, pt.contact as patientContact, appt.type, appt.information, appt.apptDate, appt.status FROM appointment as appt LEFT OUTER JOIN patients as pt on appt.pId = pt.pId WHERE appt.dId='${dId}' AND appt.apptDate BETWEEN '${date}' AND '${todaysDate}' ORDER BY appt.apptDate, appt.status;`;
				dbConnection.query(sql, (err, result) => {
					if (err) throw err;
					response = { ...response, appointments: result };
					res.status(200).json(response);
				});
			}
		}
	);
});

// @desc Create a appointment
// @route POST /api/appointments
// @access Public

const createAppointment = asyncHandler(async (req, res) => {
	const { pId, dId, date, type, information } = req.body;

	if (!pId || !dId || !date) {
		res.status(400);
		throw new Error(
			'Invalid create Appointment request, Please enter valid data..!'
		);
	}
	let response;
	//check doctorId,patientId is present and get the details
	dbConnection.query(
		`SELECT name as doctorName, department FROM doctors WHERE dId='${dId}'`,
		(err, result) => {
			if (err) throw err;
			if (result.length === 0) {
				res.status(404).send('Doctor user do not exists!');
			} else {
				response = result[0];
				dbConnection.query(
					`SELECT name as patientName, contact as patientContact FROM patients WHERE pId='${pId}'`,
					(err, result) => {
						if (err) throw err;
						if (result.length === 0)
							res.status(404).send('patient user do not exists!');
						else {
							response = { ...response, ...result[0] };
							//check if user already has a appointment with doctor
							dbConnection.query(
								`SELECT aId from appointment WHERE pid='${pId}' and dId='${dId}' and apptDate='${date}';`,
								(err, result) => {
									if (err) throw err;
									if (result.length !== 0)
										res
											.status(400)
											.send(
												'This patient already has an appointment with the given doctor today!'
											);
									else {
										const aId = uuid.v4();
										const sql = `INSERT INTO appointment VALUES ('${aId}','${dId}','${pId}','${date}','${type}','${information}',0);`;

										dbConnection.query(sql, (err, result) => {
											if (err) throw new Error(err);
											res.status(200).json({
												aId,
												date,
												...response,
												status: 0,
											});
										});
									}
								}
							);
						}
					}
				);
			}
		}
	);
});

module.exports = { getAppointments, createAppointment };
