import React from 'react';
import { auth } from 'services/firebase';
import { useAuthState } from 'fire-hydrant';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import theme from './theme';

import {
  BrowserRouter
} from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import Authenticated from './routers/authenticated';
import UnAuthenticated from './routers/unauthenticated';

const muiTheme = createMuiTheme(theme);

const Router = () => {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <p>Loading the whole app</p>;
  }

  if (error) {
    console.log('there was an error retrieving the user from firebase');
    // maybe sign out
    return;
  }

  return (
    <ThemeProvider theme={muiTheme}>
      <BrowserRouter>
        <CssBaseline />
        {user ? <Authenticated user={user}/> : <UnAuthenticated/>}
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default Router;
