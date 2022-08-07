const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const Auth = require('../controllers/authController');
const Password = require('../controllers/password');
const validate = require('../middleware/validate');


router.get('/register', (req,res)=>{
    return res.status(200).render('register', {err:null})
})
router.post('/register',
 [
    check('email').isEmail().withMessage('Enter a valid email address'),
    check('password').not().isEmpty().isLength({min: 6}).withMessage('Must be at least 6 chars long'),
    check('firstName').not().isEmpty().withMessage('You first name is required'),
    check('lastName').not().isEmpty().withMessage('You last name is required')
], validate, Auth.register);
router.get('/login', (req,res)=>{
    return res.status(200).render('login', {err:null})
})
router.post("/login", [
    check('email').isEmail().withMessage('Enter a valid email address'),
    check('password').not().isEmpty(),
], validate, Auth.login);

router.get("/logout", (req,res) => {
    return res.status(200).render('logout', {err:null})
})

//EMAIL Verification
router.get('/verify/:token', Auth.verify);
router.post('/resend', Auth.resendToken);

//Password RESET
router.post('/recover', [
    check('email').isEmail().withMessage('Enter a valid email address'),
], validate, Password.recover);

router.get('/reset/:token', Password.reset);

router.post('/reset/:token', [
    check('password').not().isEmpty().isLength({min: 6}).withMessage('Must be at least 6 chars long'),
    check('confirmPassword', 'Passwords do not match').custom((value, {req}) => (value === req.body.password)),
], validate, Password.resetPassword);

module.exports = router