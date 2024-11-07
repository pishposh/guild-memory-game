import { useState, useEffect } from 'react';
import { Difficulty } from '../../game';
import './GameSettings.css';

export const GameSettings = ({
  onClose,
  onSave,
  currentDifficulty,
}: {
  onClose: () => void;
  onSave: (difficulty: Difficulty) => void;
  currentDifficulty: Difficulty;
}) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>(Difficulty.EASY);

  useEffect(() => {
    setSelectedDifficulty(currentDifficulty);
  }, [currentDifficulty]);

  const handleChangeDifficulty = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setSelectedDifficulty(newValue as Difficulty);
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
