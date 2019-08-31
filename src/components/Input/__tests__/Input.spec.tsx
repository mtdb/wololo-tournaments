import FormControl from '@material-ui/core/FormControl';
import Create from '@material-ui/icons/Create';
import Warning from '@material-ui/icons/PriorityHigh';
import React from 'react';
import ReactDOM from 'react-dom';
import { create, ReactTestInstance, ReactTestRenderer } from 'react-test-renderer';

import { InputComponent as Input } from '../Input';

let renderer: ReactTestRenderer;
let instance: any;
let testInstance: ReactTestInstance;

describe('Input Component', () => {
  beforeAll(() => {
    renderer = create(
      <Input
        classes={{}}
        errorMessage="Error Message"
        hasError={true}
        id="id"
        label="label"
        type="text"
      />
    );
    testInstance = renderer.root;
    instance = renderer.root.instance;
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Input classes={{}} type="text" label="label" id="id" />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Validates and shows error after blur', () => {
    expect(instance.state.validate).toEqual(false);
    expect(testInstance.findByType(Create)).toBeDefined();
    expect(testInstance.findByType(FormControl).props.error).toEqual(false);

    try {
      testInstance.findByProps({ children: 'Error Message' });
    } catch (e) {
      expect(e).toBeDefined();
    }

    instance.onBlur();

    expect(instance.state.validate).toEqual(true);
    expect(testInstance.findByType(Warning)).toBeDefined();
    expect(testInstance.findByType(FormControl).props.error).toEqual(true);
    expect(testInstance.findByProps({ children: 'Error Message' })).toBeDefined();
  });
});
