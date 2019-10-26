const router = require('express').Router()

const bodyParser = require('body-parser')

router.use(bodyParser.json())

router.use('/v1', require('./v1'))
router.get('/', (req, res) => {
  res.send({
    message: 'Herodotus API'
  })
})

module.exports = router
