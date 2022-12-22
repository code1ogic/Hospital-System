const express = require('express');
const router = express.Router();
const authenticateRoutes = require('../middleware/authMiddleware');
const {
	getDoctors,
	getDoctor,
	registerDoctor,
	logInDoctor,
	getMe,
} = require('../controllers/doctorController');

//Get all doctors
router.route('/').get(authenticateRoutes, getDoctors).post(registerDoctor);
router.route('/login').post(logInDoctor);
router.route('/me').get(authenticateRoutes, getMe);
router.route('/:id').get(getDoctor);

module.exports = router;
