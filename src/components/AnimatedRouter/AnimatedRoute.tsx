import { RouteComponentProps } from '@reach/router';
import React from 'react';

import { IActions } from '../../store';

export interface IAnimatedRoute extends RouteComponentProps {
  component: any;
  actions?: IActions;
}

const AnimatedRoute = ({ component, ...props }: IAnimatedRoute) => {
  const Component = component;
  return (
    <div className="route">
      <Component {...props} />
    </div>
  );
};

export { AnimatedRoute };
