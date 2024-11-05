import { createContext } from 'react';
import { Card } from '../../types';

export const MatcherContext = createContext({
  revealCard: (card: Card) => {
    console.log(card);
  },
  checkRevealed: (id: number) => isNaN(id),
  reset: () => {},
  hasMatch: false,
  cards: [] as Card[]
});
