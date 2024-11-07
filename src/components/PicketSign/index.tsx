import clsx from 'clsx';
import { useEffect, useMemo, useState } from 'react';
import { Card } from '../../card';
import './PicketSign.css';

export const PicketSign = ({ card }: { card: Card }) => {
  const { value, isFaceUp, isMatched } = card;

  const [matched, setMatched] = useState(false);

  useEffect(() => {
    if (isMatched) {
      setTimeout(() => setMatched(true), 500);
    }
  }, [isMatched]);

  const imageSrc = useMemo(() => `assets/sign-content/${value}.webp`, [value]);

  return (
    <button className={clsx('container', isFaceUp ? 'face-up' : 'face-down')}>
      {!matched && (
        // Back of sign
        <div className="back-container">
          <img
            className="sign-image"
            src="assets/picket-sign/picket-sign-face-down.webp"
            onDragStart={(e) => e.preventDefault()}
          />
        </div>
      )}
       {/* Front of sign  */}
      <div className={clsx('front-container', matched && 'matched')}>
        <img
          className="sign-image"
          src="assets/picket-sign/picket-sign-face-up.webp"
          onDragStart={(e) => e.preventDefault()}
        />
        <div className="content-container">
          <img
            className={clsx('content')}
            src={imageSrc}
            alt={""}
            aria-label={isFaceUp ? value : `Picket sign number`}
            onDragStart={(e) => e.preventDefault()}
          />
        </div>
      </div>
    </button>
  );
};
