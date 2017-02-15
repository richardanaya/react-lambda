var HelloWorldProto = Object.create(HTMLElement.prototype);

HelloWorldProto.createdCallback = function() {
  this.innerHTML = "<div>Hello World!</div>";
};

document.registerElement('hello-world', {prototype: HelloWorldProto});
