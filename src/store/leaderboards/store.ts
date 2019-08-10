export const leaderboardsStore = {
  global: []
};

interface IPlayer {
  username: string;
  gold: number;
}

export interface ILeaderboard extends Array<IPlayer> {}

export interface ILeaderboardsStore {
  [key: string]: ILeaderboard;
}
