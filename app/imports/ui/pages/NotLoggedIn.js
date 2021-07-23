import React from 'react';
import i18n from 'meteor/universe:i18n';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useAppContext } from '../contexts/context';

const useStyles = makeStyles(() => ({
  wrapper: {
    height: 'calc(100vh - 64px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const NotLoggedIn = () => {
  const classes = useStyles();
  const [{ loggingIn }] = useAppContext();
  //   const { enableKeycloak } = Meteor.settings.public;

  return (
    <div className={classes.wrapper}>
      <Button variant="contained" color="primary" onClick={Meteor.loginWithKeycloak}>
        {i18n.__(loggingIn ? 'system.loading' : 'system.login')}
      </Button>
    </div>
  );
};

export default NotLoggedIn;
