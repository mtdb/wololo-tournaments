import Button from '@material-ui/core/Button';
import { RouteComponentProps } from '@reach/router';
import React, { Component } from 'react';
import { FormConsumer, FormProvider, IFormAttributes } from '../../../components/Forms';
import Input from '../../../components/Input';
import { withContext } from '../../../contrib/utils';
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

class AccountComponent extends Component<IProps, IState> {
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
        defaultValues={{ auth: {}, acceptedToS: false, user: {} }}
        onSubmit={this.onSubmit()}
        validations={{
          acceptedToS: 'isTrue',
          password1: 'password',
          password2: values => values.password1 === values.password2,
          'user.email': 'required',
          'user.firstName': 'required',
          'user.lastName': 'required'
        }}
      >
        <FormConsumer>
          {({ values, formActions: { setValue }, errors }: IFormAttributes) => (
            <div className="create-account form-account form">
              <h1 className="title">Your Account</h1>
              <p className="help-text">Give us your Battle Name and Password!</p>
              <div className="center">
                <Input
                  label="USERNAME"
                  id="username"
                  type="text"
                  value={values.user.username}
                  onChange={setValue('user.username')}
                  hasError={errors['user.username']}
                  errorMessage="Username cannot be empty"
                  fullWidth={true}
                />

                <Input
                  label="PASSWORD"
                  id="password1"
                  type="password"
                  onChange={setValue('password1')}
                  hasError={errors.password1 || this.state.invalidPassword}
                  errorMessage={
                    this.state.invalidPassword
                      ? this.state.invalidPasswordMessage
                      : 'This password is not strong enough'
                  }
                  fullWidth={true}
                />

                <Input
                  label="CONFIRM PASSWORD"
                  id="password2"
                  type="password"
                  onChange={setValue('password2')}
                  hasError={errors.password2}
                  errorMessage="Passwords must match"
                  fullWidth={true}
                />
              </div>
              <div className="half-bot">
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

const Account = withContext(AccountComponent, 'auth', 'notifications');

export { Account };
