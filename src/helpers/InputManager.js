class InputManager {
  handlers = [];
  keyState = {};

  constructor() {
    this.bindEvent('keyup', this.handleKeyUp);
    this.bindEvent('keydown', this.handleKeyDown); 
  }

  storeHandler = (name, handler) => {
    this.handlers[name] = handler;
  }

  removeHandler = (name) => {
    if (name) delete this.handlers[name];
    else this.handlers = [];
  }

  handleKeyDown = (e) => {
    this.keyState[e.keyCode || e.which] = true;
  }
  
  handleKeyUp = (e) => {
    this.keyState[e.keyCode || e.which] = false;
  }
  
  bindEvent = (event, eventHandler) => {
    document.addEventListener(event, eventHandler);
  };
  
  unbindEvent = (event, eventHandler) => {
    document.removeEventListener(event, eventHandler);
  };

  callHandler = (name, data) => {
    if (this.handlers[name]) return this.handlers[name](data);
    else console.error('Handler not found');
  }
  
  handleInput = () => {
    let data = {x: 0, y: 0};
  
    // enter
    if (this.keyState[13]) {
      data['enter'] = true;
      this.callHandler('handleEnter', data);
    }
    // left arrow
    if (this.keyState[37]) {
      data['x'] += -1;
      data['y'] += 0;
    }
    // up arrow
    if (this.keyState[38]) {
      data['x'] += 0;
      data['y'] += -1;
    }
    // right arrow
    if (this.keyState[39]) {
      data['x'] += 1;
      data['y'] += 0;
    }
    // down arrow
    if (this.keyState[40]) {
      data['x'] += 0;
      data['y'] += 1;
    }

    this.callHandler('movePlayer', data);
  };
}

export default InputManager;