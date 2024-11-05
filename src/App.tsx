import { useState, useEffect } from 'react';
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
  const [faceUpCards, setFaceUpCards] = useState<Card[]>([]);

  useEffect(() => {
    if (faceUpCards.length === 2) {
      const [firstCard, secondCard] = faceUpCards;
      if (firstCard.value === secondCard.value) {
        // Cards match
        setCards(prevCards =>
          prevCards.map(card =>
            card.value === firstCard.value
              ? { ...card, isMatched: true }
              : card
          )
        );
      } else {
        // Cards don't match
        setTimeout(() => {
          setCards(prevCards =>
            prevCards.map(card =>
              card.id === firstCard.id || card.id === secondCard.id
                ? { ...card, isFaceUp: false }
                : card
            )
          );
        }, 1000);
      }
      setFaceUpCards([]);
    }
  }, [faceUpCards]);

  const handleCardClick = (clickedCard: Card) => {
    if (faceUpCards.length < 2 && !clickedCard.isFaceUp && !clickedCard.isMatched) {
      setCards(prevCards =>
        prevCards.map(card =>
          card.id === clickedCard.id ? { ...card, isFaceUp: true } : card
        )
      );
      setFaceUpCards(prevFaceUp => [...prevFaceUp, clickedCard]);
    }
  };

  return (
    <div id='game'>
      {cards.map(card => (
        <div className='card' key={card.id} onClick={() => handleCardClick(card)}>
          <PicketSign content={card.value} isFaceUp={card.isFaceUp} />
        </div>
      ))}
    </div>
  );
}

export default App;

function getInitialCards() {
  const initialCards = [...CARD_VALUES, ...CARD_VALUES].map(
    (value, id) => ({ value, id, isFaceUp: false, isMatched: false })
  );

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
