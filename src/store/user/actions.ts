import { IActionGroup, IStore } from '../index';
import { IUserStore } from './store';

const actions: IActionGroup = {
  increment: (state: IStore): { user: IUserStore } => {
    const { user } = state;

    user.likes = user.likes + 1;
    return { user };
  }
};

export default actions;
