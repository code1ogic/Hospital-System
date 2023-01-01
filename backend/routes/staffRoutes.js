const express = require('express');
const router = express.Router();

const authenticateRoutes = require('../middleware/authMiddleware');
const getUserRole = require('../middleware/userRoleMiddleware');
const {
	getStaff,
	getAStaff,
	registerStaff,
	logInStaff,
	getMe,
} = require('../controllers/staffController');

router.route('/').get(getStaff).post(registerStaff);
router.route('/login').post(logInStaff);
router.route('/me').get(getUserRole, authenticateRoutes, getMe);
router.route('/:id').get(getAStaff);

module.exports = router;
