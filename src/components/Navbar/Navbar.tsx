import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import React from "react";
import { routes } from "../../App";
import "./Navbar.scss";

import {useState, useEffect} from 'react';
import {globalHistory} from '@reach/router';

export function useLocation() {
  const newState = {
    location: globalHistory.location,
    navigate: globalHistory.navigate,
  };

  const [state, setState] = useState(newState);
  useEffect(() => setState(newState), [newState.location]);

  return state;
}

const getActiveTab = (path: string) => {
  const regExpTabs = [/\/upcoming\/?/i, /\/tournaments\/?/i, /\/leaderboard\/?/i]

  const match = regExpTabs.findIndex(re => path.match(re));

  return match >= 0 ? match : 0
}

const Navbar = () => {
  const {location, navigate} = useLocation();
  const [value, setValue] = React.useState(getActiveTab(location.pathname));

  const handleChange = (_: any, newValue: number) => {
    setValue(newValue);
    const links = [routes.games(), routes.tournaments(), routes.leaderboard()];

    navigate(links[newValue])
  }

  return (
  <div id="Navbar">
    <AppBar position="static" color="default">
        <Tabs
          className="main-tabs wooden-bg"
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Upcoming"  />
          <Tab label="Tournaments" />
          <Tab label="Leaderboard"  />
        </Tabs>
      </AppBar>
  </div>
)
};

export { Navbar };
