import clsx from 'clsx';
import { useEffect, useMemo, useState } from 'react';
import { Card } from '../../types';
import './PicketSign.css';

export const PicketSign = ({
  card,
  onClick
}: {
  card: Card;
  onClick: () => void;
}) => {
  const [hideContent, setHideContent] = useState(true);

  useEffect(() => {
    setTimeout(() => setHideContent(false), 1000);
  }, []);

  const imageSrc = useMemo(
    () => `/assets/sign-content/${card.value}`,
    [card.value]
  );

  return (
    <div
      className={clsx('container', card.revealed && 'revealed')}
      onClick={() => onClick()}
    >
      <div className="back-container">
        <img
          className="sign-image"
          src="/assets/picket-sign/picket-sign-back.png"
          onDragStart={(e) => e.preventDefault()}
        />
      </div>
      <div className="front-container">
        <img
          className="sign-image"
          src="/assets/picket-sign/picket-sign-front.png"
        />
        <div className="content-container">
          <img
            className={clsx('content', hideContent && 'transparent')}
            src={imageSrc}
            alt={card.value}
            onDragStart={(e) => e.preventDefault()}
          />
        </div>
      </div>
    </div>
  );
};
