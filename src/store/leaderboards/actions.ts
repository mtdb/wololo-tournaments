import api from '../../contrib/api';
import { IStore } from '../index';
import { ILeaderboardsStore } from './store';

export interface ILeaderboardsActions {
  get(key: string): Promise<{ leaderboards: ILeaderboardsStore }>;
}

const actions: any = {
  get: async (state: IStore, key: string) => {
    const leaderboard = await (await api.leaderboardsList0(key)()).json();
    return { leaderboards: { ...state.leaderboards, [key]: leaderboard } };
  }
};

export default actions as ILeaderboardsActions;
