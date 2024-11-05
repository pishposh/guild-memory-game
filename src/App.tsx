import { useEffect, useMemo, useRef, useState } from 'react';
import './App.css';
import { PicketSign } from './components/PicketSign';
import { WinDialog } from './components/WinDialog';
import { Game, NewGame } from './game';
import { Card, emojis, SignContent } from './types';

const CARD_VALUES = Object.values(SignContent);

// type HeatMap = Record<number, number>;
// const reducer = (state: HeatMap, action: number) => {
//   return {
//     ...state,
//     [action]: state[action] === undefined ? 0 : state[action] + 1
//   };
// };

function App() {
  const [cards, setCards] = useState<Card[]>(getInitialCards());
  const [game, setGame] = useState<Game>(NewGame());
  const [duration, setDuration] = useState('0m 0s');

  // const [state, dispatch] = useReducer(reducer, {});
  const [counts, setCounts] = useState(new Array(cards.length).fill(0));
  const gameRef = useRef<Game>();
  gameRef.current = game;

  // const [moves, setMoves] = useState<Emoji[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      if (gameRef.current) {
        setDuration(gameRef.current.getDuration());
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const faceUpCards = useMemo(
    () => cards.filter((c) => c.isFaceUp && !c.isMatched),
    [cards]
  );

  const allMatched = useMemo(
    () => cards.filter((c) => c.isMatched).length === cards.length,
    [cards]
  );

  useEffect(() => {
    if (allMatched) {
      setDialogOpen(true);
    }
  }, [allMatched]);

  useEffect(() => {
    if (faceUpCards.length !== 2) {
      return;
    }
    const [firstCard, secondCard] = faceUpCards;
    if (firstCard.value === secondCard.value) {
      // cards match, mark them as matched and keep them face up:
      setCards((cards) =>
        cards.map((c) =>
          c.value === firstCard.value ? { ...c, isMatched: true } : c
        )
      );
    } else {
      // cards don't match, flip them back face-down after a delay:
      setTimeout(() => {
        setCards((cards) =>
          cards.map((c) =>
            c.id === firstCard.id || c.id === secondCard.id
              ? { ...c, isFaceUp: false }
              : c
          )
        );
      }, 1000);
    }
  }, [cards, faceUpCards]);

  const handleCardClick = (card: Card) => {
    // do nothing if card is already face up or matched
    // or if there's already two actively face-up cards:
    if (card.isFaceUp || card.isMatched || faceUpCards.length >= 2) {
      return;
    }

    setGame(game.handleClick());
    // setMoves((old) => [...old, card.emoji]);
    console.log('incrementing', card.id);
    setCounts((prev) => {
      const old = [...prev];
      old[card.id] += 1;
      return old;
    });

    // flip the card face-up:
    const newCards = cards.map((c) =>
      c.id === card.id ? { ...c, isFaceUp: true } : c
    );
    setCards(newCards);
  };

  return (
    <>
      <div id="game-container">
        <div id="game">
          {cards.map((card) => (
            <div
              className="card"
              key={card.id}
              onClick={() => handleCardClick(card)}
            >
              <PicketSign card={card} />
            </div>
          ))}
        </div>
      </div>
      <div className="scoreboard-container">
        <div className="scoreboard">
          <p className="time">
            <strong>Time spent:</strong> {duration}
          </p>
          <div className="row">
            <p className="attempts">
              <strong>Picket signs flipped:</strong> {game.getAttempts()}
            </p>
            <p className="score">
              <strong>Matches:</strong> {game.getScore()}
            </p>
          </div>
        </div>
      </div>
      <WinDialog
        // moves={moves}
        // heatMap={state}
        counts={counts}
        onClose={() => setDialogOpen(false)}
        isOpen={dialogOpen}
      />
    </>
  );
}

export default App;

function getInitialCards() {
  const initialCards = [...CARD_VALUES, ...CARD_VALUES].map((value, id) => ({
    value,
    id,
    isFaceUp: false,
    isMatched: false,
    emoji: emojis[value]
  }));

  // // https://stackoverflow.com/questions/48083353/i-want-to-know-how-to-shuffle-an-array-in-typescript
  // let currentIndex = initialCards.length,
  //   randomIndex;

  // // While there remain elements to shuffle.
  // while (currentIndex != 0) {
  //   // Pick a remaining element.
  //   randomIndex = Math.floor(Math.random() * currentIndex);
  //   currentIndex--;

  //   // And swap it with the current element.
  //   [initialCards[currentIndex], initialCards[randomIndex]] = [
  //     initialCards[randomIndex],
  //     initialCards[currentIndex]
  //   ];
  // }

  return initialCards;
}
