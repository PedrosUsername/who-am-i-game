import logo from './logo.svg';
import './App.css';
import Game from './game/Game';

function App() {
  const random = Math.floor(Math.random() * 5000) + 1;  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <main>
        <h1>Qual é o número? </h1>
        <Game random={random}/>
      </main>
    </div>
  );
}

export default App;
