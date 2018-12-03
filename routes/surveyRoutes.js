const requireLogin = require('../middlewares/requireLogin');

module.exports = (app) => {
	//check that user is logged in if they go to this link
	app.post('/api/surveys', requireLogin, (req, res) => {});
};
