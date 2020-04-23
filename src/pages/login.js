import React from 'react';
import { auth } from 'services/firebase';
import { useHistory } from 'react-router-dom';
import { styled } from '@material-ui/core/styles';

import { dashboardPath } from 'routes';

import boardService from 'services/boards';

import { Container, Fab, Grid, Slide, Button } from '@material-ui/core';
import { Seo, Link } from 'components';

const ContinueAsGuestBtn = styled(Button)({
  padding: 16
});

const Login = ({ user }) => {
  const history = useHistory();

  const continueAsGuest = async () => {
    try {
      await auth.signInAnonymously();
      history.push(dashboardPath());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container maxWidth={'lg'}>
      <Seo title={'Login'}/>

      <Grid container alignItems={'center'} justify={'center'}>
        <Grid item >
          <Slide direction="up" timeout={800} in mountOnEnter unmountOnExit>
            <ContinueAsGuestBtn variant={'contained'} color={'primary'} aria-label="continue as guest" onClick={continueAsGuest}>
          ContinueAsGuest
            </ContinueAsGuestBtn>
          </Slide>
        </Grid>
      </Grid>

    </Container>
  );
};

export default Login;
