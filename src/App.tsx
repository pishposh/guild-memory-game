import { useContext, useEffect, useState } from 'react';
import './App.css';
import { PicketSign } from './components/PicketSign';
import { ResultsDialog } from './components/ResultsDialog';
import { GameContext } from './contexts/gameContext';

function App() {
  const {
    score,
    attempts,
    counts,
    cards,
    hasMatchAllCards,
    reset,
    handleClick,
    duration
  } = useContext(GameContext);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    let timeout: number | undefined;
    if (hasMatchAllCards) {
      timeout = setTimeout(() => setShowDialog(true), 1200);
    }
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [hasMatchAllCards]);

  return (
    <>
      <div id="game-container">
        <div id="game">
          {cards.map((card) => (
            <div
              className="card"
              key={card.id}
              onClick={() => handleClick(card)}
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
              <strong>Picket signs flipped:</strong> {attempts}
            </p>
            <p className="score">
              <strong>Matches:</strong> {score}
            </p>
          </div>
        </div>
      </div>
      {showDialog && (
        <ResultsDialog
          counts={counts}
          attempts={attempts}
          onClose={() => setShowDialog(false)}
          onReset={() => {
            setShowDialog(false);
            reset();
          }}
          duration={duration}
        />
      )}
    </>
  );
}

export default App;
