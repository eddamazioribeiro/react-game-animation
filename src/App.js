import './index.css';
import Game from './Game';

function App() {
  return (
    <div className="App">
      <Game
        height={20}
        width={18} 
        tilesize={16}
        />
    </div>
  );
}

export default App;
