import { render } from '@testing-library/react';
import React from 'react';
import { TournamentsComponent } from '../Tournaments';

const t = (x: number) => `TOURNAMENT${x}`;

const actions: any = {
  tournaments: { list: jest.fn() }
};

const tournaments: any = {
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
  expect(rows ? rows.children.length : 0).toBe(tournaments.all.length);
});
