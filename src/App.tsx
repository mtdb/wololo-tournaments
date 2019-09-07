import { MuiThemeProvider } from '@material-ui/core/styles';
import React, { Component } from 'react';

import { AnimatedRoute as Scene, AnimatedRouter as Router } from './components/AnimatedRouter';

import Navbar from './components/Navbar';
import TopBar from './components/TopBar';

import Game from './scenes/Game';
import Games from './scenes/Games';
import Leaderboard from './scenes/Leaderboard';
import Login from './scenes/Login';
import Profile from './scenes/Profile';
import Register from './scenes/Register';
import Tournaments from './scenes/Tournaments';

import { bindActions } from './contrib/store';
import { IStore, Provider, store } from './store';

import './assets/fontawesome/css/all.css';

import theme from './theme';

export const routes = {
  game: (slug = ':slug') => `/games/${slug}`,
  gamePredictions: (game = ':game') => `/games/${game}/predictions`,
  leaderboard: (name = ':name') => `/leaderboard/${name}`,
  login: () => '/login',
  profile: (page = ':page') => `/profile/${page}`,
  register: () => '/register',
  tournamentGames: (slug = ':slug') => `/tournaments/${slug}`,
  tournaments: () => '/tournaments',
  upcoming: () => '/'
};

class App extends Component<{}, IStore> {
  constructor(props: any) {
    super(props);
    const actions = bindActions(this);
    this.state = { ...store, actions };
  }

  public render(): React.ReactNode {
    return (
      <Provider value={this.state}>
        <MuiThemeProvider theme={theme}>
          <TopBar excludes={['/login', '/register']} />
          <Navbar excludes={['/login', '/register']} />
          <Router>
            <Scene path={routes.upcoming()} component={Games} />
            <Scene path={routes.tournaments()} component={Tournaments} />
            <Scene path={routes.profile()} component={Profile} />
            <Scene path={routes.tournamentGames()} component={Games} />
            <Scene path={routes.game()} component={Game} />
            <Scene path={routes.leaderboard()} component={Leaderboard} />
            <Scene path={routes.login()} component={Login} />
            <Scene path={routes.register()} component={Register} />
          </Router>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
