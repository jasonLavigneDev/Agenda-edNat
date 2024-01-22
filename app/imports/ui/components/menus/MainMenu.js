import React, { useState } from 'react';
import i18n from 'meteor/universe:i18n';
import { useHistory, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import Tooltip from '@material-ui/core/Tooltip';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PropTypes from 'prop-types';
import LogoutDialog from '../system/LogoutDialog';
import UserAvatar from '../system/UserAvatar';
import LanguageSwitcher from '../system/LanguageSwitcher';
import ROUTES from '../../layouts/routes';

const useStyles = makeStyles((theme) => ({
  avatar: {
    marginLeft: theme.spacing(1),
  },
}));

export const menu = [
  {
    path: ROUTES.ADD_EVENT,
    content: 'menuAddEvent',
  },
];

const MainMenu = ({ user = {} }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openLogout, setOpenLogout] = useState(false);
  const history = useHistory();
  const { pathname } = useLocation();

  const startCaldavUrl = Meteor.settings.public.caldavUrl;
  const endCaldavUrl = `${user.username}/calendar.ics/`;
  const userCaldavUrl = () => {
    if (startCaldavUrl.charAt(startCaldavUrl.length - 1) === '/') {
      return `${startCaldavUrl}${endCaldavUrl}`;
    }
    return `${startCaldavUrl}/${endCaldavUrl}`;
  };

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleMenuClick = (path) => {
    history.push(path);
    setAnchorEl(null);
  };
  const T = i18n.createComponent('components.MainMenu');
  const currentLink = menu.find((link) => {
    if (link.path === pathname || pathname.search(link.path) > -1) {
      return true;
    }
    return false;
  });

  const keycloakLogout = () => {
    const { keycloakUrl, keycloakRealm } = Meteor.settings.public;
    const keycloakLogoutUrl = `${keycloakUrl}/realms/${keycloakRealm}/protocol/openid-connect/logout`;
    const redirectUri = `${Meteor.absoluteUrl()}/logout`;
    window.location = `${keycloakLogoutUrl}?post_logout_redirect_uri=${redirectUri}`;
  };

  const localLogout = () => {
    history.replace(ROUTES.LOGOUT);
  };

  const closeLogoutDialog = () => {
    setOpenLogout(false);
    setAnchorEl(null);
  };

  const onLogout = () => {
    const logoutType = user.logoutType || 'ask';
    if (logoutType === 'ask') {
      setOpenLogout(true);
    } else if (logoutType === 'global') {
      keycloakLogout();
    } else localLogout();
  };

  const handleCopyCaldavUrl = () => {
    navigator.clipboard.writeText(userCaldavUrl());
    closeLogoutDialog();
    msg.success(i18n.__('components.MainMenu.successCopyCaldav'));
  };

  return (
    <>
      <Button
        aria-controls="main-menu"
        aria-haspopup="true"
        onClick={handleClick}
        style={{ textTransform: 'none' }}
        endIcon={<ExpandMoreIcon />}
      >
        {user.firstName || ''}
        <UserAvatar customClass={classes.avatar} />
      </Button>
      <Menu
        id="main-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        {menu.map((item) => {
          return item.content === 'Divider' ? (
            <Divider key={item.path} />
          ) : (
            <MenuItem
              key={item.path}
              onClick={() => handleMenuClick(item.path)}
              selected={currentLink ? currentLink.path === item.path : false}
            >
              <T>{item.content}</T>
            </MenuItem>
          );
        })}
        <Divider />
        {Meteor.settings.public.caldavUrl ? (
          <>
            <Tooltip title={userCaldavUrl()}>
              <MenuItem onClick={handleCopyCaldavUrl}>
                <T>copyCaldavUrl</T>
              </MenuItem>
            </Tooltip>
            <Divider />
          </>
        ) : null}

        <MenuItem onClick={onLogout}>
          <T>menuLogoutLabel</T>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => handleMenuClick('/about')}>
          <T>menuAboutLabel</T>
        </MenuItem>
      </Menu>
      <LanguageSwitcher topbar />
      <LogoutDialog open={openLogout} onClose={closeLogoutDialog} onAccept={keycloakLogout} />
    </>
  );
};

export default MainMenu;

MainMenu.propTypes = {
  user: PropTypes.objectOf(PropTypes.any),
};

MainMenu.defaultProps = {
  user: {},
};
