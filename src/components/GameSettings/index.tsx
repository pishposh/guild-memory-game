import { useState } from 'react';
import { Difficulty } from '../../game';
import './GameSettings.css';

export const GameSettings = ({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (difficulty: Difficulty) => void;
}) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>(Difficulty.EASY);

  const handleChangeDifficulty = (event) => {
    const newValue = event.target.value;
    setSelectedDifficulty(newValue);
  };

  return (
    <dialog className="settings-dialog">
      <span className="settings-close-button" onClick={onClose}>
        ❌
      </span>
      <div className="container">

        <label>Choose your difficulty:</label>

        <select name="difficulty" id="difficulty" value={selectedDifficulty} onChange={handleChangeDifficulty}>
        <option value={Difficulty.EASY}>Easy</option>
        <option value={Difficulty.MEDIUM}>Medium</option>
        <option value={Difficulty.HARD}>Hard</option>
        </select>

      <button
        className="button"
        onClick={() => {
          onSave(selectedDifficulty);
          onClose();
        }}
      >
        Let's Play!
      </button>
      </div>
    </dialog>
  );
};
