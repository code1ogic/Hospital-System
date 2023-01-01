const express = require('express');
const dotenv = require('dotenv').config();
const { connectDB } = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');
const cors = require('cors'); 


connectDB();
const app = express();
const PORT = process.env.PORT || 5000;

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: "*" }))

//Get
app.use('/api/patients', require('./routes/patientRoutes'));
app.use('/api/doctors', require('./routes/doctorRoutes'));
app.use('/api/staff', require('./routes/staffRoutes'));
app.use('/api/patient-history', require('./routes/patientHistoryRoutes'));

app.use(errorHandler);

//listen on PORT
app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
