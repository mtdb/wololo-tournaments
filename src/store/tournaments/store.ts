export interface ITournament {
  banner: string;
  icon: string;
  name: string;
  prize: string;
  slug: string;
  web: string;
}

export const tournamentsStore: ITournament[] = [];

export interface ITournamentsStore extends Array<ITournament> {}
