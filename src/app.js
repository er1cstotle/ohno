import React from 'react';

import theme from './theme';

import {
  BrowserRouter
} from 'react-router-dom';

import Authenticated from './routers/authenticated';
import UnAuthenticated from './routers/unauthenticated';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from 'services/firebase';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

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
