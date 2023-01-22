const asyncHandler = require('express-async-handler');
const uuid = require('uuid');

const { dbConnection } = require('../config/db');

// @desc Get all patients
// @route GET /api/patients
// @access Public
const getPatients = asyncHandler(async (req, res) => {
	const sql = `SELECT * FROM patients;`;

	dbConnection.query(sql, (err, result) => {
		if (err) throw err;

		res.status(200).json(result);
	});
});

// @desc Get a patient
// @route GET /api/patients/:id
// @access Public
const getPatient = asyncHandler(async (req, res) => {
	const sql = `SELECT * FROM patients WHERE pId = '${req.params.id}';`;

	dbConnection.query(sql, (err, result) => {
		if (err) throw err;

		if (result.length === 0) res.status(404).send('Patient User do not exist!');
		res.status(200).json(result[0]);
	});
});

// @desc Get a patient by its contact No
// @route GET /api/patients/find?contact=contactNumber
// @access Public
const findPatient = asyncHandler(async (req, res) => {
	const { contact } = req.query;
	if (!contact) {
		res.status(400);
		throw new Error('Invalid Request!');
	}
	const sql = `SELECT * FROM patients WHERE contact='${contact}';`;
	dbConnection.query(sql, (err, result) => {
		if (err) throw err;

		if (result.length === 0) res.status(404).send('patient User do not exist! Please register patient.');

		res.status(200).json(result[0]);
	});
});

// @desc add a patient
// @route POST /api/patients
// @access Public
const addPatient = asyncHandler(async (req, res) => {
	const { name, contact, address, dob, gender } = req.body;
	if (!contact || !name) {
		res.status(400);
		throw new Error('Kindly provide valid patient data!');
	}

	//check if user already present
	const searchUser = `SELECT * FROM patients WHERE contact = '${contact}'`;

	dbConnection.query(searchUser, async (err, result) => {
		if (err) throw new Error(err);

		if (result.length !== 0) {
			res.status(400);
			res.send('Patient user already present..!');
		} else {
			const pId = uuid.v4();
			const insertUser = `INSERT INTO patients (pId, name, contact,address,dob,gender) VALUES ('${pId}','${name}','${contact}','${address}','${dob}','${gender}')`;

			dbConnection.query(insertUser, (err, result) => {
				if (err) throw new Error(err);

				const newUser = {
					pId,
					name,
					contact,
				};

				res.status(201).json({
					...newUser,
				});
			});
		}
	});
});

module.exports = { getPatients, getPatient, addPatient, findPatient };
