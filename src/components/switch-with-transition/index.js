import React from 'react';
import {
  Switch,
  withRouter
} from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './transition.css';

// https://medium.com/@khwsc1/step-by-step-guide-of-simple-routing-transition-effect-for-react-with-react-router-v4-and-9152db1566a0
// this approach is kinda "expensive"

// http://reactcommunity.org/react-transition-group/with-react-router/
// the recommended approach renders all a pages simoultaneously... thanks but no thanks
export default withRouter(({ children, location }) => {
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
