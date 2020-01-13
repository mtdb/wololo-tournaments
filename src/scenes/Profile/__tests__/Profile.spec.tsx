import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ProfileComponent } from '../Profile';

const actions = {
  user: { login: jest.fn(), me: jest.fn() }
};

test('Profile component has a wrapper', () => {
  const { container: document } = render(<ProfileComponent />);
  const container = document.querySelector('.wrapper');
  expect(container).toBeInTheDocument();
});
