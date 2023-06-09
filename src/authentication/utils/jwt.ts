const jwt = require('jsonwebtoken');

const generateAccessToken = (userId) => {
    return jwt.sign({userId}, process.env.TOKEN_SECRET, { expiresIn: '24h' });
}

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)

        req.user = user

        next()
    })
}

module.exports = {
    decode: jwt.decode,
    generateAccessToken,
    authenticateToken
}
