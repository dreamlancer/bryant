import React from 'react';
import './index.scss';
import BdLogo from '!svg-react-loader!../../../static/images/bd-logo.svg';
class Loader extends React.Component {
  render() {
    const { loading } = this.props;
    return (
      <div className={`loader-wrapper ${loading ? 'show' : 'go-away'}`}>
        <div className="logo-wrapper">
          <BdLogo />
        </div>

        <img
          className="temp-loader"
          src="https://chanappr.sirv.com/Bryant-dental/360/Big%20loupes/latest-jpg/latest-jpg.spin?image=72&gif.lossy=5&w=400&h=187"
          width="400"
          height="187"
          alt="Loader"
          title="Loader"
        />
      </div>
    );
  }
}

export default Loader;
