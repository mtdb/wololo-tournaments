import { auth } from '../../contrib/api';
import { IStore } from '../index';
import { IErrorsStore } from '..';
import { IAuthStore } from './store';

export interface IUserActions {
  login(username: string, password: string): Promise<{ auth: IAuthStore; erros: IErrorsStore }>;
}

const actions: any = {
  login: async (_state: IStore, username: string, password: string) => {
    let errors = [] as string[];
    const response = await auth
      .loginCreate({
        password,
        username
      })()
      .catch(() => {
        errors = ['Unable to log in with provided credentials.'];
      });

    const token = response ? (await response.json()).key : '';
    return { auth: { token }, errors: { auth: errors } };
  }
};

export default actions as IUserActions;
