import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import React, { Component } from "react";

import {
  AnimatedRoute as Scene,
  AnimatedRouter as Router
} from "./components/AnimatedRouter";

import Upcoming from "./scenes/Upcoming";

import { bindActions } from "./contrib/store";
import { IStore, Provider, store } from "./store";

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

class App extends Component<{}, IStore> {
  constructor(props: any) {
    super(props);

    // this.customFetch = this.customFetch.bind(this)

    const actions = bindActions(this);
    this.state = { ...store, actions };
  }

  public render(): React.ReactNode {
    return (
      <Provider value={this.state}>
        <MuiThemeProvider theme={theme}>
          <Router>
            <Scene path="/" component={Upcoming} />
            <Scene path="/home" component={Upcoming} />
          </Router>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
