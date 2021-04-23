const emailContent = require("../util/emailContent");

const handleContact = (transporter) => (req, res) => {
  const { name, email, text } = req.body;
  if ((!name, !email, !text)) {
    res.status(400).render("contact", {
      message: "You must fill in all the fields",
    });
  } else {
    transporter.sendMail({
      to: email,
      from: "bocaralhassanwane@gmail.com",
      subject: `You got a message on nine planets from Email: ${email}`,
      html: `<h4>Hey, ${name}</h4> <br> ${emailContent}`,
    });
    return res.render("contact", {
      complete: "Your email has been sent",
    });
  }
};

module.exports = {
  handleContact,
};
