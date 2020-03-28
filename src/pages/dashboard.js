import React from 'react';

import { Container, Grid } from '@material-ui/core';
import { Seo, Link } from 'components';


const Dashboard = ({ user }) => {

  return (
    <Container>
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


    </Container>
  );
};

export default Dashboard;
