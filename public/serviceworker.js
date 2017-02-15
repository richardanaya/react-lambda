importScripts("https://cdn.rawgit.com/sigiljs/trapezoid/fdcef301/trapezoid.min.js");
const app = trapezoid();
//precache our dependencies
app.precache([
  '/',
  '/public/app.bundle.js'
]);
app.useCache('/');
app.useCache('/public/app.bundle.js');
app.run('app-cache-v1');
