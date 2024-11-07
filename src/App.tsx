import { useContext, useEffect, useState } from 'react';
import './App.css';
import { GameSettings } from './components/GameSettings';
import { Header } from './components/Header';
import { InfoDialog } from './components/InfoDialog';
import { PicketSign } from './components/PicketSign';
import { ResultsDialog } from './components/ResultsDialog';
import { Scoreboard } from './components/Scoreboard';
import { TextOrIcon } from './components/TextOrIcon';
import { GameContext } from './contexts/gameContext';

function App() {
  const [gameSettingsOpen, setGameSettingsOpen] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [infoDialogOpen, setInfoDialogOpen] = useState(false);

  const { cards, hasMatchAllCards, reset, handleClick } =
    useContext(GameContext);

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
      <Header>
        <a href="https://nytimesguild.org/tech/guild-builds/">
          <TextOrIcon icon="👾" text="More Games" />
        </a>

        <button onClick={() => setInfoDialogOpen(!infoDialogOpen)}>
          <TextOrIcon icon="❓" text="What's this?" />
        </button>
        <button onClick={() => setGameSettingsOpen(!gameSettingsOpen)}>
          <TextOrIcon icon="⚙️" text="Settings" />
        </button>
        {gameSettingsOpen && (
          <GameSettings onClose={() => setGameSettingsOpen(false)} />
        )}
      </Header>

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
      <Scoreboard />
      {showDialog && (
        <ResultsDialog
          onClose={() => setShowDialog(false)}
          onReset={() => {
            setShowDialog(false);
            reset();
          }}
        />
      )}
      {infoDialogOpen && (
        <InfoDialog onClose={() => setInfoDialogOpen(false)} />
      )}
      {gameSettingsOpen && (
        <GameSettings onClose={() => setGameSettingsOpen(false)} />
      )}
    </>
  );
}

export default App;
