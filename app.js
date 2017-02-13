import React from 'react';
import { renderToString } from 'react-dom/server';
import cors from 'cors';
import logger from 'winston';
import awsServerlessExpress from 'aws-serverless-express';
import awsServerlessExpressMiddleware from 'aws-serverless-express/middleware';
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './components/App';

dotenv.config();
const LOCAL_DEVELOPMENT = process.env.LOCAL_DEVELOPMENT === 'true';
const PORT = 3000;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static('public'));
if (!LOCAL_DEVELOPMENT) {
  app.use(awsServerlessExpressMiddleware.eventContext());
}

app.get('/secret', (req, res) => {
  res.json([1, 2, 3]);
});

function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

const store = createStore(counter);

function renderFullPage(html, preloadedState) {
  return `
  <html>
    <head>
      <title>Counter</title>
      <link rel="icon" href="public/favicon.png" type="image/png" sizes="16x16 32x32"> 
      <meta name="theme-color" content="#000000">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="manifest" href="/public/manifest.json">
    </head>
    <body>
    ${html}
    <body>
    <script>
      var PRELOADED_STATE = ${JSON.stringify(preloadedState)};
    </script>
  </html>
  `;
}

app.get('*', (req, res) => {
  logger.log('hey');
  const html = renderToString(
    <Provider store={store}>
      <App />
    </Provider>,
 );
  const preloadedState = store.getState();
  res.send(renderFullPage(html, preloadedState));
});


if (LOCAL_DEVELOPMENT) {
  app.listen(PORT, () => {
    logger.log(`listening on ${PORT}`);
  });
} else {
  const server = awsServerlessExpress.createServer(app);
  exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context);
}
