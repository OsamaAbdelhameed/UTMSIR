const jwt = require("jsonwebtoken");

require('dotenv').config();

const authenticateToken = async(req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.SECRETKEY, (err, user) => {
        console.log(err)
        if (err) return res.status(403).send(err)
        req.user = user
        next()
    })
}

module.exports = { authenticateToken };