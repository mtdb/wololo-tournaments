interface IPlayer {
  player: {
    country: string;
    name: string;
    slug: string;
  };
  team: string;
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
  matches: any;
}

export const gamesStore: IGamesStore = {
  upcoming: []
};

export interface IGamesStore {
  [key: string]: IGame[];
}
