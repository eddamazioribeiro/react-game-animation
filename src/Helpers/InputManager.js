class InputManager {

  constructor() {
    this.bindEvent('keyup', handleKeyUp(_keyState));
    this.bindEvent('keydown', handleKeyDown(_keyState)); 
  }

  handleKeyDown = (controller) => (e) => {
    controller[e.keyCode || e.which] = true;
  }
  
  handleKeyUp = (controller) => (e) => {
    controller[e.keyCode || e.which] = false;
  }
  
  bindEvent = (event, eventHandler) => {
    document.addEventListener(event, eventHandler);
  };
  
  unbindEvent = (event, eventHandler) => {
    document.removeEventListener(event, eventHandler);
  };
  
  handleInput = (keyState) => {
    let result = {x: 0, y: 0};
  
    // enter
    if (keyState[13]) {
      result['enter'] = true;
    }
    // left arrow
    if (keyState[37]) {
      result['x'] += -1;
      result['y'] += 0;
    }
    // up arrow
    if (keyState[38]) {
      result['x'] += 0;
      result['y'] += -1;
    }
    // right arrow
    if (keyState[39]) {
      result['x'] += 1;
      result['y'] += 0;
    }
    // down arrow
    if (keyState[40]) {
      result['x'] += 0;
      result['y'] += 1;
    }

    return result;
  };
}