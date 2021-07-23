import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import TopBar from '../components/menus/TopBar';
import Calendar from '../components/system/Calendar/Calendar';
import Footer from '../components/menus/Footer';
import AddEvent from '../pages/AddEvent';
import ReadEvent from '../pages/ReadEvent';
import EditEvent from '../pages/EditEvent';
import NotLoggedIn from '../pages/NotLoggedIn';
import ROUTES from './routes';
import { useAppContext } from '../contexts/context';
import { useQuery } from '../../api/utils/hooks';
import LoggingOut from '../components/system/LogginOut';

const useStyles = makeStyles((theme) => ({
  main: {
    backgroundColor: theme.palette.background,
  },
}));

const MainLayout = () => {
  const { dologout } = useQuery();
  const history = useHistory();
  if (dologout) {
    // if requested (after redirect from keycloak logout),
    // close local session and redirect without dologout parameter
    Meteor.logout(() => history.replace(ROUTES.HOME));
  }
  const classes = useStyles();
  const [{ userId }] = useAppContext();

  return (
    <>
      <TopBar />
      <main className={classes.main}>
        {dologout ? (
          <LoggingOut />
        ) : (
          <Container>
            {userId ? (
              <>
                <Calendar />
                <Switch>
                  <Route exact path={ROUTES.ADD_EVENT} component={AddEvent} />
                  <Route exact path={ROUTES.EVENT} component={ReadEvent} />
                  <Route exact path={ROUTES.EVENT_EDIT} component={EditEvent} />
                  <Redirect from="*" to={ROUTES.HOME} />
                </Switch>
              </>
            ) : (
              <Switch>
                <Route path={ROUTES.HOME} component={NotLoggedIn} />
                <Redirect from="*" to={ROUTES.HOME} />
              </Switch>
            )}
          </Container>
        )}
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
