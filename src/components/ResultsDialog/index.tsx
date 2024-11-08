import { useCallback, useContext, useMemo } from 'react'
import { GameContext } from '../../contexts/gameContext'
import { Dialog } from '../Dialog'
import './ResultsDialog.css'

export const ResultsDialog = ({
  onClose,
  onReset,
}: {
  onClose: () => void
  onReset: () => void
}) => {
  const { duration, counts, attempts } = useContext(GameContext)
  const squares = useMemo(
    () =>
      counts.map((c) =>
        c === 1 ? '🟦' : c === 2 ? '🟩' : c === 3 ? '🟨' : '🟥',
      ),
    [counts],
  )

  const resultString = useMemo(() => {
    const result: string[] = []
    squares.forEach((s, idx) => {
      result.push(s)
      result.push((idx + 1) % 4 === 0 ? '\n' : ' ')
    })
    return result.join('')
  }, [squares])

  const copyResults = useCallback(
    () => navigator.clipboard.writeText(resultString),
    [resultString],
  )
  return (
    <Dialog onClose={onClose} centerX centerY>
      <div className="results-container">
        <h1>You ratified a contract!</h1>
        <p className="time">
          <strong>Time spent:</strong> {duration}
        </p>
        <p className="attempts">
          <strong>Picket signs flipped:</strong> {attempts}
        </p>

        <div className="emoji-board">
          {squares.map((square) => (
            <span>{square}</span>
          ))}
        </div>
        <p className="square-key">
          <span>🟦 → 1</span>
          <span>🟩 → 2</span>
          <span>🟨 → 3</span>
          <span>🟥 → 4+</span>
        </p>
        <button onClick={copyResults}>Copy to Clipboard</button>
        <button type="button" onClick={onReset}>
          Play Again
        </button>
      </div>
    </Dialog>
  )
}
