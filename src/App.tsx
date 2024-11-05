import { useState } from 'react';
import './App.css';
import { PicketSign } from './components/PicketSign';
import { SignContent } from './types';

const CARD_VALUES = Object.values(SignContent);

interface Card {
  id: number;
  value: SignContent;
  isFaceUp: boolean;
  isMatched: boolean;
}

function App() {
  const [cards, setCards] = useState<Card[]>(getInitialCards());

  const handleCardClick = (card: Card) => {
    // do nothing if card is already face up or matched:
    if (card.isFaceUp || card.isMatched) {
      return;
    }

    // do nothing if there's already two actively face-up cards:
    const faceUpCards = cards.filter((c) => c.isFaceUp && !c.isMatched); // TODO: do we care about O(N) here? probably not
    if (faceUpCards.length >= 2) {
      return;
    }

    // flip the card face-up:
    const newCards = cards.map((c) =>
      c.id === card.id ? { ...c, isFaceUp: true } : c
    );
    setCards(newCards);

    // is this the second flip, and if so is it a match for the first?
    const newFaceUpCards = newCards.filter((c) => c.isFaceUp && !c.isMatched);
    if (newFaceUpCards.length === 2) {
      const [firstCard, secondCard] = newFaceUpCards;
      if (firstCard.value === secondCard.value) {
        // cards match, mark them as matched and keep them face up:
        setCards(
          newCards.map((c) =>
            c.value === firstCard.value ? { ...c, isMatched: true } : c
          )
        );
      } else {
        // cards don't match, flip them back face-down after a delay:
        setTimeout(() => {
          setCards((cards) =>
            cards.map((c) =>
              c.id === firstCard.id || c.id === secondCard.id
                ? { ...c, isFaceUp: false }
                : c
            )
          );
        }, 1000);
      }
    }
  };

  return (
    <div id="game">
      {cards.map((card) => (
        <div
          className="card"
          key={card.id}
          onClick={() => handleCardClick(card)}
        >
          <PicketSign content={card.value} isFaceUp={card.isFaceUp} />
        </div>
      ))}
    </div>
  );
}

export default App;

function getInitialCards() {
  const initialCards = [...CARD_VALUES, ...CARD_VALUES].map((value, id) => ({
    value,
    id,
    isFaceUp: false,
    isMatched: false
  }));

  // https://stackoverflow.com/questions/48083353/i-want-to-know-how-to-shuffle-an-array-in-typescript
  let currentIndex = initialCards.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [initialCards[currentIndex], initialCards[randomIndex]] = [
      initialCards[randomIndex],
      initialCards[currentIndex]
    ];
  }

  return initialCards;
}
