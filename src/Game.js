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

  useEffect(() => {
    // initGame();
  }, []);

  useEffect(() => {
    bindEvent('keydown', handleInput);
  });

  const initGame = () => {
    let t = 0;

    _ticker = setInterval(() => {
      setGameTimer(t++);
      console.log(t);
    }, _config.gameSpeed);
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
        console.log({x: -1,y: 0});
        keyPressed = true;
        break;
      case 38: // up arrow
        console.log({x: 0, y: -1});
        keyPressed = true;
        break;
      case 39: // right arrow
        console.log({x: 1, y: 0});
        keyPressed = true;
        break;
      case 40: // down arrow
        console.log({x: 0, y: 1});
        keyPressed = true;
        break;
      default:
        break;
    }

    // if (keyPressed) unbindEvent('keydown', handleInput);
  };

  const bindEvent = (event, eventHandler) => {
    document.addEventListener(event, eventHandler);
  };

  const unbindEvent = (event, eventHandler) => {
    document.removeEventListener(event, eventHandler);
  };

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