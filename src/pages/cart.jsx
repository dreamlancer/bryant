/* global Sirv */
import React from 'react';
import Loadable from 'react-loadable';
import { Link } from 'gatsby';
import { graphql } from 'gatsby';

import Seo from '../components/Seo';
import withContext from '../helpers/withContext';
import inView from '../js/in-view.min';

import Loader from '../components/Shared/Loader';
import CartPreview from '../components/Store/CartPreview';
import text from '../text/cart.text';

const LoadableGlobalMap = Loadable({
  loader: () => import('../components/GlobalMap'),
  loading() {
    return <Loader />;
  },
});

const LoadableStoreRelatedProducts = Loadable({
  loader: () => import('../components/StoreRelatedProducts'),
  loading() {
    return <Loader />;
  },
});
let timeout = null;
let timeout2 = null;

class StoreCart extends React.Component {
  componentDidMount() {
    timeout = setTimeout(() => {
      this.props.store.loaded(false);
    }, 500);
    Sirv.start();
    timeout2 = setTimeout(() => {
      const pageContainer = document.querySelector('.page-container');
      pageContainer && pageContainer.classList.add('show');
    }, 100);

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
  }

  componentWillUnmount() {
    clearTimeout(timeout);
    clearTimeout(timeout2);
  }

  render() {
    const {
      store: {
        isMobile,
        address,
        cart,
        fetchCart,
        deleteCartItem,
        updateCartItem,
        shippingText,
        products,
        currencySymbol,
        lang,
      },
      data,
      data: { map },
    } = this.props;

    return (
      <div className="check-out-page page-container">
        <Seo
          title="Cart"
          url="cart"
          keywords="bryant dental, dental loupes, wireless headlight, bryant dental checkout"
          description="Finish your order at Bryant Dental and start enjoy your amazing dental products"
        />

        <div className="check-out-page-wrapper">
          <section className="check-out-container">
            <div className="container">
              <div className="check-out-header">
                <h1
                  dangerouslySetInnerHTML={{
                    __html: text.title[lang]
                      ? text.title[lang]
                      : text.title['en'],
                  }}
                />
                <div className="note">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: text.title[lang]
                        ? text.title[lang]
                        : text.title['en'],
                    }}
                  />{' '}
                  <Link to="/returns">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: text.returnButton[lang]
                          ? text.returnButton[lang]
                          : text.returnButton['en'],
                      }}
                    />
                  </Link>
                </div>
              </div>
              <CartPreview
                active
                address={address}
                cart={cart}
                fetchCart={fetchCart}
                deleteCartItem={deleteCartItem}
                updateCartItem={updateCartItem}
                shippingText={shippingText}
                currencySymbol={currencySymbol}
              />
            </div>
          </section>
        </div>

        <LoadableStoreRelatedProducts
          isMobile={isMobile}
          data={data}
          products={products}
        />

        <LoadableGlobalMap mapImg={map.childImageSharp.fluid} />
      </div>
    );
  }
}

export default withContext(StoreCart);

export const query = graphql`
  query {
    prod1: file(relativePath: { eq: "store/prod-1.jpg" }) {
      childImageSharp {
        fluid(maxHeight: 800, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    prod2: file(relativePath: { eq: "store/prod-2.jpg" }) {
      childImageSharp {
        fluid(maxHeight: 800, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    prod3: file(relativePath: { eq: "store/prod-3.jpg" }) {
      childImageSharp {
        fluid(maxHeight: 800, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    prod4: file(relativePath: { eq: "store/prod-4.jpg" }) {
      childImageSharp {
        fluid(maxHeight: 800, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    prod5: file(relativePath: { eq: "store/prod-5.jpg" }) {
      childImageSharp {
        fluid(maxHeight: 800, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    prod6: file(relativePath: { eq: "store/prod-6.jpg" }) {
      childImageSharp {
        fluid(maxHeight: 800, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    arrowRight: file(relativePath: { eq: "arrow-right.png" }) {
      childImageSharp {
        fluid(maxHeight: 800, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    arrowLeft: file(relativePath: { eq: "arrow-left.png" }) {
      childImageSharp {
        fluid(maxHeight: 800, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    map: file(relativePath: { eq: "map.png" }) {
      childImageSharp {
        fluid(maxHeight: 800, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`;
