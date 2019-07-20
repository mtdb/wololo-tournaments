import React from 'react';
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
  user: IUserStore;
}

const store: IStore = {
  actions: {
    user: userActions
  },
  user: userStore
};

const { Provider, Consumer } = React.createContext(store);
export { store, Provider, Consumer };
