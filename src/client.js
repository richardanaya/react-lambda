import "./styles/app.css";

/**
 * Conditionally loads webcomponents polyfill if needed.
 * Credit: Glen Maddern (geelen on GitHub)
 */
 var webComponentsSupported = ('registerElement' in document
  && 'import' in document.createElement('link')
  && 'content' in document.createElement('template'));

if (!webComponentsSupported) {
  var wcPoly = document.createElement('script');
  wcPoly.onload = registerWebComponents;
  wcPoly.src = 'https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/0.7.24/webcomponents-lite.min.js';
  document.head.appendChild(wcPoly);
} else {
  registerWebComponents();
}

function registerWebComponents () {
  require('./components/hello')
  startApp();
}

function startApp()
{

}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
  navigator.serviceWorker.register('serviceworker.js').then((registration) => {
    console.log('ServiceWorker registration successful with scope: ', registration.scope);
  }).catch((err) => {
    console.log('ServiceWorker registration failed: ', err);
  });
  });
}
