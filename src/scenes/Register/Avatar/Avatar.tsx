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
import { IActions } from '../../../store';
import { IUserStore } from '../../../store/user/store';

interface IProps extends RouteComponentProps {
  actions: IActions;
  user: IUserStore;
  isRegistered?: boolean;
}

class AvatarComponent extends Component<IProps, {}> {
  public onSubmit = ({ avatar: icon }: { avatar: string }) => {
    const {
      actions: {
        user: { profile }
      }
    } = this.props;
    void profile({ icon });
  };

  public goBack = () => {
    (global as any).history.back();
  };

  public render(): JSX.Element {
    const { user } = this.props;
    const { isRegistered } = this.props;
    const defaultValues = isRegistered ? { avatar: user.icon } : { acceptedToS: false, avatar: '' };
    const validations: any = isRegistered
      ? {
          avatar: 'required'
        }
      : {
          acceptedToS: 'isTrue',
          avatar: 'required'
        };

    if (isRegistered && !user.icon) {
      return <div>Loading</div>;
    }

    return (
      <FormProvider
        defaultValues={defaultValues}
        onSubmit={this.onSubmit}
        validations={validations}
      >
        <FormConsumer>
          {({ values, formActions: { setValue, toggleValue }, errors }: IFormAttributes) => (
            <div className="create-account form-account form">
              <h1 className="title">Your Profile Avatar</h1>
              {!isRegistered && (
                <p className="help-text">
                  Choose your Profile Image, don't worry, you can change it later... ;)
                </p>
              )}
              <div className="center">
                <div className="starter-pics">
                  <button
                    type="button"
                    className={`avatar-picker ${values.avatar === 'villager1' ? 'active' : ''}`}
                    onClick={() => setValue('avatar')('villager1')}
                  >
                    <img src={villager1} alt="villager1" />
                  </button>
                  <button
                    type="button"
                    className={`avatar-picker ${values.avatar === 'villager2' ? 'active' : ''}`}
                    onClick={() => setValue('avatar')('villager2')}
                  >
                    <img src={villager2} alt="villager2" />
                  </button>
                </div>
              </div>
              <div className="bot">
                {!isRegistered && (
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
                )}
                {isRegistered && (
                  <Button
                    onClick={this.goBack}
                    className="form-button"
                    color="primary"
                    variant="contained"
                  >
                    CANCEL
                  </Button>
                )}
                <Button
                  className="form-button"
                  color="primary"
                  disabled={errors.FORM}
                  type="submit"
                  variant="contained"
                >
                  {isRegistered ? 'SAVE' : 'NEXT'}
                </Button>
              </div>
            </div>
          )}
        </FormConsumer>
      </FormProvider>
    );
  }
}

const Avatar = withContext(AvatarComponent, 'user', 'actions');

export { Avatar };
