import { Link } from '@reach/router';
import React, { useEffect } from 'react';
import { routes } from '../../App';
import trophy from '../../assets/images/trophy.png';
import { withContext } from '../../contrib/context';
import { IActions } from '../../store';
import { ITournamentsStore } from '../../store/tournaments/store';
import './Tournaments.scss';

export const TournamentsComponent = ({
  actions: {
    tournaments: { list: listTournaments }
  },
  tournaments: { all: tournamentList }
}: {
  actions: IActions;
  tournaments: ITournamentsStore;
}) => {
  useEffect(() => {
    void listTournaments();
  }, [listTournaments]);
  return (
    <div id="Tournaments">
      {tournamentList &&
        tournamentList.map(tournament => (
          <div className="tournament-summary" key={tournament.slug}>
            <div
              className="icon"
              style={{ backgroundImage: `url(${tournament.icon || trophy})` }}
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
                  <Link to={routes.leaderboard(tournament.slug)}>Leaderboard</Link>
                </li>
                <li>
                  <Link to={routes.tournamentGames(tournament.slug)}>Games</Link>
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
