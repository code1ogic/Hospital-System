const nodemailer = require('nodemailer');

// created reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 465,
	secure: true, // true for 465, false for other ports
	requireTLS: true,
	auth: {
		user: process.env.EMAIL_USERNAME,
		pass: process.env.EMAIL_PASSWORD,
	},
});

const sendEmail = async (receiver, subject, text, html) => {
	// send mail with defined transport object
	let info = await transporter.sendMail({
		from: '"Shatayu Hospital" <shatayuhospital@gmail.com>', // sender address
		to: receiver, // list of receivers
		subject: subject || 'Welcome to SHATAYU HOSPITAL..!', // Subject line
		text: text || 'This is system generated email, kindly do not reply!', // plain text body
		html:
			html ||
			'<h2>You are part of SHATAYU family!</h2><p>This is system generated email, kindly do not reply!</p>', // html body
	});

	console.log('Message sent: %s', info.messageId);
};

module.exports = { sendEmail };
