/* global $ Sirv */
import React from 'react';
import Loadable from 'react-loadable';
import StarRatings from 'react-star-ratings';
import { Link } from 'gatsby';
import { ReactTypeformEmbed } from 'react-typeform-embed';
import inView from 'js/in-view.min';

import ProductOptions from './ProductOptions';
import Seo from '../../Seo';
import withContext from '../../../helpers/withContext';
import ImagesModal from '../../ImagesModal';
import Loader from '../../Shared/Loader';
import { blue, darkblue } from '../../Shared/variables';
import PrimaryImage from './PrimaryImage';
import { telHref, whatsAppHref } from '../../../helpers/actionUrls';
import { OFFICE_NUMBER, MOBILE_NUMBER } from '../../../constants/phoneNumbers';
import formatPrice from '../../../helpers/formatPrice';

import smoothscroll from 'smoothscroll-polyfill';
import text from '../../../text/components/store/productPage.text';

import ReactModal from 'react-modal';
import disableScroll from 'disable-scroll';
import WriteModal from '../../ReviewsList/WriteModal';

if (typeof window !== 'undefined') {
  smoothscroll.polyfill();
  window.__forceSmoothScrollPolyfill__ = true;
}

const LoadableGlobalMap = Loadable({
  loader: () => import('../../GlobalMap'),
  loading() {
    return <Loader />;
  },
});

const LoadableStoreRelatedProducts = Loadable({
  loader: () => import('../../StoreRelatedProducts'),
  loading() {
    return <Loader />;
  },
});

const LoadableRating = Loadable({
  loader: () => import('../../Rating'),
  loading() {
    return <Loader />;
  },
});

let pageFooter = null;
let timeout = null;
let timeout2 = null;

class ProductPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputError: null,
      engravingTextId: null,
      engraving: 0,
      writeReview: false,
      button: 'loading',
      isImagesModalOpen: false,
      isRecurring: false,
      item: null,
      loading: true,
      modalImageIndex: 0,
      nonRecurring: null,
      optionRecurringId: null,
      options: {},
      optionsPrice: 0,
      product: null,
      recurringId: null,
      recurringPrice: 0,
      recurringState: false,
      recurringTotal: 0,
      shippingPrices: null,
    };
  }

  componentDidMount() {
    Sirv.start();

    timeout = setTimeout(() => {
      $('.page-container').addClass('show');
    }, 100);

    // Start inview to fade in/out elements on page
    inView({
      selector: '.lazy-show',
      enter: el => {
        if (el.classList.contains('product-page-wrapper')) {
          el.classList.add('page-loaded');
        } else {
          el.classList.add('entered');
        }
      },
      offset: 0.4,
      exit: el => {
        el.classList.remove('entered');
      },
    });

    const shopFooter = document.querySelector('.store-page-buy-footer');
    const shopFooterHeight = shopFooter ? shopFooter.offsetHeight : 0;
    pageFooter = document.querySelector('.lower-footer');
    pageFooter.style.paddingBottom = `${shopFooterHeight}px`;
  }

  static getDerivedStateFromProps(props, state) {
    if (props.store.products === null) {
      return null;
    }

    const product = props.store.getProduct('url', props.item);

    if (
      product !== state.product ||
      props.item !== state.item ||
      props.store.recurringTotal !== state.recurringTotal
    ) {
      let options = {};
      let optionsPrice = 0;
      let optionRecurringId = null;

      const isRecurring = product ? product.recurrings.length !== 0 : null;
      let recurringPrice = 0;
      if (isRecurring && product) {
        recurringPrice = product.recurrings[0].text_formatted.split(
          ' every'
        )[0];
      }
      const recurringId =
        isRecurring && product ? product.recurrings[0].recurring_id : null;
      const productPageWrapper = document.querySelector(
        '.product-page-wrapper'
      );
      if (productPageWrapper) {
        productPageWrapper.classList.add('page-loaded');
      }

      if (isRecurring) {
        const recOption = product.options.filter(
          option => option.name === 'Recurring'
        );

        if (recOption && recOption.length > 0) {
          options = {
            [recOption[0].product_option_id]:
              recOption[0].option_value[0].product_option_value_id,
          };
          optionsPrice = recOption[0].option_value[0].price;
          optionRecurringId = recOption[0].product_option_id;
        }
      }

      let shippingPrices = state.shippingPrices;
      if (props.store.shippingPrices !== shippingPrices) {
        shippingPrices = props.store.shippingPrices;
      }

      return {
        isRecurring,
        item: props.item,
        nonRecurring: { options, optionsPrice },
        optionRecurringId,
        options,
        optionsPrice,
        product,
        shippingPrices,
        recurringId,
        recurringPrice,
        recurringTotal: props.store.recurringTotal,
      };
    }

    if (props.store.shippingPrices !== state.shippingPrices) {
      return { shippingPrices: props.store.shippingPrices };
    }

    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.product !== this.state.product) {
      this.props.store.loaded(false);
    }
  }

  componentWillUnmount() {
    clearTimeout(timeout);
    clearTimeout(timeout2);

    if (pageFooter) {
      pageFooter.style.paddingBottom = '0px';
    }
  }

  renderStars = rating => {
    return (
      <StarRatings
        rating={rating}
        starRatedColor={blue}
        starEmptyColor={darkblue}
        numberOfStars={5}
        name="rating"
        starDimension="19px"
        starSpacing="2px"
      />
    );
  };

  addItemToCart = () => {
    const {
      product,
      options,
      recurringState,
      recurringId,
      engraving,
      engravingTextId,
    } = this.state;
    const { addItemToCart } = this.props.store;
    this.setState({
      button: 'loading',
    });
    if (
      engraving &&
      options[engraving] !== null &&
      options[engraving] !== undefined
    ) {
      if (!engravingTextId) {
        this.setState(
          {
            inputError: 'Please enter an engraving text.',
            button: 'error',
          },
          () => {
            timeout2 = setTimeout(() => this.setState({ button: '' }), 3000);
          }
        );
        return;
      } else if (
        !options[engravingTextId] ||
        options[engravingTextId] === undefined ||
        options[engravingTextId] === ''
      ) {
        this.setState(
          {
            inputError: 'Please enter an engraving text.',
            button: 'error',
          },
          () => {
            timeout2 = setTimeout(() => this.setState({ button: '' }), 3000);
          }
        );
        return;
      }
    }

    const body = {
      product,
      quantity: 1,
      options,
      recurring: recurringState ? recurringId : null,
    };
    addItemToCart(body).then(({ type, err }) => {
      this.setState(
        {
          button: type && type === 'error' ? 'error' : 'success',
          inputError:
            type && type === 'error' ? err.response.data.error[0] : null,
        },
        () => {
          timeout2 = setTimeout(() => this.setState({ button: '' }), 3000);
        }
      );
    });
  };

  renderAddToCartButton = () => {
    const { button, recurringState, product } = this.state;
    let buttonText = recurringState ? 'subscribe' : 'add to cart';

    if (button === 'success') {
      buttonText = 'added in cart';
    } else if (button === 'error') {
      buttonText = 'try again';
    }

    return (
      <button
        disabled={button === 'disabled' || (product && product.quantity === 0)}
        className={`btn blue-btn add-to-cart-btn ${button}`}
        onClick={this.addItemToCart}
      >
        {buttonText}
      </button>
    );
  };

  toggleRecurringState = () => {
    const {
      recurringState,
      options,
      nonRecurring,
      optionRecurringId,
      optionsPrice,
    } = this.state;
    let newOptions = { ...options };
    let newOptionsPrice = optionsPrice;

    if (!recurringState) {
      newOptions[optionRecurringId] = null;
      newOptionsPrice = optionsPrice - nonRecurring.optionsPrice;
    } else {
      newOptions = nonRecurring.options;
      newOptionsPrice = nonRecurring.optionsPrice;
    }

    this.setState({
      recurringState: !recurringState,
      optionsPrice: newOptionsPrice,
      options: newOptions,
    });
  };

  renderRecurringButton = () => {
    const { recurringState, product } = this.state;
    if (!product) return '';
    if (product.recurrings.length === 0) return '';
    return (
      <input
        className="apple-switch"
        type="checkbox"
        value={recurringState}
        checked={recurringState}
        onChange={this.toggleRecurringState}
      />
    );
  };

  getShippingPrices = () => {
    let uk = 0;
    let eu = 0;
    let rest = 0;
    const { shippingPrices } = this.state;
    const {
      store: { lang },
    } = this.props;
    if (shippingPrices) {
      const priceUk = shippingPrices.find(shipping =>
        shipping.title.toLowerCase().includes('uk')
      );
      if (priceUk) {
        const temp = priceUk.cost.match(/[0-9]*\.?[0-9]*/g).filter(e => !!e);
        if (temp && temp.length > 0) {
          uk =
            parseInt(temp[0]) === 0
              ? text.free[lang]
                ? text.free[lang]
                : text.free['en']
              : priceUk.cost;
        }
      }
    }

    if (shippingPrices) {
      const priceUk = shippingPrices.find(shipping =>
        shipping.title.toLowerCase().includes('eu')
      );
      if (priceUk) {
        const temp = priceUk.cost.match(/[0-9]*\.?[0-9]*/g).filter(e => !!e);
        if (temp && temp.length > 0) {
          eu =
            parseInt(temp[0]) === 0
              ? text.free[lang]
                ? text.free[lang]
                : text.free['en']
              : priceUk.cost;
        }
      }
    }

    if (shippingPrices) {
      const priceUk = shippingPrices.find(shipping =>
        shipping.title.toLowerCase().includes('world')
      );
      if (priceUk) {
        const temp = priceUk.cost.match(/[0-9]*\.?[0-9]*/g).filter(e => !!e);
        if (temp && temp.length > 0) {
          rest =
            parseInt(temp[0]) === 0
              ? text.free[lang]
                ? text.free[lang]
                : text.free['en']
              : priceUk.cost;
        }
      }
    }

    return [uk, eu, rest];
  };

  renderProductFooter = () => {
    const { cart, lang } = this.props.store;
    const total = cart ? cart.total.split('- ')[1] : 0;
    const [uk, eu, rest] = this.getShippingPrices();
    return (
      <div
        className={`store-page-buy-footer ${
          cart && cart.products && cart.products.length > 0
            ? 'active'
            : 'hide-footer'
        }`}
      >
        <div className="store-page-buy-footer-container">
          <div className="container">
            <div className="row">
              <div className="col-6 col-md-3 ">
                <div className="column-one-wrapper">
                  <i className="fas fa-phone d-none d-sm-block" />
                  <div className="column-text">
                    <div
                      className="column-title"
                      dangerouslySetInnerHTML={{
                        __html: text.getHelp[lang]
                          ? text.getHelp[lang]
                          : text.getHelp['en'],
                      }}
                    />
                    <a
                      href={telHref(MOBILE_NUMBER)}
                      className="font-black"
                      target="_blank"
                      rel="noopener"
                    >
                      {MOBILE_NUMBER}
                    </a>
                    <br />
                    Whatsapp:{' '}
                    <a
                      href={whatsAppHref(MOBILE_NUMBER)}
                      target="_blank"
                      rel="noopener"
                      dangerouslySetInnerHTML={{
                        __html: text.sendMessage[lang]
                          ? text.sendMessage[lang]
                          : text.sendMessage['en'],
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-6 col-md-3 order-3 order-md-2">
                <div className="column-text">
                  <div
                    className="column-title"
                    dangerouslySetInnerHTML={{
                      __html: text.pickUp[lang]
                        ? text.pickUp[lang]
                        : text.pickUp['en'],
                    }}
                  />
                  <p>Fetcham Park House Lower Road, Fetcham Surrey, KT22 9HD</p>
                </div>
              </div>
              <div className="col-6 col-md-2 order-4 order-md-3">
                <div className="column-three-wrapper">
                  <div className="column-text">
                    <div
                      className="column-title"
                      dangerouslySetInnerHTML={{
                        __html: text.shipping[lang]
                          ? text.shipping[lang]
                          : text.shipping['en'],
                      }}
                    />
                    <p>{`UK: ${uk}`}</p>
                    <p>{`Europe: ${eu}`}</p>
                    <p>{`World wide: ${rest}`}</p>
                  </div>
                </div>
              </div>
              <div className="col-6 col-md-4 order-3 order-md-4">
                <div className="buy-details-wrapper">
                  <div className="total-price">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: text.cartTotal[lang]
                          ? text.cartTotal[lang]
                          : text.cartTotal['en'],
                      }}
                    />
                    {total}
                  </div>
                  <Link className="btn btn-view-cart" to="/cart">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: text.viewCart[lang]
                          ? text.viewCart[lang]
                          : text.viewCart['en'],
                      }}
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  loadStatus = status => {
    this.setState({ loading: status });
    this.props.store.loaded(status);
  };

  setOptions = response => {
    const { price, optionObject } = response;
    const { options, optionsPrice } = this.state;
    this.setState({
      options: {
        ...options,
        ...optionObject,
      },
      optionsPrice: optionsPrice + price,
    });
  };

  setEngraving = val => {
    this.setState({ engraving: val });
  };

  resetError = () => {
    this.setState({ inputError: null });
  };

  setEngravingTextId = id => {
    const { engravingTextId } = this.state;
    if (!engravingTextId) {
      this.setState({ engravingTextId: id });
    }
  };

  renderOptions = () => {
    const { product, options, engraving, inputError } = this.state;
    const {
      store: { lang },
    } = this.props;

    return (
      <React.Fragment>
        {product.options &&
          product.options.map((option, index) => {
            if (option.name === 'Recurring') return;

            const engravingFlag =
              option.name === 'Engraving Text' &&
              (options[engraving] === null || options[engraving] === undefined);

            return (
              <div
                key={index}
                className={`section-wrapper ${
                  engravingFlag ? 'hide-section' : ''
                }`}
              >
                <div className="selection-container">
                  <h3 className="selection-title">{option.name}</h3>
                  <div className="selection-list">
                    {option.name === 'Battery Pack' &&
                      product.name === 'Ignis Wireless Headlight' && (
                        <div
                          key="0"
                          className="selection-box active"
                          title="2 Batteries"
                        >
                          <div
                            className="selection-box-title"
                            dangerouslySetInnerHTML={{
                              __html: text.battery[lang]
                                ? text.battery[lang]
                                : text.battery['en'],
                            }}
                          />
                          <div
                            className="selection-box-price"
                            dangerouslySetInnerHTML={{
                              __html: text.included[lang]
                                ? text.included[lang]
                                : text.included['en'],
                            }}
                          />
                        </div>
                      )}
                    <ProductOptions
                      inputError={inputError}
                      setEngravingTextId={this.setEngravingTextId}
                      resetError={this.resetError}
                      setEngraving={this.setEngraving}
                      option={option}
                      optionType={option.type}
                      options={option.option_value}
                      setOptions={this.setOptions}
                      optionId={option.product_option_id}
                      text={text}
                      lang={lang}
                    />
                  </div>
                  <div style={{ clear: 'both' }} />
                </div>

                <div
                  className="product-page-separator"
                  style={{ paddingTop: '40px' }}
                />
              </div>
            );
          })}
      </React.Fragment>
    );
  };

  renderAttributes = () => {
    const { product } = this.state;

    if (!product.attribute_groups) return;
    return (
      <React.Fragment>
        {product.attribute_groups.map((group, key) => {
          return (
            <div className="product-note" key={key}>
              <div className="product-note-title">{group.name}</div>
              <ul>
                {group.attribute.map((attribute, index) => {
                  return <li key={index}>{attribute.text}</li>;
                })}
              </ul>
            </div>
          );
        })}
      </React.Fragment>
    );
  };

  handleOpenModal = imageIndex => {
    this.setState({
      isImagesModalOpen: true,
      modalImageIndex: imageIndex,
    });
  };

  handleCloseModal = () => {
    this.setState({ isImagesModalOpen: false });
  };

  computeGalleryImages = product => {
    if (product && product.original_image && product.original_images) {
      return [product.original_image, ...product.original_images];
    }

    if (product && product.original_image) {
      return [product.original_image];
    }

    return undefined;
  };

  goToReviews = () => {
    const element = document.querySelector('#rating-trigger');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  stripHtml = html => {
    // Create a new div element
    var temporalDivElement = document.createElement('div');
    // Set the HTML content with the providen
    temporalDivElement.innerHTML = html;
    // Retrieve the text property of the element (cross-browser support)
    return temporalDivElement.textContent || temporalDivElement.innerText || '';
  };

  openForm = () => {
    this.typeformEmbed.typeform.open();
  };

  openWriteReview = () => {
    this.setState({ writeReview: true });
  };

  closeWriteReview = () => {
    disableScroll.off();
    this.setState({ writeReview: false });
  };

  render() {
    const {
      computeGalleryImages,
      handleCloseModal,
      handleOpenModal,
      closeWriteReview,
      openWriteReview,
      state: {
        entered,
        isImagesModalOpen,
        isRecurring,
        modalImageIndex,
        optionsPrice,
        product,
        recurringPrice,
        recurringState,
        writeReview,
      },
      props: {
        data,
        map,
        store: {
          isMobile,
          products,
          currencySymbol,
          continentCode,
          lang,
          addReview,
          addReviewLoading,
        },
        location,
      },
    } = this;
    const description =
      product &&
      product.description
        .split('\n')[0]
        .replace(/(<([^>]+)>)/gi, '')
        .replace('&nbsp;', '');
    // Get the value for recurring products. If price formated is 0 use options price
    let formatedPrice = product ? product.price_formated : 0;
    if (product) {
      let totalPrice = formatedPrice
        .match(/[0-9,]*\.?[0-9]*/g)
        .filter(e => !!e);

      if (recurringState && (totalPrice[0] === '0.00' || totalPrice[0] === 0)) {
        formatedPrice =
          currencySymbol !== '€'
            ? `${currencySymbol}${optionsPrice.toFixed(2)}`
            : `${optionsPrice.toFixed(2)}${currencySymbol}`;
      } else {
        totalPrice = parseFloat(totalPrice[0].replace(',', '')) + optionsPrice;
        if (totalPrice) {
          totalPrice = totalPrice.toFixed(2);
        }
        formatedPrice =
          currencySymbol !== '€'
            ? `${currencySymbol}${totalPrice}`
            : `${totalPrice}${currencySymbol}`;
      }
    }

    return (
      <div>
        {product && (
          <div>
            <Seo
              title={product.name}
              image={product.image}
              url={location.href}
              description="The world's lightest dental loupes; full arch even at 5x magnification. Innovative 3D scanning to render 32 million unique facial reference points to craft truly bespoke loupes. Get in touch with us to arrange a loupes demo anywhere in the UK or rest of the world."
            >
              <script type="application/ld+json">
                {`
                  {
                    "@context": "http://schema.org",
                    "@type": "Product",
                    "url": "${this.props.location.href}",
                    "name": "${product.name}",
                    "description": "${description}",
                    "brand": {
                      "@type": "Thing",
                      "name": "Bryant Dental: Loupes & Headlights"
                    },
                    "offers": {
                      "@type": "Offer",
                      "price": "${product.price}",
                      "priceCurrency": "GBP",
                      "url": "${this.props.location.href}",
                      "availability": "http://schema.org/InStock",
                      "sku": "${product.product_id}"
                    },
                    "image": "${product.image}"

                    ${product.reviews.review_total > 0 ? ',' : ''}
                    ${
                      product.reviews.review_total > 0
                        ? `
                          "aggregateRating": {
                            "@type": "AggregateRating",
                            "bestRating": "5",
                            "ratingValue": "${product.rating}",
                            "reviewCount": "${product.reviews.review_total}"
                          },
                          "review": [
                            ${product.reviews.reviews.map(
                              review =>
                                `{
                                "@type": "Review",
                                "author": "${review.author}",
                                "datePublished": "${review.date_added}",
                                "reviewBody": "${review.text}",
                                "reviewRating": {
                                  "@type": "Rating",
                                  "bestRating": "5",
                                  "ratingValue": "${review.rating}",
                                  "worstRating": "1"
                                }
                              }`
                            )}
                          ]`
                        : ''
                    }
                  }
                `}
              </script>
            </Seo>
          </div>
        )}

        <ImagesModal
          imageIndexClicked={modalImageIndex}
          images={computeGalleryImages(product)}
          isModalOpen={isImagesModalOpen}
          onOpenModal={handleOpenModal}
          onCloseModal={handleCloseModal}
          isMobile={isMobile}
        />

        <div
          className={`product-page-wrapper lazy-show ${
            entered ? 'entered' : ''
          }`}
        >
          <div className="product-page page-container">
            <section className="product-container">
              {product && (
                <div className="container">
                  <Link
                    className="back-to-store-button-wrapper"
                    to="/bryant-store/all"
                  >
                    <i className="fas fa-chevron-left" />
                    <span
                      className="btn-back-to-store"
                      dangerouslySetInnerHTML={{
                        __html: text.backToStore[lang]
                          ? text.backToStore[lang]
                          : text.backToStore['en'],
                      }}
                    />
                  </Link>
                  <div className="row">
                    <div className="col-md-5">
                      <div className="product-images-container">
                        <div className="product-images">
                          <div
                            className="product-image full d-block d-md-none"
                            style={{
                              backgroundImage: `url(${product.original_image})`,
                            }}
                            onClick={() => handleOpenModal(0)}
                          />

                          <div className="d-none d-md-block">
                            <PrimaryImage
                              image={product.original_image}
                              onImageClick={() => handleOpenModal(0)}
                            />
                          </div>

                          {product.original_images.length > 0 && (
                            <div className="other-images">
                              {product.original_images.map((image, index) => {
                                return (
                                  <div
                                    key={index}
                                    className="product-image half"
                                    style={{
                                      backgroundImage: `url(${image})`,
                                    }}
                                    onClick={() => handleOpenModal(index + 1)}
                                  />
                                );
                              })}
                            </div>
                          )}
                        </div>
                        <div style={{ clear: 'both' }} />
                        <div className="product-images-note">
                          <div className="note">
                            <span
                              dangerouslySetInnerHTML={{
                                __html: text.moreInfo[lang]
                                  ? text.moreInfo[lang]
                                  : text.moreInfo['en'],
                              }}
                            />{' '}
                            <a href={telHref(OFFICE_NUMBER)}>{OFFICE_NUMBER}</a>{' '}
                            <span
                              dangerouslySetInnerHTML={{
                                __html: text.or[lang]
                                  ? text.or[lang]
                                  : text.or['en'],
                              }}
                            />{' '}
                            <button
                              className="highlight"
                              style={{ padding: '0' }}
                              onClick={() => Intercom('showNewMessage', '.')}
                            >
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: text.requestCall[lang]
                                    ? text.requestCall[lang]
                                    : text.requestCall['en'],
                                }}
                              />
                            </button>
                            .
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-7">
                      <div className="product-content-container">
                        <h2 className="product-title">{product.name}</h2>
                        <div
                          className="product-description"
                          dangerouslySetInnerHTML={{
                            __html: product.description,
                          }}
                        />
                        {product && product.reviews.review_total > 0 && (
                          <div className="product-rating-wrapper">
                            <div className="rating-indicator-stars">
                              {this.renderStars(product.rating)}
                            </div>
                            <div
                              className="rating-indicator-reviews"
                              onClick={this.goToReviews}
                            >
                              {product.reviews.review_total}{' '}
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: text.reviews[lang]
                                    ? text.reviews[lang]
                                    : text.reviews['en'],
                                }}
                              />
                            </div>
                          </div>
                        )}
                        <button
                          onClick={openWriteReview}
                          className="btn write-review-btn"
                        >
                          Add review
                        </button>

                        {this.renderOptions()}

                        {product &&
                        product.name === 'Ignis Wireless Headlight' ? (
                          <button
                            className="btn blue-btn"
                            style={{ marginTop: '25px' }}
                            onClick={this.openForm}
                            dangerouslySetInnerHTML={{
                              __html: text.joinWaitingList[lang]
                                ? text.joinWaitingList[lang]
                                : text.joinWaitingList['en'],
                            }}
                          />
                        ) : (
                          <div className="row">
                            <div className="col-12 col-lg-8 order-2 order-lg-1">
                              <div className="product-price-total">
                                {product && product.quantity === 0
                                  ? 'Out of stock'
                                  : `Price: ${
                                      recurringState
                                        ? `${recurringPrice}/mo`
                                        : formatedPrice
                                    }
                                `}
                                {continentCode === 'EU' && (
                                  <span
                                    className="vat-label"
                                    dangerouslySetInnerHTML={{
                                      __html: text.vatIncluded[lang]
                                        ? text.vatIncluded[lang]
                                        : text.vatIncluded['en'],
                                    }}
                                  />
                                )}
                              </div>
                              {this.renderAddToCartButton()}
                            </div>
                            {isRecurring && (
                              <div className="col-12 col-lg-4 order-1 order-lg-2">
                                <div
                                  className="product-recurring"
                                  dangerouslySetInnerHTML={{
                                    __html: text.monthly[lang]
                                      ? text.monthly[lang]
                                      : text.monthly['en'],
                                  }}
                                />
                                {this.renderRecurringButton()}
                              </div>
                            )}
                          </div>
                        )}

                        <div
                          className="product-page-separator"
                          style={{ paddingTop: '25px' }}
                        />
                        {this.renderAttributes()}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </section>

            <section
              className="lights-go-to-store lazy-show"
              style={{ backgroundColor: 'black' }}
            >
              <div className="container lazy-title">
                <div
                  className="lights-go-to-store-title"
                  style={{ color: 'white' }}
                  dangerouslySetInnerHTML={{
                    __html: text.ignisTitle[lang]
                      ? text.ignisTitle[lang]
                      : text.ignisTitle['en'],
                  }}
                />
              </div>
              <div className="image-wrapper">
                <img
                  className="lazy-content"
                  src="https://chanappr.sirv.com/Bryant-dental/global/lights-page/new-lights.png?q=100"
                  alt="Bryant Dental Lights"
                  title="Bryant Dental Lights"
                />
              </div>
            </section>

            <LoadableStoreRelatedProducts
              inverted
              isMobile={isMobile}
              data={data}
              products={products}
            />

            <LoadableGlobalMap mapImg={map.childImageSharp.fluid} />

            <div
              id="rating-trigger"
              style={{ height: '1px', background: 'black' }}
            />
            <LoadableRating product={product} productReview />
          </div>

          {this.renderProductFooter()}
        </div>
        <div className="ExamplePopup">
          <ReactTypeformEmbed
            popup={true}
            autoOpen={false}
            url={'https://bryantdental.typeform.com/to/pXuiLy'}
            hideHeaders={true}
            hideFooter={true}
            buttonText="Go!"
            style={{ position: 'relative' }}
            ref={tf => (this.typeformEmbed = tf)}
          />
        </div>

        <ReactModal
          isOpen={writeReview}
          ariaHideApp={false}
          onAfterOpen={() => disableScroll.on()}
          onRequestClose={closeWriteReview}
          shouldCloseOnOverlayClick
          shouldCloseOnEsc
        >
          <WriteModal
            closeWriteReview={closeWriteReview}
            products={[product]}
            addReview={addReview}
            addReviewLoading={addReviewLoading}
            lang={lang}
          />
        </ReactModal>
      </div>
    );
  }
}

export default withContext(ProductPage);
