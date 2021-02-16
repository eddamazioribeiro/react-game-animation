class InputManager {
  keyState = {};
  observer = [];

  constructor() {
    this.bindEvent('keyup', handleKeyUp);
    this.bindEvent('keydown', handleKeyDown);
  }

  subscribe = (fn) => {
    this.observer.push(fn);
  }

  unsubscribe = (fn) => {
    this.observer = this.observer.filter(subscriber => subscriber !== fn);
  }
  
  bindEvent = (event, eventHandler) => {
    document.addEventListener(event, eventHandler);
  };

  unbindEvent = (event, eventHandler) => {
    document.removeEventListener(event, eventHandler);
  };

  broadcast = (action, data) => {
    this.observer.forEach(subscriber => subscriber(action, data));
  }

  handleInput = () => {
    // enter
    if (this.keyState[13]) {
      this.broadcast('hitEnter', null);
    }
    // left arrow
    if (this.keyState[37]) {
      this.broadcast('move', {x: -1, y: 0});
    }
    // up arrow
    if (this.keyState[38]) {
      this.broadcast('move', {x: 0, y: -1});
    }
    // right arrow
    if (this.keyState[39]) {
      this.broadcast('move', {x: 1, y: 0});
    }
    // down arrow
    if (this.keyState[40]) {
      this.broadcast('move', {x: 0, y: 1});
    }
  };

  handleKeyDown = e => {
    this.keyState[e.keyCode || e.which] = true;
  }

  handleKeyUp = e => {
    this.keyState[e.keyCode || e.which] = false;
  }
}

export default InputManager;