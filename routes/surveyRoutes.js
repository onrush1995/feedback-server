const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const Survey = mongoose.model('surveys');

module.exports = (app) => {
	//check that user is logged in if they go to this link
	app.post('/api/surveys', requireLogin, (req, res) => {
		//access properties out of req body
		const { title, subject, body, recipients } = req.body;

		//create new instance of survey
		const survey = new Survey({
			title,
			subject,
			body,
			// create subdocument Schema
			recipients: recipients.split(',').map((email) => ({ email: email.trim() })),
			// set up user relationship
			_user: req.user.id,
			dateSent: Date.now()
		});
	});
};
