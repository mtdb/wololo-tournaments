import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { GameComponent } from '../Game';

const TOURNAMENT_NAME = 'tournament-name';
const slug = 'tournament-slug';

const actions = {
  games: {
    get: jest.fn()
  }
};

const games = {
  game: {
    [slug]: {
      matches: [],
      number_of_matches: 5,
      players: [],
      tournament: { name: TOURNAMENT_NAME }
    }
  }
};

test('Game component render the tournament name', () => {
  const { getByText } = render(<GameComponent actions={actions} games={games} slug={slug} />);
  const re = new RegExp(TOURNAMENT_NAME, 'i');
  const title = getByText(re);
  expect(title).toBeInTheDocument();
});

test('Game component call getGame function', () => {
  render(<GameComponent actions={actions} games={games} slug={slug} />);
  expect(actions.games.get).toBeCalled();
});

test('Game component show prediction modal when button is pressed', () => {
  const { container: document, getByText } = render(
    <GameComponent actions={actions} games={games} slug={slug} />
  );
  const predictionButton = document.querySelector('.box.button button');
  const modalContent = 'Your Prediction:';
  const view = document.querySelector('.paper');

  expect(view).not.toHaveTextContent(modalContent);
  fireEvent.click(predictionButton);
  expect(getByText(modalContent)).toHaveTextContent(modalContent);
});
