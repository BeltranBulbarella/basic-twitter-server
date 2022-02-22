const pool = require("../db/setup.ts").pool;

const createPost = (request, response, next) => {
    const { text } = request.body;
    const timestamp = new Date();
    const userId = request.user.userId;
    pool.query('INSERT INTO posts (text, user_id, created_on) VALUES ($1, $2, $3)', [text, userId, timestamp], (error, result) => {
        if (error) {
            next(error.message);
        } else {
            response.status(200).send("Post created")
        }
    })
}

const likePost = (request, response, next) => {
    const { postId } = request.params;
    const userId = request.user.userId;
    pool.query('INSERT INTO posts_likes (post_id, user_id) VALUES ($1, $2)', [postId, userId], (error, result) => {
        if (error) {
            next(error.message);
        } else {
            response.status(200).send("Post liked")
        }
    })
}

const deleteLike = (request, response, next) => {
    const { postId } = request.params;
    const userId = request.user.userId;
    pool.query('DELETE FROM posts_likes WHERE post_id = $1 AND user_id = $2', [postId, userId], (error, result) => {
        if (error) {
            next(error.message);
        } else {
            response.status(200).send("Post unliked")
        }
    })
}

const getMyPosts = (request, response, next) => {
    const userId = request.user.userId;
    pool.query('SELECT * FROM posts WHERE user_id = $1', [userId], (error, result) => {
        if (error) {
            next(error.message);
        } else {
            response.status(200).json(result.rows)
        }
    })
}

const getPostsByUserId = (request, response, next) => {
    const id = request.params.userId;
    pool.query('SELECT * FROM posts WHERE user_id = $1', [id], (error, result) => {
        if (error) {
            next(error.message);
        } else {
            response.status(200).json(result.rows)
        }
    })
}

const getLikesByPost = (request, response, next) => {
    const {postId} = request.params;
    pool.query('SELECT * FROM posts_likes WHERE post_id = $1', [postId], (error, result) => {
        if (error) {
            next(error.message);
        } else {
            response.status(200).json(result.rows.map(row => row.user_id))
        }
    })
}

const commentPost = (request, response, next) => {
    const { postId } = request.params;
    const { comment } = request.body;
    const timestamp = new Date();
    const userId = request.user.userId;
    pool.query('INSERT INTO posts_comments (post_id, user_id, comment, created_on) VALUES ($1, $2, $3, $4)', [postId, userId, comment, timestamp], (error, result) => {
        if (error) {
            next(error.message);
        } else {
            response.status(200).send("Post commented")
        }
    })
}

const getCommentsByPost = (request, response, next) => {
    const {postId} = request.params;
    pool.query('SELECT * FROM posts_comments WHERE post_id = $1', [postId], (error, result) => {
        if (error) {
            next(error.message);
        } else {
            response.status(200).json(result.rows)
        }
    })
}

module.exports = {
    createPost,
    likePost,
    deleteLike,
    getMyPosts,
    getPostsByUserId,
    getLikesByPost,
    commentPost,
    getCommentsByPost
}