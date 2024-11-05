import { useEffect, useMemo, useState } from 'react';
import { SignContent } from '../../types';
import './PicketSign.css';

export const PicketSign = ({
  content,
  revealed,
  onClick
}: {
  content: SignContent;
  revealed: boolean;
  onClick: () => void;
}) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowContent(true), 1000);
  }, []);

  const containerClass = useMemo(
    () => (revealed ? 'container revealed' : 'container'),
    [revealed]
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
            src="/assets/picket-sign/picket-sign-front.png"
          />
          <div className="content-container">
            <img className={contentClass} src={imageSrc} alt={content} />
          </div>
        </div>
      </div>
      <div className="back-container">
        <img
          className="sign-image"
          src="/assets/picket-sign/picket-sign-back.png"
        />
      </div>
    </div>
  );
};
