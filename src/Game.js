import React, {useRef, useEffect, useState} from 'react';
import InputManager from './helpers/InputManager';
import Player from './models/Player';

var _ticker = null;
var _inputManager = new InputManager();
var _player = new Player(16, 18, 2);
var _frameCount = 0;

const Game = ({height, width, tilesize}) => {
  const [gameTimer, setGameTimer] = useState(0);
  const _gameScreen = useRef();
  const _config = {
    height: height,
    width: width,
    tilesize: tilesize,
    finalHeight: height * tilesize,
    finalWidth: width * tilesize,
    gameSpeed: 1
  };

  useEffect(() => {
    _inputManager.storeHandler('movePlayer', movePlayer);
    _inputManager.storeHandler('handleEnter', handleEnter);

    initGame();
  }, []);

  useEffect(() => {
    _frameCount++;

    if (_frameCount >= 15) {
      gameLoop();

      _frameCount = 0;
    }
  }, [gameTimer]);

  const initGame = () => {
    _player.x = 1;
    _player.y = 1;

    let t = 0;
    _ticker = null;
    
    _ticker = createTimer(t);
  }

  const createTimer = (t) => {
    return setInterval(() => {
      t++;
      setGameTimer(t);
    }, _config.gameSpeed);
  }

  const gameLoop = () => {
    _inputManager.handleInput();

    const context = _gameScreen.current.getContext('2d');

    context.clearRect(0, 0, _config.finalWidth, _config.finalHeight);

    drawCharacter(context);
  };

  const drawCharacter = (context) => {
    const drawFrame = (frameX, frameY, x, y) => {
      let scaledWidth = _player.width * _player.scale;
      let scaledHeight = _player.height * _player.scale;

      context.drawImage(_player.graphics,
        frameX * _player.width, frameY * _player.height, _player.width, _player.height,
        _player.x + (_player.width * x), _player.y + (_player.height * y), scaledWidth, scaledHeight);
    };

    const walkFrames = [0, 1, 0, 2];

    if (!_player.isMoving) _player.frameIndex = 0;

    drawFrame(walkFrames[_player.frameIndex], _player.facing, 0, 0);

    _player.frameIndex++;

    if (_player.frameIndex >= walkFrames.length) _player.frameIndex = 0;

    return context;
  }

  const movePlayer = (data) => {
    let {x, y} = data;
    let stepLength = (x != 0 && y != 0) ? _config.tilesize / (_player.scale * 1.5) : _config.tilesize / _player.scale;
    let scaledWidth = _player.width * _player.scale;
    let scaledHeight = _player.height * _player.scale;
    let xAux = (x * stepLength),
      yAux = (y * stepLength);
    let newX = _player.x + xAux,
      newY = _player.y + yAux;

    if ((newX > 0 && newX <= (_config.finalWidth) - scaledWidth)
      && (newY > 0 && newY <= (_config.finalHeight) - scaledHeight)) {
      _player.move((xAux), (yAux));
    }
  }

  const handleEnter = (data) => {
    restart();
  }

  const restart = () => {
    clearInterval(_ticker);

    setTimeout(() => {
      initGame();
    }, 1000);
  }

  return(
    <div>
      <canvas ref={_gameScreen}
          height={_config.height * _config.tilesize}
          width={_config.width * _config.tilesize}
          style={{
            border: '1px solid black',
            background: 'DimGrey'
          }}/>
    </div>
  );
}

export default Game;