const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('../core/ApiError');


const isLoggedIn = (req, res, next) => {
    //console.log(req.headers);
    const token = req.headers?.authorization.replace('Bearer ', '');
    //console.log(token);
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);      // verify token that came with "SOME_SECRET"
        //console.log(payload);
        req.userId = payload.userId;
    }
    catch(err) {
        throw new AuthenticationError("Please login to continue");
    }
    return next();
}

module.exports = {
    isLoggedIn
};