import picketSignFlipped from '../assets/picket-sign/picket-sign-flipped.png';
import picketSign from '../assets/picket-sign/picket-sign.png';

import { useEffect, useMemo, useState } from 'react';
import './PicketSign.css';

export const PicketSign = ({ text }: { text: string }) => {
  const [flipped, setFlipped] = useState(true);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowText(true), 1000);
  }, []);

  const containerClass = useMemo(
    () => flipped? 'container flipped': 'container', 
    [flipped]
  )

  return (
    <div
      className={containerClass}
      onClick={() => setFlipped(!flipped)}
    >
      <div className="front-container">
        <div className="sign-post">
          <img src={picketSign} alt={text} />
          <div className="text-container">
            <div>{showText && text}</div>
          </div>
        </div>
      </div>
      <div className="back-container">
        <img src={picketSignFlipped} alt={text.toUpperCase()} />
      </div>
    </div>
  );
};
