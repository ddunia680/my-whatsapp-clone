const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.get('Authorization').split(' ')[1];

    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'somesupersupersupersecret');
    }
    catch(err) {
        res.status(500).json({
            message: 'Something went wrong...'
        })
    }
    if(!decodedToken) {
        res.status(400).json({
            message: 'Not Authenticated!'
        })
    }
    req.userId = decodedToken.userId;
    req.username = decodedToken.username;
    next();
}