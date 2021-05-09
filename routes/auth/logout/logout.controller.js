const { removeCookie } = require("../../../services/security");

const handleLogout = async (req, res) => {
    removeCookie(res)
    // keeps user on the same page after logout
    res.status(200).redirect("back");

};

module.exports = {
  handleLogout,
};
