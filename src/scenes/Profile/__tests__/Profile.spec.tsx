import { render } from '@testing-library/react';
import React from 'react';
import { ProfileComponent } from '../Profile';

test('Profile component has a wrapper', () => {
  const { container: document } = render(<ProfileComponent />);
  const container = document.querySelector('.wrapper');
  expect(container).toBeInTheDocument();
});
