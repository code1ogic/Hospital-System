const asyncHandler = require('express-async-handler');

const getUserRole = asyncHandler(async (req, res, next) => {
	const url = req.baseUrl;

	req.role = url.includes('staff') ? 'staff' : 'doctors';

	next();
});

module.exports = getUserRole;
