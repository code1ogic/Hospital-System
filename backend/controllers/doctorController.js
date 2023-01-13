const asyncHandler = require('express-async-handler');
const bcryptjs = require('bcrypt');
const uuid = require('uuid');

const { dbConnection } = require('../config/db');
const { generateJWT } = require('../utils/helpers');
const { ADD_DOCTOR } = require('../utils/constants');
const { sendEmail } = require('../config/email');

// @desc Get all doctors
// @route GET /api/doctors
// @access Public
const getDoctors = asyncHandler(async (req, res) => {
	const sql = `SELECT dId,name,email,dob,degree,department,gender,doj,contact FROM doctors;`;

	dbConnection.query(sql, (err, result) => {
		if (err) throw err;

		res.status(200).json(result);
	});
});

// @desc Get a doctor
// @route GET /api/doctors/:id
// @access Public
const getDoctor = asyncHandler(async (req, res) => {
	const sql = `SELECT * FROM doctors where dId='${req.params.id}';`;

	dbConnection.query(sql, (err, result) => {
		if (err) throw err;
		if (result.length === 0) {
			res.status(404).send('Doctor User does not exists!');
			return;
		}
		const { password, ...doctor } = result[0];
		res.status(200).json(doctor);
	});
});

// @desc Get a doctor profile
// @route GET /api/doctors/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
	const sql = `SELECT * FROM doctors where dId='${req.user}';`;

	dbConnection.query(sql, (err, result) => {
		if (err) throw err;
		const { password, ...doctor } = result[0];
		res.status(200).json(doctor);
	});
});

// @desc Add a doctor
// @route POST /api/doctors
// @access Public
const registerDoctor = asyncHandler(async (req, res) => {
	const {
		name,
		email,
		password,
		degree,
		department,
		contact,
		gender,
		dob,
		doj,
	} = req.body;
	if (!email || !name || !password) {
		res.status(400);
		throw new Error('Please enter valid data for registering a doctor..!');
	}

	//check if user already present
	const searchUser = `SELECT * FROM doctors WHERE LOWER(email) = LOWER('${email}')`;

	dbConnection.query(searchUser, async (err, result) => {
		if (err) throw new Error(err);

		if (result.length !== 0) {
			res.status(400);
			res.send('Doctor User already present..!');
		} else {
			//encrypt the password
			const salt = await bcryptjs.genSalt(10);
			const encryptedPassword = await bcryptjs.hash(password, salt);

			const dId = uuid.v4();
			const insertUser = `INSERT INTO doctors VALUES ('${dId}','${name}','${email}','${encryptedPassword}','${dob}','${degree}','${department}','${gender}','${doj}','${contact}')`;

			dbConnection.query(insertUser, async (err, result) => {
				if (err) throw new Error(err);

				const newUser = {
					dId,
					name,
					email,
				};

				res.status(201).json({
					...newUser,
					token: generateJWT(newUser.dId),
				});

				try {
					await sendEmail(email, ...[, ,], ADD_DOCTOR);
				} catch (err) {
					console.error(err);
				}
			});
		}
	});
});

// @desc Login a doctor
// @route POST /api/doctors/login
// @access Public
const logInDoctor = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		res.status(404);
		throw new Error('Invalid doctor login credentials!');
	}

	//check if user with given email is present in system
	const searchUser = `SELECT * FROM doctors WHERE LOWER(email) = LOWER('${email}')`;

	dbConnection.query(searchUser, async (err, result) => {
		if (err) throw new Error(err);

		if (result.length === 0) {
			res.status(404);
			res.send('Doctor User does not exists!');
		} else {
			//decrypt the password
			const isCorrectPass = await bcryptjs.compare(
				password,
				result[0].password
			);

			if (!isCorrectPass) {
				res.status(400);
				res.send('Please enter valid credentials!');
			} else {
				res.status(200).json({
					dId: result[0].dId,
					name: result[0].name,
					email: result[0].email,
					token: generateJWT(result[0].dId),
				});
			}
		}
	});
});

module.exports = {
	getDoctors,
	getDoctor,
	registerDoctor,
	logInDoctor,
	getMe,
};
