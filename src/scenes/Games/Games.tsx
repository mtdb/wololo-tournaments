import React from "react";
import { navigate } from "@reach/router";
import "./Games.scss";
import { routes } from "../../App";

const Games = () => (
  <div id="Games">
    {[1, 2, 3].map((k) => (
      <div
        className="game-summary" key={`game-${k}`}
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
