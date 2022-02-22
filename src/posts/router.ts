const router = require("express").Router();
const db = require("./queries.ts");

router.post('/posts', db.createPost)
router.put('/posts/like/:postId', db.likePost)
router.delete('/posts/unlike/:postId', db.deleteLike)
router.get('/posts/me', db.getMyPosts)
router.get('/posts/by-user/:userId', db.getPostsByUserId)
router.get('/posts/likes/:postId', db.getLikesByPost)
router.post('/posts/comments/:postId', db.commentPost)
router.get('/posts/comments/:postId', db.getCommentsByPost)

module.exports = router
