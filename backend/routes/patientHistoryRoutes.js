const express = require('express');
const router = express.Router();

//Get all patients
router.get('/', (req, res) => {
	res.status(200).send('Get Patient history!');
});

module.exports = router;
