import { useState } from 'react'
import './App.css'

const CARD_VALUES = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
];

interface Card {
  id: number;
  value: string;
}

function App() {
  const [cards, setCards] = useState<Card[]>([...CARD_VALUES, ...CARD_VALUES].map((value, id) => ({ value, id })));

  return (
    <div id='game'>
      {cards.map(card => (
        <div className='card' key={card.id}>
            {card.value}
        </div>
      ))}
    </div>
  )
}

export default App;
