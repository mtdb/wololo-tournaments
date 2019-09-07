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
import KeyIcon from '@material-ui/icons/VpnKey';

import React from 'react';
import villager1 from '../../assets/images/villager1.png';
import './SideBar.scss';

const links = [
  { name: 'Change Avatar', icon: <FaceIcon /> },
  { name: 'Update Password', icon: <KeyIcon /> },
  { name: 'Verify Account', icon: <CheckIcon /> },
  { name: 'Logout', icon: <ExitIcon /> }
];

const SideBar = ({ children }: any) => {
  const [open, toggle] = React.useState(false);

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
        {links.map((link, index) => (
          <ListItem button={true} key={`link-${index}`} className="list-item">
            <ListItemIcon className="list-icon">{link.icon}</ListItemIcon>
            <ListItemText primary={link.name} className="list-item-text" />
          </ListItem>
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

export { SideBar };
