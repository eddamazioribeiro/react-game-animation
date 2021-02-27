import './index.css';
import Game from './Game';

function App() {
  return (
    <div className="App">
      <Game
        height={40}
        width={36} 
        tilesize={8}
        />
    </div>
  );
}

export default App;
