import React from 'react';
import { renderToString } from 'react-dom/server';
import cors from 'cors';
import logger from 'winston';
import awsServerlessExpress from 'aws-serverless-express';
import awsServerlessExpressMiddleware from 'aws-serverless-express/middleware';
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './components/App';
import counter from './reducers';
const styleCSS = require('raw-loader!./styles/app.css');

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

function renderFullPage(html, preloadedState) {
  return `
  <!doctype html>
  <html>
    <head>
      <title>Counter</title>
      <link rel="icon" href="public/favicon.png" type="image/png" sizes="16x16 32x32">
      <meta name="theme-color" content="#000000">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="manifest" href="/public/manifest.json">
      <style>
        ${styleCSS}
      </style>
    </head>
    <body>
    <div id="root">${html}</div>
    </body>
    <script>
      window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)};
    </script>
    <script src="/public/bundle.js" async></script>
  </html>
  `;
}


app.get('/serviceworker.js', (req, res) => {
  const store = createStore(counter);
  const html = renderToString(
    <Provider store={store}>
      <App />
    </Provider>,
 );
  const preloadedState = store.getState();
  const fullHtml = renderFullPage(html, preloadedState);
  res.setHeader('cache-control', 'no-cache');
  res.setHeader('content-type', 'text/javascript');
  res.send(`
      importScripts("https://cdn.rawgit.com/sigiljs/trapezoid/fdcef301/trapezoid.min.js");
      const app = trapezoid();
      //precache our dependencies
      app.precache([
        '/public/bundle.js',
        '/public/favicon.png'
      ]);
      //these routes always use the cache
      app.useCache('/public/bundle.js');
      app.useCache('/public/favicon.png');
      //these routes will use offline response only when fetch fails
      app.offline('/', (req, res) => {
        res.send(\`
            ${fullHtml}
          \`
        );
      });
      app.run('app-cache-v1');
    `);
});

app.get('*', (req, res) => {
  const store = createStore(counter);
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
