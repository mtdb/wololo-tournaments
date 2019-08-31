import React from 'react';
import { Consumer, IStore } from '../store';

export const isEmpty = (obj: any) => Object.keys(obj).length === 0 && obj.constructor === Object;

export const withContext = (
  Comp: React.ComponentClass<any, any> | React.SFC<any>,
  ...storeFields: string[]
) => (props: any) => (
  <Consumer>{store => <Comp {...props} {...storeSelector(store, storeFields)} />}</Consumer>
);

export const parseField = (store: IStore, rawField: string) => {
  const parts = rawField.split(':');
  if (parts.length > 1) {
    const [namespace, field] = parts;
    return { [field]: (store as any)[namespace][field] };
  } else {
    return { [rawField]: (store as any)[rawField] };
  }
};

const storeSelector = (store: IStore, fields: string[]): any => {
  const out: any = fields.reduce(
    (newStore, field: string) => ({
      ...newStore,
      ...parseField(store, field)
    }),
    {}
  );

  return out;
};

export const dateFormat = 'YYYY-MM-DDTHH:mm:ssZ';

export const DATE_RFC2822 = 'ddd, DD MMM YYYY HH:mm:ss ZZ';
