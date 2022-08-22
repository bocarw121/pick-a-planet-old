const getProfile = (req, res) => {
  if (req.user) {
    res.render('profile');
  } else {
    res.redirect('login');
  }
};

module.exports = {
  getProfile,
};
