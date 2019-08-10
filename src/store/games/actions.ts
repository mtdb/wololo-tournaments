import api from '../../contrib/api';
import { IActionGroup, IStore } from '../index';
import { IGame } from './store';

const actions: IActionGroup = {
  listUpcoming: async (_state: IStore) => {
    const upcoming: IGame[] = (await (await api.gamesList()()).json()).slice(0, 5);
    return { games: { upcoming } };
  }
};

export default actions;
