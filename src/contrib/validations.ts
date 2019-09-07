import moment from 'moment';

const email = (input: string): boolean => {
  // tslint:disable-next-line
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line
  return re.test(String(input).toLowerCase());
};

const emailsSeparatedByCommas = (input: string): boolean => {
  const re = /^(\s?[^\s,]+@[^\s,]+\.[^\s,]+\s?,)*(\s?[^\s,]+@[^\s,]+\.[^\s,]+\s*)$/g;
  return re.test(String(input).toLowerCase());
};

const integer = (input: string): boolean => {
  const re = /^[0-9]*$/;
  return re.test(String(input).toLowerCase());
};

const positive = (input: string): boolean => {
  return Number(input) > 0;
};

const currency = (input: string): boolean => {
  // tslint:disable-next-line
  const re = /^\d+(\.\d{1,2})?$/;
  return re.test(String(input).toLowerCase());
};

const required = (input: string): boolean => Boolean(input);

const password = (input: string): boolean => {
  return input.length > 7;
};

const date = (input: any): boolean => Boolean(Date.parse(input)) && moment(input).isValid();

const isTrue = (input: any): boolean => input === 'true';

const canvasNotEmpty = (imgData: ImageData): boolean => {
  return imgData.data.some(channel => channel !== 0);
};

export interface IValidators {
  canvasNotEmpty: (imgData: ImageData) => boolean;
  currency: (input: string) => boolean;
  date: (input: string) => boolean;
  email: (input: string) => boolean;
  emailsSeparatedByCommas: (input: string) => boolean;
  integer: (input: string) => boolean;
  isTrue: (input: string) => boolean;
  password: (input: string) => boolean;
  positive: (input: string) => boolean;
  required: (input: string) => boolean;
}

const validators: IValidators = {
  canvasNotEmpty,
  currency,
  date,
  email,
  emailsSeparatedByCommas,
  integer,
  isTrue,
  password,
  positive,
  required
};

export type validatorType =
  | 'canvasNotEmpty'
  | 'currency'
  | 'date'
  | 'email'
  | 'emailsSeparatedByCommas'
  | 'integer'
  | 'isTrue'
  | 'password'
  | 'positive'
  | 'required';
export default validators;
export { validators };
