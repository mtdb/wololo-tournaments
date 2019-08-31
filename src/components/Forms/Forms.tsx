import moment from 'moment';
import React, { Component, createContext } from 'react';

import { DATE_RFC2822 } from '../../contrib/utils';
import { IValidators, validators, validatorType } from '../../contrib/validations';

const ValuesContext = createContext({});
const ErrorsContext = createContext({});
const SetValueContext = createContext({});

type IvalidatorFunction = (values: any, validators: IValidators) => boolean;

export interface IValidations {
  [field: string]: validatorType[] | validatorType | IvalidatorFunction;
}

interface IStateValues {
  [key: string]: string | boolean;
}

interface ICanvasData {
  getCanvas: () => HTMLCanvasElement;
}

export interface IFormAttributes {
  values: any;
  formActions: {
    setValue: (field: string, canvasData?: ICanvasData) => (event: any) => void;
    toggleValue: (field: string) => (event: any) => void;
  };
  errors: {
    [key: string]: boolean;
  };
}

interface IFormProps {
  defaultValues: any;
  validations: IValidations;
  onSubmit: any;
}

interface IFormState {
  values: IStateValues;
  errors: {
    [key: string]: boolean;
  };
}

const getValue = (path: string[], state: any): string | ImageData => {
  if (path.length === 1) {
    return state[path[0]];
  } else {
    const [name, ...rest] = path;
    return getValue(rest, state[name]);
  }
};

const mergeValue = (path: string[], state: any, value: string | boolean): any => {
  if (path.length === 1) {
    return {
      ...state,
      [path[0]]: value
    };
  } else {
    const [name, ...rest] = path;
    return {
      ...state,
      [name]: mergeValue(rest, state[name], value)
    };
  }
};

class FormProvider extends Component<IFormProps, IFormState> {
  public validators: IValidators;
  constructor(props: IFormProps) {
    super(props);

    this.state = {
      errors: { FORM: true },
      values: props.defaultValues
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.validators = validators;
  }

  public arrayValidationFor(field: string, validation: validatorType[]): boolean {
    return validation.reduce((validTotal: boolean, validatorName: validatorType) => {
      const validValue =
        validatorName === 'canvasNotEmpty'
          ? this.validators[validatorName](getValue(
              field.split('.'),
              this.state.values
            ) as ImageData)
          : this.validators[validatorName](String(getValue(field.split('.'), this.state.values)));
      return validTotal && validValue;
    }, true);
  }

  public singleValidationFor(field: string, validation: validatorType): boolean {
    const validValue =
      validation === 'canvasNotEmpty'
        ? this.validators[validation](getValue(field.split('.'), this.state.values) as ImageData)
        : this.validators[validation](String(getValue(field.split('.'), this.state.values)));
    return validValue;
  }

  public isValid(field: string): boolean {
    const validation = this.props.validations[field];
    if (typeof validation === 'function') {
      return validation(this.state.values, this.validators);
    } else if (Array.isArray(validation)) {
      return this.arrayValidationFor(field, validation);
    }
    return this.singleValidationFor(field, validation);
  }

  public validate(): void {
    const errors: { [key: string]: boolean } = {};

    Object.keys(this.props.validations).map(field => {
      errors[field] = !this.isValid(field);
    });
    errors.FORM = Object.keys(errors).reduce((value, field) => {
      return value || errors[field];
    }, false);

    this.setState({ errors });
  }

  public handleSubmit(event: any): any {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (!this.state.errors.FORM) {
      return this.props.onSubmit(this.state.values);
    }
  }

  public componentWillMount(): void {
    this.validate();
  }

  public render(): JSX.Element {
    const formActions = {
      setValue: this.setValue,
      toggleValue: this.toggleValue
    };

    return (
      <ValuesContext.Provider value={this.state.values}>
        <ErrorsContext.Provider value={this.state.errors}>
          <SetValueContext.Provider value={formActions}>
            <form onSubmit={this.handleSubmit} action="">
              {this.props.children}
            </form>
          </SetValueContext.Provider>
        </ErrorsContext.Provider>
      </ValuesContext.Provider>
    );
  }

  public setValue = (name: string, canvasData?: any) => (event: any): void => {
    let value;
    if (event.target) {
      if (canvasData) {
        const canvas = canvasData.getCanvas();
        value = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height);
      } else {
        value = event.target.value;
      }
    } else if (event instanceof moment) {
      value = (event as any).format(DATE_RFC2822);
    } else {
      value = event;
    }

    const values = this.state.values;
    const path = name.split('.');

    this.setState({ values: mergeValue(path, values, value) }, this.validate);
  };

  public toggleValue = (name: string) => (): void => {
    const value = !this.state.values[name];

    const values = this.state.values;
    const path = name.split('.');
    this.setState(
      {
        values: mergeValue(path, values, value)
      },
      this.validate
    );
  };
}

const FormConsumer = ({ children }: any) => {
  return (
    <ErrorsContext.Consumer>
      {errors => (
        <ValuesContext.Consumer>
          {values => (
            <SetValueContext.Consumer>
              {formActions => children({ errors, values, formActions })}
            </SetValueContext.Consumer>
          )}
        </ValuesContext.Consumer>
      )}
    </ErrorsContext.Consumer>
  );
};

export { FormProvider, FormConsumer };
