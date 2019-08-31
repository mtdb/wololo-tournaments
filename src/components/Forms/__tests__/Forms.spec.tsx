import moment from 'moment';
import React from 'react';
import ReactDOM from 'react-dom';
import { create, ReactTestInstance, ReactTestRenderer } from 'react-test-renderer';

import { FormProvider } from '../Forms';

let renderer: ReactTestRenderer;
let instance: any;
let testInstance: ReactTestInstance;

const form = {
  anything: 'anything',
  date: null,
  email: '',
  one: '1',
  ready: false,
  two: '2'
};

const submit = jest.fn();

describe('FormProvider Component', () => {
  beforeAll(() => {
    renderer = create(
      <FormProvider
        defaultValues={form}
        onSubmit={submit}
        validations={{
          date: 'date',
          email: ['required', 'email'],
          one: 'required',
          ready: (values: any) => values.ready,
          two: (values: any) => values.one === values.two
        }}
      />
    );
    testInstance = renderer.root;
    instance = renderer.root.instance;
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<FormProvider defaultValues={form} onSubmit={submit} validations={{}} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Validates all the fields on input update', () => {
    instance.setValue('email')('no');
    expect(instance.state.errors.one).toEqual(false);
    expect(instance.state.errors.two).toEqual(true);
    expect(instance.state.errors.email).toEqual(true);
    expect(instance.state.errors.FORM).toEqual(true);
  });

  it('Prevent from submitting data if the form has errors', () => {
    testInstance.findByType('form').props.onSubmit();

    expect(submit).toBeCalledTimes(0);
  });

  it('Allow to set values from events', () => {
    instance.setValue('two')({ target: { value: 'zero' } });

    expect(instance.state.values.two).toEqual('zero');
  });

  it('Allow to set date fields', () => {
    instance.setValue('date')(moment());

    expect(moment(instance.state.values.date).isValid()).toEqual(true);
  });

  it('Allow to submit the form if it has no errors', () => {
    instance.setValue('email')('user@testing.com');
    instance.setValue('two')('1');
    instance.toggleValue('ready')();

    testInstance.findByType('form').props.onSubmit();
    expect(submit).toBeCalled();
  });
});
