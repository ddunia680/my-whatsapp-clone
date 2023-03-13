const express = require('express');

const isAuth = require('../middleware/auth');
const usersControllers = require('../controllers/users');

const router = express.Router();

router.get('/users/:loggedUser',isAuth , usersControllers.getAllUsers);

router.put('/updateuser', isAuth, usersControllers.updateUser);

router.get('/interlocutor/:interId', isAuth, usersControllers.getInterlocutor);

module.exports = router;