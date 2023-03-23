const User = require('../models/user');
const storage = require('../firebase.config');
const { ref, uploadBytes, deleteObject ,getDownloadURL } = require('firebase/storage');

exports.getAllUsers = (req, res, next) => {
    const loggedUser = req.params.loggedUser;
    User.find({}, {username: 1, status: 1, profileUrl: 1})
    .then(users => {
        return res.status(200).json({
            users: users
        })
    })
}

exports.updateUser = (req, res, next) => {
    const image = req.file;
    const username = req.body.username;
    const status = req.body.status;

    if(image) {
        User.findById(req.userId)
        .then(user => {
            if(!user) {
                return res.status(500).json({
                    message: "Couldn't find user"
                })
            }
            if(user.profileUrl) {
                const desertRef = ref(storage, user.profileUrl);

                deleteObject(desertRef)
                .then(result => {
                    console.log('Old picture gone');
                })
                .catch(err => {
                    console.log(err);
                })
            }
            const timestamps = Date.now();
            const nm = image.originalname.split('.')[0];
            const type = image.originalname.split('.')[1];
            const filename = `${nm}_${timestamps}.${type}`;

            const imageRef = ref(storage, `profile-pics/${filename}`);
            uploadBytes(imageRef, image.buffer)
            .then(snapshot => {
                console.log('profile added');
                return getDownloadURL(snapshot.ref);
            })
            .then(url => {
                user.profileUrl = url;
                username ? 
                    user.username = username : 
                    console.log('no new username');
                status ? 
                    user.status = status : 
                    console.log('no new status');
                
                    user.save()
                .then(result => {
                    res.status(200).json({
                        profileUrl: result.profileUrl,
                        username: result.username,
                        status: result.status
                    })
                })
                .catch(err => {
                    res.status(500).json({
                        message: "Couldn't perform operation"
                    })
                })
            })
            .catch(err => {
                res.status(500).json({
                    message: "Couldn't perform operation"
                })
            })
        })
        .catch(err => {
            res.status(500).json({
                message: "Couldn't perform operation"
            })
        })
    }
    else {
        User.findById(req.userId)
        .then(user => {
            username ? 
                    user.username = username : 
                    console.log('no new username');
            status ? 
                user.status = status : 
                console.log('no new status');
            
            return user.save();
        })
        .then(result => {
            res.status(200).json({
                profileUrl: result.profileUrl,
                username: result.username,
                status: result.status
            })
        })
        .catch(err => {
            res.status(500).json({
                message: 'Oops..., Something went wrong server side'
            })
        })
    }
}


exports.getInterlocutor = (req, res, next) => {
    const interlID = req.params.interId;

    User.findById(interlID, {username: 1, status: 1, profileUrl: 1, lastSeen: 1})
    .then(user => {
        if(!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }

        return res.status(200).json({
            user: user
        })
    })
    .catch(err => {
        return res.status(500).json({
            message: 'something went wrong server-side'
        })
    })
}