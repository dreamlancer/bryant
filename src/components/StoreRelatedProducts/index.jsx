/* global Sirv */
import React from 'react';
import Swiper from 'swiper';
import Img from 'gatsby-image';
import { navigate } from 'gatsby';
import withContext from '../../helpers/withContext';
import './index.scss';
import inView from '../../js/in-view.min';
import text from '../../text/components/store/storeRelatedProducts.text';
import StoreProductListItem from '../StoreProductListItem';

let mySwiper = null;
let timeout = null;

class StoreRelatedProducts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: null,
    };
  }

  componentDidMount() {
    timeout = setTimeout(() => {
      const { isMobile } = this.props;

      if (!isMobile) {
        mySwiper = new Swiper('.swiper-related-container', {
          slidesPerView: 5,
          spaceBetween: 20,
          centeredSlides: true,
          loop: true,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        });
      } else {
        mySwiper = new Swiper('.swiper-related-container-mobile', {
          slidesPerView: 1,
          spaceBetween: 10,
          centeredSlides: true,
          loop: true,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        });
      }
      const relProds = document.querySelectorAll('button.related-item');
      relProds.forEach(prod => {
        prod.addEventListener('click', () => {
          navigate(prod.dataset.src);
        });
      });
    }, 1000);
    // Start sirv
    Sirv.start();

    inView({
      selector: '.lazy-show',
      enter: el => {
        if (el.classList.contains('product-page-wrapper')) {
          el.classList.add('page-loaded');
        } else {
          el.classList.add('entered');
        }
      },
      offset: 0.3,
      exit: el => {
        el.classList.remove('entered');
      },
    });

    // Throttle function for resize
    const throttle = (type, name, obj) => {
      obj = obj || window;
      let running = false;
      const func = () => {
        if (running) {
          return;
        }
        running = true;
        requestAnimationFrame(() => {
          obj.dispatchEvent(new CustomEvent(name));
          running = false;
        });
      };
      obj.addEventListener(type, func);
    };

    /* init - you can init any event */
    throttle('resize', 'optimizedResize');
  }

  componentWillUnmount() {
    clearTimeout(timeout);
    if (mySwiper) {
      mySwiper.destroy(true, true);
      mySwiper = null;
    }
  }

  renderProducts() {
    const {
      props: {
        store: { currencySymbol },
        data: { arrowLeft, arrowRight },
        products,
      },
    } = this;

    return (
      <React.Fragment>
        <div className="swiper-related-container lazy-content d-none d-md-block">
          <div className="swiper-wrapper">
            {products &&
              products.map((product, index) => (
                <div className="swiper-slide" key={index}>
                  <StoreProductListItem
                    product={product}
                    currencySymbol={currencySymbol}
                  />
                </div>
              ))}
          </div>

          <div className="swiper-button-next">
            <Img
              fluid={arrowRight.childImageSharp.fluid}
              critical
              alt="Arrow right"
              title="Arrow right"
            />
          </div>
          <div className="swiper-button-prev">
            <Img
              fluid={arrowLeft.childImageSharp.fluid}
              critical
              alt="Arrow left"
              title="Arrow left"
            />
          </div>
        </div>
        <div className="swiper-related-container-mobile lazy-content d-sm-block d-md-none">
          <div className="swiper-wrapper">
            {products &&
              products.map((product, index) => (
                <div className="swiper-slide" key={index}>
                  <StoreProductListItem
                    product={product}
                    currencySymbol={currencySymbol}
                  />
                </div>
              ))}
          </div>

          <div className="swiper-button-next">
            <Img
              fluid={arrowRight.childImageSharp.fluid}
              critical
              alt="Button next"
              title="Button next"
            />
          </div>
          <div className="swiper-button-prev">
            <Img
              fluid={arrowLeft.childImageSharp.fluid}
              critical
              alt="Button prev"
              title="Button prev"
            />
          </div>
        </div>
      </React.Fragment>
    );
  }

  render() {
    const {
      store: { lang },
    } = this.props;
    return (
      <section className="related-products-container-wrapper lazy-show">
        <div
          className={`related-products-container ${
            this.props.inverted ? 'inverted' : ''
          }`}
        >
          <div className="related-products-header">
            <h2
              className="related-products-title lazy-title"
              dangerouslySetInnerHTML={{
                __html: text.relatedProducts[lang]
                  ? text.relatedProducts[lang]
                  : text.relatedProducts['en'],
              }}
            />
          </div>
          {this.renderProducts()}
        </div>
      </section>
    );
  }
}

export default withContext(StoreRelatedProducts);
