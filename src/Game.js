import React, {useRef, useEffect, useState} from 'react';

const Game = ({height, width, tilesize}) => {
  const _gameScreen = useRef();
  const _config = {
    height: height,
    width: width,
    tilesize: tilesize,
    gameSpeed: 1000
  };
  var _ticker = null;

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
    bindEvent('keydown', handleInput);
    gameLoop();
  });

  const initGame = () => {
    let t = 0;

    _ticker = setInterval(() => {
      setGameTimer(t++);
      console.log(t);
    }, _config.gameSpeed);
  };

  const gameLoop = () => {
    const context = _gameScreen.current.getContext('2d');
    const tilesize = _config.tilesize;
    const height = _config.height * tilesize;
    const width = _config.width * tilesize;

    context.clearRect(0, 0, height, width);
    
    context.fillStyle = player.color;
    context.fillRect(player.x, player.y, player.width, player.height);
  };

  const handleInput = e => {
    e.preventDefault();

    let keyPressed = false;

    switch (e.keyCode) {
      case 13: // enter
        console.log('enter');
        keyPressed = true;
        break;
      case 37: // left arrow
        movePlayer(-1, 0);
        keyPressed = true;
        break;
      case 38: // up arrow
        movePlayer(0, -1);
        keyPressed = true;
        break;
      case 39: // right arrow
        movePlayer(1, 0);
        keyPressed = true;
        break;
      case 40: // down arrow
        movePlayer(0, 1);
        keyPressed = true;
        break;
      default:
        break;
    }

    if (keyPressed) unbindEvent('keydown', handleInput);
  };

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
  return(
    <div>
    <canvas ref={_gameScreen}
        height={_config.height * _config.tilesize}
        width={_config.width * _config.tilesize}
        style={{
          border: '1px solid black',
          background: 'DimGrey'
        }}
        />
    </div>
  );
}

export default Game;