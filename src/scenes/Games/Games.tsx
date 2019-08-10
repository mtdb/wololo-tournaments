import { navigate } from '@reach/router';
import 'flag-icon-css/css/flag-icon.css';
import React, { useEffect } from 'react';
import { routes } from '../../App';
import { withContext } from '../../contrib/context';
import { IActions } from '../../store';
import { IGame } from '../../store/games/store';

import './Games.scss';

const GamesComponent = ({
  actions: {
    games: { listUpcoming }
  },
  games: { upcoming }
}: {
  actions: IActions;
  games: { upcoming: IGame[] };
}) => {
  useEffect(() => {
    listUpcoming();
  }, [listUpcoming]);
  return (
    <div id="Games">
      {upcoming &&
        upcoming.map(game => (
          <div
            className="game-summary"
            key={game.id}
            onClick={() => {
              navigate(routes.game(game.tournament, String(game.id)));
            }}
          >
            <div className="header">{game.tournament}</div>
            {game.players && game.players.length === 2 && (
              <div className="content">
                <div
                  className={`flag-icon flag-icon-${game.players[0].player.country.toLowerCase()} left`}
                />
                <div className="inner-content">
                  <div className="players">
                    <div className="player-name p1">{game.players[0].player.name}</div>
                    <div className="vs">vs</div>
                    <div className="player-name p2">{game.players[1].player.name}</div>
                  </div>
                </div>
                <div
                  className={`flag-icon flag-icon-${game.players[1].player.country.toLowerCase()} right`}
                />
              </div>
            )}
            <div className="footer">{game.date}</div>
          </div>
        ))}
    </div>
  );
};

const Games = withContext(GamesComponent, 'games', 'actions');

export { Games };
