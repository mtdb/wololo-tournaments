import { Link } from '@reach/router';
import React from 'react';
import { routes } from '../../App';
import './Tournaments.scss';

const tournaments = [
  {
    banner: '',
    logo: '/assets/img/kotd2.jpg',
    name: 'King of the Desert 2',
    prize: 15000,
    slug: 'king-of-the-desert',
    web: 'https://challonge.com/kotdaoc'
  },
  {
    banner: '/assets/img/hidden.jpg',
    logo: '/assets/img/hidden.png',
    name: 'T90`s Hidden Cup 2',
    prize: 10800,
    slug: 't90',
    web: ''
  },
  {
    banner: '/assets/img/msc.jpg',
    logo: '/assets/img/msc.jpg',
    name: 'Mangroove Shallows Cup',
    prize: 9800,
    slug: 'msc',
    web: ''
  },
  {
    banner: '/assets/img/mario.jpg',
    logo: '/assets/img/mario.jpg',
    name: 'Mario Ovalle`s Mancos Cup',
    prize: 17000,
    slug: 'mario',
    web: ''
  }
];

const Tournaments = () => (
  <div id="Tournaments">
    {tournaments.map(tournament => (
      <div className="tournament-summary" key={tournament.slug}>
        <div
          className="logo"
          style={{ backgroundImage: `url(${tournament.logo})`, backgroundColor: 'green' }}
        />
        <div className="content">
          <div className="title">{tournament.name}</div>
          <div>${tournament.prize}</div>
          <ul>
            <li>
              <a href={tournament.web} target="blank">
                Web
              </a>
            </li>
            <li>
              <Link to={routes.tournamentsDetails(tournament.slug)}>Games</Link>
            </li>
            <li>
              <Link to={routes.leaderboardGroup(tournament.slug)}>Leaderboard</Link>
            </li>
          </ul>
        </div>
      </div>
    ))}
  </div>
);

export { Tournaments };
