import React from "react";
import { navigate } from "@reach/router";
import Navbar from "../../components/Navbar";
import "./Games.scss";
import { routes } from "../../App";

const Games = () => (
  <div id="Games">
    <Navbar />
    {[1, 2, 3].map(() => (
      <div
        className="game-summary"
        onClick={() => {
          navigate(routes.game("king-of-the-desert", "nicov"));
        }}
      >
        <div>Nicov vs Tatok</div>
        <div>King of the desert 3</div>
        <div>20/07/2019 12:00</div>
      </div>
    ))}
  </div>
);

export { Games };
