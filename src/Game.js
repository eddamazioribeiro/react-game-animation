import React, {useRef, useEffect, useState} from 'react';

var _ticker = null;
var _keyState = {};

const Game = ({height, width, tilesize}) => {
  const _gameScreen = useRef();
  const _config = {
    height: height,
    width: width,
    tilesize: tilesize,
    gameSpeed: 100
  };
  const [gameTimer, setGameTimer] = useState(0);
  const [player, setPlayer] = useState({
    color: 'black',
    width: _config.tilesize,
    height: _config.tilesize,
    x: 3 * _config.tilesize,
    y: 3 * _config.tilesize
  });

  useEffect(() => {
    initGame();
  }, []);

  useEffect(() => {
    gameLoop();
  }, [gameTimer]);

  const initGame = () => {
    bindEvent('keyup', handleKeyUp);
    bindEvent('keydown', handleKeyDown);

    let t = 0;
    _ticker = null;

    _ticker = setInterval(() => {
      setGameTimer(t++);
    }, _config.gameSpeed);
  };

  const gameLoop = () => {
    handleInput();

    const context = _gameScreen.current.getContext('2d');
    const tilesize = _config.tilesize;
    const height = _config.height * tilesize;
    const width = _config.width * tilesize;

    context.clearRect(0, 0, width, height);
    
    context.fillStyle = player.color;
    context.fillRect(player.x, player.y, player.width, player.height);
  };

  const handleInput = () => {
    let x = 0, y = 0;

    // enter
    if (_keyState[13]) {
      handleEnter();
    }
    // left arrow
    if (_keyState[37]) {
      x += -1;
      y += 0;
    }
    // up arrow
    if (_keyState[38]) {
      x += 0;
      y += -1;
    }
    // right arrow
    if (_keyState[39]) {
      x += 1;
      y += 0;
    }
    // down arrow
    if (_keyState[40]) {
      x += 0;
      y += 1;
    }

    movePlayer(x, y);
  };

  const handleKeyDown = e => {
    _keyState[e.keyCode || e.which] = true;
  }

  const handleKeyUp = e => {
    _keyState[e.keyCode || e.which] = false;
  }

  const bindEvent = (event, eventHandler) => {
    document.addEventListener(event, eventHandler);
  };

  const unbindEvent = (event, eventHandler) => {
    document.removeEventListener(event, eventHandler);
  };

  const movePlayer = (x, y) => {
    let newPlayer = {...player};
    let tilesize = _config.tilesize;

    newPlayer.x += x  * tilesize;
    newPlayer.y += y  * tilesize;

    setPlayer(newPlayer);
  }

  const handleEnter = () => {
    console.log('hit enter');
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