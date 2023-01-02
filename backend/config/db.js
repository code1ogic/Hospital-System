const mysql = require('mysql');

const dbConnection = mysql.createConnection({
	host: process.env.RDS_HOST,
	user: process.env.RDS_USER,
	password: process.env.RDS_PASSWORD,
	database: process.env.RDS_DATABASE,
});

const connectDB = async () => {
	dbConnection.connect((err) => {
		if (err) {
			console.log(err);
			process.exit(1);
		}
		console.log(`Successfully connected with RDS mysql.!`);

		dbConnection.query(`CREATE DATABASE IF NOT EXISTS hospital_system_db;`);
		dbConnection.query(`USE hospital_system_db;`);
		const tableDoctors =
			'CREATE TABLE IF NOT EXISTS doctors (dId varchar(255) NOT NULL, name varchar(50), email varchar(255) NOT NULL, password varchar(255) NOT NULL, dob DATE, degree varchar(50), department varchar(50), gender varchar(10), doj DATE, contact varchar(10), PRIMARY KEY(dId));';
		const tablePatients =
			'CREATE TABLE IF NOT EXISTS patients (pId varchar(255) NOT NULL, name varchar(50), address varchar(255), dob DATE, gender varchar(10), contact varchar(10), PRIMARY KEY(pId));';
		const tableStaff =
			'CREATE TABLE IF NOT EXISTS staff (sId varchar(255) NOT NULL, name varchar(50), email varchar(255) NOT NULL, password varchar(255) NOT NULL, dob DATE, role varchar(50), gender varchar(10), doj DATE, contact varchar(10), PRIMARY KEY(sId));';
		const tableAppointment =
			'CREATE TABLE IF NOT EXISTS appointment (aId varchar(255) NOT NULL, dId varchar(255), pId varchar(255) NOT NULL, apptDate DATE,type varchar(255),information varchar(255),status TINYINT, PRIMARY KEY(aId));';

		dbConnection.query(tableDoctors, (error, result, fields) => {
			if (error) {
				console.log(error);
				process.exit(1);
			}
		});

		dbConnection.query(tablePatients, (error, result, fields) => {
			if (error) {
				console.log(error);
				process.exit(1);
			}
		});

		dbConnection.query(tableStaff, (error, result, fields) => {
			if (error) {
				console.log(error);
				process.exit(1);
			}
		});

		dbConnection.query(tableAppointment, (error, result, fields) => {
			if (error) {
				console.log(error);
				process.exit(1);
			}
		});
	});
};

module.exports = { connectDB, dbConnection };
