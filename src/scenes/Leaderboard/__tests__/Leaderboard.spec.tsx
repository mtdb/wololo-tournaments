import { render } from '@testing-library/react';
import React from 'react';
import { LeaderboardComponent } from '../Leaderboard';

const NAME = 'leaderboard-name';
const u = (x: number) => `USERNAME${x}`;

const actions: any = {
  leaderboards: {
    get: jest.fn()
  }
};
const leaderboards: any = {
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
  expect(rows ? rows.children.length : 0).toBe(leaderboards[NAME].length);
});
