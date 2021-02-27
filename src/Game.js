import React, {useRef, useEffect, useState} from 'react';
import InputManager from './helpers/InputManager';
import Player from './models/Player';
import characterSrc from './assets/img/Green-Cap-Character-16x18.png';

var _ticker = null;
var _inputManager = new InputManager();
var _player = new Player();
var _frameCount = 0;
var _frameIndex = 0;

const characterImg = new Image();

const Game = ({height, width, tilesize}) => {
  const [gameTimer, setGameTimer] = useState(0);
  const _gameScreen = useRef();
  const _config = {
    height: height,
    width: width,
    tilesize: tilesize,
    gameSpeed: 0.5
  };

  useEffect(() => {
    characterImg.onload = function() {
      console.log('image loaded');
    }
    characterImg.onerror = () => {
      console.error('error while loading image');
    }
    
    characterImg.src = characterSrc;

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
    let t = 0;
    _ticker = null;

    _ticker = setInterval(() => {
      setGameTimer(t++);
    }, _config.gameSpeed);
  };

  const gameLoop = () => {
    _inputManager.handleInput();

    const context = _gameScreen.current.getContext('2d');
    const tilesize = _config.tilesize;
    const height = _config.height * tilesize;
    const width = _config.width * tilesize;

    context.clearRect(0, 0, width, height);

    drawGreenCap(context);
  };

  const drawGreenCap = (context) => {
    const drawFrame = (frameX, frameY, x, y) => {
      const width = 16;
      const height = 18;

      context.drawImage(characterImg,
        frameX * width, frameY * height, width, height,
        _player.x + (width * x), _player.y + (height * y), _config.tilesize, _config.tilesize);
    };

    const walkFrames = [0, 1, 0, 2];

    drawFrame(walkFrames[_frameIndex], _player.facing, 0, 0);

    _frameIndex++;

    if (_frameIndex >= walkFrames.length) _frameIndex = 0;

    return context;
  }

  const movePlayer = (data) => {
    let {x, y} = data;

    let tilesize = _config.tilesize / 4;

    _player.move(x * tilesize, y * tilesize);
  }

  const handleEnter = (data) => {
    console.log('hit enter');
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