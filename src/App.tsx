import { useEffect, useState } from 'react';
import './App.css';
import { PicketSign } from './components/PicketSign';
import { GameSettings, Difficulty } from './components/GameSettings';
import { Game, NewGame } from './game';

function App() {
  const [game, setGame] = useState<Game>(NewGame());
  const [duration, setDuration] = useState('0m 0s');
  const [gameSettingsOpen, setGameSettingsOpen] = useState(false);
  const [gameDifficulty, setGameDifficulty] = useState<Difficulty>(Difficulty.ONE);

  useEffect(() => {
    const interval = setInterval(() => {
      setDuration(game.getDuration());
    }, 1000);

    return () => clearInterval(interval);
  }, [duration, setDuration, game]);

  useEffect(() => {
    let timeout: number | undefined;

    if (game.hasFlippedTwoCardsWithoutMatch()) {
      timeout = setTimeout(() => {
        setGame(game.resetUnmatchedCards());
      }, 1000);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    }
  }, [game, setGame]);

  return (
    <>
      <div id="header">
        <h1 style={{margin: '0.2em 0.5em 0'}}>Match Strike</h1>
        <button style={{float: 'right', margin: '0 0.5em 0'}} type='button' onClick={() => setGameSettingsOpen(!gameSettingsOpen)}>
          Settings
        </button>
        <GameSettings
          onClose={() => setGameSettingsOpen(false)}
          isOpen={gameSettingsOpen}
          onSave={(difficulty) => {
            setGameDifficulty(difficulty)
          }}
        />
      </div>
      <div id="game-container">
        <div id="game">
          {game.getCards().map((card) => (
            <div
              className="card"
              key={card.id}
              onClick={() => setGame(game.handleClick(card))}
            >
              <PicketSign card={card} />
            </div>
          ))}
        </div>
      </div>
      <div className="scoreboard-container">
        <div className="scoreboard">
          <p className="time">
            <strong>Time spent:</strong> {duration}
          </p>
          <div className="row">
            <p className="attempts">
              <strong>Picket signs flipped:</strong> {game.getAttempts()}
            </p>
            <p className="score">
              <strong>Matches:</strong> {game.getScore()}
            </p>
          </div>
        </div>
      </div>
      {
        game.hasMatchAllCards() &&
        <div className="summary-container">
          <div className="summary">
            <h1>You ratified a contract!</h1>
            <p className="time">
              <strong>Time spent:</strong> {duration}
            </p>
            <p className="attempts">
              <strong>Picket signs flipped:</strong> {game.getAttempts()}
            </p>
            <button 
              type='button' 
              onClick={() => setGame(game.reset())}
            >
              Play Again
            </button>
          </div>
        </div>
      }
    </>
  );
}

export default App;


