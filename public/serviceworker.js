// Get things started
importScripts('https://cdn.rawgit.com/sigiljs/trapezoid/master/trapezoid.min.js');
const app = trapezoid();

app.precache('/');

app.run('app-cache-v1');
