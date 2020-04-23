import React from 'react';
import { auth } from 'services/firebase';
import { useHistory } from 'react-router-dom';
import { dashboardPath } from 'routes';
import { Link } from 'components';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const history = useHistory();

  const logout = () => {
    auth.signOut();
  };

  return (
    <div className={classes.root}>
      <AppBar>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Link to={dashboardPath()} className={classes.title}>
            <Typography variant="h6">Supra Turbo</Typography>
          </Link>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}