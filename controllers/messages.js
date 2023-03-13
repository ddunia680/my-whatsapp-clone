const Message = require('../models/chatMessage');

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
        return res.status(200).json({
            message: response
        })
    })
    .catch(err => {
        return res.status(500).json({
            message: 'something went wron server-side'
        })
    })
}

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
            console.log(theMessages);
            if(!theMessages) {
                return res.status(200).json({
                    messages: []
                })
            }
            
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