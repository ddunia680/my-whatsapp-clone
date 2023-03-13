const express = require('express');
const isAuth = require('../middleware/auth');
const messagesController = require('../controllers/messages');

const router = express.Router();

router.post('/message',isAuth ,messagesController.postAMessage);

router.get('/chatMessages/:interlocutor', isAuth, messagesController.getChat);

module.exports = router;