import api from '../../contrib/api';
import { IActionGroup, IStore } from '../index';
import { IGame } from './store';

const actions: IActionGroup = {
  listUpcoming: async (_state: IStore) => {
    const upcoming: IGame[] = await (await api.gamesList('upcoming')()).json();
    return { games: { upcoming } };
  },
  list: async (_state: IStore, tournament: string) => {
    const games: IGame[] = await (await api.gamesList(tournament)()).json();
    return { games: { [tournament]: games } };
  }
};

export default actions;
