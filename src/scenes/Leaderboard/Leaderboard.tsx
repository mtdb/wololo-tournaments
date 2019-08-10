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
  useEffect(() => {
    getLeaderboard(name);
  }, [getLeaderboard, name]);
  return (
    <div id="Leaderboard">
      <div className="table">
        <div className="row header">
          <div>User</div>
          <div>Collected Gold</div>
        </div>
        {leaderboards[name] &&
          leaderboards[name].map(player => (
            <div className="row" key={player.username}>
              <div>{player.username}</div>
              <div>{player.gold}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

const Leaderboard = withContext(LeaderboardComponent, 'leaderboards', 'actions');

export { Leaderboard };
