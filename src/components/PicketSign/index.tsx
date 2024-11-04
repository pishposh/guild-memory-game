import { useEffect, useMemo, useState } from 'react';
import { SignContent } from '../../types';
import './PicketSign.css';

export const PicketSign = ({
  content,
  flipped,
  onClick
}: {
  content: SignContent;
  flipped: boolean;
  onClick: () => void;
}) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowContent(true), 1000);
  }, []);

  const containerClass = useMemo(
    () => (flipped ? 'container flipped' : 'container'),
    [flipped]
  );
  const contentClass = useMemo(
    () => (showContent ? 'content' : 'content transparent'),
    [showContent]
  );
  const imageSrc = useMemo(() => `/assets/sign-content/${content}`, [content]);

  return (
    <div className={containerClass} onClick={() => onClick()}>
      <div className="front-container">
        <div className="sign-post">
          <img
            className="sign-image"
            src="/assets/picket-sign/picket-sign.png"
          />
          <div className="content-container">
            <img className={contentClass} src={imageSrc} alt={content} />
          </div>
        </div>
      </div>
      <div className="back-container">
        <img
          className="sign-image"
          src="/assets/picket-sign/picket-sign-flipped.png"
        />
      </div>
    </div>
  );
};
