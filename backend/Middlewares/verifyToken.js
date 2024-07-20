const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const bearerToken = req.headers.authorization;
    if (!bearerToken) {
        return res.status(401).send({ message: "Unauthorized access. Please login to continue" });
    }
    const token = bearerToken.split(' ')[1];
    try {
        jwt.verify(token, "rangammamangamma");
        next();
    } catch (err) {
        res.status(403).send({ message: "Invalid token" });
    }
}

module.exports = verifyToken;
