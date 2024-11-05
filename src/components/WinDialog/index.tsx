import clsx from 'clsx';
import { useMemo, useRef } from 'react';
import './WinDialog.css';

export const WinDialog = ({
  // moves,
  isOpen,
  onClose,
  counts
  // heatMap
}: {
  // moves: Emoji[];
  isOpen: boolean;
  onClose: () => void;
  counts: number[];
  // heatMap: Record<number, number>;
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  // const pairs = useMemo(() => {
  //   const result: string[][] = [];
  //   let pair: string[] = [];
  //   moves.forEach((move) => {
  //     pair.push(move);
  //     if (pair.length === 2) {
  //       result.push(pair);
  //       pair = [];
  //     }
  //   });
  //   return result as [string, string][];
  // }, [moves]);

  // console.log(heatMap);
  // const spaces = useMemo(() => {
  //   const result = new Array<number>(Object.keys(heatMap).length).fill(0);
  //   Object.entries(heatMap).forEach(
  //     ([key, val]) => (result[parseInt(key)] = val)
  //   );
  //   return result;
  // }, [heatMap]);

  const squares = useMemo(
    () =>
      counts.map((c) => {
        switch (c) {
          case 1:
            return '🟩';
          case 2:
            return '🟦';
          case 3:
            return '🟨';
          default:
            return '🟥';
        }
      }),
    [counts]
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
      {/* <div className="move-grid">
        {pairs.map((pair, index) => (
          <div key={index}>
            <>
              {pair.map((item, idx) => (
                <span className="emoji" key={idx}>
                  {item}
                </span>
              ))}
              <span className="divider">{'|'}</span>
            </>
          </div>
        ))}
        <span className="emoji">🏁</span>
      </div> */}
      <div className="board">
        {squares.map((square) => (
          <span>{square}</span>
        ))}
      </div>
    </dialog>
  );
};
