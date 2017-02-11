const awsServerlessExpress = require('aws-serverless-express');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(awsServerlessExpressMiddleware.eventContext());
app.use('/public', express.static('public'));

app.get('/secret', (req, res) => {
  res.json([1, 2, 3]);
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve('public/index.html'));
});

if (process.env.LOCAL_DEVELOPMENT === 'true') {
  const port = 3000;
  app.listen(port, () => {
    console.log(`listening on ${port}`);
  });
} else {
  const server = awsServerlessExpress.createServer(app);
  exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context);
}
