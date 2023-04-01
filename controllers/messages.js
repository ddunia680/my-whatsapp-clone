const Message = require('../models/chatMessage');
const Chat = require('../models/chat');
const User = require('../models/user');
const socket = require('../socket');
const storage = require('../firebase.config');
const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');

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

exports.getUnseenMessages = (req, res, next) => {
    const userId = req.userId;
    const interId = req.params.interlocutor;

    Message.find({from: interId, to: userId, seen: false}).count()
    .then(response => {
        res.status(200).json({
            number: response
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: 'something went wrong server-side'
        })
    })


}

exports.postAMessage = (req, res, next) => {
    const from = req.userId;
    const to = req.body.to;
    const file = req.file;
    const isText = req.body.isText ? req.body.isText : false;
    const isAudio = req.body.isAudio ? req.body.isAudio : false;
    const comment = req.body.comment ? req.body.comment : null;
    const message = req.body.message ? req.body.message : null;

    let chatMessage;
    if(file) {
        const timestamps = Date.now();
        const nm = file.originalname.split('.')[0];
        const type = file.originalname.split('.')[1];
        const filename = `${nm}_${timestamps}.${type}`;

        const imageRef = ref(storage, `sharedFiles/${filename}`);
        uploadBytes(imageRef, file.buffer)
        .then(snapshot => {
            console.log('file added');
            return getDownloadURL(snapshot.ref);
        })
        .then(url => {
            chatMessage = new Message({
                from: from,
                to: to,
                isText: isText,
                isImage: true,
                isAudio: isAudio,
                message: url,
                comment: comment
            });
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
                    // console.log(allresponse);
                    // if(socket) {
                    //         if(from.toString() === req.userId.toString() ) {

                    //         } else {
                    //             socket.getIO().to(from).emit('received-message', allresponse);
                    //         }
                    //         // socket.getIO().to(to).emit('received-notification', allresponse);
                    // }

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
    })
        
    } else {
        chatMessage = new Message({
            from: from,
            to: to,
            isText: isText,
            isImage: false,
            isAudio: isAudio,
            message: message,
        });
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
                // console.log(allresponse);
                if(socket) {
                    console.log('emiting to room' + from);
                    // socket.getIO().on('sent-message', () => {
                        socket.getIO().to(from).emit('received-message', allresponse);
                    // });
                }

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
}

exports.findChat = (req, res, next) => {
    const userId = req.userId;
    const interlocutor = req.params.interlocutor;

    Chat.find({ $or : [{user1: userId, user2: interlocutor}, {user1: interlocutor, user2: userId}]})
    .then(chat => {
        if(!chat.length) {
            res.status(200).json({
                message: 'this is a new chat',
                currentChat: null
            })
        } else {
            res.status(200).json({
                message: 'chat already exists',
                currentChat: chat[0]._id
            })
        }

    })
}

exports.createChat = (req, res, next) => {
    const userId = req.body.userId;
    const interlocutor = req.body.interlocutor;
    
    const chat = new Chat();
    chat.user1 = userId;
    chat.user2 = interlocutor;

    chat.save()
    .then(response => {
        res.status(200).json({
            message: 'Chat created',
            chatId: response._id
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: 'Something went wrong server-side'
        })
    })
}

exports.getMyChats = (req, res, next) => {
    const userId = req.userId;

    Chat.find({ $or: [{user1: userId}, {user2: userId }] }).populate('user1', {username: 1, status: 1, profileUrl: 1}).populate('user2', {username: 1, status: 1, profileUrl: 1})
    .then(chats => {
        // console.log(chats);
        if(chats.length === 0) {
            return res.status(200).json({
                message: 'No chats yet',
                chats: []
            })
        }
        const chatsToSend = [];
        chats.forEach(chat => {
            let theChat = {
                _id: chat._id,
                interlocutor: chat.user1._id.toString() !== userId.toString() ? chat.user1 : chat.user2,
                lastMessage: chat.lastMessage ? chat.lastMessage : 'no message yet',
                sentBy: chat.sentBy,
                updatedAt: chat.updatedAt
            }

            chatsToSend.push(theChat);
        })
        res.status(200).json({
            message: 'the chats',
            chats: chatsToSend
        })
    })
    .catch(err => {
        res.status(500).json({
            message: 'Something went wrong server-side'
        })
    })
}

exports.storeLast = (req, res, next) => {
    const theChat = req.body.currentChat;
    const theMessages = req.body.message;
    const sentBy = req.body.sentBy;

    Chat.findById(theChat)
    .then(chat => {
        chat.lastMessage = theMessages;
        chat.sentBy = sentBy;

        return chat.save();
    })
    .then(updatedChat => {
        res.status(200).json({
            message: 'last Chat saved'
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: 'something went wrong server-side'
        })
    })
}

exports.postAudio = (req, res, next) => {
    const audio = req.file;
    const from = req.userId;
    const to = req.body.to;


    const timestamps = Date.now();
    // const type = audio.originalname;
    const filename = `audio_${timestamps}.mp3`;

    const audioRef = ref(storage, `audio_messages/${filename}`);
    uploadBytes(audioRef, audio.buffer)
        .then(snapshot => {
            console.log('audio uploaded');
            return getDownloadURL(snapshot.ref);
        })
        .then(url => {
            const message = new Message({
                from: from,
                to: to,
                isText: false,
                isImage: false,
                isAudio: true,
                message: url
            });

            return message.save();
        })
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
                // console.log(allresponse);
                if(socket) {
                    console.log('emiting to room' + from);
                    // socket.getIO().on('sent-message', () => {
                        socket.getIO().to(from).emit('received-message', allresponse);
                    // });
                }

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

exports.updateSeen = (req, res, next) => {
    const messageId = req.params.messageId;
    const userId = req.userId;

    Message.findById(messageId)
    .then(message => {
        message.seen = true;

        return message.save();
    })
    .then(response => {
        res.status(201).json({
            message: 'message seen',
            messageId: response._id
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: 'Oops, something went wrong server-side'
        })
    })
}