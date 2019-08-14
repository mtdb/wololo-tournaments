import React, { Fragment } from 'react';
import { IPlayer } from '../../store/games/store';

interface IProps {
  players: IPlayer[];
}

export const VsTitle = ({ players }: IProps) => (
  <Fragment>
    {players
      .map((player, index) => (
        <span key={`p${index + 1}`} className={`p${index + 1}`}>
          {player.player.name}
        </span>
      ))
      .reduce((accu: any, elem) => {
        return accu === null ? [elem] : [...accu, <span key={`vs${elem.key}`}>vs</span>, elem];
      }, null)}
  </Fragment>
);
