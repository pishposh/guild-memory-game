import { createContext } from 'react';
import { Card } from '../card';

export enum Difficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard'
}

export const GameContext = createContext({
  score: 0,
  attempts: 0,
  cards: [] as Card[],
  counts: [] as number[],
  difficulty: Difficulty.HARD,
  duration: '',
  hasMatchAllCards: false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  reset: (_d?: Difficulty) => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleClick: (_card: Card) => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setDifficulty: (_d: Difficulty) => {}
});

export interface DifficultyLevel {
  numCards: number;
  matchLength: number;
}
