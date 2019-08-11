import api from '../../contrib/api';
import { IActionGroup, IStore } from '../index';
import { IGame } from './store';

const actions: IActionGroup = {
  list: async (_state: IStore, tournament: string) => {
    const games: IGame[] = await (await api.gamesList(tournament)()).json();
    return { games: { [tournament]: games } };
  },
  listUpcoming: async (_state: IStore) => {
    const upcoming: IGame[] = await (await api.gamesList('upcoming')()).json();
    return { games: { upcoming } };
  }
};

export default actions;
