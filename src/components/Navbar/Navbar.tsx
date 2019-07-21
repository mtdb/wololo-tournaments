import { Link } from "@reach/router";
import React from "react";
import { routes } from "../../App";
import "./Navbar.scss";

const Navbar = () => (
  <div id="Navbar">
    <ul>
      <li>
        <Link to={routes.upcoming()}>Upcoming</Link>
      </li>
      <li>
        <Link to={routes.tournaments()}>Tournaments</Link>
      </li>
      <li>
        <Link to={routes.leaderboard()}>Leaderboard</Link>
      </li>
    </ul>
  </div>
);

export { Navbar };
