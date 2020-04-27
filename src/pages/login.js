import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase, { auth } from 'services/firebase';
import { styled } from '@material-ui/core/styles';

import { Container, Paper, Grid, Zoom, Typography } from '@material-ui/core';
import { Seo } from 'components';

const uiConfig = {
  signInFlow: 'popup',
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false
  },
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    'anonymous'
  ]
};

const LoginOptionsContainer = styled(Paper)({
  paddingLeft: 25,
  paddingRight: 25,
  paddingTop: 15,
  paddingBottom: 15
});

const Login = () => {
  return (
    <Container maxWidth={'lg'}>
      <Seo title={'Login'}/>

      <Grid container alignItems={'center'} justify={'center'} direction={'column'}>
        <Grid item>
          <Zoom direction="up" timeout={800} in mountOnEnter unmountOnExit>
            <Typography variant={'h1'} gutterBottom>
            Supra Turbo
            </Typography>
          </Zoom>
        </Grid>

        <Grid item>
          <Zoom direction="up" timeout={800} in mountOnEnter unmountOnExit>
            <LoginOptionsContainer variant={'outlined'}>
              <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth}/>
            </LoginOptionsContainer>
          </Zoom>
        </Grid>
      </Grid>

    </Container>
  );
};

export default Login;
