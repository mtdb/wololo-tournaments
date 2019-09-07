import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

interface IAnimatedRouter {
  children: React.ReactNode;
  className?: string;
  location: any;
}

const InnerRouter = ({ children, location, className }: IAnimatedRouter) => (
  <TransitionGroup className={`transition-group ${className}`}>
    <CSSTransition key={location.key} classNames="fade" timeout={1000}>
      {children}
    </CSSTransition>
  </TransitionGroup>
);

export { InnerRouter };
