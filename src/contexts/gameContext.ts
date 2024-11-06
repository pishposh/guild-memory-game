import { createContext } from 'react';
import { Card } from '../card';

export const GameContext = createContext({
  score: 0,
  attempts: 0,
  cards: [] as Card[],
  counts: [] as number[],
  duration: '',
  hasMatchAllCards: false,
  reset: () => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleClick: (_card: Card) => {}
});
