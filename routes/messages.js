const express = require('express');
const isAuth = require('../middleware/auth');
const messagesController = require('../controllers/messages');

const router = express.Router();

router.post('/message',isAuth ,messagesController.postAMessage);

router.get('/chatMessages/:interlocutor', isAuth, messagesController.getChat);

router.post('/storeLastMessage', isAuth, messagesController.storeLast);

router.get('/find_chat/:interlocutor', isAuth, messagesController.findChat);

router.post('/create_chat', messagesController.createChat);

router.get('/getChats', isAuth, messagesController.getMyChats);

module.exports = router;