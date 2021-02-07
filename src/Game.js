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
    initGame();
  }, []);

  let t = 0;
  const initGame = () => {
    _ticker = setInterval(() => {
      setGameTimer(t++);
      console.log(t);
    }, _config.gameSpeed);
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