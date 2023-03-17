const Message = require('../models/chatMessage');
const Chat = require('../models/chat');
const User = require('../models/user');

exports.getChat = (req, res, next) => {
    const userId = req.userId;
    const interId = req.params.interlocutor;
    
    let theMessages;

    Message.find({from: interId, to: userId})
    .then(messages => {
        if(!messages) {
            return res.status(200).json({
                messages: []
            })
        }
        theMessages = [...messages];

        Message.find({from: userId, to: interId})
        .then(otherMessages => {
            theMessages = [...theMessages, ...otherMessages];
            if(!theMessages) {
                return res.status(200).json({
                    messages: []
                })
            }
            
            theMessages.sort((a, b) => a.order - b.order);
            return res.status(200).json({
                messages: theMessages
            })
        })
        .catch(err => {
            return res.status(500).json({
                message: 'something went wrong server-side'
            })
        })

    })
    .catch(err => {
        return res.status(500).json({
            message: 'something went wrong server-side'
        })
    })
}

exports.postAMessage = (req, res, next) => {
    const from = req.userId;
    const to = req.body.to;
    const isText = req.body.isText;
    const isImage = req.body.isImage;
    const isAudio = req.body.isAudio;
    const comment = req.body.comment;
    const message = req.body.message;

    let chatMessage;
    if(comment) {
        chatMessage = new Message({
            from: from,
            to: to,
            isText: isText,
            isImage: isImage,
            isAudio: isAudio,
            message: message,
            comment: comment
        });
    } else {
        chatMessage = new Message({
            from: from,
            to: to,
            isText: isText,
            isImage: isImage,
            isAudio: isAudio,
            message: message,
        });
    }

    chatMessage.save()
    .then(response => {
        let lastElementOrder;
        Message.find()
        .then(allMessages => {
            const fullLength = allMessages.length;
            if(fullLength === 1) {
                lastElementOrder = 0;
            } else {
                lastElementOrder = allMessages[fullLength - 2].order;
            }
            return Message.findOneAndUpdate({_id: response._id}, {order: +(lastElementOrder + 1)});
        })
        .then(allresponse => {
            return res.status(200).json({
                message: allresponse
            })
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({
                message: 'something went wrong server-side'
            })
        });
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({
            message: 'something went wrong server-side'
        })
    });
    
}

exports.createChat = (req, res, next) => {
    const userId = req.body.user1;
    const interlocutor = req.body.user2;
    let theChats;

    Chat.find(
        {
            user1: userId, 
            user2: interlocutor
        })
    .then(chats => {
        theChats = chats
        
        Chat.find({
            user1: interlocutor, 
            user2: userId
        })
        .then(nextChats => {
            theChats = [...theChats, ...nextChats];

            if(!theChats.length) {
                const newChat = new Chat();
                newChat.user1 = userId;
                newChat.user2 = interlocutor;
    
                newChat.save()
                .then(chat => {
                    res.status(201).json({
                        message: 'chat created',
                        chat: chat
                    })
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        message: 'something went wrong server-side'
                    })
                })
            } else {
                res.status(200).json({
                    message: 'chat aready exists',
                    chat: theChats[0]
                })
            }

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'something went wrong server-side'
            })
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: 'something went wrong server-side'
        })
    })

}

exports.getMyChats = (req, res, next) => {
    let theChats = [];
    let chatsToSend = [];
    Chat.find({user1: req.userId})
    .then(fstChats => {
        theChats = [...fstChats];
        Chat.find({user2: req.userId})
        .then(scondChats => {
            theChats = [...theChats, ...scondChats];
            
            if(!theChats.length) {
                return res.status(200).json({
                    chats: []
                })
            }

            theChats.forEach(chatItem => {
                if(chatItem.user1 !== req.userId) {
                    User.findById(chatItem.user1, {username: 1, status: 1, profileUrl: 1})
                    .then(user => {
                        const neededInfo = {...user, lastMessage: chatItem.lastMessage, chatId: chatItem._id}
                         
                        chatsToSend.push(neededInfo);
                    })
                } else if(chatItem.user2 !== req.userId) {
                    User.findById(chatItem.user2, {username: 1, status: 1, profileUrl: 1})
                    .then(user => {
                        const neededInfo = {...user, lastMessage: chatItem.lastMessage, chatId: chatItem._id}
                         
                        chatsToSend.push(neededInfo);
                    })
                } else {
                    console.log('nothing to collect');
                }
            })

            return res.status(200).json({
                message: 'my chats',
                chats: chatsToSend
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'something went wrong server-side'
            })
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: 'something went wrong server-side'
        })
    })
}

exports.storeLast = (req, res, next) => {
    const theChat = req.body.currentChat;
    const theMessages = req.body.message;

    Chat.findById(theChat)
    .then(chat => {
        chat.lastMessage = theMessages;
        return chat.save();
    })
    .then(updatedChat => {
        res.status(200).json({
            message: 'last Chat saved'
        })
    })
    .catch(err => {
        res.status(500).json({
            message: 'something went wrong server-side'
        })
    })
}