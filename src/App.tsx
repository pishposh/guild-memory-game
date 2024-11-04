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
    const newCards = cards.map(
      card => (card.id === id) ? { ...card, isFlipped: true } : card
    );
    setCards(newCards);
  }

  return (
    <div id='game'>
      {cards.map(card => (
        <div className='card' key={card.id} onClick={() => handleFlip(card.id)} style={{ position: 'relative' }}>
          <div className='back' style={{width: '100%', height: '100%', background: 'teal'}}>
            ?
          </div>
          <div className='front' style={{width: '100%', height: '100%'}}>
            {card.value}
          </div>
        </div>
      ))}
    </div>
  )
}

export default App;
