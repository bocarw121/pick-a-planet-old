const { sendContactMail } = require("../../services/email");

const contactPage = (req, res) => {
  res.render("contact");
};

const handleContact = (req, res) => {
  const { name, email, text } = req.body;
  console.log("yea");
  if (!name || !email || !text) {
    return res.status(400).render("contact", {
      message: "You must fill in all the fields",
    });
  }

  sendContactMail(name, email);

  res.status(200).render("contact", {
    complete: "Your email has been sent",
  });
};

module.exports = {
  handleContact,
  contactPage,
};
