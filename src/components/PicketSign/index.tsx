import { useMemo } from 'react';
import { SignContent } from '../../types';
import './PicketSign.css';

export const PicketSign = ({
  content,
  isFaceUp
}: {
  content: SignContent;
  isFaceUp: boolean;
}) => {
  const containerClass = useMemo(
    () => (isFaceUp ? 'container face-down' : 'container face-up'),
    [isFaceUp]
  );
  const imageSrc = useMemo(() => `/assets/sign-content/${content}`, [content]);

  return (
    <div className={containerClass}>
      <div className="back-container">
        <img
          className="sign-image"
          src="/assets/picket-sign/picket-sign-face-down.png"
          onDragStart={(e) => e.preventDefault()}
        />
      </div>
      <div className="front-container">
        <img
          className="sign-image"
          src="/assets/picket-sign/picket-sign-face-up.png"
          onDragStart={(e) => e.preventDefault()}
        />
        <div className="content-container">
          <img
            className="content"
            src={imageSrc}
            alt={content}
            onDragStart={(e) => e.preventDefault()}
          />
        </div>
      </div>
    </div>
  );
};
