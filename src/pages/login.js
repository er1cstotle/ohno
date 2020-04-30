import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase, { auth } from 'services/firebase';
import { styled } from '@material-ui/core/styles';
import { blue, amber } from '@material-ui/core/colors';


import { Container, Paper, Grid, Slide, Typography } from '@material-ui/core';
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
  marginTop: '20vh',
  paddingTop: 20,
  paddingBottom: 20,
  textAlign: 'center'
});

const Login = () => {
  return (
    <div style={{
      // backgroundColor: amber['A700'],
      height: '100vh',
      background: 'linear-gradient(rgb(117, 117, 117, 0.75), rgb(117, 117, 117, 0.75)), url(assembly.png)',
      backgroundSize: 'cover'
    }}>
      <Seo title={'Login'}/>

      <Grid container alignItems={'center'} justify={'center'}>
        <Grid item xs={12} sm={3}>
          <Slide direction="up" timeout={500} in mountOnEnter unmountOnExit>

            <Slide direction="up" timeout={800} in mountOnEnter unmountOnExit>
              <LoginOptionsContainer elevation={5}>

                <Typography variant={'h6'} align={'center'}>
                  Welcome to
                </Typography>

                <img
                  style={{
                    width: '50%'
                  }}
                  src="https://fontmeme.com/permalink/200430/ac59e96c8c3b16bfb0feb12e33a25955.png" alt="OHNO" border="0"/>


                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth}/>

              </LoginOptionsContainer>
            </Slide>
          </Slide>
        </Grid>
      </Grid>

    </div>
  );
};

export default Login;
