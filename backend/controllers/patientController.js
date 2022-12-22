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

		if (result.length === 0) res.status(404).send('User Does not exists!');
		res.status(200).json(result[0]);
	});
});

// @desc add a patient
// @route POST /api/patients
// @access Public
const addPatient = asyncHandler(async (req, res) => {
	const { name, contact } = req.body;
	if (!contact || !name) {
		res.status(400);
		throw new Error('Kindly provide valid data!');
	}

	//check if user already present
	const searchUser = `SELECT * FROM patients WHERE contact = '${contact}'`;

	dbConnection.query(searchUser, async (err, result) => {
		if (err) throw new Error(err);

		if (result.length !== 0) {
			res.status(400);
			res.send('User already present..!');
		}
	});

	const pId = uuid.v4();
	const insertUser = `INSERT INTO patients (pId, name, contact) VALUES ('${pId}','${name}','${contact}')`;

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
});

module.exports = { getPatients, getPatient, addPatient };
