const express = require('express');
const { body } = require('express-validator');

const User = require('../models/user');
const authControllers = require('../controllers/auth');

const router = express.Router();

router.put('/signup',[
    body('username').trim().isLength({min: 5}).withMessage('wrong username').custom((value, { req }) => {
        return User.findOne({username: value}).then(userDoc => {
            if(userDoc) {
                return Promise.reject('username already exists!');
            }
        })
    }),
    body('email').trim().isEmail().withMessage('invalid email address')
    .custom((value, { req }) => {
        return User.findOne({email: value}).then(userDoc => {
            if(userDoc) {
                return Promise.reject('E-mail address already exists!');
            }
        })
    }).normalizeEmail(),
    body('password').trim().isLength({min: 5}).withMessage('wrong password'),
    body('confirmPass').trim().isLength({min: 5}).withMessage('wrong confirm password')
], authControllers.signUp);

router.post('/login',[
    body('email').trim().isEmail().withMessage('invalid email address'),
    body('password').trim().isLength({min: 5}).withMessage('wrong password')
], authControllers.Login);

router.get('/moreLoginInfo/:userId', authControllers.moreUserInfo);

module.exports = router;