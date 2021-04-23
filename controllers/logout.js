// logout logic
const handleLogout = async (req, res) => {
  // removes cookie if it exists
  try {
    res.cookie("jwt", "", {
      expires: new Date(Date.now() + 2 * 1000),
      httpOnly: true,
    });

    // keeps user on the same page after logout
    res.status(200).redirect("back");
  } catch (error) {
    throw error;
  }
};

module.exports = {
  handleLogout,
};
