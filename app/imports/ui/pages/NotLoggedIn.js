import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useAppContext } from '../contexts/context';
import Spinner from '../components/system/Spinner';

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
  const [{ loggingIn, loadingUser }] = useAppContext();

  useEffect(() => {
    if (!loadingUser && !loggingIn) {
      Meteor.loginWithKeycloak();
    }
  }, [loadingUser, loggingIn]);

  return (
    <div className={classes.wrapper}>
      <Spinner />
    </div>
  );
};

export default NotLoggedIn;
