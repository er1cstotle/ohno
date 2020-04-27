import React from 'react';
import { publicRoutes } from 'routes';
import { styled } from '@material-ui/core/styles';

import {
  Redirect,
  Route
} from 'react-router-dom';

import { SwitchWithTransition } from 'components';

const Main = styled('div')({
  position: 'relative',
  minHeight: '100vh'
});

export default ({ user }) => {
  console.log(user);
  console.log('sdfsldkfnk');


  return (
    <Main>
      <SwitchWithTransition>
        {publicRoutes.map((route) => {
          return <Route
            exact
            key={route.path}
            path={route.path}
            render={props => <route.page {...props}/>}
          />;
        })}

        <Route path="*">
          <Redirect to={{ pathname: '/login' }}/>
        </Route>

      </SwitchWithTransition>
    </Main>
  );
};