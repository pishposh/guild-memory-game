import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState
} from 'react';
import { MatcherContext } from '.';
import { BaseCard, Card } from '../../types';
import { shuffleCards } from './shuffle';

function reducer(
  state: BaseCard[],
  action: { type: 'reveal'; value: BaseCard } | { type: 'reset' }
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
  const [baseCards, setBaseCards] = useState<BaseCard[]>([]);
  const [state, dispatch] = useReducer(reducer, []);
  const [canReveal, setCanReveal] = useState(true);

  const clear = useCallback(() => dispatch({ type: 'reset' }), [dispatch]);

  const reset = () => {
    setCanReveal(false);
    clear();
    setTimeout(() => {
      setBaseCards(shuffleCards());
      setCanReveal(true);
    }, 1000);
  };

  useEffect(() => reset(), []);

  const hasMatch = useMemo(
    () => state.length === 2 && state[0].value === state[1].value,
    [state]
  );

  const revealCard = useCallback(
    ({ id, value }: Card) => {
      if (hasMatch || !canReveal) {
        return;
      }
      dispatch({
        type: 'reveal',
        value: { id, value }
      });
    },
    [dispatch, hasMatch, canReveal]
  );

  const [timeoutId, setTimeoutId] = useState<number | null>(null);

  useEffect(() => {
    if (!hasMatch && state.length === 2) {
      setTimeoutId(setTimeout(clear, 2000));
    } else {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clear, hasMatch, state]);

  const cards = useMemo(() => {
    const revealedIds = state.map((c) => c.id);
    return baseCards.map((card) => ({
      ...card,
      revealed: revealedIds.includes(card.id)
    }));
  }, [baseCards, state]);

  return (
    <MatcherContext.Provider value={{ cards, hasMatch, revealCard, reset }}>
      {children}
    </MatcherContext.Provider>
  );
};
