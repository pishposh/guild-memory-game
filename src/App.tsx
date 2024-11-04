import { useContext } from 'react';
import './App.css';
import { PicketSign } from './components/PicketSign';
import { MatcherContext } from './contexts/matcher';

function App() {
  const { hasMatch, flipCard, checkFlipped, cards, reset } =
    useContext(MatcherContext);
  if (hasMatch) {
    setTimeout(() => reset(), 5000);
  }

  return (
    <div id="game">
      {cards.map((card) => (
        <div className="card" key={card.id}>
          <PicketSign
            content={card.value}
            onClick={() => flipCard(card)}
            flipped={!checkFlipped(card.id)}
          />
        </div>
      ))}
    </div>
  );
}

export default App;
