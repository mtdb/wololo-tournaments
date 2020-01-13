import { Link } from '@reach/router';
import 'flag-icon-css/css/flag-icon.css';
import moment from 'moment';
import React, { useEffect } from 'react';
import { routes } from '../../App';
import NoFlag from '../../assets/images/NoFlag.png';
import { withContext } from '../../contrib/context';
import { IActions } from '../../store';
import { IGamesStore } from '../../store/games/store';
import { ITournamentsStore } from '../../store/tournaments/store';
import './Games.scss';

export const GamesComponent = ({
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
      void listUpcoming();
    } else {
      void listGames(tournament);
    }
  }, [listGames, listUpcoming, tournament]);
  const games = tournament ? tournamentGames[tournament] : upcomingGames;
  return (
    <div id="Games">
      {games && games.map((game, index) => <Game game={game} key={`game-${index}`} />)}
      {(!games || !games.length) && <div>loading...</div>}
    </div>
  );
};

const Game = ({ game }: any) => {
  const isReady = game.players && game.players.length === 2;
  const p0Style =
    !isReady || !game.players[0].player.country ? { backgroundImage: `url(${NoFlag})` } : {};
  const p1Style =
    !isReady || !game.players[1].player.country ? { backgroundImage: `url(${NoFlag})` } : {};

  return (
    <div className="game-summary" key={game.slug}>
      <div
        className={`flag-icon flag-icon-${isReady &&
          game.players[0].player.country.toLowerCase()} left`}
        style={p0Style}
      />
      <div className="inner-content">
        <div className="header">
          <Link to={routes.tournamentGames(game.tournament.slug)}>{game.tournament.name}</Link>
        </div>
        <Link to={routes.game(game.slug)}>
          {isReady ? (
            <div className="players">
              <div className="player-name p1">{game.players[0].player.name}</div>
              <div className="vs">vs</div>
              <div className="player-name p2">{game.players[1].player.name}</div>
            </div>
          ) : (
            <div className="players">
              <div className="player-name p1">???</div>
              <div className="vs">vs</div>
              <div className="player-name p2">???</div>
            </div>
          )}
        </Link>
        <div className="footer">{moment(game.date).calendar()}</div>
      </div>
      <div
        className={`flag-icon flag-icon-${isReady &&
          game.players[1].player.country.toLowerCase()} right`}
        style={p1Style}
      />
    </div>
  );
};

const Games = withContext(GamesComponent, 'actions', 'games', 'tournaments');

export { Games };
