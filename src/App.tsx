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
  const [cards, setCards] = useState<Card[]>([...CARD_VALUES, ...CARD_VALUES].shuffled().map((value, id) => ({ value, id })));

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

declare global {
  interface Array<T> {
    shuffled(): Array<T>;
  }
}

if (!Array.prototype.shuffled) {
  // https://stackoverflow.com/questions/48083353/i-want-to-know-how-to-shuffle-an-array-in-typescript
  Array.prototype.shuffled = function<T>(this: T[]): T[] {
    let currentIndex = this.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [this[currentIndex], this[randomIndex]] = [
        this[randomIndex], this[currentIndex]];
    }
    return this;
  }
}