const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require('dotenv').config()
const colors = require('colors')
const {errorHandler} = require('./middleware/errorHandler')
const { connectDB } = require('./config/db')

connectDB()

const app = express()
const port = process.env.PORT

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))


app.use('/api/blogs', require('./routes/blogRoutes'))
app.use(errorHandler)


app.listen(port, () => {
  console.log(`Server running on http://localhost: ${port}`)
})