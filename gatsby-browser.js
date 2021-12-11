import React from 'react';
import AppProvider from './src/store/provider';

// React Context in Browser
// eslint-disable-next-line react/prop-types
export const wrapRootElement = ({ element }) => {
  return <AppProvider>{element}</AppProvider>;
};

// Always start at the top of the page on a route change.
// More investigation needed for a better solution. See https://github.com/gatsbyjs/gatsby/pull/3483
export const onRouteUpdate = () => {
  if (typeof window !== 'undefined') {
    window.scrollTo(0, 0);
  }
};

export const shouldUpdateScroll = () => false;
