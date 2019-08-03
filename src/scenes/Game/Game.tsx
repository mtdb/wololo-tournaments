import { Link } from '@reach/router';
import React from 'react';
import { routes } from '../../App';
import Navbar from '../../components/Navbar';
import './Game.scss';

const Game = () => (
  <div id="Game">
    <Navbar />
    <header>
      <h2>King of the Desert 3</h2>
      <span>Nicov vs Tatoh</span>
      <i>best of 5</i>
    </header>
    <ul>
      <li>
        <Link to={routes.game()}>Matches</Link>
      </li>
      <li>
        <Link to={routes.gamePredictions()}>Predictions</Link>
      </li>
    </ul>
    {[1, 2, 3].map(i => (
      <div className="match" key={`game-${i}`}>
        Match {i}
      </div>
    ))}
  </div>
);

export { Game };
