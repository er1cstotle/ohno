import React from 'react';
import { privateRoutes } from 'routes';
import { styled } from '@material-ui/core/styles';

import {
  BrowserRouter,
  Redirect,
  Route
} from 'react-router-dom';

import { Header, SwitchWithTransition } from 'components';


const Main = styled('div')({
  position: 'relative',
  minHeight: 'calc(100vh - 48px)',
  marginTop: 48
});

export default ({ user }) => {
  return (
    <Main>
      <Header user={user}/>
      <SwitchWithTransition>
        {privateRoutes.map((route) => {
          return <Route
            exact
            key={route.path}
            path={route.path}
            render={props => (
              route.private && !user ?
                <Redirect
                  key={route.path}
                  to={{
                    pathname: '/login'
                  }}
                /> :
                <route.page {...props} user={user} />
            )}
          />;
        })}

        <Route path="*">
          gooooo fuck yourself
        </Route>

      </SwitchWithTransition>

    </Main>
  );
};