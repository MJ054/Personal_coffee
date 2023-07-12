const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const userController = require('../controllers/userController');
const validator = require('../validationRules');

router.get('/', (req, res)=>{
    res.send('user');
});

router.post('/register', [
    validator.nicknameValidation,
    validator.passwordValidation,
    validator.idValidation
],
userController.userRegister);

router.post('/login', [
    body('id').notEmpty().withMessage('Id is required'),
    body('password').notEmpty().withMessage('Password is required')
],
userController.login);

router.post('/logout', userController.logout);

router.get('/test', (req,res)=>{
    console.log(req.session.user);
    console.log(req.headers.cookie);
})

router.get('/nfc/:nfcId', userController.addNfc);
 
module.exports = router;