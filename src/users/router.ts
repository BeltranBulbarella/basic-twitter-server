const router = require("express").Router();
const db = require("./queries.ts");

router.get('/users', db.getUsers)
router.get('/users/:id', db.getUserById)
router.put('/users/:id', db.updateUser)
router.delete('/users/:id', db.deleteUser)

module.exports = router
