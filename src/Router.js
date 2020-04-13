import React from 'react';
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
  withRouter
} from 'react-router-dom';

import App from './_app';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from 'services/firebase';

import routes from './routes';


import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './transition.css';

// https://medium.com/@khwsc1/step-by-step-guide-of-simple-routing-transition-effect-for-react-with-react-router-v4-and-9152db1566a0
// this approach is kinda "expensive"

// http://reactcommunity.org/react-transition-group/with-react-router/
// the recommended approach renders all a pages simoultaneously... thanks but no thanks

const SwitchWithTransition = withRouter(({ children, location }) => {
  return (
    <TransitionGroup style={{ position: 'relative' }}>
      <CSSTransition
        key={location.key}
        timeout={{ enter: 300, exit: 300 }}
        classNames={'fade'}
      >
        <div style={{
          position: 'absolute',
          width: '100%',
          top: 0,
          left: 0
        }}>
          <Switch location={location}>
            {children}
          </Switch>
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
});

const Router = () => {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <p>Loading the whole app</p>;
  }

  if (error) {
    console.log('there was an error retrieving the user from firebase');
    // maybe sign out
    return;
  }

  // private routes?
  return (
    <BrowserRouter>
      <App user={user}>
        <SwitchWithTransition>
          {routes.map((route) => {
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

      </App>
    </BrowserRouter>
  );
};

export default Router;
