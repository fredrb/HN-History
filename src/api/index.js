const router = require('express').Router();

router.use('/v1', require('./v1'));
router.get('/', (req, res) => {
  res.send({
    message: 'Herodotus API'
  });
})

module.exports = router;
