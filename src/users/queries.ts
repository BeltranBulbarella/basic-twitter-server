const pool = require("../db/setup.ts").pool;

const getUsers = (request, response, next) => {
    pool.query('SELECT * FROM users', (error, results) => {
        if (error) {
            next(error.message);
        } else {
            response.status(200).json(results.rows)
        }
    })
}

const getUserById = (request, response, next) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            next(error.message);
        } else {
            response.status(200).json(results.rows)
        }
    })
}

const updateUser = (request, response, next) => {
    const id = request.params.id
    const { name, email, password } = request.body

    pool.query(
        'UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4',
        [name, email, password, id],
        (error) => {
            if (error) {
                next(error.message);
            } else {
                response.status(200).send(`User modified with ID: ${id}`)
            }
        }
    )
}

const deleteUser = (request, response, next) => {
    const id = request.params.id

    pool.query('DELETE FROM users WHERE id = $1', [id], (error) => {
        if (error) {
            next(error.message);
        } else {
            response.status(200).send(`User deleted with ID: ${id}`)
        }
    })
}

module.exports = {
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
}
