import { render } from '@testing-library/react';
import React from 'react';
import { LeaderboardComponent } from '../Leaderboard';

const NAME = 'leaderboard-name';
const USERNAME = 'username';
const u = x => `USERNAME${x}`;

const actions = {
  leaderboards: {
    get: jest.fn()
  }
};
const leaderboards = {
  [NAME]: [{ username: u(1) }, { username: u(2) }, { username: u(3) }]
};

test('Games component render leaderboard players', () => {
  const { getByText } = render(
    <LeaderboardComponent actions={actions} leaderboards={leaderboards} name={NAME} />
  );
  const re = new RegExp(u(1), 'i');
  const player = getByText(re);
  expect(player).toBeInTheDocument();
});

test('Games component render as many rows as players', () => {
  const { container: document } = render(
    <LeaderboardComponent actions={actions} leaderboards={leaderboards} name={NAME} />
  );
  const rows = document.querySelector('.row');
  expect(rows.children.length).toBe(leaderboards[NAME].length);
});
