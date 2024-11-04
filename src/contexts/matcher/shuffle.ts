import { SignContent } from '../../types';

const CARD_VALUES = Object.values(SignContent);

export function shuffleCards() {
  const initialCards = [...CARD_VALUES, ...CARD_VALUES].map((value, id) => ({
    value,
    id
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
