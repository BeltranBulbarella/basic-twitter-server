const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 5000
const jwt = require("./src/authentication/utils/jwt.ts");
require('dotenv').config()
require('./src/db/setup.ts').setupDb();

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.use('/api', require("./src/authentication/router.ts"))
app.use('/api', jwt.authenticateToken, require("./src/users/router.ts"))
app.use('/api', jwt.authenticateToken, require("./src/posts/router.ts"))
app.use('/api', jwt.authenticateToken, require("./src/followers/router.ts"))
app.use((err, req, res, next) => {
    res.status(500).send(err);
})

app.get('/', (request, response) => {
    response.json({ info: 'Basic server API' })
})

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})