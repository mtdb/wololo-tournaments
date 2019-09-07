import api from '../../contrib/api';
import { IGame } from '../games/store';
import { IStore } from '../index';
import { ITournament } from './store';

export interface ITournamentsActions {
  list(): Promise<{
    tournaments: {
      all: ITournament[];
    };
  }>;
  listGames(tournament: string): Promise<{ tournaments: { games: { [key: string]: IGame[] } } }>;
}

const actions: any = {
  list: async () => {
    const all = await (await api.tournamentsList()()).json();
    return { tournaments: { all } };
  },
  listGames: async (_state: IStore, tournament: string) => {
    const games = await (await api.gamesTList(tournament)()).json();
    return { tournaments: { games: { [tournament]: games } } };
  }
};

export default actions as ITournamentsActions;
