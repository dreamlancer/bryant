/* global $ Sirv */
import React from 'react';
import Loadable from 'react-loadable';

import inView from 'js/in-view.min';
import withContext from '../../../helpers/withContext';
import Loader from '../../Shared/Loader';
import StoreProductListItem from '../../StoreProductListItem';

const LoadableMap = Loadable({
  loader: () => import('../../Map'),
  loading() {
    return <Loader />;
  },
});
const LoadableSupportCall = Loadable({
  loader: () => import('../../SupportCall'),
  loading() {
    return <Loader />;
  },
});

let timeout = null;
let timeout2 = null;

class StoreList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: null,
      load: false,
    };
  }
  componentDidMount() {
    // Start sirv
    Sirv.start();

    const {
      store,
      store: { products, sessionId },
    } = this.props;
    if (!products && sessionId) {
      store.fetchProducts();
    }

    // Start inview to fade in/out elements on page
    inView({
      selector: '.lazy-show',
      enter: el => {
        el.classList.add('entered');
      },
      offset: 0.2,
      exit: el => {
        el.classList.remove('entered');
      },
    });

    timeout = setTimeout(() => {
      const pageContainer = document.querySelector('.page-container');
      pageContainer && pageContainer.classList.add('show');
    }, 100);
    timeout2 = setTimeout(() => {
      this.setState({ load: true });
    }, 600);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.store.products !== state.products) {
      props.store.loaded(false);
      return { products: props.store.products };
    }

    return null;
  }

  componentWillUnmount() {
    clearTimeout(timeout);
    clearTimeout(timeout2);
  }

  renderProducts = () => {
    const { products, currencySymbol } = this.props.store;
    if (!products) {
      return <div>Loading ...</div>;
    }

    if (products.length <= 0) {
      return <div>No items found</div>;
    }

    return products.map((product, index) => {
      return (
        <div className="col-md-4 col-sm-6 col-12" key={index}>
          <StoreProductListItem
            product={product}
            openModal={this.openModal}
            isSelected={false}
            currencySymbol={currencySymbol}
          />
        </div>
      );
    });
  };

  render() {
    const {
      state: { load },
    } = this;

    return (
      <React.Fragment>
        <div className="store-page page-container">
          <div className="store-wrapper">
            <div className="store-container">
              <div className="container">
                <div className="row">{this.renderProducts()}</div>
              </div>
            </div>
          </div>

          {load && <LoadableSupportCall />}
          {load && <LoadableMap />}
        </div>
      </React.Fragment>
    );
  }
}

export default withContext(StoreList);
