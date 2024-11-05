import { useEffect, useState } from 'react'
import './App.css';
import { Game, NewGame } from './game';
import { PicketSign } from './components/PicketSign';
import { SignContent } from './types';

const CARD_VALUES = Object.values(SignContent)

interface Card {
  id: number;
  value: SignContent;
}

function App() {
  const [cards, setCards] = useState<Card[]>(getInitialCards());
  const [game, setGame] = useState<Game>(NewGame());
  const [duration, setDuration] = useState("0m 0s");

  useEffect(() => {
    const interval = setInterval(() => {
      setDuration(game.getDuration())
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div id='game'>
        {cards.map(card => (
          <div className='card' key={card.id} onClick={() => setGame(game.handleClick())}>
            <PicketSign content={card.value} />
          </div>
        ))}
      </div>
      <div className="scoreboard">
        <p className="time">
          <strong>Time spent:</strong> {duration}
        </p>
        <div className="row">
          <p className="attempts">
            <strong>Cards flipped:</strong> {game.getAttempts()}
          </p>
          <p className="score">
            <strong>Matches:</strong> {game.getScore()}
          </p>
        </div>
      </div>
    </>
  )
}

export default App;

function getInitialCards() {
  const initialCards = [...CARD_VALUES, ...CARD_VALUES].map((value, id) => ({ value, id }));
  
  // https://stackoverflow.com/questions/48083353/i-want-to-know-how-to-shuffle-an-array-in-typescript
  let currentIndex = initialCards.length, randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [initialCards[currentIndex], initialCards[randomIndex]] = [
      initialCards[randomIndex], initialCards[currentIndex]];
  }

  return initialCards;
}
