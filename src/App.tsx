import { useState } from 'react';
import './App.css';
import { PicketSign } from './components/PicketSign';
import { SignContent } from './types';


const CARD_VALUES = Object.values(SignContent)

interface Card {
  id: number;
  value: SignContent;
}

function App() {
  const [cards, setCards] = useState<Card[]>(getInitialCards());

  return (
    <div id='game'>
      {cards.map(card => (
        <div className='card' key={card.id}>
            <PicketSign content={card.value} />
        </div>
      ))}
    </div>
  )
}

export default App;

function getInitialCards() {
  const initialCards = [...CARD_VALUES, ...CARD_VALUES].map((value, id) => ({ value, id }));
  
  // https://stackoverflow.com/questions/48083353/i-want-to-know-how-to-shuffle-an-array-in-typescript
  let currentIndex = initialCards.length, randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [initialCards[currentIndex], initialCards[randomIndex]] = [
      initialCards[randomIndex], initialCards[currentIndex]];
  }

  return initialCards;
}
