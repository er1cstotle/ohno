import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { styled } from '@material-ui/core/styles';

import { retroPath } from 'routes';

import retroService from 'services/retros';

import AddIcon from '@material-ui/icons/Add';
import { Container, Fab, Grid, Slide, Hidden } from '@material-ui/core';
import { Seo, Link } from 'components';

const AddBtn = styled(Fab)({
  position: 'fixed',
  bottom: 48,
  right: 48
});

const Dashboard = ({ user }) => {
  const history = useHistory();
  const [retros, setRetros] = useState({});

  useEffect(() => {
    const getData = async () => {
      const retros = await retroService.all(user.uid);
      setRetros(retros);
    };

    getData();
  }, []);

  const createRetro = async () => {
    try {
      const retro = await retroService.create(user.uid);
      history.push(retroPath(retro.id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container maxWidth={'lg'}>
      <Seo title={'Dashboard'}/>

      <Grid container>
        <Grid item xs={12} sm={9}>
          {Object.values(retros).map((retro) => (
            <Link key={retro.id} to={retroPath(retro.id)}>
              {retro.id}
            </Link>
          ))}
        </Grid>
        <Hidden xsDown>
          <Grid item sm={3}>
            hi
          </Grid>
        </Hidden>
      </Grid>

      <Slide direction="up" timeout={800} in mountOnEnter unmountOnExit>
        <AddBtn color="primary" aria-label="add" onClick={createRetro}>
          <AddIcon />
        </AddBtn>
      </Slide>

    </Container>
  );
};

export default Dashboard;
