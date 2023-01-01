const asyncHandler = require('express-async-handler');
const bcryptjs = require('bcrypt');
const uuid = require('uuid');

const { dbConnection } = require('../config/db');
const { generateJWT } = require('../controllers/doctorController');

// @desc Get all staff members
// @route GET /api/staff
// @access Public
const getStaff = asyncHandler(async (req, res) => {
	const sql = `SELECT * FROM staff;`;

	dbConnection.query(sql, (err, result) => {
		if (err) throw err;

		res.status(200).json(result);
	});
});

// @desc Get staff member
// @route GET /api/staff/:id
// @access Public
const getAStaff = asyncHandler(async (req, res) => {
	const sql = `SELECT * FROM staff WHERE sId = '${req.params.id}';`;

	dbConnection.query(sql, (err, result) => {
		if (err) throw err;

		if (result.length === 0) {
			res.status(404).send('User Does not exists!');
		} else res.status(200).json(result[0]);
	});
});

// @desc add a staff
// @route POST /api/staff
// @access Public
const registerStaff = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;
	if (!email || !name || !password) {
		res.status(400);
		throw new Error('Please enter valid data..!');
	}

	//check if user already present
	const searchUser = `SELECT * FROM staff WHERE LOWER(email) = LOWER('${email}')`;

	dbConnection.query(searchUser, async (err, result) => {
		if (err) throw new Error(err);

		if (result.length !== 0) {
			res.status(400);
			res.send('User already present..!');
		} else {
			//encrypt the password
			const salt = await bcryptjs.genSalt(10);
			const encryptedPassword = await bcryptjs.hash(password, salt);

			const sId = uuid.v4();
			const insertUser = `INSERT INTO staff (sId, name, email, password) VALUES ('${sId}','${name}','${email}','${encryptedPassword}')`;

			dbConnection.query(insertUser, (err, result) => {
				if (err) throw new Error(err);

				const newUser = {
					sId,
					name,
					email,
				};
				console.log(generateJWT(newUser.sId));
				res.status(201).json({
					...newUser,
					token: generateJWT(newUser.sId),
				});
			});
		}
	});
});

// @desc Login a staff member
// @route POST /api/staff/login
// @access Public
const logInStaff = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		res.status(404);
		throw new Error('Invalid user credentials');
	}

	//check if user with given email is present in system
	const searchUser = `SELECT * FROM staff WHERE LOWER(email) = LOWER('${email}')`;

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
					sId: result[0].sId,
					name: result[0].name,
					email: result[0].email,
					token: generateJWT(result[0].sId),
				});
			}
		}
	});
});

// @desc Get a staff profile
// @route GET /api/staff/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
	const sql = `SELECT * FROM staff where sid='${req.user}';`;

	dbConnection.query(sql, (err, result) => {
		if (err) throw err;
		else res.status(200).json(result[0]);
	});
});

module.exports = { getStaff, getAStaff, registerStaff, logInStaff, getMe };
