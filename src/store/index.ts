import React from 'react';
import gamesActions from './games/actions';
import { gamesStore, IGamesStore } from './games/store';
import leaderboardsActions from './leaderboards/actions';
import { ILeaderboardsStore, leaderboardsStore } from './leaderboards/store';
import tournamentsActions from './tournaments/actions';
import { ITournamentsStore, tournamentsStore } from './tournaments/store';
import userActions from './user/actions';
import { IUserStore, userStore } from './user/store';

export interface IActionGroup {
  [key: string]: any;
}

export interface IActions {
  [key: string]: IActionGroup;
}

export interface IStore {
  actions: IActions;
  games: IGamesStore;
  leaderboards: ILeaderboardsStore;
  tournaments: ITournamentsStore;
  user: IUserStore;
}

const store: IStore = {
  actions: {
    games: gamesActions,
    leaderboards: leaderboardsActions,
    tournaments: tournamentsActions,
    user: userActions
  },
  games: gamesStore,
  leaderboards: leaderboardsStore,
  tournaments: tournamentsStore,
  user: userStore
};

const { Provider, Consumer } = React.createContext(store);
export { store, Provider, Consumer };
