const { sendgrid } = require("../util/config");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(sendgrid);

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
    from: "bocaralhassanwane@gmail.com",
    subject: `You got a message on nine planets from Email: ${email}`,
    html: `<h4>Hey, ${name}</h4> <br> ${emailContent}`,
  };

  return send(msg);
};

//TODO:
const sendResetEmail = (email, update) => {
  const msg = {
    to: email,
    from: "bocaralhassanwane@gmail.com",
    subject: "Pasword request",
    html: `<h3>Here is your temporary password you can click to login and reset your password</h3>
    <a href="localhost:3000/changepassword">here</a> 
     <p>${update}</p>`,
  };

 return send(msg);
};

const sendRegistrationConfirmationEmail = (email, firstName) => {
  const msg = {
    to: email,
    from: "bocaralhassanwane@gmail.com",
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
