import React from 'react';
import { Consumer, IStore } from '../store';

import moment from 'moment';

import { HANDICAP_METRIC, IAdminEvent, IEventEnrollment } from '../store/admin/events/store';

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

export const capitalizeFirstLetter = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const groupBy = (array: any[], prop: string) =>
  array.reduce((groups, item) => {
    const val = item[prop];
    groups[val] = groups[val] || [];
    groups[val].push(item);
    return groups;
  }, {});

export const dateFormat = 'YYYY-MM-DDTHH:mm:ssZ';

export const sortEventsByDate = (array: IAdminEvent[], increase: 'asc' | 'dec' = 'asc') =>
  array.slice().sort((a: IAdminEvent, b: IAdminEvent) => {
    if (a.start > b.start) {
      return increase === 'asc' ? 1 : -1;
    }
    if (a.start < b.start) {
      return increase === 'asc' ? -1 : 1;
    }

    return 0;
  });

export const sortBy = (
  array: any[],
  increase: 'asc' | 'dec' = 'asc',
  attribute: string,
  ignoreNull?: boolean
) =>
  array.slice().sort((a: any, b: any) => {
    if (ignoreNull) {
      if (
        (a[attribute] === undefined || a[attribute] === null) &&
        (b[attribute] === undefined || b[attribute] === null)
      ) {
        return 0;
      }
      if (a[attribute] === undefined || a[attribute] === null) {
        return increase === 'asc' ? 1 : -1;
      }
      if (b[attribute] === undefined || b[attribute] === null) {
        return increase === 'asc' ? -1 : 1;
      }
    }
    if (a[attribute] > b[attribute]) {
      return increase === 'asc' ? 1 : -1;
    }
    if (a[attribute] < b[attribute]) {
      return increase === 'asc' ? -1 : 1;
    }

    return 0;
  });

export const getEventsBySeasons = (events: IAdminEvent[]): any => {
  const eventsSortedByDate = sortEventsByDate(events);

  const eventsWithSeasonYear = eventsSortedByDate
    .filter((e: IAdminEvent) => !!e.season)
    .map((event: IAdminEvent) => ({
      ...event,
      seasonYear: event.season.year
    }));

  return groupBy(eventsWithSeasonYear, 'seasonYear');
};

export const getEventsByMonths = (events: IAdminEvent[]): any => {
  const eventsWithMonth = sortEventsByDate(events, 'dec').map((event: IAdminEvent) => ({
    ...event,
    month: moment(event.start).format('MMMM')
  }));

  return groupBy(eventsWithMonth, 'month');
};

export const DATE_RFC2822 = 'ddd, DD MMM YYYY HH:mm:ss ZZ';

export const genders: { [initial: string]: string } = {
  F: 'Women',
  M: 'Men',
  f: 'Women',
  m: 'Men'
};

export const holesOptions = [
  { value: 1, label: '18 holes' },
  { value: 2, label: '9 holes front' },
  { value: 3, label: '9 holes back' }
];

export const getHandicap = (item: IEventEnrollment, metric: HANDICAP_METRIC) => {
  if (!isNaN(Number(item.handicap)) && item.handicap !== null) {
    return item.handicap;
  } else if (metric - 1 === HANDICAP_METRIC.CURRENT_GHIN) {
    return item.user.profile.handicapCurrent;
  } else if (metric - 1 === HANDICAP_METRIC.LOWEST_GHIN) {
    return item.user.profile.handicapLow;
  } else {
    return item.handicap || 0;
  }
};

export const toHandicap = (n: string | number | undefined) =>
  n ? (Number(n) < 0 ? `+${Number(n) * -1}` : String(Number(n))) : 'TBD';

export const lazyEqual = (obj1: any, obj2: any, field?: string): boolean =>
  field
    ? JSON.stringify(obj1[field]) === JSON.stringify(obj2[field])
    : JSON.stringify(obj1) === JSON.stringify(obj2);

export const selectorTheme = (theme: any) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary: '#f14b49',
    primary25: '#dddddd'
  }
});

export const getPlayerProfileURI = (location: any, clubId: number, playerId: number) => {
  const re = /^\/staff/;
  const isStaff = re.test(String(location.pathname).toLowerCase());

  return isStaff ? `/staff/club/${clubId}/player-info/${playerId}` : `/profile/${playerId}`;
};

export const LIMIT_POINTS = 999999;

export const isMobileDevice = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  const isUnsupportedBrowser = /android|webos|iphone|ipad|ipod|blackberry|windows phone/i.test(
    userAgent
  );
  if (isUnsupportedBrowser) {
    return true;
  } else {
    return false;
  }
};
