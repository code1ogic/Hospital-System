const asyncHandler = require('express-async-handler');
const uuid = require('uuid');

const { dbConnection } = require('../config/db');
const {
	getDate,
	getEndofDay,
	getStartOfDay,
	isDateValid,
} = require('../utils/helpers');

// @desc Get all appointments. if date is not passed , API will return only todays appointments
// if date is passed, starting from passed date, it will return all appointments till todays date
// @route GET /api/appointments?dId=id&date=date
// @access Public
const getAppointments = asyncHandler(async (req, res) => {
	const { dId } = req.query;

	const startOfDay = getStartOfDay();
	const endOfDay = getEndofDay();

	if (!isDateValid(req.query.date)) {
		res.status(404).send('Invalid date passed!');
		return;
	}
	const date = req.query.date ? getDate(req.query.date) : startOfDay;

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
				const sql = `SELECT pt.pId, appt.aId, pt.name as patientName, pt.contact as patientContact, appt.type, appt.information, CONVERT_TZ(appt.apptDate,'+00:00','+5:30') as apptDate, CONVERT_TZ(appt.lastUpdate,'+00:00','+5:30') as apptLastModified, appt.status FROM appointment as appt LEFT OUTER JOIN patients as pt on appt.pId = pt.pId WHERE appt.dId='${dId}' AND appt.apptDate BETWEEN '${date}' AND '${endOfDay}' ORDER BY appt.apptDate, appt.status;`;
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
	const { pId, dId, type, information, date } = req.body;

	if (!pId || !dId || !date || !isDateValid(date)) {
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
							const dateReceived = getDate(date);
							const startOfDay = getStartOfDay(date);
							const endOfDay = getEndofDay(date);

							dbConnection.query(
								`SELECT aId from appointment WHERE pid='${pId}' AND dId='${dId}' AND apptDate BETWEEN '${startOfDay}' AND '${endOfDay}';`,
								(err, result) => {
									if (err) throw err;
									if (result.length !== 0) {
										res
											.status(400)
											.send(
												'This patient already has an appointment with the given doctor today!'
											);
									} else {
										const aId = uuid.v4();
										const sql = `INSERT INTO appointment VALUES ('${aId}','${dId}','${pId}','${dateReceived}','${dateReceived}','${type}','${information}',0);`;

										dbConnection.query(sql, (err, result) => {
											if (err) throw new Error(err);
											res.status(200).json({
												aId,
												date: dateReceived,
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

	const symptoms = req.body.symptoms ?? '';
	const reports = req.body.reports ?? '';
	const prescription = req.body.prescription ?? '';
	const comments = req.body.comments ?? '';
	const status = req.body.status ?? 0;

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
						const apptDate = getDate(result[0].apptDate);

						const sql = `INSERT INTO patientHistory VALUES('${pId}','${aId}','${dId}','${apptDate}','${symptoms}','${prescription}','${reports}','${comments}') ON DUPLICATE KEY UPDATE symptoms=COALESCE(NULLIF('${symptoms}', ''), symptoms), prescription=COALESCE(NULLIF('${prescription}', ''), prescription), reports=COALESCE(NULLIF('${reports}', ''), reports) ,comments=COALESCE(NULLIF('${comments}', ''), comments);`;
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
