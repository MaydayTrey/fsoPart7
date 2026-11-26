//Need to figure out how this works, I believe this takes all 
//The parts of the pipeline assembles them, then hands it to index.js
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const blogRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const app = express()

logger.info('connecting')

mongoose
    .connect(config.MONGODB_URI, { family: 4})
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.error("Error connecting to MongoDB,", error.message)
    })


app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)
app.use('/api/blogs', blogRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

//Guarded router initialization; only if the NODE_ENV is 'test' do we give access to the testing endpoint. 
if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

// serve the built Vite frontend in prod mode
// This has to come AFTER the API routers: the /*splat route answers every GET
// it sees, so placed above them it would return index.html for /api/blogs too.
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')))
  app.get('/*splat', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'))
  })
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
