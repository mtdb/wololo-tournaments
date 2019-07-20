import { Location, Router } from "@reach/router";
import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const AnimatedRouter = ({ children }: { children: JSX.Element[] }) => (
  <Location>
    {({ location }) => (
      <TransitionGroup className="transition-group">
        <CSSTransition key={location.key} classNames="fade" timeout={500}>
          {/* the only difference between a router animation and
              any other animation is that you have to pass the
              location to the router so the old screen renders
              the "old location" */}
          <Router location={location} className="router">
            {children}
          </Router>
        </CSSTransition>
      </TransitionGroup>
    )}
  </Location>
);

export { AnimatedRouter };
