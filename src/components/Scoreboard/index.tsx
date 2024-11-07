import { Game } from '../../game';
import './Scoreboard.css';

export const Scoreboard = ({
  duration,
  game
}: {
  duration: string;
  game: Game;
}) => (
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
);
