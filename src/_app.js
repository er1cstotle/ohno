import React from 'react';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';

import { CssBaseline } from '@material-ui/core';
import { Header } from 'components';

const useStyles = makeStyles(theme => {
  return {
    root: {
      position: 'relative',
      minHeight: 'calc(100vh - 48px)',
      marginTop: 48
    }
  };
});

const theme = createMuiTheme({
  overrides: {
    MuiToolbar: {
      root: {
        backgroundColor: orange['900']
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

const App = ({ user, children }) => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <Header user={user}/>
        {children}
      </div>
    </ThemeProvider>
  );
};

export default App;
