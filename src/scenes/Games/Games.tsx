import { Link } from '@reach/router';
import 'flag-icon-css/css/flag-icon.css';
import moment from 'moment';
import React, { useEffect } from 'react';
import { routes } from '../../App';
import { withContext } from '../../contrib/context';
import { IActions } from '../../store';
import { IGamesStore } from '../../store/games/store';
import { ITournamentsStore } from '../../store/tournaments/store';

import './Games.scss';

const GamesComponent = ({
  actions: {
    games: { listUpcoming },
    tournaments: { listGames }
  },
  games: { upcoming: upcomingGames },
  tournaments: { games: tournamentGames },
  slug: tournament
}: {
  actions: IActions;
  games: IGamesStore;
  tournaments: ITournamentsStore;
  slug: string;
}) => {
  useEffect(() => {
    if (!tournament) {
      listUpcoming();
    } else {
      listGames(tournament);
    }
  }, [listGames, listUpcoming, tournament]);
  const games = tournament ? tournamentGames[tournament] : upcomingGames;
  return (
    <div id="Games">
      {games &&
        games.map(game => (
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
      {(!games || !games.length) && <div>loading...</div>}
    </div>
  );
};

const Games = withContext(GamesComponent, 'actions', 'games', 'tournaments');

export { Games };
