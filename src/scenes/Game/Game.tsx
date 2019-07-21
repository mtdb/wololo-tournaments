import React from "react";
import { Link } from "@reach/router";
import Navbar from "../../components/Navbar";
import { routes } from "../../App";
import "./Game.scss";

const slug = "king-of-the-desert";
const web = "https://challonge.com/kotdaoc";

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
      <div className="match">Match {i}</div>
    ))}
  </div>
);

export { Game };
