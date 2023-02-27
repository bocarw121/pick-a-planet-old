const { getUser } = require('../../../models/user.model');
const { setCookie } = require('../../../services/security');

const getLogin = (req, res, next) => {
  if (req.url === '/change') {
    return next();
  }
  if (req.user) {
    res.redirect('profile');
  } else {
    res.render('login');
  }
};

const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).render('login', {
      message: 'You must provide an email and password',
    });
  }

  getUser(email, password, (dbError, invalidInfo, id) => {
    if (dbError) {
      return res.status(400).render('login', {
        message: 'Unable to log you in at this time',
      });
    }

    if (invalidInfo) {
      return res.status(401).render('login', {
        message: 'email / password incorrect',
      });
    }

    if (id) {
      setCookie(id, (cookie, token, cookieSettings) => {
        res.cookie(cookie, token, cookieSettings);

        // redirects to edit password page in profile
        if (req.url === '/change') {
          return res.redirect('../../editpassword');
        }
        return res.redirect('dashboard');
      });
    }
  });
};

module.exports = {
  getLogin,
  handleLogin,
};
