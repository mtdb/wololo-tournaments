import Button from '@material-ui/core/Button';
import { navigate } from '@reach/router';
import React from 'react';

const onSubmit = (): void => {
  navigate(`/tournaments`);
};

const CreationComplete = () => (
  <div className="create-account form-account form">
    <h1 className="title">Success!</h1>
    <p className="help-text complete-text">Your club account has been succesfully created.</p>
    <div className="half-bot">
      <Button className="form-button" color="primary" onClick={onSubmit} variant="contained">
        Go to Tournaments
      </Button>
    </div>
  </div>
);

export { CreationComplete };
