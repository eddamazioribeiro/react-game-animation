class Player {
  constructor(width, height, scale) {
    this._width = width;
    this._height = height;
    this._x = 1;
    this._y = 1;
    this._scale = scale;
    this._facing = 0;
    this._frameIndex = 0;
    this._isMoving = false;
  }

  get width() { return this._width };  

  get height() { return this._height };

  get scale() { return this._scale };  

  get x() { return this._x };  
  set x(val) { this._x = val };

  get y() { return this._y };  
  set y(val) { this._y = val };

  get frameIndex() { return this._frameIndex };  
  set frameIndex(val) { this._frameIndex = val };

  get facing() { return this._facing };

  get isMoving() { return this._isMoving };

  move(x, y) {
    if (x != 0 || y != 0) this._isMoving = true;
    else this._isMoving = false;

    this.x += x;
    this.y += y;

    if (x < 0) this._facing = 2;
    else if (x > 0) this._facing = 3;

    if (y < 0) this._facing = 1;
    else if (y > 0) this._facing = 0;
  };
};

export default Player;