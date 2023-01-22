const fast2sms = require('fast-two-sms');

const options = {
	authorization: process.env.SMS_API_KEY,
	message: 'Welcome to Shatayu Hospital!',
	numbers: [],
};

const sendSMS = async (message, numbers) => {
	try {
		const response = await fast2sms.sendMessage({
			...options,
			message,
			numbers,
		});
		console.log(response.message);
		if (!response) throw new Error('Text message not sent!');
		return response;
	} catch (error) {
		console.error(error);
		throw new Error('Text message could not get sent!');
	}
};

module.exports = { sendSMS };
