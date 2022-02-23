const jwt = require("./utils/jwt.ts");
const pool = require("../db/setup.ts").pool;

const login = (request, response, next) => {
    const { username, password } = request.body;

    pool.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password], (error, result) => {
        if (error) {
            next(error.message);
        } else if (result.rows.length === 0){
            response.status(403).send("Wrong credentials");
        } else {
            response.status(200).json({jwt: jwt.generateAccessToken(result.rows[0].id)})
        }
    })
}

const signUp = (request, response, next) => {
    const { username, email, password } = request.body
    const timestamp = new Date();

    pool.query('INSERT INTO users (username, email, password, created_on) VALUES ($1, $2, $3, $4)', [username, email, password, timestamp], (error, result) => {
        if (error) {
            next(error.message);
        } else {
            response.status(201).send("User added")
        }
    })
}

module.exports = {
    login,
    signUp
}