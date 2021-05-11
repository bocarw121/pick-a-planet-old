const { removeCookie } = require("../../../services/security");

const handleLogout = async (req, res) => {
  const cookie = req.cookies.userId;

  if (cookie) {
    removeCookie(res);
    // keeps user on the same page after logout
    return res.status(200).redirect("back");
  }

  return 
};

module.exports = {
  handleLogout,
};
