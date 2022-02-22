const Pool = require('pg').Pool
const pool = new Pool({
    user: process.env.POSTGRES_USERNAME,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
})

const setupDb = () => {
    pool.query('CREATE TABLE IF NOT EXISTS users (\n' +
        '   id serial PRIMARY KEY,\n' +
        '   username VARCHAR ( 50 ) UNIQUE NOT NULL,\n' +
        '   password VARCHAR ( 50 ) NOT NULL,\n' +
        '   email VARCHAR ( 255 ) UNIQUE NOT NULL,\n' +
        '   created_on TIMESTAMP NOT NULL\n' +
        ');')
    pool.query('CREATE TABLE IF NOT EXISTS posts (\n' +
        '   id serial PRIMARY KEY,\n' +
        '   user_id INT NOT NULL,\n' +
        '   text VARCHAR ( 255 ) NOT NULL,\n' +
        '   created_on TIMESTAMP NOT NULL,\n' +
        '   FOREIGN KEY (user_id)' +
        '       REFERENCES users (id)' +
        ');')
    pool.query('CREATE TABLE IF NOT EXISTS posts_likes (\n' +
        '   post_id INT NOT NULL,\n' +
        '   user_id INT NOT NULL,\n' +
        '   PRIMARY KEY (post_id, user_id),' +
        '   FOREIGN KEY (post_id)' +
        '       REFERENCES posts (id),' +
        '   FOREIGN KEY (user_id)' +
        '       REFERENCES users (id)' +
        ');')
    pool.query('CREATE TABLE IF NOT EXISTS posts_comments (\n' +
        '   id SERIAL NOT NULL,\n' +
        '   post_id INT NOT NULL,\n' +
        '   user_id INT NOT NULL,\n' +
        '   comment VARCHAR ( 255 ) NOT NULL,\n' +
        '   created_on TIMESTAMP NOT NULL,\n' +
        '   PRIMARY KEY (post_id, user_id),\n' +
        '   FOREIGN KEY (post_id)' +
        '       REFERENCES posts (id),\n' +
        '   FOREIGN KEY (user_id)' +
        '       REFERENCES users (id)' +
        ');')
    pool.query('CREATE TABLE IF NOT EXISTS followers (\n' +
        '   followed_id INT NOT NULL,\n' +
        '   follower_id INT NOT NULL,\n' +
        '   PRIMARY KEY (followed_id, follower_id),' +
        '   FOREIGN KEY (followed_id)' +
        '       REFERENCES users (id),' +
        '   FOREIGN KEY (follower_id)' +
        '       REFERENCES users (id)' +
        ');')
}

module.exports = {
    pool,
    setupDb
};