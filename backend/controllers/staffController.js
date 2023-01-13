const asyncHandler = require('express-async-handler');
const bcryptjs = require('bcrypt');
const uuid = require('uuid');

const { dbConnection } = require('../config/db');
const { generateJWT } = require('../utils/helpers');
const { ADD_STAFF } = require('../utils/constants');
const { sendEmail } = require('../config/email');

// @desc Get all staff members
// @route GET /api/staff
// @access Public
const getStaff = asyncHandler(async (req, res) => {
	const sql = `SELECT sId,name,email,dob,role,gender,doj,contact FROM staff;`;

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
			res.status(404).send('Staff User Does not exists!');
			return;
		}
		const { password, ...staff } = result[0];
		res.status(200).json(staff);
	});
});

// @desc Get a staff profile
// @route GET /api/staff/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
	const sql = `SELECT * FROM staff where sid='${req.user}';`;

	dbConnection.query(sql, (err, result) => {
		if (err) throw err;
		const { password, ...staff } = result[0];
		res.status(200).json(staff);
	});
});

// @desc add a staff
// @route POST /api/staff
// @access Public
const registerStaff = asyncHandler(async (req, res) => {
	const { name, email, password, dob, role, gender, doj, contact } = req.body;
	if (!email || !name || !password) {
		res.status(400);
		throw new Error('Please enter valid data for registering a staff..!');
	}

	//check if user already present
	const searchUser = `SELECT * FROM staff WHERE LOWER(email) = LOWER('${email}')`;

	dbConnection.query(searchUser, async (err, result) => {
		if (err) throw new Error(err);

		if (result.length !== 0) {
			res.status(400);
			res.send('Staff User already present..!');
		} else {
			//encrypt the password
			const salt = await bcryptjs.genSalt(10);
			const encryptedPassword = await bcryptjs.hash(password, salt);

			const sId = uuid.v4();
			const insertUser = `INSERT INTO staff VALUES ('${sId}','${name}','${email}','${encryptedPassword}','${dob}','${role}','${gender}','${doj}','${contact}')`;

			dbConnection.query(insertUser, async (err, result) => {
				if (err) throw new Error(err);

				const newUser = {
					sId,
					name,
					email,
				};

				res.status(201).json({
					...newUser,
					token: generateJWT(newUser.sId),
				});

				try {
					await sendEmail(email, ...[, ,], ADD_STAFF);
				} catch (err) {
					console.error(err);
				}
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
		throw new Error('Invalid staff user credentials');
	}

	//check if user with given email is present in system
	const searchUser = `SELECT * FROM staff WHERE LOWER(email) = LOWER('${email}')`;

	dbConnection.query(searchUser, async (err, result) => {
		if (err) throw new Error(err);

		if (result.length === 0) {
			res.status(404);
			res.send('Staff User does not exists!');
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

module.exports = { getStaff, getAStaff, registerStaff, logInStaff, getMe };
