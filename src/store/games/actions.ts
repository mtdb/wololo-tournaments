import api from '../../contrib/api';
import { IStore } from '../index';
import { IGame } from './store';

export interface IGamesActions {
  get(slug: string): Promise<{ games: { game: { [key: string]: IGame } } }>;
  listUpcoming(): Promise<{ games: { upcoming: IGame[] } }>;
}

const actions: any = {
  get: async (_state: IStore, slug: string) => {
    const game = await (await api.gamesRead(slug)()).json();
    return { games: { game: { [slug]: game } } };
  },
  listUpcoming: async () => {
    const upcoming = await (await api.gamesTList('upcoming')()).json();
    return { games: { upcoming } };
  }
};

export default actions as IGamesActions;
