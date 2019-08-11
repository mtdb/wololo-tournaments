import React from 'react';

import './CivIcon.scss';

export type CivilizationType =
  | 'aztecs'
  | 'berbers'
  | 'britons'
  | 'burmese'
  | 'byzantines'
  | 'celts'
  | 'chinese'
  | 'ethiopians'
  | 'franks'
  | 'goths'
  | 'huns'
  | 'incas'
  | 'indians'
  | 'italians'
  | 'japanese'
  | 'khmer'
  | 'koreans'
  | 'magyars'
  | 'malay'
  | 'malians'
  | 'mayans'
  | 'mongols'
  | 'persians'
  | 'portuguese'
  | 'random'
  | 'saracens'
  | 'slavs'
  | 'spanish'
  | 'teutons'
  | 'turks'
  | 'vietnamese'
  | 'vikings';

interface IProps {
  type?: CivilizationType;
}

export const CivIcon = ({ type }: IProps) => (
  <div
    className="civ-icon"
    style={{ backgroundImage: `url(/assets/civs/${type || 'random'}.png)` }}
  />
);
