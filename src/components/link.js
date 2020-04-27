import React from 'react';
import {
  Link
} from 'react-router-dom';

export default (props) => {
  return (
    <Link style={{ textDecoration: 'none' }} {...props} to={props.to}>
      {props.children}
    </Link>
  );
};