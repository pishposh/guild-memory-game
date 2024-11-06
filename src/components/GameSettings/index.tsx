import clsx from 'clsx';
import { useRef, useState } from 'react';
import { Difficulty } from './diffculty';
import './GameSettings.css';

export enum Difficulty {
    ONE = 1
}

export const GameSettings = ({
  isOpen,
  onClose,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (difficulty: number) => void;
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>(Difficulty.ONE);

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
        <option value={Difficulty.ONE}>Easy (match pairs in 4x4 grid)</option>
        </select>

        <button
        className="button"
        onClick={() => {
          onSave(selectedDifficulty);
          dialogRef?.current?.close();
          onClose();
        }}
      >
        Apply Settings
      </button>

      </div>
    </dialog>
  );
};