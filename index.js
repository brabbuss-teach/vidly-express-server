const express = require('express')
const app = express()
const genres = require('./routes/genres')
const home = require('./routes/home')

app.use(express.json()) // middleware touching req.body
app.use('/api/genres', genres)
app.use('/', home)

const port = process.env.PORT || 8000
app.listen(port, () => console.log('Listening on port: ' + port))