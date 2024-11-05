import clsx from 'clsx';
import { useCallback, useMemo, useRef } from 'react';
import { Game } from '../../game';
import './ResultsDialog.css';

export const ResultsDialog = ({
  isOpen,
  onClose,
  counts,
  game
}: {
  isOpen: boolean;
  onClose: () => void;
  counts: number[];
  game: Game;
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const squares = useMemo(
    () =>
      counts.map((c) => {
        switch (c) {
          case 1:
            return '🟩';
          case 2:
            return '🟨';
          default:
            return '🟥';
        }
      }),
    [counts]
  );

  const resultString = useMemo(() => {
    const result: string[] = [];
    squares.forEach((s, idx) => {
      result.push(s);
      result.push((idx + 1) % 4 === 0 ? '\n' : ' ');
    });
    return result.join('');
  }, [squares]);

  const copyResults = useCallback(
    () => navigator.clipboard.writeText(resultString),
    [resultString]
  );
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
        <h1>Congratulations!</h1>
        <p>
          You finished in <b>{game.getAttempts()}</b> moves
        </p>
        <p>
          Your game took <b>{game.getDuration()}</b>
        </p>
        <div className="board">
          {squares.map((square) => (
            <span>{square}</span>
          ))}
        </div>
        <button onClick={copyResults}>Copy to Clipboard</button>
      </div>
    </dialog>
  );
};
