import { globalHistory } from '@reach/router';
import React, { useEffect, useState } from 'react';
import SideBar from '../SideBar';
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
  useEffect(() => setState(newState), [globalHistory.location]);

  return state;
};

const TopBar = ({ excludes }: IProps) => {
  const { location } = useLocation();

  return excludes.indexOf(location.pathname) >= 0 ? (
    <div />
  ) : (
    <header id="TopBar">
      <SideBar>
        <div className="box">
          <span>0</span>
          <img src="/assets/gold.png" alt="gold" className="gold" />
        </div>
        <div className="user-icon">
          <img src="/assets/profile_pics/villager.png" alt="" />
        </div>
      </SideBar>
    </header>
  );
};
export { TopBar };
