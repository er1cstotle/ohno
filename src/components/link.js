import React from 'react';
import {
  Link
} from 'react-router-dom';

export default (props) => {
  return (
    <Link {...props} to={props.to}>
      {props.children}
    </Link>
  );
};