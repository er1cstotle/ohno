import React from 'react';
import { createMuiTheme, styled, ThemeProvider } from '@material-ui/core/styles';
import { pink } from '@material-ui/core/colors';

import { CssBaseline } from '@material-ui/core';
import { Header } from 'components';

const theme = createMuiTheme({
  overrides: {
    MuiToolbar: {
      root: {
        backgroundColor: pink['A400']
      }
    },
    MuiContainer: {
      root: {
        paddingTop: 48
      }
    }
  },
  props: {
    MuiToolbar: {
      variant: 'dense'
    }
  }
});

const Main = styled('div')({
  position: 'relative',
  minHeight: 'calc(100vh - 48px)',
  marginTop: 48
});

const App = ({ user, children }) => {
  return (
    <ThemeProvider theme={theme}>
      <Main>
        <CssBaseline />
        <Header user={user}/>
        {children}
      </Main>
    </ThemeProvider>
  );
};

export default App;
