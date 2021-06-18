import React from 'react';
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
import ROUTES from './routes';
import { useAppContext } from '../contexts/context';

const useStyles = makeStyles((theme) => ({
  main: {
    backgroundColor: theme.palette.background,
  },
}));

const MainLayout = () => {
  const classes = useStyles();
  const [{ userId }] = useAppContext();

  return (
    <>
      <TopBar />
      <main className={classes.main}>
        <Container>
          {!!userId && <Calendar />}
          {userId ? (
            <Switch>
              <Route exact path={ROUTES.ADD_EVENT} component={AddEvent} />
              <Route exact path={ROUTES.EVENT} component={ReadEvent} />
              <Route exact path={ROUTES.EVENT_EDIT} component={EditEvent} />
              <Redirect from="*" to={ROUTES.HOME} />
            </Switch>
          ) : (
            <Switch>
              <Route path={ROUTES.HOME} component={NotLoggedIn} />
              <Redirect from="*" to={ROUTES.HOME} />
            </Switch>
          )}
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
