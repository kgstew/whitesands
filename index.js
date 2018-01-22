const express = require('express')
const app = express()

app.use('./src/index.js')

app.listen(3000, () => console.log('Server running on port 3000'))
