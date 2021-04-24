const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const { nodemailerKey } = require("../util/config");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: nodemailerKey,
    },
  })
);

module.exports = transporter;
