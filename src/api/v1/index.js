const express = require('express')
const v1 = express.Router()

const HackerNewsSource = require('../../sources/hacker-news')
const hn = new HackerNewsSource()

v1.get('/', (req, res) => {
  res.send({
    message: 'API Entrypoint',
    version: 'v1'
  })
})

v1.get('/source/hacker-news/:keyword/:year', async (req, res) => {
  try {
    const results = await hn.fetchByYear(req.params.keyword, req.params.year)
    res.send({
      success: true,
      results
    })
  } catch (error) {
    res.status(500)
    res.send({
      success: false,
      message: error.message
    })
  }
})

v1.get('')

module.exports = v1
