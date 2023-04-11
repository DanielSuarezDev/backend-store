const express = require('express');
const routerApi = require('./router');
const cors = require('cors');
const {logErrors, errorHandler, boomErrorHandler} = require('./middlewares/error.handler');

const app = express();
const port = 4000;

app.get('/', (req, res) => {
  res.send('Hello World! My Dogs');
});

app.use(express.json());
app.use(cors());

routerApi(app)

app.use(boomErrorHandler);
app.use(logErrors);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})
