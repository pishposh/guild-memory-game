import { useEffect, useState } from 'react';
import './App.css';
import { PicketSign } from './components/PicketSign';
import { ResultsDialog } from './components/ResultsDialog';
import { Game, NewGame } from './game';

function App() {
  const [game, setGame] = useState<Game>(NewGame());
  const [duration, setDuration] = useState('0m 0s');
  const [showDialog, setShowDialog] = useState(false);

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
    };
  }, [game, setGame]);

  useEffect(() => {
    if (game.hasMatchAllCards()) {
      setShowDialog(true);
    }
  }, [game]);

  return (
    <>
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
      {showDialog && (
        <ResultsDialog
          game={game}
          onClose={() => setShowDialog(false)}
          onReset={() => {
            setShowDialog(false);
            setGame(game.reset());
          }}
          duration={duration}
        />
      )}
    </>
  );
}

export default App;
