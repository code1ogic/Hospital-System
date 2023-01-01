const express = require('express');
const router = express.Router();

const authenticateRoutes = require('../middleware/authMiddleware');
const getUserRole = require('../middleware/userRoleMiddleware');
const {
	getDoctors,
	getDoctor,
	registerDoctor,
	logInDoctor,
	getMe,
} = require('../controllers/doctorController');

router.route('/').get(getDoctors).post(registerDoctor);
router.route('/login').post(logInDoctor);
router.route('/me').get(getUserRole, authenticateRoutes, getMe);
router.route('/:id').get(getDoctor);

module.exports = router;
