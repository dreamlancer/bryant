import React from 'react';
import withContext from '../helpers/withContext';

class NotFound extends React.Component {
  componentDidMount() {
    this.props.store.loaded(false);
  }

  render() {
    return <div className="not-found">Opps!!! Page not found.</div>;
  }
}

export default withContext(NotFound);
