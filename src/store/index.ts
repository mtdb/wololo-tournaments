import React from 'react';
import userActions from './user/actions';
import tournamentsActions from './tournaments/actions';
import { IUserStore, userStore } from './user/store';
import { ITournamentsStore, tournamentsStore } from './tournaments/store';

export interface IActionGroup {
  [key: string]: any;
}

export interface IActions {
  [key: string]: IActionGroup;
}

export interface IStore {
  actions: IActions;
  user: IUserStore;
  tournaments: ITournamentsStore;
}

const store: IStore = {
  actions: {
    tournaments: tournamentsActions,
    user: userActions
  },
  tournaments: tournamentsStore,
  user: userStore
};

const { Provider, Consumer } = React.createContext(store);
export { store, Provider, Consumer };
