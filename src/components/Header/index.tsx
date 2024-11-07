import { PropsWithChildren } from 'react';
import './Header.css';

export const Header = ({ children }: PropsWithChildren) => (
  <header id="header">
    <div className="header-container">
      <div />
      <div className="header-title">
        <b>Match Strike</b>
      </div>
      <div className="header-links">
        <a href="https://nytimesguild.org/tech/guild-builds/">More Games</a>
        {children}
      </div>
    </div>
  </header>
);
