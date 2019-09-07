import React from 'react';
import ReactDOM from 'react-dom';

import { ClubWizard } from '../ClubWizard';

describe('ClubWizard Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ClubWizard location={{ pathname: '/' }} children={<div />} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
