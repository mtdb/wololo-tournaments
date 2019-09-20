import { IErrorsStore } from '..';
import api, { authApi } from '../../contrib/api';
import { IStore } from '../index';
import {
  authStore as initialAuthStore,
  IAuthStore,
  IUserStore,
  userStore as initialUserStore
} from './store';

export interface IUserActions {
  login(username: string, password: string): Promise<{ auth: IAuthStore; erros: IErrorsStore }>;
  logout(): Promise<{ auth: IAuthStore }>;
  me(): Promise<{ user: IUserStore }>;
}

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
    const user = await (await api.usersMe(using(auth))()).json();
    return { user };
  },
  register: async (
    _state: IStore,
    username: string,
    email: string,
    password1: string,
    password2: string
  ) => {
    const response = await authApi.registrationCreate({
      username,
      email,
      password1,
      password2
    })();
    console.log('response1', response);
  }
};

export default actions as IUserActions;
