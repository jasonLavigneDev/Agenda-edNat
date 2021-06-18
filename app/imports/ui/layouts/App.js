import React, { Suspense, lazy } from 'react';
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
  return (
    <>
      <CssBaseline />
      <Suspense fallback={<Spinner full />}>
        <Switch>
          <Route path="/" component={MainLayout} />
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
