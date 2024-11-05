import { useContext } from 'react';
import './App.css';
import { PicketSign } from './components/PicketSign';
import { MatcherContext } from './contexts/matcher';

function App() {
  const { hasMatch, revealCard, cards, reset } = useContext(MatcherContext);
  if (hasMatch) {
    setTimeout(reset, 5000);
  }

  return (
    <div id="game">
      {cards.map((card) => (
        <div className="card" key={card.id}>
          <PicketSign card={card} onClick={() => revealCard(card)} />
        </div>
      ))}
    </div>
  );
}

export default App;
