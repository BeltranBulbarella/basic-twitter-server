const router = require("express").Router();
const db = require("./queries.ts");

router.post('/login', db.login)
router.post('/sign-up', db.signUp)
router.post('/refresh-token', (req, res, next) => {
    const { token } = req.body;
    try {
        const newToken = db.refreshAccessToken(token);
        res.json({ token: newToken });
    } catch (error) {
        next(error);
    }
});

module.exports = router
