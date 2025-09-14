const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const userRoutes = require('./routes/userRoutes')
const connectDB = require('./config/db.config')

dotenv.config()

connectDB()

const app = express()

const PORT = process.env.PORT || 5000

app.use(cors())

app.use(express.json())

app.use('/api/auth', userRoutes)

app.get('/', (req, res) => {
    res.send('Hello from LensLink Server!')
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});

module.exports = app;