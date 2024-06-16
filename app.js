const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const router = require('./routes/index')
const errorHandler = require('./middlewares/errorHandler')

const PORT = 5000
const app = express()

app.use(morgan('dev'))
app.use(express.json({ limit: '5mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(cors({
  origin: 'http://localhost:5173',
  allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  methods: "GET, POST, PUT, DELETE, PATCH, OPTIONS",
}))

app.use(router)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})

module.exports = app;
