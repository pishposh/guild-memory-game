import { useContext } from 'react';
import './App.css';
import { PicketSign } from './components/PicketSign';
import { MatcherContext } from './contexts/matcher';

function App() {
  const { hasMatch, revealCard, checkRevealed, cards, reset } =
    useContext(MatcherContext);
  if (hasMatch) {
    setTimeout(reset, 5000);
  }

  return (
    <div id="game">
      {cards.map((card) => (
        <div className="card" key={card.id}>
          <PicketSign
            content={card.value}
            onClick={() => revealCard(card)}
            revealed={!checkRevealed(card.id)}
          />
        </div>
      ))}
    </div>
  );
}

export default App;
