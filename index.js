const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User'); // require models before passport
require('./services/passport');

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

const app = express();

//tell express to make use of cookies
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
		//key to encrypt cookie
		keys: [ keys.cookieKey ]
	})
);

//tell passport to use cookies to handle auth
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
