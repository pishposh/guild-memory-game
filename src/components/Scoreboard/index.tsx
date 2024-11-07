import { useContext } from 'react';
import { GameContext } from '../../contexts/gameContext';
import './Scoreboard.css';

export const Scoreboard = () => {
  const { duration, score, attempts } = useContext(GameContext);
  return (
    <div className="scoreboard-container">
      <div className="scoreboard">
        <p className="time">
          <strong>Time spent:</strong> {duration}
        </p>
        <div className="row">
          <p className="attempts">
            <strong>Picket signs flipped:</strong> {score}
          </p>
          <p className="score">
            <strong>Matches:</strong> {attempts}
          </p>
        </div>
      </div>
    </div>
  );
};
