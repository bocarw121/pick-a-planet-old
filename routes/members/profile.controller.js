const getProfile = (req, res) => {
  if (req.user) {
    res.render('profile', {
      year: new Date().getFullYear(),
      title: 'Profile',
      user: req.user,
      isProfile: true,
    });
  } else {
    res.redirect('login');
  }
};

const getEditProfile = (req, res) => {
  if (req.user) {
    res.render('edit', {
      // todo add more data
      email: req.user.email,
      year: new Date().getFullYear(),
      title: 'Edit Profile',
      isEdit: true,
    });
  } else {
    res.redirect('login');
  }
};

module.exports = {
  getProfile,
  getEditProfile,
};
