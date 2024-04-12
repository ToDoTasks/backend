const jwt = require('jsonwebtoken');

const { TokenExpiredError } = jwt;

const catchError = (err, res) => {
    if (err instanceof TokenExpiredError ) return res.status(401).json({mseeage: "Unauthorized access expired"});
    return res.status(401).json({message: "Unauthorized"});
}

const verifyToken = (req, res, next) => {
    //const token = req.headers['x-access-token'];
    let token = req.headers['authorization'];

    if(!token) return res.status(403). json({message: "Access denied"});

    if (token && token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    } else {
        return res.status(403). json({message: "Access denied"});
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return catchError(err, res) ;
        req.user = user;
        console.log(user);
        next();
    });
}

module.exports = {verifyToken};
