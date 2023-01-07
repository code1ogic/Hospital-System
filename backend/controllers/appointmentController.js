const asyncHandler = require('express-async-handler');
const moment = require('moment-timezone');
const uuid = require('uuid');

const { dbConnection } = require('../config/db');

// @desc Get all appointments. if date is not passed , API will return only todays appointments
// if date is passed, starting from passed date, it will return all appointments till todays date
// @route GET /api/appointments?dId=id&date=date
// @access Public
const getAppointments = asyncHandler(async (req, res) => {
	const { dId } = req.query;
	//set here todays date
	const todaysDate = moment(new Date()).tz('Asia/Kolkata');

	const startOfDay = moment
		.utc(todaysDate.startOf('day'))
		.format('YYYY-MM-DD HH:mm:ss');

	const endOfDay = moment
		.utc(todaysDate.endOf('day'))
		.format('YYYY-MM-DD HH:mm:ss');

	const date = req.query.date
		? moment.utc(req.query.date).format('YYYY-MM-DD HH:mm:ss')
		: startOfDay;

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
				const sql = `SELECT appt.aId, pt.name as patientName, pt.contact as patientContact, appt.type, appt.information, CONVERT_TZ(appt.apptDate,'+00:00','+5:30') as apptDate, CONVERT_TZ(appt.lastUpdate,'+00:00','+5:30') as apptLastUpdate, appt.status FROM appointment as appt LEFT OUTER JOIN patients as pt on appt.pId = pt.pId WHERE appt.dId='${dId}' AND appt.apptDate BETWEEN '${date}' AND '${endOfDay}' ORDER BY appt.apptDate, appt.status;`;
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
										const sql = `INSERT INTO appointment VALUES ('${aId}','${dId}','${pId}','${date}','${date}','${type}','${information}',0);`;

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

// @desc Update an appointment
// @route PUT /api/appointments/:id
// @access Public

const updateAppointment = asyncHandler(async (req, res) => {
	const aId = req.params.id;
	if (!aId) {
		res.status(400);
		throw new Error(
			'Invalid update appointment request! Kindly pass valid fields!'
		);
	}
	//for now these fields must be present
	const { symptoms, reports, prescription, comments } = req.body;
	const status = req.body.status ? req.body.status : 0;

	dbConnection.query(
		`UPDATE appointment SET status=${status} WHERE aId = '${aId}';`,
		(err, result) => {
			if (err) throw err;
			if (result.affectedRows === 0)
				res.status(404).send('Invalid Id, given appointment does not exists!');
			else {
				dbConnection.query(
					`SELECT * from appointment WHERE aId = '${aId}';`,
					(err, result) => {
						if (err) throw err;
						const { pId, dId } = result[0];
						const apptDate = moment
							.utc(result[0].apptDate)
							.format('YYYY-MM-DD HH:mm:ss');
						const sql = `INSERT INTO patientHistory VALUES('${pId}','${aId}','${dId}','${apptDate}','${symptoms}','${prescription}','${reports}','${comments}') ON DUPLICATE KEY UPDATE symptoms='${symptoms}', prescription='${prescription}', reports='${reports}' ,comments='${comments}';`;
						dbConnection.query(sql, (err, result) => {
							if (err) throw err;
							res.status(201).json({
								pId,
								aId,
								status,
							});
						});
					}
				);
			}
		}
	);
});
module.exports = { getAppointments, createAppointment, updateAppointment };
