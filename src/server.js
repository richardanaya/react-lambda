import logger from 'winston';
import awsServerlessExpress from 'aws-serverless-express';
import awsServerlessExpressMiddleware from 'aws-serverless-express/middleware';
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();
const LOCAL_DEVELOPMENT = process.env.LOCAL_DEVELOPMENT === 'true';
const PORT = 3000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static('public'));
if (!LOCAL_DEVELOPMENT) {
  app.use(awsServerlessExpressMiddleware.eventContext());
}

app.get('/secret', (req, res) => {
  res.json([1, 2, 3]);
});

app.get('/serviceworker.js', (req, res) => {
  res.sendFile(path.resolve('public/serviceworker.js'));
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve('public/index.html'));
});


if (LOCAL_DEVELOPMENT) {
  app.listen(PORT, () => {
    logger.log(`listening on ${PORT}`);
  });
} else {
  const server = awsServerlessExpress.createServer(app);
  exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context);
}
