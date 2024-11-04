import { createContext } from 'react';
import { Card } from '../../types';

export const MatcherContext = createContext({
  flipCard: (card: Card) => {
    console.log(card);
  },
  checkFlipped: (id: number) => isNaN(id),
  reset: () => {},
  hasMatch: false,
  cards: [] as Card[]
});
