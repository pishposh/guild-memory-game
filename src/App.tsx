import { useEffect, useState } from 'react';
import './App.css';
import { PicketSign } from './components/PicketSign';
import { Game, NewGame } from './game';
import { InfoDialog } from './components/InfoDialog';

function App() {
  const [game, setGame] = useState<Game>(NewGame());
  const [duration, setDuration] = useState('0m 0s');
  const [infoDialogOpen, setInfoDialogOpen] = useState(false);

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
        <a href="https://nytimesguild.org/tech/">
          More Games
        </a>
        <a style={{cursor: "pointer"}} onClick={() => setInfoDialogOpen(!infoDialogOpen)}>
          What’s this?
        </a>
        <InfoDialog
          onClose={() => setInfoDialogOpen(false)}
          isOpen={infoDialogOpen}
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


