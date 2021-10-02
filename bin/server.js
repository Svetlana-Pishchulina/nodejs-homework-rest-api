const mongoose = require('mongoose')
require('dotenv').config()
const app = require('../app')

const PORT = process.env.PORT || 3000

mongoose
  .connect(process.env.DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Database connection successful')
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`)
    })
  })
  .catch((err) => {
    console.log(err.message)
    process.exit(1)
  })
