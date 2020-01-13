import { render } from '@testing-library/react';
import React from 'react';
import { GamesComponent } from '../Games';

const TOURNAMENT_NAME = 'tournament-name';
const PLAYER_1 = 'player one';
const PLAYER_2 = 'player two';
const SLUG = 'tournament-slug';

const actions: any = {
  games: {
    listUpcoming: jest.fn()
  },
  tournaments: { listGames: jest.fn() }
};

const games: any = {};

const tournaments: any = {
  games: {
    [SLUG]: [
      {
        players: [
          { player: { name: PLAYER_1, country: 'de' } },
          { player: { name: PLAYER_2, country: 'us' } }
        ],
        tournament: { name: TOURNAMENT_NAME }
      }
    ]
  }
};

test('Games component render the tournament name', () => {
  const { getByText } = render(
    <GamesComponent actions={actions} games={games} tournaments={tournaments} slug={SLUG} />
  );
  const re = new RegExp(TOURNAMENT_NAME, 'i');
  const title = getByText(re);
  expect(title).toBeInTheDocument();
});

test('Game component call listGames', () => {
  render(<GamesComponent actions={actions} games={games} tournaments={tournaments} slug={SLUG} />);
  expect(actions.games.listUpcoming).not.toBeCalled();
  expect(actions.tournaments.listGames).toBeCalled();
});

test('Game component call listUpcoming if no slug given', () => {
  render(<GamesComponent actions={actions} games={games} tournaments={tournaments} slug={''} />);
  expect(actions.games.listUpcoming).toBeCalled();
});

test('Game component render the player names', () => {
  const { getByText } = render(
    <GamesComponent actions={actions} games={games} tournaments={tournaments} slug={SLUG} />
  );
  const p1 = new RegExp(PLAYER_1, 'i');
  const p2 = new RegExp(PLAYER_2, 'i');
  expect(getByText(p1)).toBeInTheDocument();
  expect(getByText(p2)).toBeInTheDocument();
});
