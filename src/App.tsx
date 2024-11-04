import { useState } from 'react'
import './App.css'

const CARD_VALUES = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
];

interface Card {
  id: number;
  value: string; // card face
  isFlipped: boolean;
}

function getInitialCards() {
  const initialCards = [...CARD_VALUES, ...CARD_VALUES].map(
    (value, id) => ({
      value,
      id,
      isFlipped: false // start out face down
    })
  );
  return initialCards;
}

function App() {
  // initial card state:
  const [cards, setCards] = useState<Card[]>(getInitialCards());

  function handleFlip(id: number) {

  }

  return (
    <div id='game'>
      {cards.map(card => (
        <div className='card' key={card.id} onClick={() => handleFlip(card.id)}>
            {card.value}
        </div>
      ))}
    </div>
  )
}

export default App;
