import picketSignFlipped from '../assets/picket-sign/picket-sign-flipped.png';
import picketSign from '../assets/picket-sign/picket-sign.png';
import contractSpellingBee from '../assets/sign-content/contract-spelling-bee.png';
import guildRound from '../assets/sign-content/guild-logo-round.png';
import guildSquare from '../assets/sign-content/guild-logo-square.png';
import justCauseWordle from '../assets/sign-content/just-cause-wordle.png';
import makerWeekGuild from '../assets/sign-content/maker-week-guild.png';
import unionMadeGithub from '../assets/sign-content/union-made-github.png';

import { useEffect, useMemo, useState } from 'react';
import { SignContent } from '../types';
import './PicketSign.css';

const images : Record<SignContent, string> = {
  [SignContent.ContractSpellingBee]: contractSpellingBee,
  [SignContent.GuildRound]: guildRound,
  [SignContent.GuildSquare]: guildSquare,
  [SignContent.JustCauseWordle]: justCauseWordle,
  [SignContent.MakerWeekGuild]: makerWeekGuild,
  [SignContent.UnionMadeGithub]: unionMadeGithub,

}

export const PicketSign = ({ content }: { content: SignContent }) => {
  const [flipped, setFlipped] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowContent(true), 1000);
  }, []);

  const containerClass = useMemo(
    () => flipped? 'container flipped': 'container', 
    [flipped]
  )
  const contentClass = useMemo(() => showContent? 'content': 'content transparent', [showContent])
  const imageSrc = useMemo(() => images[content], [content])

  return (
    <div
      className={containerClass}
      onClick={() => setFlipped(!flipped)}
    >
      <div className="front-container">
        <div className="sign-post">
          <img className="sign-image" src={picketSign} />
          <div className="content-container">
            <img className={contentClass} src={imageSrc}/>
          </div>
        </div>
      </div>
      <div className="back-container">
        <img className="sign-image" src={picketSignFlipped} />
      </div>
    </div>
  );
};
