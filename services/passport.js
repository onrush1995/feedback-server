const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

// two arguments to fetch data, one argument to load data
const User = mongoose.model('users');

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback'
		},
		(accessToken, refreshToken, profile, done) => {
			//search over all records in collection
			User.findOne({ googleId: profile.id })
				//uses a promise (then)
				.then((existingUser) => {
					if (existingUser) {
						// we already have this record
						// null - no errors, return user that was found
						done(null, existingUser);
					} else {
						// we dont have this record, create one
						new User({ googleId: profile.id })
							.save()
							// wait for user to create, then.. return done with created user
							.then((user) => done(null, user));
					}
				});
		}
	)
);
