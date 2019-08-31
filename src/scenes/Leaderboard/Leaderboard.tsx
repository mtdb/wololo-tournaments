import React, { useEffect } from 'react';
import { withContext } from '../../contrib/context';
import { IActions } from '../../store';
import { ILeaderboardsStore } from '../../store/leaderboards/store';
import './Leaderboard.scss';

const LeaderboardComponent = ({
  actions: {
    leaderboards: { get: getLeaderboard }
  },
  leaderboards,
  name
}: {
  actions: IActions;
  leaderboards: ILeaderboardsStore;
  name: string;
}) => {
  useEffect(
    () => {
      getLeaderboard(name);
    },
    [getLeaderboard, name]
  );
  return (
    <div id="Leaderboard">
      <div className="table paper">
        <div className="row header">
          <div className="number">#</div>
          <div className="name">User</div>
          <div className="gold">Collected Gold</div>
        </div>
        {leaderboards[name] &&
          leaderboards[name].map((player, index) => (
            <div className="row" key={player.username}>
              <div className="number">{index + 1}</div>
              <div className="name">{player.username}</div>
              <div className="gold">{player.gold}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

const Leaderboard = withContext(LeaderboardComponent, 'leaderboards', 'actions');

export { Leaderboard };
