import React from 'react';
import { Consumer } from '../store/createContext';

const withContext = Component => {
  return class Wrapper extends React.PureComponent {
    render() {
      return (
        <Consumer>
          {store => {
            return <Component {...this.props} store={store} />;
          }}
        </Consumer>
      );
    }
  };
};

export default withContext;
