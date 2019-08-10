import api from '../../contrib/api';
import { IActionGroup, IStore } from '../index';
import { ILeaderboard } from './store';

const actions: IActionGroup = {
  get: async (state: IStore, key: string) => {
    const leaderboard: ILeaderboard = await (await api.leaderboardsList0(key)()).json();
    return { leaderboards: { ...state.leaderboards, [key]: leaderboard } };
  }
};

export default actions;
