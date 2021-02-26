import React, {useRef, useEffect, useState} from 'react';
import InputManager from './helpers/InputManager';
import Player from './models/Player';
import imgAux from './assets/bmp.png';

var _ticker = null;
var _inputManager = new InputManager();
var _player = new Player();

const img = new Image();

const Game = ({height, width, tilesize}) => {
  const [gameTimer, setGameTimer] = useState(0);
  const _gameScreen = useRef();
  const _config = {
    height: height,
    width: width,
    tilesize: tilesize,
    gameSpeed: 100
  };

  useEffect(() => {
    img.onload = function() {
      console.log('loaded');
    }
    img.onerror = (e) => {
      console.error('error', e);
    }
    
    img.src = imgAux;

    _inputManager.storeHandler('movePlayer', movePlayer);
    _inputManager.storeHandler('handleEnter', handleEnter);

    initGame();
  }, []);

  useEffect(() => {
    gameLoop();
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

    context.drawImage(img, _player.x, _player.y, 30, 30);

    // context.fillStyle = _player.color;
    // context.fillRect(_player.x, _player.y, _player.width, _player.height);
  };

  const movePlayer = (data) => {
    let {x, y} = data;

    let tilesize = _config.tilesize;

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