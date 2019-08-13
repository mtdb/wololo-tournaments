import api from '../../contrib/api';
import { IActionGroup, IStore } from '../index';
import { IGame } from './store';

const actions: IActionGroup = {
  get: async (_state: IStore, slug: string) => {
    const game: IGame = await (await api.gamesRead(slug)()).json();
    return { game: { [slug]: game } };
  },
  listUpcoming: async (_state: IStore) => {
    const upcoming: IGame[] = await (await api.gamesList('upcoming')()).json();
    return { games: { upcoming } };
  }
};

export default actions;
