const express = require('express')
const v1 = express.Router()

v1.get('/', (req, res) => {
  res.send({
    message: 'API Entrypoint',
    version: 'v1'
  })
})

v1.get('')

module.exports = v1
