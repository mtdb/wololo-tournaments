import Button from '@material-ui/core/Button';
import { navigate, RouteComponentProps } from '@reach/router';
import React, { Component } from 'react';
import logo from '../../assets/logo.png';
import { FormConsumer, FormProvider, IFormAttributes } from '../../components/Forms';
import Input from '../../components/Input';
import './Login.scss';

interface IProps extends RouteComponentProps {
  actions: any;
}

class Login extends Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }

  public onSubmit = async () => {
    // const { actions, location } = this.props;
    // const response = await actions.auth.login(data);

    // if (response.errors) {
    // TODO: Manage notifications
    // await actions.notifications.push(({
    //   status: 'unread',
    //   text: response.errors.login.msg,
    //   type: 'error'
    // } as unknown) as IMessageNotification);
    // } else {
    // if (response.auth && response.auth.isAuthenticated) {
    navigate(`/tournaments`);
    // }
    // }
  };
  public render(): JSX.Element {
    return (
      <FormProvider
        defaultValues={{ email: '', password: '' }}
        onSubmit={this.onSubmit}
        validations={{
          email: 'required',
          password: 'required'
        }}
      >
        <FormConsumer>
          {({ formActions: { setValue }, errors }: IFormAttributes) => (
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
                  onChange={setValue('email')}
                  hasError={errors.email}
                  errorMessage="You must provide a valid email"
                  fullWidth={true}
                />

                <Input
                  label="PASSWORD"
                  id="password"
                  type="password"
                  onChange={setValue('password')}
                  hasError={errors.password}
                  errorMessage="Must include at least 1 upper case letter, 1 lower case letter, and 1 special character"
                  fullWidth={true}
                />

                <Button
                  id="login"
                  variant="contained"
                  color="primary"
                  disabled={errors.FORM}
                  type="submit"
                  className="button button-shadow"
                >
                  LOGIN
                </Button>
              </div>
            </div>
          )}
        </FormConsumer>
      </FormProvider>
    );
  }
}

export { Login };
