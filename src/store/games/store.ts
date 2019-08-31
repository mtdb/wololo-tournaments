export interface IPlayer {
  player: {
    country: string;
    name: string;
    slug: string;
  };
  team: string;
}

interface IMatch {
  civilizations: Array<{
    player: string;
    civilization: string;
  }>;
  id: number;
  winner: string;
}

export interface IGame {
  slug: string;
  tournament: {
    name: string;
    slug: string;
  };
  date: string;
  winner: string;
  players: IPlayer[];
  number_of_matches: number;
  matches: IMatch[];
}

interface IPlayerScore extends IPlayer {
  score: number;
}

export interface IGameScores {
  [playerTeam: string]: IPlayerScore;
}

export const gamesStore: IGamesStore = {
  game: {},
  upcoming: []
};

export interface IGamesStore {
  game: {
    [key: string]: IGame;
  };
  upcoming: IGame[];
}
