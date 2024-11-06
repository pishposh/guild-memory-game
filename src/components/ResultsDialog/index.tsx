import { useCallback, useMemo } from 'react';
import { Game } from '../../game';
import './ResultsDialog.css';

export const ResultsDialog = ({
  onClose,
  game
}: {
  onClose: () => void;
  game: Game;
}) => {
  const squares = useMemo(
    () => game.getCounts().map((c) => (c === 1 ? '🟩' : c === 2 ? '🟨' : '🟥')),
    [game]
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
    <dialog className="dialog">
      <span className="close-button" onClick={onClose}>
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
