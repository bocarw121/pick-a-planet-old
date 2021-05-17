const { SENDGRID_API_KEY, ADMIN_EMAIL } = require("../utils/config");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(SENDGRID_API_KEY);

const send = async (message) => {
  const sendMessage = await sgMail.send(message);
  const status = await sendMessage[0].statusCode;
  if (status !== 202) {
    throw new Error("Unable to send message");
  } else {
    return sendMessage;
  }
};

const sendContactMail = (name, email) => {
  const emailContent = `<h3>Welcome to Planets. Thanks for signing up to the member's area. You can enjoy exclusive videos and learn more about the cool planets that surround us</h3>
`;
  const msg = {
    to: email,
    from: adminEmail,
    subject: `You got a message on nine planets from Email: ${email}`,
    html: `<h4>Hey, ${name}</h4> <br> ${emailContent}`,
  };

  return send(msg);
};

//TODO:
const sendResetEmail = (email, update) => {
  const msg = {
    to: email,
    from: ADMIN_EMAIL,
    subject: "Pasword request",
    html: `<h3>Here is your temporary password/h3>
     <p>${update}</p>`,
  };

  return send(msg);
};

const sendRegistrationConfirmationEmail = (email, firstName) => {
  const msg = {
    to: email,
    from: adminEmail,
    subject: "Thanks for signing up",
    html: `<h3>Welcome to nine planets</h3>
           <p>Hey ${firstName},</p>
           <p>Thanks for signing up to the members area. You can enjoy exclusive videos and learn more about the cool planets that surround us.</p>`,
  };

  return send(msg);
};

module.exports = {
  sendContactMail,
  sendResetEmail,
  sendRegistrationConfirmationEmail,
};
