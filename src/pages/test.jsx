import React, { Component } from 'react';
import withContext from '../helpers/withContext';

class Test extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.store.loaded(false);
  }

  render() {
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <h1 style={{ color: 'white' }}>Test</h1>
      </div>
    );
  }
}

export default withContext(Test);
