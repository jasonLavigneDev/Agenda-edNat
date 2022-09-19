import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Redirect, Route, Switch } from 'react-router-dom';
import TopBar from '../components/menus/TopBar';
import Calendar from '../components/system/Calendar/Calendar';
import Footer from '../components/menus/Footer';
import AddEvent from '../pages/AddEvent';
import ReadEvent from '../pages/ReadEvent';
import EditEvent from '../pages/EditEvent';
import NotLoggedIn from '../pages/NotLoggedIn';
import Logout from '../pages/Logout';
import Login from '../pages/Login';
import ROUTES from './routes';
import Spinner from '../components/system/Spinner';
import { useAppContext } from '../contexts/context';
import SiteInMaintenance from '../components/system/SiteInMaintenance';
import UserFailed from '../components/system/UserFailed';

const useStyles = makeStyles((theme) => ({
  main: {
    backgroundColor: theme.palette.background,
    minHeight: '83.6vh',
  },
}));

const MainLayout = ({ userFailed, setUserFailed }) => {
  const classes = useStyles();
  const [{ userId, appsettings, loading }] = useAppContext();
  useEffect(() => {
    if (userId) setUserFailed(false);
  }, [userId]);

  return (
    <>
      <TopBar />
      <main className={classes.main}>
        <Container>
          {!appsettings.maintenance ? (
            userFailed ? (
              <UserFailed />
            ) : userId ? (
              loading ? (
                <Spinner />
              ) : (
                <>
                  <Switch>
                    <Route exact path={ROUTES.HOME} component={Calendar} />
                    <Route exact path={ROUTES.LOGOUT} component={Logout} />
                    <Route exact path={ROUTES.LOGIN} component={Login} />
                    <Route exact path={ROUTES.ADD_EVENT} component={AddEvent} />
                    <Route exact path={ROUTES.EVENT} component={ReadEvent} />
                    <Route exact path={ROUTES.EVENT_EDIT} component={EditEvent} />
                    <Redirect from="*" to={ROUTES.HOME} />
                  </Switch>
                </>
              )
            ) : (
              <Switch>
                <Route exact path={ROUTES.LOGOUT} component={Logout} />
                <Route exact path={ROUTES.LOGIN} component={Login} />
                <Route path={ROUTES.HOME} component={NotLoggedIn} />
                <Redirect from="*" to={ROUTES.HOME} />
              </Switch>
            )
          ) : (
            <Switch>
              <Route exact path={ROUTES.LOGOUT} component={Logout} />
              <Route exact path={ROUTES.LOGIN} component={Login} />
              <Route exact path="/" component={SiteInMaintenance} />
              <Route component={SiteInMaintenance} />
            </Switch>
          )}
        </Container>
      </main>
      <Footer />
    </>
  );
};

MainLayout.propTypes = {
  userFailed: PropTypes.bool.isRequired,
  setUserFailed: PropTypes.func.isRequired,
};

export default MainLayout;
