const nodemailer = require("nodemailer");

const {
  SMTP_HOST,
  SMTP_MAIL,
  SMTP_PASSWORD,
  SMTP_PORT,
  SMTP_SERVICE,
} = require("./server-config");

const mailSender = nodemailer.createTransport({
  service: SMTP_SERVICE,
  port: SMTP_PORT,
  host: SMTP_HOST,
  auth: {
    user: SMTP_MAIL,
    pass: SMTP_PASSWORD,
  },
});

module.exports = mailSender;
