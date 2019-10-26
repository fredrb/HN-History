const express = require('express');
const app = express();

const v1 = express.Router();

v1.get('/', (req, res) => {
  res.send({
    message: 'API Entrypoint',
    version: 'v1'
  });
});

app.use('/v1', v1);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`App started on port ${port}`));
