import { createContext } from 'react';
import { Card } from '../../types';

export const MatcherContext = createContext({
  revealCard: (card: Card) => {
    console.log(card);
  },
  reset: () => {},
  hasMatch: false,
  cards: [] as Card[]
});
