import clsx from 'clsx';
import { useEffect, useMemo, useState } from 'react';
import { Card } from '../../types';
import './PicketSign.css';

export const PicketSign = ({ card }: { card: Card }) => {
  const { value, isFaceUp, isMatched } = card;

  const [matched, setMatched] = useState(false);

  useEffect(() => {
    if (isMatched) {
      setTimeout(() => setMatched(true), 500);
    }
  }, [isMatched]);

  const imageSrc = useMemo(() => `assets/sign-content/${value}`, [value]);

  return (
    <div className={clsx('container', isFaceUp ? 'face-up' : 'face-down')}>
      {!matched && (
        <div className="back-container">
          <img
            className="sign-image"
            src="assets/picket-sign/picket-sign-face-down.png"
            onDragStart={(e) => e.preventDefault()}
          />
        </div>
      )}
      <div className={clsx('front-container', matched && 'matched')}>
        <img
          className="sign-image"
          src="assets/picket-sign/picket-sign-face-up.png"
          onDragStart={(e) => e.preventDefault()}
        />
        <div className="content-container">
          <img
            className={clsx('content')}
            src={imageSrc}
            alt={value}
            onDragStart={(e) => e.preventDefault()}
          />
        </div>
      </div>
    </div>
  );
};
