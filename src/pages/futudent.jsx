import React, { Component } from 'react';
import { Link } from 'gatsby';
import withContext from '../helpers/withContext';
import Seo from '../components/Seo';

class Futudent extends Component {
  componentDidMount() {
    this.props.store.loaded(false);
  }

  render() {
    return (
      <div className="cookie-page">
        <Seo title="Futudent" url="Futudent" />

        <div
          style={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h1>Add components here</h1>
        </div>
      </div>
    );
  }
}

export default withContext(Futudent);
