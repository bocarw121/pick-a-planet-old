const { StatusCodes } = require('http-status-codes');
const { Users } = require('../../../db/prisma');
const { setCookie, verifyPassword } = require('../../../services/security');

const getLogin = (req, res, next) => {
  if (req.url === '/change') {
    return next();
  }
  if (req.user) {
    res.redirect('profile');
  } else {
    res.render('auth/login');
  }
};

const handleLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(StatusCodes.UNAUTHORIZED).render('auth/login', {
      message: 'You must provide an email and password',
    });
  }

  try {
    const user = await Users.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).render('auth/login', {
        message: 'email / password incorrect',
      });
    }

    const verified = await verifyPassword(user, password);

    if (!verified) {
      return res.status(StatusCodes.UNAUTHORIZED).render('auth/login', {
        message: 'email / password incorrect',
      });
    }

    const { cookie, token, cookieSettings } = setCookie(user.id);

    res.cookie(cookie, token, cookieSettings);

    // redirects to edit password page in profile
    // TODO - password change is implemented in profile
    // if (req.url === '/change') {
    //   return res.redirect('../../editpassword');
    // }
    console.log('redirecting to dashboard');
    return res.redirect('/dashboard');
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).render('auth/login', {
      message: 'Something went wrong',
    });
  }
};

module.exports = {
  getLogin,
  handleLogin,
};
