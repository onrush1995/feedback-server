const sendgrid = require('@sendgrid/mail');
const helper = require('@sendgrid/helpers').classes;
const keys = require('../config/keys');

class Mailer extends helper.Mail {}

module.exports = Mailer;
