import { IErrorsStore } from '..';
import api, { authApi } from '../../contrib/api';
import { IStore } from '../index';
import {
  authStore as initialAuthStore,
  IAuthStore,
  IUserStore,
  IUserUpdateStore,
  userStore as initialUserStore
} from './store';

export interface IUserActions {
  login(username: string, password: string): Promise<{ auth: IAuthStore; erros: IErrorsStore }>;
  logout(): Promise<{ auth: IAuthStore }>;
  me(): Promise<{ user: IUserStore }>;
  profile(user: IUserUpdateStore): Promise<{ user: IUserStore }>;
}

// tslint:disable-next-line
const noop = () => {};

const using = (s: IAuthStore) => ({ headers: { Authorization: `Token ${s.token}` } });

const actions: any = {
  login: async (_state: IStore, username: string, password: string) => {
    let errors = [] as string[];
    const response = await authApi
      .loginCreate({
        password,
        username
      })()
      .catch(() => {
        errors = ['Unable to log in with provided credentials.'];
      });

    const token = response ? (await response.json()).key : '';
    localStorage.setItem('token', token);
    return { auth: { token }, errors: { auth: errors } };
  },
  logout: (_state: IStore) => {
    localStorage.removeItem('token');
    return { auth: initialAuthStore, user: initialUserStore };
  },
  me: async ({ auth }: IStore) => {
    const response = await api
      .usersMe(using(auth))()
      .catch(noop);

    const user = response ? await response.json() : '';
    return { user };
  },
  profile: async ({ auth }: IStore, userData: IUserUpdateStore) => {
    const response = await api
      .usersUpdate('mauricio', { username: 'mauricio', ...userData }, using(auth))()
      .catch(noop);
    const user = response ? await response.json() : '';
    return { user };
  }
};

export default actions as IUserActions;
