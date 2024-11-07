import { useContext } from 'react';
import { Difficulty, GameContext } from '../../contexts/gameContext';
import { Dialog } from '../Dialog';
import './GameSettings.css';

export const GameSettings = ({ onClose }: { onClose: () => void }) => {
  const { difficulty, setDifficulty } = useContext(GameContext);

  const handleChangeDifficulty = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newValue = event.target.value;
    setDifficulty(newValue as Difficulty);
  };

  return (
    <Dialog centerX centerY onClose={onClose}>
      <div className="settings-container">
        <label>Choose your difficulty:</label>

        <select
          name="difficulty"
          id="difficulty"
          value={difficulty}
          onChange={handleChangeDifficulty}
        >
          <option value={Difficulty.EASY}>Easy</option>
          <option value={Difficulty.MEDIUM}>Medium</option>
          <option value={Difficulty.HARD}>Hard</option>
        </select>

        <button
          className="button"
          onClick={() => {
            onClose();
          }}
        >
          Let's Play!
        </button>
      </div>
    </Dialog>
  );
};
