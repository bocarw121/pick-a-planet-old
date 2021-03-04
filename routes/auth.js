const express = require('express');
const authController = require('../controllers/auth');
const authResetController = require('../controllers/authReset');
const authUpdateController = require('../controllers/authUpdate');
const registrationValidator = require('../controllers/authValidators');
const router = express.Router();



// Post routes        
    
router.post('/register', registrationValidator, authController.register);

router.post('/login', authController.login);

router.post('/editpassword', authUpdateController.updatePassword);

router.post('/editemail', authUpdateController.updateEmail)

router.post('/passwordreset', authResetController.passwordReset);
 
router.post('/loginandchange', authController.loginAndChangePassword);

router.post('/contact', authController.contact);



router.get('/logout', authController.logout);

module.exports = router;  