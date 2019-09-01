import { auth } from '../../contrib/api';
import { IStore } from '../index';
import { IUserStore } from './store';

export interface IUserActions {
  login(username: string, password: string): Promise<{ user: IUserStore }>;
}

const actions: any = {
  login: async (_state: IStore, username: string, password: string) => {
    const user = await (await auth.loginCreate({
      password,
      username
    })()).json();

    return { user };
  }
};

export default actions as IUserActions;
