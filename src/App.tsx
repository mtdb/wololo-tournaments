import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import React, { Component } from "react";

import {
  AnimatedRoute as Scene,
  AnimatedRouter as Router
} from "./components/AnimatedRouter";

import TopBar from "./components/TopBar";

import Game from "./scenes/Game";
import Games from "./scenes/Games";
import Leaderboard from "./scenes/Leaderboard";
import Predictions from "./scenes/Predictions";
import Tournaments from "./scenes/Tournaments";

import { bindActions } from "./contrib/store";
import { IStore, Provider, store } from "./store";

import "./assets/fontawesome/css/all.css";

const egyptianBlue = "#1034a6";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: egyptianBlue
    },
    secondary: {
      main: "#A68210"
    }
  }
});

export const routes = {
  games: () => "/",
  tournaments: () => "/tournaments",
  tournamentsDetails: (slug = ":slug") => `/tournaments/${slug}`,
  game: (slug = ":slug", game = ":game") => `/tournaments/${slug}/${game}`,
  gamePredictions: (slug = ":slug", game = ":game") =>
    `/tournaments/${slug}/${game}/predictions`,
  leaderboard: () => "/leaderboard/",
  leaderboardGroup: (group = ":group") => `/leaderboard/${group}`
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
          <TopBar />
          <Router>
            <Scene path={routes.games()} component={Games} />
            <Scene path={routes.tournaments()} component={Tournaments} />
            <Scene path={routes.tournamentsDetails()} component={Games} />
            <Scene path={routes.game()} component={Game} />
            <Scene path={routes.gamePredictions()} component={Predictions} />
            <Scene path={routes.leaderboard()} component={Leaderboard} />
            <Scene path={routes.leaderboardGroup()} component={Leaderboard} />
          </Router>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
