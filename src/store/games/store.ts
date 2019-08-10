interface IPlayer {
  player: {
    country: string;
    name: string;
    slug: string;
  };
  team: string;
}

export interface IGame {
  id: number;
  tournament: string;
  date: string;
  winner: string;
  players: IPlayer[];
  number_of_matches: number;
  matches: any;
}

export const gamesStore: IGamesStore = {
  games: {
    upcoming: []
  }
};

export interface IGamesStore {
  games: { upcoming: IGame[] };
}
