const router = require("express").Router();
const db = require("./queries.ts");

router.put('/followers/follow/:userId', db.followUser)
router.delete('/followers/unfollow/:userId', db.unfollowUser)
router.get('/followers/me', db.getMyFollowers)
router.get('/followers/followed/me', db.getMyFolloweds)
router.get('/followers/by-user/:userId', db.getUserFollowers)
router.get('/followers/followed/by-user/:userId', db.getUserFolloweds)

module.exports = router