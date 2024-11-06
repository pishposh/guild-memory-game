import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';
import { Card, getInitialCards } from '../card';
import { GameContext } from './gameContext';

const hasTwoMatchingCards = (cards: Card[]) => {
  const [one, two] = cards;
  return one?.value === two?.value;
};

const getFaceUp = (cards: Card[]) =>
  cards.filter((c) => c.isFaceUp && !c.isMatched);

export const GameProvider = ({ children }: PropsWithChildren) => {
  const [start, setStart] = useState<Date | null>(null);
  const [end, setEnd] = useState<Date | null>(null);
  const [duration, setDuration] = useState('0m 0s');
  const [attempts, setAttempts] = useState(0);
  const [cards, setCards] = useState(getInitialCards());

  // computed values
  const faceUpCards = useMemo(() => getFaceUp(cards), [cards]);
  const hasFlippedTwoCards = useMemo(
    () => faceUpCards.length >= 2,
    [faceUpCards]
  );
  const hasMatchAllCards = useMemo(
    () => cards.find((c) => !c.isMatched) === undefined,
    [cards]
  );
  const counts = useMemo(() => cards.map((c) => c.count), [cards]);
  const score = useMemo(
    () => cards.filter((c) => c.isMatched).length / 2,
    [cards]
  );
  const hasFlippedTwoCardsWithoutMatch = useMemo(() => {
    return !hasFlippedTwoCards || hasTwoMatchingCards(cards) ? false : true;
  }, [cards, hasFlippedTwoCards]);

  // functions
  const resetUnmatchedCards = useCallback(() => {
    setCards(cards.map((c) => (c.isMatched ? c : { ...c, isFaceUp: false })));
  }, [cards, setCards]);

  const getDuration = useCallback(() => {
    if (start === null) {
      return '0m 0s';
    }

    const newEnd = end === null ? new Date() : end;

    const diff = newEnd.getTime() - start.getTime();
    const totalSeconds = Math.floor(diff / 1000);

    // Calculate minutes and remaining seconds
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${minutes}m ${seconds}s`;
  }, [start, end]);

  const handleClick = useCallback(
    (card: Card) => {
      if (start === null) {
        setStart(new Date());
      }
      if (card.isFaceUp || card.isMatched || hasFlippedTwoCards) {
        return;
      }
      setAttempts((prev) => prev + 1);

      setCards((oldCards) => {
        let updatedCards = oldCards.map((c) =>
          c.id === card.id ? { ...c, isFaceUp: true, count: c.count + 1 } : c
        );

        if (hasTwoMatchingCards(getFaceUp(updatedCards))) {
          updatedCards = updatedCards.map((c) =>
            c.isFaceUp ? { ...c, isMatched: true } : c
          );
        }
        return updatedCards;
      });
    },
    [hasFlippedTwoCards, start]
  );

  const reset = useCallback(() => {
    setStart(null);
    setEnd(null);
    setAttempts(0);
    setCards(getInitialCards());
  }, [setStart, setEnd, setAttempts, setCards]);

  // side effects
  useEffect(() => {
    if (end === null && hasMatchAllCards) {
      setEnd(new Date());
    }
  }, [end, hasMatchAllCards]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDuration(getDuration());
    }, 1000);

    return () => clearInterval(interval);
  }, [duration, getDuration, setDuration]);

  useEffect(() => {
    let timeout: number | undefined;

    if (hasFlippedTwoCardsWithoutMatch) {
      timeout = setTimeout(() => {
        resetUnmatchedCards();
      }, 1000);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [hasFlippedTwoCardsWithoutMatch, resetUnmatchedCards]);

  return (
    <GameContext.Provider
      value={{
        score,
        attempts,
        counts,
        hasMatchAllCards,
        reset,
        cards,
        handleClick,
        duration
      }}
    >
      {children}
    </GameContext.Provider>
  );
};