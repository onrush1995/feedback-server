const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

// two arguments to fetch data, one argument to load data
const User = mongoose.model('users');

// 'user' is what is pulled out of db in passport.use
passport.serializeUser((user, done) => {
	//user.id is the identifying information
	// the id assigned by mongo (internal id)
	//it is not the profile.id (that is googleid)
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id).then((user) => {
		done(null, user);
	});
});

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback',
			proxy: true
		},
		async (accessToken, refreshToken, profile, done) => {
			//search over all records in collection
			const existingUser = await User.findOne({ googleId: profile.id });
			if (existingUser) {
				// we already have this record
				// null - no errors, return user that was found
				return done(null, existingUser);
			}
			// we dont have this record, create one
			const user = await new User({ googleId: profile.id }).save();
			// wait for user to create, then.. return done with created user
			done(null, user);
		}
	)
);
