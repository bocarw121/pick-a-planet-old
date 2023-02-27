const getDashboardProfile = (req, res) => {
  if (req.user) {
    res.render('dashboard', {
      // todo add more data
      email: req.user.email,
      year: new Date().getFullYear(),
      title: 'Dashboard',
      isDashboard: true,
    });
  } else {
    res.redirect('login');
  }
};

module.exports = {
  getDashboardProfile,
};
