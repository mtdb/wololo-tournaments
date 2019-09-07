import React from 'react';
import { withContext } from '../../contrib/utils';
import ChangePassword from '../../components/ChangePassword';
import Avatar from '../Register/Avatar';
import Email from '../Register/Email';
import '../Register/Register.scss';
import './Profile.scss';

import { navigate } from '@reach/router';
// import { IAuthStore } from '../../store/auth/store';

const ProfileComponent = ({ page }: any) => {
  const options = ['avatar', 'password-update', 'verify'];
  if (options.indexOf(page) < 0) {
    navigate('/');
  }

  const pages = {
    avatar: <Avatar isRegistered={true} />,
    'password-update': <ChangePassword />,
    verify: <Email />
  };

  return (
    <div className="admin-layout register-wizard profile-settings paper">
      <div className="wrapper content">{(pages as any)[page]}</div>
    </div>
  );
};

const Profile = withContext(ProfileComponent, 'auth', 'user');

export { Profile, ProfileComponent };
