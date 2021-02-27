class Player {
  constructor(width, height) {
    this._color = 'black';
    this._width = 16;
    this._height = 16;
    this._x = 48;
    this._y = 48;
    this._facing = 0;
  }
  get color() { return this._color };  

  get width() { return this._width };  

  get height() { return this._height };  

  get x() { return this._x };  
  set x(val) { this._x = val };

  get y() { return this._y };  
  set y(val) { this._y = val };

  get facing() { return this._facing };

  move(x, y) {
    this.x += x;
    this.y += y;

    if (x < 0) this._facing = 2;
    else if (x > 0) this._facing = 3;

    if (y < 0) this._facing = 1;
    else if (y > 0) this._facing = 0;
  };
};

export default Player;