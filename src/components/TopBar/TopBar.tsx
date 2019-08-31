import { globalHistory } from '@reach/router';
import React, { useEffect, useState } from 'react';
import './TopBar.scss';

interface IProps {
  excludes: string[];
}

export const useLocation = () => {
  const newState = {
    location: globalHistory.location,
    navigate: globalHistory.navigate
  };

  const [state, setState] = useState(newState);
  useEffect(() => setState(newState), [newState, newState.location]);

  return state;
};

const TopBar = ({ excludes }: IProps) => {
  const { location } = useLocation();

  return excludes.indexOf(location.pathname) >= 0 ? (
    <div />
  ) : (
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
};
export { TopBar };
