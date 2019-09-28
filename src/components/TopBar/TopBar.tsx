import { globalHistory, Link } from '@reach/router';
import React, { useEffect, useState } from 'react';
import { routes } from '../../App';
import { withContext } from '../../contrib/context';
import { IActions } from '../../store';
import { IUserStore } from '../../store/user/store';
import SideBar from '../SideBar';
import './TopBar.scss';

interface IProps {
  actions: IActions;
  excludes: string[];
  user: IUserStore;
}

export const useLocation = () => {
  const newState = {
    location: globalHistory.location,
    navigate: globalHistory.navigate
  };

  const [state, setState] = useState(newState);
  useEffect(() => setState(newState), [newState]);

  return state;
};

const TopBarComponent = ({
  user,
  actions: {
    user: { me }
  },
  excludes
}: IProps) => {
  const { location } = useLocation();
  useEffect(() => {
    void me();
  }, [me]);

  return excludes.indexOf(location.pathname) >= 0 ? (
    <div />
  ) : (
    <header id="TopBar">
      {user.username ? (
        <SideBar>
          <div className="box">
            <span>0</span>
            <img src="/assets/gold.png" alt="gold" className="gold" />
          </div>
          <div className="user-icon">
            <img src="/assets/profile_pics/villager.png" alt="" />
          </div>
        </SideBar>
      ) : (
        <Link className="btn" to={routes.login()}>
          Login
        </Link>
      )}
    </header>
  );
};

const TopBar = withContext(TopBarComponent, 'user', 'actions');

export { TopBar };
