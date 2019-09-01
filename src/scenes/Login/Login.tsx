import Button from '@material-ui/core/Button';
import { navigate, RouteComponentProps } from '@reach/router';
import React, { Component } from 'react';
import logo from '../../assets/logo.png';
import { FormConsumer, FormProvider, IFormAttributes } from '../../components/Forms';
import Input from '../../components/Input';
import { withContext } from '../../contrib/context';
import { IActions } from '../../store';
import './Login.scss';

interface IProps extends RouteComponentProps {
  actions: IActions;
}

class LoginComponent extends Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }

  public onSubmit = async ({ username, password }: { username: string; password: string }) => {
    const {
      actions: {
        user: { login }
      }
    } = this.props;
    login(username, password);
    if (false) navigate(`/tournaments`);
  };

  public render(): JSX.Element {
    return (
      <FormProvider
        defaultValues={{ username: '', password: '' }}
        onSubmit={this.onSubmit}
        validations={{
          username: 'required',
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
                  label="USERNAME"
                  id="username"
                  type="text"
                  onChange={setValue('username')}
                  hasError={errors.username}
                  errorMessage="You must provide a valid username"
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

const Login = withContext(LoginComponent, 'actions');

export { Login };
