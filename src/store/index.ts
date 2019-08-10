import React from 'react';
import leaderboardsActions from './leaderboards/actions';
import tournamentsActions from './tournaments/actions';
import userActions from './user/actions';
import { ILeaderboardsStore, leaderboardsStore } from './leaderboards/store';
import { ITournamentsStore, tournamentsStore } from './tournaments/store';
import { IUserStore, userStore } from './user/store';

export interface IActionGroup {
  [key: string]: any;
}

export interface IActions {
  [key: string]: IActionGroup;
}

export interface IStore {
  actions: IActions;
  leaderboards: ILeaderboardsStore;
  tournaments: ITournamentsStore;
  user: IUserStore;
}

const store: IStore = {
  actions: {
    leaderboards: leaderboardsActions,
    tournaments: tournamentsActions,
    user: userActions
  },
  leaderboards: leaderboardsStore,
  tournaments: tournamentsStore,
  user: userStore
};

const { Provider, Consumer } = React.createContext(store);
export { store, Provider, Consumer };
