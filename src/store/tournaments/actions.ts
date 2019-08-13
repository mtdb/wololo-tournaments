import api from '../../contrib/api';
import { IGame } from '../games/store';
import { IActionGroup, IStore } from '../index';
import { ITournament } from './store';

const actions: IActionGroup = {
  list: async (_state: IStore) => {
    const list: ITournament[] = await (await api.tournamentsList()()).json();
    return { tournaments: { list } };
  },
  listGames: async (_state: IStore, tournament: string) => {
    const games: IGame[] = await (await api.gamesList(tournament)()).json();
    return { tournaments: { games: { [tournament]: games } } };
  }
};

export default actions;
