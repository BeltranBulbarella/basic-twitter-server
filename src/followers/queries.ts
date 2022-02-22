const pool = require("../db/setup.ts").pool;

const followUser = (request, response, next) => {
    const { userId } = request.params
    const followerId = request.user.userId

    pool.query('INSERT INTO followers (follower_id, followed_id) VALUES ($1, $2)', [followerId, userId], (error, result) => {
        if (error) {
            next(error.message);
        } else {
            response.status(201).send("User followed")
        }
    })
}

const unfollowUser = (request, response, next) => {
    const { userId } = request.params
    const followerId = request.user.userId

    pool.query('DELETE FROM followers WHERE follower_id = $1 AND followed_id = $2', [followerId, userId], (error, result) => {
        if (error) {
            next(error.message);
        } else {
            response.status(201).send("User unfollowed")
        }
    })
}

const getMyFolloweds = (request, response, next) => {
    const followerId = request.user.userId;
    pool.query('SELECT * FROM followers WHERE follower_id = $1', [followerId], (error, result) => {
        if (error) {
            next(error.message);
        } else {
            response.status(201).send(result.rows.map(row => row.followed_id))
        }
    })
}

const getMyFollowers = (request, response, next) => {
    const followedId = request.user.userId;
    pool.query('SELECT * FROM followers WHERE followed_id = $1', [followedId], (error, result) => {
        if (error) {
            next(error.message);
        } else {
            response.status(201).send(result.rows.map(row => row.follower_id))
        }
    })
}

const getUserFollowers = (request, response, next) => {
    const { userId } = request.params;
    pool.query('SELECT * FROM followers WHERE followed_id = $1', [userId], (error, result) => {
        if (error) {
            next(error.message);
        } else {
            response.status(201).send(result.rows.map(row => row.follower_id))
        }
    })
}

const getUserFolloweds = (request, response, next) => {
    const { userId } = request.params;
    pool.query('SELECT * FROM followers WHERE follower_id = $1', [userId], (error, result) => {
        if (error) {
            next(error.message);
        } else {
            response.status(201).send(result.rows.map(row => row.followed_id))
        }
    })
}

module.exports = {
    followUser,
    unfollowUser,
    getMyFollowers,
    getMyFolloweds,
    getUserFollowers,
    getUserFolloweds
}