class Player {
  constructor(width, height) {
    this._color = 'black';
    this._width = 16;
    this._height = 16;
    this._x = 48;
    this._y = 48;
  }
  get color() { return this._color };  

  get width() { return this._width };  

  get height() { return this._height };  

  get x() { return this._x };  
  set x(val) { this._x = val };

  get y() { return this._y };  
  set y(val) { this._y = val };

  move(x, y) {
    this.x += x;
    this.y += y;
  };
};

export default Player;