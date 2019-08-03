import React from 'react';
import ReactDOM from 'react-dom';
import { Predictions } from '../Predictions';

describe('Predictions Scene', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Predictions />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
