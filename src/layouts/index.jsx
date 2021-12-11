import React from 'react';
import PropTypes from 'prop-types';
import inView from '../js/in-view.min';
import { Link } from 'gatsby';

import Navbar from '../components/Navbar';
import PageFooter from '../components/PageFooter';
import Loader from '../components/Loader';
import withContext from '../helpers/withContext';

import '../css/index.scss';
import '../css/main.scss';
import { LayoutsWrapperCss } from './index.css';

class Layout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      initial: 'initial',
      lastLocation: '',
      cookie: true,
    };
  }

  componentDidMount() {
    const { customSetState, loaderLoading } = this.props.store;
    const lazyMenu = document.querySelector('.lazy-menu');
    const currentPage = this.getCurrentPage();

    if (currentPage === 'global') {
      this.props.store.loaded(false);
    }

    lazyMenu.addEventListener('transitionend', e => {
      if (e.propertyName === 'transform') {
        this.setState({ initial: '' });
      }
    });

    // inView({
    //   selector: '.lazy-menu',
    //   enter: () => {
    //     if (!loaderLoading) {
    //       customSetState({
    //         menuEntered: true,
    //       });
    //     }
    //   },
    // });
  }

  static getDerivedStateFromProps(props, state) {
    if (props.location.pathname !== state.lastLocation) {
      props.store.activateNavbar();
      return { lastLocation: props.location.pathname };
    }
    if (props.store.cookie !== state.cookie) {
      return { cookie: props.store.cookie };
    }
    return null;
  }

  componentDidUpdate(prevProps) {
    const magic = Array.from(document.querySelectorAll('.magic-temporary-img'));
    magic.forEach(img => {
      img.parentNode.removeChild(img);
    });

    if (
      this.props.store.loaderLoading === undefined &&
      this.props.store.loaderLoading !== prevProps.store.loaderLoading
    ) {
      this.props.store.customSetState({
        menuEntered: true,
      });
    }
  }

  getCurrentPage() {
    const currentPath = this.props.location.pathname
      .replace('/', '')
      .replace(/\//g, '');
    let path = '';
    if (currentPath === '') {
      path = 'home';
    } else {
      path = currentPath;
    }
    return path;
  }

  render() {
    const { initial, cookie } = this.state;
    const {
      children,
      store,
      store: { menuEntered, isMobile, loaderLoading, cart, setCookie },
    } = this.props;

    const currentPage = this.getCurrentPage();

    return (
      <LayoutsWrapperCss className={`${currentPage} ${initial}`}>
        {/* <img
          style={{ zIndex: 99999, position: 'relative' }}
          src="https://api.netlify.com/api/v1/badges/e4e7a322-f401-4f3e-b8e3-27a930000836/deploy-status"
          alt="status"
        /> */}
        <Loader loading={loaderLoading} />
        <div
          className={`cookie-popup
          ${cookie ? 'closed' : 'open'}
        `}
        >
          <div className="container">
            <div className="row">
              <div className="col-11">
                <div className="cookie-content">
                  <p>
                    This website uses cookies to analyise traffic and ensure you
                    get the best experience on our website. By using our website
                    you agree to our use of cookies.{' '}
                    <Link to="/cookies">Learn more</Link>
                  </p>
                  <button className="btn" onClick={setCookie}>
                    Accept
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`navbar-wrapper lazy-menu ${menuEntered ? 'entered' : ''}`}
        >
          <Navbar currentPage={currentPage} />
        </div>
        {children}
        <PageFooter store={store} active={currentPage} {...this.props} />
      </LayoutsWrapperCss>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  store: PropTypes.object.isRequired,
};

export default withContext(Layout);
