import React from "react";
import { Link } from "@reach/router";
import Navbar from "../../components/Navbar";
import { routes } from "../../App";
import "./Leaderboard.scss";

const slug = "king-of-the-desert";
const web = "https://challonge.com/kotdaoc";

const Leaderboard = () => (
  <div id="Leaderboard">
    <Navbar />
    <div className="row">
      <div>User</div>
      <div>Collected Gold</div>
    </div>
    {[1, 2, 3].map(() => (
      <div className="row">
        <div>Username</div>
        <div>100,123,345</div>
      </div>
    ))}
  </div>
);

export { Leaderboard };
