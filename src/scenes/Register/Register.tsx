import { useTheme } from '@material-ui/core/styles';
import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import logo from '../../assets/logo.png';
import Stepper from '../../components/Stepper';
import Account from './Account';
import Avatar from './Avatar';
import CreationComplete from './CreationComplete';
import Email from './Email';
// import { navigate } from '@reach/router';
import { withContext } from '../../contrib/utils';
import './Register.scss';
// import { IAuthStore } from '../../store/auth/store';

// enum STEP {
//   'account',
//   'info',
//   'season',
//   'complete'
// }

// interface IProps {
//   // auth: IAuthStore;
//   location: any;
// }

const RegisterComponent = () => {
  const theme = useTheme();
  const [step, setStep] = React.useState(0);

  const handleChange = (index: number) => () => {
    setStep(index);
  };

  const handleChangeIndex = (index: number) => {
    setStep(index);
  };
  const steps = [
    { name: '', disabled: false, status: '' },
    { name: '', disabled: false, status: '' },
    { name: '', disabled: false, status: '' },
    { name: '', disabled: false, status: '' }
  ];

  return (
    <div className="admin-layout register-wizard paper">
      <div className="wrapper header-wrapper">
        <div className="logo-wrapper ">
          <img src={logo} className="logo" alt="logo" />
        </div>
        <div>
          <hr className="shadow" />
        </div>
        <Stepper onChange={handleChange} active={step} steps={steps} />
      </div>
      <div className="wrapper content">
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={step}
          onChangeIndex={handleChangeIndex}
        >
          <Account dir={theme.direction} />
          <Email dir={theme.direction} />
          <Avatar dir={theme.direction} />
          <CreationComplete />
        </SwipeableViews>
      </div>
    </div>
  );
};

const Register = withContext(RegisterComponent, 'auth', 'user');

export { Register, RegisterComponent };
