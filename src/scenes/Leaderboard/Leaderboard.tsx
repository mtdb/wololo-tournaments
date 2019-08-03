import React from 'react';
// import { Link } from "@reach/router";
// import { routes } from "../../App";
import './Leaderboard.scss';

const Leaderboard = () => (
  <div id="Leaderboard">
    <div className="row">
      <div>User</div>
      <div>Collected Gold</div>
    </div>
    {[1, 2, 3].map(k => (
      <div className="row" key={`l-${k}`}>
        <div>Username</div>
        <div>100,123,345</div>
      </div>
    ))}
  </div>
);

export { Leaderboard };
