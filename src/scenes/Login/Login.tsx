import Button from '@material-ui/core/Button';
import React from 'react';
import logo from '../../assets/logo.png';
import Input from '../../components/Input';
import './Login.scss';

/*interface IProps extends RouteComponentProps {
  actions: {
    auth: IAuthActions;
    adminClubs: IAdminClubActions;
    invitation: IInvitationActions;
    notifications: INotificationsActions;
  };
  invitationId?: string;
}*/

const Login = () => {
  return (
    <div className="login form wrapper paper">
      <div>
        <div className="logo-wrapper">
          <img src={logo} className="logo" alt="logo" />
        </div>

        <h1>Welcome</h1>

        <Input
          label="EMAIL"
          id="email"
          type="email"
          /*onChange={setValue('email')}
          hasError={errors.email}*/
          errorMessage="You must provide a valid email"
          fullWidth={true}
        />

        <Input
          label="PASSWORD"
          id="password"
          type="password"
          /* onChange={setValue('password')}
          hasError={errors.password}*/
          errorMessage="Must include at least 1 upper case letter, 1 lower case letter, and 1 special character"
          fullWidth={true}
        />

        <Button
          id="login"
          variant="contained"
          color="primary"
          /* disabled={errors.FORM}*/
          type="submit"
          className="button button-shadow"
        >
          LOGIN
        </Button>
      </div>
    </div>
  );
};

export { Login };
