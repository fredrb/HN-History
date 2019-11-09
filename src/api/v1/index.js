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

v1.get('/sources', (req, res) => {
  res.send({
    sources: [
      'hacker-news'
    ]
  })
})

v1.get('/source/hacker-news/:keyword/:year', async (req, res) => {
  try {
    const results = await hn.fetchByYear(req.params.keyword, parseInt(req.params.year))
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

v1.get('/source/hacker-news/:keyword/:from/:to', async (req, res) => {
  try {
    const from = req.params.from
    const to = req.params.to

    if (from > to) {
      res.status(400)
      res.send({
        message: 'invalid parameters'
      })
    }

    const list = []
    for (let year = parseInt(from); year <= parseInt(to); year++) {
      list.push({
        year,
        promise: hn.fetchByYear(req.params.keyword, parseInt(year))
      })
    }

    const promiseResult = await Promise.all(list.map((i) => i.promise))
    const results = {}
    promiseResult.forEach(r => {
      results[r.year] = r
    })

    res.send({
      results
    })
  } catch (error) {
    console.error(error)
    res.status(500)
    res.send({
      message: error.message
    })
  }
})

module.exports = v1
