import { useCallback, useMemo } from 'react';
import './ResultsDialog.css';

export const ResultsDialog = ({
  onClose,
  onReset,
  duration,
  counts,
  attempts
}: {
  onClose: () => void;
  onReset: () => void;
  duration: string;
  counts: number[];
  attempts: number;
}) => {
  const squares = useMemo(
    () => counts.map((c) => (c === 1 ? '🟩' : c === 2 ? '🟨' : '🟥')),
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
    <dialog className="dialog">
      <span className="close-button" onClick={onClose}>
        ❌
      </span>
      <div className="container">
        <h1>You ratified a contract!</h1>
        <p className="time">
          <strong>Time spent:</strong> {duration}
        </p>
        <p className="attempts">
          <strong>Picket signs flipped:</strong> {attempts}
        </p>

        <div className="board">
          {squares.map((square) => (
            <span>{square}</span>
          ))}
        </div>
        <button onClick={copyResults}>Copy to Clipboard</button>
        <button type="button" onClick={onReset}>
          Play Again
        </button>
      </div>
    </dialog>
  );
};
