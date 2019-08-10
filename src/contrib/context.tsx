import React from 'react';
import { Consumer, IStore } from '../store';

export const isEmpty = (obj: any) => Object.keys(obj).length === 0 && obj.constructor === Object;

export const withContext = (
  Comp: React.ComponentClass<any, any> | React.SFC<any>,
  ...storeFields: string[]
) => (props: any) => (
  <Consumer>{store => <Comp {...props} {...storeSelector(store, storeFields)} />}</Consumer>
);

const storeSelector = (store: IStore, fields: string[]): any => {
  const out: any = fields.reduce(
    (newStore, field: string) => ({
      ...newStore,
      [field]: (store as any)[field]
    }),
    {}
  );

  return out;
};
