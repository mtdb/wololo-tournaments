import React from "react";
import { Link } from "@reach/router";
import Navbar from "../../components/Navbar";
import { routes } from "../../App";
import "./Tournaments.scss";

const slug = "king-of-the-desert";
const web = "https://challonge.com/kotdaoc";

const Tournaments = () => (
  <div id="Tournaments">
    <Navbar />
    {[1, 2, 3].map(() => (
      <div className="tournament-summary">
        <div>King of the desert 3</div>
        <div>$10,000</div>
        <ul>
          <li>
            <a href={web} target="blank">
              Web
            </a>
          </li>
          <li>
            <Link to={routes.tournamentsDetails(slug)}>Games</Link>
          </li>
          <li>
            <Link to={routes.leaderboardGroup(slug)}>Leaderboard</Link>
          </li>
        </ul>
      </div>
    ))}
  </div>
);

export { Tournaments };
