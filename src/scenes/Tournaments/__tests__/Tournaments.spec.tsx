import React from "react";
import ReactDOM from "react-dom";
import { Tournaments } from "../Tournaments";

describe("Tournaments Scene", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Tournaments />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
