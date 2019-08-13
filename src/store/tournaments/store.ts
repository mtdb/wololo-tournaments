import { IGame } from '../games/store';

export interface ITournament {
  banner: string;
  icon: string;
  name: string;
  prize: string;
  slug: string;
  web: string;
}

export const tournamentsStore: ITournamentsStore = {
  all: [],
  games: {},
  tournament: {}
};

export interface ITournamentsStore {
  games: {
    [key: string]: IGame[];
  };
  tournament: {
    [key: string]: ITournament;
  };
  all: ITournament[];
}
