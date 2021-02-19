const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const studentRouter = require('./src/routers/student')
const userRouter = require('./src/routers/user')
const { PORT } = require('./src/helpers/env')

const app = express()

const db = require('./src/configs/connection')

async function start() {
    await db.initMongo()
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())

    app.use(cors())

    app
        .use('/api/v1/student', studentRouter)
        .use('/api/v1/user', userRouter)
        .use(express.static('src/images'))

    app.listen(PORT, () => {
        console.log(`server running on port ${PORT}`);
    })
}

start()