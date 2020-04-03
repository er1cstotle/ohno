import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import { retroPath } from 'routes';

import retroService from 'services/retros';

import AddIcon from '@material-ui/icons/Add';
import { Container, Fab, Grid, Slide } from '@material-ui/core';
import { Seo, Link } from 'components';

const useStyles = makeStyles(theme => ({
  addButton: {
    position: 'fixed',
    bottom: 48,
    right: 48
  }
}));

const Dashboard = ({ user }) => {
  const classes = useStyles();
  const history = useHistory();

  const createRetro = async () => {
    try {
      const userID = user ? user.uid : undefined;
      const retro = await retroService.create(userID);
      console.log(retro);

      history.push(retroPath(retro.id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container maxWidth={'lg'}>
      <Seo title={'Dashboard'}/>

      <Grid container>
        <Grid item xs={3}>
          hi
        </Grid>
        <Grid item xs={3}>
          hi
        </Grid>
        <Grid item xs={3}>
          hi
        </Grid>
        <Grid item xs={3}>
          hi
        </Grid>
      </Grid>

      <Slide direction="up" timeout={800} in mountOnEnter unmountOnExit>
        <Fab className={classes.addButton} color="primary" aria-label="add" onClick={createRetro}>
          <AddIcon />
        </Fab>
      </Slide>

    </Container>
  );
};

export default Dashboard;
