import Button from '@material-ui/core/Button';
import { RouteComponentProps } from '@reach/router';
import React, { Component } from 'react';
import { withContext } from '../../contrib/utils';
import { FormConsumer, FormProvider, IFormAttributes } from '../Forms';
import Input from '../Input';
// import { IAuthActions } from '../../../../store/auth/actions';
// import { IAuthStore } from '../../../../store/auth/store';
// import { INotificationsActions } from '../../../../store/notification/actions';
// import { IMessageNotification } from '../../../../store/notification/store';

interface IState {
  invalidEmail: boolean;
  invalidEmailMessage: string;
  invalidPassword: boolean;
  invalidPasswordMessage: string;
}

interface IProps extends RouteComponentProps {
  actions: any;
}

class ChangePasswordComponent extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      invalidEmail: false,
      invalidEmailMessage: '',
      invalidPassword: false,
      invalidPasswordMessage: ''
    };
  }

  public onSubmit = () => {
    // return async (data: IAuthStore) => {
    //   const response = await this.props.actions.auth.register(data);
    //   if (response.errors) {
    //     await this.props.actions.notifications.push(({
    //       status: 'unread',
    //       text: response.errors.auth.msg,
    //       type: 'error'
    //     } as unknown) as IMessageNotification);
    //   }
    //   if (response.errors && response.errors.auth && response.errors.auth.el === 'password1') {
    //     this.setState({
    //       invalidPassword: true,
    //       invalidPasswordMessage: response.errors.auth.msg || 'Error'
    //     });
    //   }
    //   if (response.errors && response.errors.auth && response.errors.auth.el === 'email') {
    //     this.setState({ invalidEmail: true, invalidEmailMessage: response.errors.auth.msg || '' });
    //   }
    //   if (response.auth && response.auth.isAuthenticated) {
    //     navigate(`/staff/club/create/info`);
    //   }
    // };
  };

  public render(): JSX.Element {
    // const { auth } = this.props;
    return (
      <FormProvider
        defaultValues={{}}
        onSubmit={this.onSubmit()}
        validations={{
          password2: 'password',
          password3: values => values.password2 === values.password3
        }}
      >
        <FormConsumer>
          {({ formActions: { setValue }, errors }: IFormAttributes) => (
            <div className="create-account form-account form">
              <h1 className="title">Update your Password</h1>
              <div className="center">
                <Input
                  label="OLD PASSWORD"
                  id="password1"
                  type="password"
                  onChange={setValue('password1')}
                  fullWidth={true}
                />

                <Input
                  label="NEW PASSWORD"
                  id="password2"
                  type="password"
                  onChange={setValue('password2')}
                  hasError={errors.password2 || this.state.invalidPassword}
                  errorMessage={
                    this.state.invalidPassword
                      ? this.state.invalidPasswordMessage
                      : 'This password is not strong enough'
                  }
                  fullWidth={true}
                />
                <Input
                  label="CONFIRM PASSWORD"
                  id="password3"
                  type="password"
                  onChange={setValue('password3')}
                  hasError={errors.password3}
                  errorMessage="Passwords must match"
                  fullWidth={true}
                />
              </div>

              <div className="bot">
                <Button className="form-button" color="primary" variant="contained">
                  CANCEL
                </Button>
                <Button
                  className="form-button"
                  color="primary"
                  disabled={errors.FORM}
                  type="submit"
                  variant="contained"
                >
                  NEXT
                </Button>
              </div>
            </div>
          )}
        </FormConsumer>
      </FormProvider>
    );
  }
}

const ChangePassword = withContext(ChangePasswordComponent, 'auth', 'notifications');

export { ChangePassword };
