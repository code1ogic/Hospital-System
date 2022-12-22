const asyncHandler = require('express-async-handler');
const bcryptjs = require('bcrypt');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');

const { dbConnection } = require('../config/db');

const generateJWT = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: '12h' });
};

const getDoctorId = async (email) => {
	const searchQuery = `SELECT * FROM doctors WHERE LOWER(email) = LOWER('${email}')`;
	dbConnection.query(searchQuery, (err, result) => {
		if (err) throw new Error(err);
		if (result === 1) return result[0].dId;
		return null;
	});
};

// @desc Get all doctors
// @route GET /api/doctors
// @access Private
const getDoctors = asyncHandler(async (req, res) => {
	const sql = `SELECT * FROM doctors;`;

	dbConnection.query(sql, (err, result) => {
		if (err) throw err;

		res.status(200).json(result);
	});
});

// @desc Get a doctor
// @route GET /api/doctors/:id
// @access Private
const getDoctor = asyncHandler(async (req, res) => {
	const sql = `SELECT * FROM doctors where did='${req.params.id}';`;

	dbConnection.query(sql, (err, result) => {
		if (err) throw err;
		if (result.length === 0) {
			res.status(404).send('User Does not exists!');
		} else res.status(200).json(result[0]);
	});
});

// @desc Get a doctor profile
// @route GET /api/doctors/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
	const sql = `SELECT * FROM doctors where did='${req.user}';`;

	dbConnection.query(sql, (err, result) => {
		if (err) throw err;
		else res.status(200).json(result[0]);
	});
});

// @desc Add a doctor
// @route POST /api/doctors
// @access Public
const registerDoctor = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;
	if (!email || !name || !password) {
		res.status(400);
		res.send('Please enter valid data..!');
	}

	//check if user already present
	const searchUser = `SELECT * FROM doctors WHERE LOWER(email) = LOWER('${email}')`;

	dbConnection.query(searchUser, async (err, result) => {
		if (err) throw new Error(err);

		if (result.length !== 0) {
			res.status(400);
			res.send('User already present..!');
		} else {
			//encrypt the password
			const salt = await bcryptjs.genSalt(10);
			const encryptedPassword = await bcryptjs.hash(password, salt);

			const dId = uuid.v4();
			const insertUser = `INSERT INTO doctors (dId, name, email, password) VALUES ('${dId}','${name}','${email}','${encryptedPassword}')`;

			dbConnection.query(insertUser, (err, result) => {
				if (err) throw new Error(err);

				console.log(result);
				const newUser = {
					dId,
					name,
					email,
				};

				res.status(201).json({
					...newUser,
					token: generateJWT(newUser.dId),
				});
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
		throw new Error('Invalid Credentials');
	}

	//check if user with given email is present in system
	const searchUser = `SELECT * FROM doctors WHERE LOWER(email) = LOWER('${email}')`;

	dbConnection.query(searchUser, async (err, result) => {
		if (err) throw new Error(err);

		if (result.length === 0) {
			res.status(404);
			res.send('User does not exists!');
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

module.exports = { getDoctors, getDoctor, registerDoctor, logInDoctor, getMe };
