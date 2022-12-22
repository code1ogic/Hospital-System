const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const { dbConnection } = require('../config/db');

const authenticateRoutes = asyncHandler(async (req, res, next) => {
	let token;
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		try {
			token = req.headers.authorization.split(' ')[1];

			const decodeToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

			const table = req.role === 'staff' ? 'staff' : 'doctors';
			const id = req.role === 'staff' ? 'sId' : 'dId';

			const searchQuery = `SELECT * FROM ${table} WHERE ${id} = '${decodeToken.id}'`;

			dbConnection.query(searchQuery, (err, result) => {
				if (err) throw err;

				if (result.length >= 1) {
					req.user = decodeToken.id;
					next();
				} else {
					res.status(401);
					res.send('Not authorised, Invalid token!');
				}
			});
		} catch (error) {
			res.status(401);
			throw new Error(error);
		}
	}
	if (!token) {
		res.status(401);
		throw new Error('Not Authorised, No token found!');
	}
});

module.exports = authenticateRoutes;
