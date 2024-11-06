import clsx from 'clsx';
import { useRef, useState } from 'react';
import { Difficulty } from '../../game';
import './GameSettings.css';

export const GameSettings = ({
  isOpen,
  onClose,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (difficulty: Difficulty) => void;
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>(Difficulty.EASY);

  const handleChangeDifficulty = (event) => {
    const newValue = event.target.value;
    setSelectedDifficulty(newValue);
  };

  return (
    <dialog className={clsx('dialog', isOpen && 'show')} ref={dialogRef}>
      <span
        className="close-button"
        onClick={() => {
          dialogRef?.current?.close();
          onClose();
        }}
      >
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
          dialogRef?.current?.close();
          onClose();
        }}
      >
        Let's Play!
      </button>
      </div>
    </dialog>
  );
};