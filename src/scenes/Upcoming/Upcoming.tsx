import React from "react";
import Navbar from "../../components/Navbar";
import "./Upcoming.scss";

const Upcoming = () => (
  <div id="Upcoming">
    <Navbar />
    {[1, 2, 3].map(() => (
      <div className="game-summary">
        <div>Nicov vs Tatok</div>
        <div>King of the desert 3</div>
        <div>20/07/2019 12:00</div>
      </div>
    ))}
  </div>
);

export { Upcoming };
