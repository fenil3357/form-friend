const jwt = require("jsonwebtoken")
require('dotenv').config();

const verifyToken = (req, callBack) => {
    const bearerHeader = req.headers['authorization'];
    
    if(typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        
        jwt.verify(bearerToken, process.env.JWT_SECRET, (err, data) => {
            if(err) callBack(err);
            else callBack(null, data);
        })
    }
    else {
        callBack("Please provide token");
    }
}

module.exports = verifyToken;