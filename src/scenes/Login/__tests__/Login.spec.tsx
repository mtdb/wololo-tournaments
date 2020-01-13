import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { LoginComponent } from '../Login';

const actions = {
  user: { login: jest.fn(), me: jest.fn() }
};

test('Login component has a welcome message', () => {
  const { getByText } = render(<LoginComponent />);
  const msg = getByText(/Welcome/i);
  expect(msg).toBeInTheDocument();
});

test('Login component has a register link', () => {
  const { getByText } = render(<LoginComponent />);
  const link = getByText(/Create account/i);
  expect(link).toBeInTheDocument();
});

test('Login button call login action', () => {
  const { container: document, getByLabelText } = render(<LoginComponent actions={actions} />);
  const loginButton = document.querySelector('.button.button-shadow');
  fireEvent.change(getByLabelText(/USERNAME/i), {
    target: { value: 'username' }
  });
  fireEvent.change(getByLabelText(/PASSWORD/i), {
    target: { value: 'password' }
  });
  fireEvent.click(loginButton);
  expect(actions.user.login).toBeCalled();
});

test('Login button does not call login action if the form is empty', () => {
  const { container: document, getByLabelText } = render(<LoginComponent actions={actions} />);
  const loginButton = document.querySelector('.button.button-shadow');
  fireEvent.click(loginButton);
  expect(actions.user.login).toBeCalled();
});
