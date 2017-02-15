importScripts("https://cdn.rawgit.com/sigiljs/trapezoid/fdcef301/trapezoid.min.js");
const app = trapezoid();
//precache our dependencies
app.precache([
  '/',
  '/public/bundle.js',
  '/public/favicon.png'
]);
app.useCache('/');
app.useCache('/public/bundle.js');
app.useCache('/public/favicon.png');
app.run('app-cache-v1');
