import { Link } from '@reach/router';
import React, { useEffect } from 'react';
import { routes } from '../../App';
import { withContext } from '../../contrib/context';
import { IActions } from '../../store';
import { ITournamentsStore } from '../../store/tournaments/store';
import './Tournaments.scss';

const TournamentsComponent = ({
  actions: {
    tournaments: { list: listTournaments }
  },
  tournaments: { all: tournamentList }
}: {
  actions: IActions;
  tournaments: ITournamentsStore;
}) => {
  useEffect(() => {
    listTournaments();
  }, [listTournaments]);
  return (
    <div id="Tournaments">
      {tournamentList &&
        tournamentList.map(tournament => (
          <div className="tournament-summary" key={tournament.slug}>
            <div
              className="icon"
              style={{ backgroundImage: `url(${tournament.icon})`, backgroundColor: 'green' }}
            />
            <div className="content">
              <div className="title">{tournament.name}</div>
              <div>{tournament.prize}</div>
              <ul>
                <li>
                  <a href={tournament.web} target="blank">
                    Web
                  </a>
                </li>
                <li>
                  <Link to={routes.tournamentGames(tournament.slug)}>Games</Link>
                </li>
                <li>
                  <Link to={routes.leaderboard(tournament.slug)}>Leaderboard</Link>
                </li>
              </ul>
            </div>
          </div>
        ))}
    </div>
  );
};

const Tournaments = withContext(TournamentsComponent, 'tournaments', 'actions');

export { Tournaments };
