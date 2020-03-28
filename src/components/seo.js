import React from 'react';
import { Helmet } from 'react-helmet';

export default ({ children, title }) => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{title}</title>
      <link rel='icon' href='/favicon.ico' importance='low'/>
      {children}
    </Helmet>
  );
};