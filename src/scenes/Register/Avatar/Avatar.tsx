import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import { RouteComponentProps } from '@reach/router';
import React, { Component, Fragment } from 'react';
import villager1 from '../../../assets/images/villager1.png';
import villager2 from '../../../assets/images/villager2.png';
import { FormConsumer, FormProvider, IFormAttributes } from '../../../components/Forms';
import { withContext } from '../../../contrib/utils';

interface IState {
  invalidEmail: boolean;
  invalidEmailMessage: string;
  invalidPassword: boolean;
  invalidPasswordMessage: string;
}

interface IProps extends RouteComponentProps {
  actions: any;
}

class AvatarComponent extends Component<IProps, IState> {
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
    return true;
  };

  public render(): JSX.Element {
    // const { auth } = this.props;
    return (
      <FormProvider
        defaultValues={{ acceptedToS: false, avatar: '' }}
        onSubmit={this.onSubmit()}
        validations={{
          acceptedToS: 'isTrue',
          avatar: 'required'
        }}
      >
        <FormConsumer>
          {({ values, formActions: { setValue, toggleValue }, errors }: IFormAttributes) => (
            <div className="create-account form-account form">
              <h1 className="title">Your Profile</h1>
              <p className="help-text">
                Choose your Profile Image, don't worry, you can change it later... ;)
              </p>
              <div className="center">
                <div className="starter-pics">
                  <button
                    className={`avatar-picker ${values.avatar === 'villager1' ? 'active' : ''}`}
                    onClick={() => setValue('avatar')('villager1')}
                  >
                    <img src={villager1} alt="villager1" />
                  </button>
                  <button
                    className={`avatar-picker ${values.avatar === 'villager2' ? 'active' : ''}`}
                    onClick={() => setValue('avatar')('villager2')}
                  >
                    <img src={villager2} alt="villager2" />
                  </button>
                </div>
              </div>
              <div className="bot">
                <FormControlLabel
                  classes={{ label: 'terms' }}
                  control={
                    <Checkbox
                      classes={{ root: 'terms' }}
                      checkedIcon={<CheckBoxIcon className="form-icon override" />}
                      color="secondary"
                      icon={<CheckBoxOutlineBlankIcon className="form-icon override" />}
                      id="accepted-tos"
                      onChange={toggleValue('acceptedToS')}
                      value="on"
                    />
                  }
                  label={
                    <Fragment>
                      Yeah! Sure! I have read the&nbsp;
                      <a href="/legal/termsofservice" target="_blank">
                        Terms of Service
                      </a>
                      &nbsp;and&nbsp;
                      <a href="/legal/termsofservice" target="_blank">
                        Privacy Policy
                      </a>
                    </Fragment>
                  }
                />
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

const Avatar = withContext(AvatarComponent, 'auth', 'notifications');

export { Avatar };
