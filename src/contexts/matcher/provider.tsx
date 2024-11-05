import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState
} from 'react';
import { MatcherContext } from '.';
import { Card } from '../../types';
import { shuffleCards } from './shuffle';

function reducer(
  state: Card[],
  action: { type: 'reveal'; value: Card } | { type: 'reset' }
) {
  switch (action.type) {
    case 'reset':
      return [];
    case 'reveal': {
      const newCard = action.value;
      if (state.length === 2) {
        if (state.map((c) => c.id).includes(newCard.id)) {
          return [...state];
        }
        return [newCard];
      }
      return [...state, action.value];
    }
  }
}

export const MatcherProvider = ({ children }: PropsWithChildren) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [state, dispatch] = useReducer(reducer, []);
  const reset = () => {
    dispatch({ type: 'reset' });
    setTimeout(() => setCards(shuffleCards()), 1000);
  };

  useEffect(() => reset(), []);

  const hasMatch = useMemo(
    () => state.length === 2 && state[0].value === state[1].value,
    [state]
  );

  const revealCard = useCallback(
    (card: Card) => {
      if (hasMatch) {
        return;
      }
      dispatch({
        type: 'reveal',
        value: card
      });
    },
    [dispatch, hasMatch]
  );

  const checkRevealed = useCallback(
    (id: number) => state.map((c) => c.id).includes(id),
    [state]
  );

  return (
    <MatcherContext.Provider
      value={{ cards, hasMatch, revealCard, checkRevealed, reset }}
    >
      {children}
    </MatcherContext.Provider>
  );
};
