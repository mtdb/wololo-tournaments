import { IActionGroup, IStore } from '../index';
import { ITournament } from './store';
import api from '../../contrib/api';

const tournamentsList = api.tournamentsList();

const actions: IActionGroup = {
  list: async (_state: IStore) => {
    const tournaments: ITournament[] = await (await tournamentsList()).json();
    return { tournaments };
  }
};

export default actions;
