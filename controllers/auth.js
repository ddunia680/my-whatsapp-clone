const User = require('../models/user');
const { validationResult } = require('express-validator');
const storage = require('../firebase.config');
const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signUp = (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors);
    if(!errors.isEmpty()) {
        return res.status(422).json({
            message: errors.array()[0].msg
        })
    }
    const profilePic = req.file;
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPass = req.body.confirmPass;
    let profURL;

    if(password !== confirmPass) {
        return res.status(422).json({
            message: "passwords don't match!"
        })
    }

    if(profilePic) {

        const timestamps = Date.now();
        const nm = profilePic.originalname.split('.')[0];
        const type = profilePic.originalname.split('.')[1];
        const filename = `${nm}_${timestamps}.${type}`;

        const imageRef = ref(storage, `profile-pics/${filename}`);
        uploadBytes(imageRef, profilePic.buffer)
        .then(snapshot => {
            console.log('profile added');
            return getDownloadURL(snapshot.ref);
        })
        .then(url => {
            bcrypt.hash(password, 12)
            .then(hashedPass => {
                const user = new User({
                    profileUrl: url,
                    username: username,
                    email: email,
                    password: hashedPass
                });

                return user.save();
            })
            .then(result => {
                res.status(201).json({
                    message: "User created successfully", userId: result._id
                })
            })
            .catch(err => {
                res.status(500).json({
                    message: 'Oops..., Something went wrong server side'
                })
            })
        })
        .catch(err => {
            res.status(500).json({
                message: 'Oops..., Something went wrong server side'
            })
        })
    } else {

        bcrypt.hash(password, 12)
                .then(hashedPass => {
                    const user = new User({
                        username: username,
                        email: email,
                        password: hashedPass
                    });

                    return user.save();
                })
                .then(result => {
                    res.status(201).json({
                        message: "User created successfully", userId: result._id
                    })
                })
                .catch(err => {
                    res.status(500).json({
                        message: 'Oops..., Something went wrong server side'
                    })
                })
    }
}

exports.Login = (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors);
    if(!errors.isEmpty()) {
        return res.status(422).json({
            message: errors.array()[0].msg
        })
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email: email})
    .then(user => {
        if(!user) {
            return res.status(401).json({
                message: 'Email address not found'
            })
        }
        bcrypt.compare(password, user.password)
        .then(isEqual => {
            if(!isEqual) {
                return res.status(401).json({
                    message: 'wrong password'
                })
            }
            const token = jwt.sign(
                {
                    userId: user._id.toString(),
                    username: user.name,
                    profileUrl: user.profileUrl
                },
                'somesupersupersupersecret',
                { expiresIn: '1h' }
            );

            res.status(200).json({
                token: token,
                userId: user._id.toString(),
                profileUrl: user.profileUrl,
                username: user.name
            });
        })
        .catch(err => {
            res.status(500).json({
                message: 'Oops..., Something went wrong server side'
            })
        })
    })
    .catch(err => {
        res.status(500).json({
            message: 'Oops..., Something went wrong server side'
        })
    })
}

exports.moreUserInfo = (req, res, next) => {
const userId = req.params.userId;
User.findById(userId)
.then(user => {
    if(!user) {
        return res.status(404).json({
            message: 'user not found'
        })
    }
    
    res.status(201).json({
        profileUrl: user.profileUrl,
        username: user.username,
        status: user.status
    })
})
.catch(err => {
    res.status(500).json({
        message: 'Oops..., Something went wrong server side'
    })
})
}