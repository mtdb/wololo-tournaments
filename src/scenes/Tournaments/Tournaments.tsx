import React from "react";
import { Link } from "@reach/router";
import { routes } from "../../App";
import "./Tournaments.scss";

const tournaments = [
  {
    name: 'King of the Desert 2',
    web: 'https://challonge.com/kotdaoc',
    slug: 'king-of-the-desert',
    prize: 15000,
    logo: '/assets/img/kotd2.jpg',
    banner: ''
  },
  {
    name: 'T90`s Hidden Cup 2',
    web: '',
    slug: 't90',
    prize: 10800,
    logo: '/assets/img/hidden.png',
    banner: '/assets/img/hidden.jpg'
  },
  {
    name: 'Mangroove Shallows Cup',
    web: '',
    slug: 'msc',
    prize: 9800,
    logo: '/assets/img/msc.jpg',
    banner: '/assets/img/msc.jpg'
  },
  {
    name: 'Mario Ovalle`s Mancos Cup',
    web: '',
    slug: 'mario',
    prize: 17000,
    logo: '/assets/img/mario.jpg',
    banner: '/assets/img/mario.jpg'
  },
]

const Tournaments = () => (
  <div id="Tournaments">
    {tournaments.map((tournament) => (
      <div className="tournament-summary" key={tournament.slug}>
        <div className="logo" style={{backgroundImage: `url(${tournament.logo})`, backgroundColor: 'green'}}></div>
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
