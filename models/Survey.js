const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');

const surveySchema = new Schema({
	title: String,
	body: String,
	subject: String,
	// create Recipient subDocument Collection to track
	// whether a recipient already responded
	recipients: [ RecipientSchema ],
	yes: { type: Number, default: 0 },
	no: { type: Number, default: 0 },
	// connect survey to a particular user
	// underscore makes it obv its setting up a relationship
	_user: { type: Schema.Types.ObjectId, ref: 'User' }
});

mongoose.model('surveys', surveySchema);
