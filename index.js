const port = process.env.PORT || 8080;

require('./src/server').listen(port, () => console.log(`App started on port ${port}`));
