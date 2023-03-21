const router = require("express").Router();
const db = require("./queries.ts");

router.post('/login', db.login)
router.post('/sign-up', db.signUp)
router.post('/refresh-token', db.refreshAccessToken)

module.exports = router
