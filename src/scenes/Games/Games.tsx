import { Link } from '@reach/router';
import 'flag-icon-css/css/flag-icon.css';
import moment from 'moment';
import React, { useEffect } from 'react';
import { routes } from '../../App';
import { withContext } from '../../contrib/context';
import { IActions } from '../../store';
import { IGame } from '../../store/games/store';

import './Games.scss';

const GamesComponent = ({
  actions: {
    games: { listUpcoming, list }
  },
  games,
  slug: tournament
}: {
  actions: IActions;
  games: { [key: string]: IGame[] };
  slug: string;
}) => {
  useEffect(() => {
    if (!tournament) {
      listUpcoming();
    } else {
      list(tournament);
    }
  }, [list, listUpcoming, tournament]);
  const filter = tournament || 'upcoming';
  return (
    <div id="Games">
      {games[filter] &&
        games[filter].map(game => (
          <div className="game-summary" key={game.slug}>
            <div className="header">
              <Link to={routes.tournamentGames(game.tournament.slug)}>{game.tournament.name}</Link>
            </div>
            <Link to={routes.game(game.slug)}>
              {(game.players && game.players.length) === 2 ? (
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
              ) : (
                <div className="content">
                  <div className={`flag-icon left`} />
                  <div className="inner-content">
                    <div className="players">
                      <div className="player-name p1">???</div>
                      <div className="vs">vs</div>
                      <div className="player-name p2">???</div>
                    </div>
                  </div>
                  <div className={`flag-icon right`} />
                </div>
              )}
            </Link>
            <div className="footer">{moment(game.date).calendar()}</div>
          </div>
        ))}
      {(!games[filter] || !games[filter].length) && <div>loading...</div>}
    </div>
  );
};

const Games = withContext(GamesComponent, 'games', 'actions');

export { Games };
