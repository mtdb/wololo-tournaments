import React from 'react';
import ReactDOM from 'react-dom';
import { TopBar } from '../TopBar';

const user = {
  username: 'username'
};
const excludes = [];

describe('TopBar Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TopBar user={user} excludes={excludes} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
