import React, { Suspense, lazy, useState, useEffect } from 'react';
import { Accounts } from 'meteor/accounts-base';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Spinner from '../components/system/Spinner';
import MsgHandler from '../components/system/MsgHandler';
import DynamicStore from '../contexts/context';
import lightTheme from '../themes/light';

// dynamic imports
const MainLayout = lazy(() => import('./MainLayout'));

function App() {
  const [userFailed, setUserFailed] = useState(false);
  const stopCallback = Accounts.onLoginFailure((details) => {
    if (details.error.error === 'api.users.createUser') {
      setUserFailed(true);
    }
  });

  useEffect(() => {
    return () => {
      if (typeof stopCallback.stop === 'function') {
        stopCallback.stop();
      }
    };
  }, []);

  return (
    <>
      <CssBaseline />
      <Suspense fallback={<Spinner full />}>
        <Switch>
          <Route path="/">
            <MainLayout userFailed={userFailed} setUserFailed={setUserFailed} />
          </Route>
        </Switch>
      </Suspense>
      <MsgHandler />
    </>
  );
}

export default () => (
  <MuiThemeProvider theme={lightTheme}>
    <BrowserRouter>
      <DynamicStore>
        <App />
      </DynamicStore>
    </BrowserRouter>
  </MuiThemeProvider>
);
