import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { TournamentsComponent } from '../Tournaments';

const PLAYER_1 = 'player one';
const PLAYER_2 = 'player two';
const SLUG = 'tournament-slug';
const t = x => `TOURNAMENT${x}`;

const actions = {
  tournaments: { list: jest.fn() }
};

const tournaments = {
  all: [{ name: t(1), slug: t(1) }, { name: t(2), slug: t(2) }]
};

test('Tournaments component render the tournament name', () => {
  const { getByText } = render(
    <TournamentsComponent actions={actions} tournaments={tournaments} />
  );
  const re = new RegExp(t(1), 'i');
  const title = getByText(re);
  expect(title).toBeInTheDocument();
});

test('Tournaments component render as many rows as tournaments', () => {
  const { container: document } = render(
    <TournamentsComponent actions={actions} tournaments={tournaments} />
  );
  const rows = document.querySelector('.tournament-summary');
  expect(rows.children.length).toBe(tournaments.all.length);
});
