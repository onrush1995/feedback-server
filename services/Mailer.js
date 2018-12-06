const sendgrid = require('@sendgrid/mail');
const helper = require('@sendgrid/helpers').classes;
const keys = require('../config/keys');

class Mailer extends helper.Mail {
	constructor({ subject, recipients }, content) {
		super();

		this.from_email = new helper.EmailAddress('no-reply@candicedavidson.com');
		this.subject = subject;
		this.body = new helper.Content('text/html', content);
		this.recipients = this.formatAddresses(recipients);

		//register body with Mailer class
		this.addContent(this.body);

		//enable click tracking inside of email
		this.addClickTracking();

		// process list of recipients to add to mailer
		this.addRecipients();
	}

	formatAddresses(recipients) {
		return recipients.map(({ email }) => {
			return new helper.EmailAddress(email);
		});
	}

	addClickTracking() {
		const trackingSettings = new helper.TrackingSettings();
		const clickTracking = new helper.ClickTracking(true, true);

		trackingSettings.setClickTracking(clickTracking);
		this.addTrackingSettings(trackingSettings);
	}

	addRecipients() {
		const personalize = new helper.Personalization();
		this.recipients.forEach((recipient) => {
			personalize.addTo(recipient);
		});
		this.addPersonalization(personalize);
	}
}

module.exports = Mailer;
