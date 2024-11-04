import { useEffect, useState } from 'react'
import './App.css'
import { Game, NewGame } from './game';

const CARD_VALUES = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
];

interface Card {
  id: number;
  value: string;
}

function App() {
  const [cards, setCards] = useState<Card[]>([...CARD_VALUES, ...CARD_VALUES].map((value, id) => ({ value, id })));
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
          <div className='card' key={card.id}>
              {card.value}
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
