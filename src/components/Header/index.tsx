import { PropsWithChildren } from 'react';
import './Header.css';

export const Header = ({ children }: PropsWithChildren) => (
  <header id="header">
    <div className="header-container">
      <div className="header-spacer" />
      <div className="header-title">
        <b>Match Strike</b>
      </div>
      <div className="header-links">{children}</div>
    </div>
  </header>
);
