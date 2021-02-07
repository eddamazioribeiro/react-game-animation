import React, {useRef} from 'react';

const Game = ({height, width, tilesize}) => {
  const gameScreen = useRef();
  const config = {
    height: height,
    width: width,
    tilesize: tilesize
  };

  return(
    <div>
    <canvas ref={gameScreen}
        height={config.height * tilesize}
        width={config.width * tilesize}
        style={{
          border: '1px solid black',
          background: 'DimGrey'
        }}
        />
    </div>
  );
}

export default Game;