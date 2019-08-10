import api from '../../contrib/api';
import { IActionGroup, IStore } from '../index';
import { ITournament } from './store';

const actions: IActionGroup = {
  list: async (_state: IStore) => {
    const tournaments: ITournament[] = await (await api.tournamentsList()()).json();
    return { tournaments };
  }
};

export default actions;
