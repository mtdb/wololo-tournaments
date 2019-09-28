import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CheckIcon from '@material-ui/icons/CheckCircleOutline';
import ExitIcon from '@material-ui/icons/ExitToApp';
import FaceIcon from '@material-ui/icons/Face';
import HomeIcon from '@material-ui/icons/Home';
import KeyIcon from '@material-ui/icons/VpnKey';
import { Link, navigate } from '@reach/router';
import React, { Fragment } from 'react';
import villager1 from '../../assets/images/villager1.png';
import { withContext } from '../../contrib/context';
import { IActions } from '../../store';
import './SideBar.scss';

import { routes } from '../../App';

const SideBarComponent = ({
  children,
  actions: {
    user: { logout }
  }
}: {
  children: any;
  actions: IActions;
}) => {
  const [open, toggle] = React.useState(false);
  const links = [
    { name: 'Home', icon: <HomeIcon />, to: routes.upcoming() },
    { name: 'Change Avatar', icon: <FaceIcon />, to: routes.profile('avatar') },
    { name: 'Update Password', icon: <KeyIcon />, to: routes.profile('password-update') },
    { name: 'Verify Account', icon: <CheckIcon />, to: routes.profile('verify') },
    {
      icon: <ExitIcon />,
      name: 'Logout',
      onClick: () => {
        void logout().then(() => navigate(routes.upcoming()));
      }
    }
  ];

  const toggleDrawer = (isOpen: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    toggle(isOpen);
  };

  const SideList = () => (
    <div
      className="sidebar-content"
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <div className="avatar-wrapper">
        <img src={villager1} alt="villager1" />
        <div className="gold-box">
          <span>Collected Gold: {0}</span>
          <img src="/assets/gold.png" alt="gold" className="gold" />
        </div>
      </div>
      <Divider />
      <List>
        {links.map(link => (
          <Fragment key={`link-${link.name}`}>
            {link.onClick ? (
              <ListItem onClick={link.onClick} button={true} className="list-item">
                <ListItemIcon className="list-icon">{link.icon}</ListItemIcon>
                <ListItemText primary={link.name} className="list-item-text" />
              </ListItem>
            ) : (
              <ListItem component={Link} to={link.to || '/'} button={true} className="list-item">
                <ListItemIcon className="list-icon">{link.icon}</ListItemIcon>
                <ListItemText primary={link.name} className="list-item-text" />
              </ListItem>
            )}
          </Fragment>
        ))}
      </List>
      <Divider />
    </div>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>{children}</Button>

      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
        classes={{ root: 'sidebar-wrapper', paper: 'sidebar wooden-bg' }}
      >
        <SideList />
      </Drawer>
    </div>
  );
};

const SideBar = withContext(SideBarComponent, 'actions');

export { SideBar };
