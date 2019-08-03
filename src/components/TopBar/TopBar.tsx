import React from 'react';
import './TopBar.scss';

const TopBar = () => (
  <header id="TopBar">
    <div>
      <i className="fas fa-coins" />
      <span> 1000 </span>
    </div>
    <div className="user-icon">
      <i className="far fa-user" />
    </div>
  </header>
);

export { TopBar };
