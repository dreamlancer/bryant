/* global $ Sirv */
import React from 'react';
import Loadable from 'react-loadable';
import { Link } from 'gatsby';

import Seo from '../components/Seo';
import withContext from '../helpers/withContext';
import CartPreview from '../components/Store/CartPreview';
import Loader from '../components/Shared/Loader';
import text from '../text/components/checkout.text';

const LoadableDeliverySetup = Loadable({
  loader: () => import('../components/Store/DeliverySetup'),
  loading() {
    return <Loader />;
  },
});

const LoadableBillingSetup = Loadable({
  loader: () => import('../components/Store/BillingSetup'),
  loading() {
    return <Loader />;
  },
});

const LoadableSuccess = Loadable({
  loader: () => import('../components/Store/Success'),
  loading() {
    return <Loader />;
  },
});

import inView from '../js/in-view.min';

let timeout;

class StoreCheckOutPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checkoutError: null,
      error: '',
      loading: true,
      selectedStepIndex: 0,
      highestStep: 0,
    };
  }

  componentDidMount() {
    Sirv.start();
    timeout = setTimeout(() => {
      $('.page-container').addClass('show');
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

  static getDerivedStateFromProps(props, state) {
    if (props.store.loading !== state.loading) {
      props.store.loaded(false);
      return { loading: props.store.loading };
    }

    if (props.store.checkoutError !== state.checkoutError) {
      return { checkoutError: props.store.checkoutError };
    }

    return null;
  }

  componentWillUnmount() {
    clearTimeout(timeout);
  }

  resetStep = () =>
    this.setState({ highestStep: this.state.selectedStepIndex });

  allowStep = (index, directSelect = false) => {
    const { address, cart } = this.props.store;
    const { highestStep } = this.state;

    // If we don't have cart or cart products don't increment the step
    if (index >= 1 && !(cart && cart.products.length !== 0)) {
      this.setState({ selectedStepIndex: 0 });
      return false;
    }

    // If we don't have address don't go to any steps 2 and 3
    if (index >= 2 && !address) {
      return false;
    }

    if (directSelect && index > highestStep) {
      return false;
    }

    return true;
  };

  selectStep = (index, directSelect = false) => {
    const { highestStep } = this.state;
    if (this.allowStep(index, directSelect)) {
      if (typeof window !== 'undefined') window.scrollTo(0, 0);
      this.setState({
        selectedStepIndex: index,
        highestStep: index > highestStep ? index : highestStep,
      });
    }
  };

  nextStep = () => {
    const { selectedStepIndex, highestStep } = this.state;
    const nextstep = selectedStepIndex + 1;

    if (this.allowStep(nextstep)) {
      if (nextstep === 3) {
        this.props.store.getPaymentMethods().then(res => {
          if (res === 'success') {
            if (typeof window !== 'undefined') window.scrollTo(0, 0);
            this.setState({
              selectedStepIndex: nextstep,
              highestStep: nextstep > highestStep ? nextstep : highestStep,
            });
          }
        });
      } else {
        if (typeof window !== 'undefined') window.scrollTo(0, 0);
        this.setState({
          selectedStepIndex: nextstep,
          highestStep: nextstep > highestStep ? nextstep : highestStep,
        });
      }
    }
  };

  handleStripePayment = token => {
    this.setState({ error: '' });
    const { stripePayment } = this.props.store;
    stripePayment(token).then(res => {
      if (!res) {
        this.setState({ error: 'Ops. Something went wrong!!!' });
      } else if (res.success && !res.error) {
        this.setState({ error: '' });
        this.nextStep();
      } else if (res.error && !res.success) {
        this.setState({ error: res.error });
      }
    });
  };

  render() {
    const {
      props: {
        store,
        store: {
          account,
          address,
          billingZones,
          cart,
          checkoutError,
          countries,
          couponError,
          createGuest,
          createGuestShipping,
          currencySymbol,
          deleteCartItem,
          existingAddresses,
          fetchCart,
          getCountries,
          getCoupon,
          getShippingAddress,
          getShippingMethods,
          getZones,
          isLoggedIn,
          lang,
          loadingButton,
          orderConfirm,
          setPaymentAddress,
          setPaymentAddressExisting,
          setShippingAddress,
          setShippingAddressExisting,
          shippingText,
          shippingType,
          updateCartItem,
          zones,
        },
      },
      handleStripePayment,
      nextStep,
      resetStep,
      selectStep,
      state: { selectedStepIndex, loading, error },
    } = this;

    return (
      <div className="check-out-page page-container">
        <Seo
          title="Checkout"
          url="checkout"
          description="The world's lightest dental loupes; full arch even at 5x magnification."
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
                      __html: text.description[lang]
                        ? text.description[lang]
                        : text.description['en'],
                    }}
                  />{' '}
                  <Link to="/returns">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: text.button[lang]
                          ? text.button[lang]
                          : text.button['en'],
                      }}
                    />
                  </Link>
                </div>
                {(error || checkoutError) && (
                  <div className="error-message">
                    <h4 className="error">{error || checkoutError}</h4>
                    <button
                      className="error-btn"
                      onClick={() => Intercom('showNewMessage', '.')}
                      dangerouslySetInnerHTML={{
                        __html: text.contactUs[lang]
                          ? text.contactUs[lang]
                          : text.contactUs['en'],
                      }}
                    />
                  </div>
                )}
              </div>
              <div className="steps-indicator">
                <div className="row">
                  <div className="col-10 offset-1">
                    <div className="timeline">
                      <div
                        className={`point ${
                          selectedStepIndex === 0 ? 'active' : ''
                        }`}
                        onClick={() => selectStep(0, true)}
                      >
                        <span
                          className="step"
                          dangerouslySetInnerHTML={{
                            __html: text.myOrder[lang]
                              ? text.myOrder[lang]
                              : text.myOrder['en'],
                          }}
                        />
                      </div>
                      <div
                        className={`point ${
                          selectedStepIndex === 1 ? 'active' : ''
                        }`}
                        onClick={() => selectStep(1, true)}
                      >
                        <span
                          className="step"
                          dangerouslySetInnerHTML={{
                            __html: text.delivery[lang]
                              ? text.delivery[lang]
                              : text.delivery['en'],
                          }}
                        />
                      </div>
                      <div
                        className={`point ${
                          selectedStepIndex === 2 ? 'active' : ''
                        }`}
                        onClick={() => selectStep(2, true)}
                      >
                        <span
                          className="step"
                          dangerouslySetInnerHTML={{
                            __html: text.confirmOrder[lang]
                              ? text.confirmOrder[lang]
                              : text.confirmOrder['en'],
                          }}
                        />
                      </div>
                      <div
                        className={`point ${
                          selectedStepIndex === 3 ? 'active' : ''
                        }`}
                        onClick={() => selectStep(3, true)}
                      >
                        <span
                          className="step"
                          dangerouslySetInnerHTML={{
                            __html: text.checkout[lang]
                              ? text.checkout[lang]
                              : text.checkout['en'],
                          }}
                        />
                      </div>
                      <div
                        className={`point ${
                          selectedStepIndex === 4 ? 'active' : ''
                        }`}
                        onClick={() => selectStep(4, true)}
                      >
                        <span
                          className="step"
                          dangerouslySetInnerHTML={{
                            __html: text.success[lang]
                              ? text.success[lang]
                              : text.success['en'],
                          }}
                        />
                      </div>
                      <div className="line" />
                    </div>
                  </div>
                </div>
              </div>

              {!loading && [
                <CartPreview
                  active={selectedStepIndex}
                  address={address}
                  cart={cart}
                  checkout
                  couponError={couponError}
                  currencySymbol={currencySymbol}
                  deleteCartItem={deleteCartItem}
                  fetchCart={fetchCart}
                  getCoupon={getCoupon}
                  isLoggedIn={isLoggedIn}
                  key="1"
                  loadingButton={loadingButton}
                  nextStep={nextStep}
                  selectStep={selectStep}
                  shippingText={shippingText}
                  shippingType={shippingType}
                  updateCartItem={updateCartItem}
                />,
                <LoadableDeliverySetup
                  account={account}
                  active={selectedStepIndex}
                  billingZones={billingZones}
                  countries={countries}
                  createGuest={createGuest}
                  createGuestShipping={createGuestShipping}
                  existingAddresses={existingAddresses}
                  getCountries={getCountries}
                  getShippingAddress={getShippingAddress}
                  getShippingMethods={getShippingMethods}
                  getZones={getZones}
                  isLoggedIn={isLoggedIn}
                  key="2"
                  lang={lang}
                  loadingButton={loadingButton}
                  nextStep={nextStep}
                  ref={this.deliveryRef}
                  resetStep={resetStep}
                  setPaymentAddress={setPaymentAddress}
                  setPaymentAddressExisting={setPaymentAddressExisting}
                  setShippingAddress={setShippingAddress}
                  setShippingAddressExisting={setShippingAddressExisting}
                  store={store}
                  text={text}
                  zones={zones}
                />,
                <LoadableBillingSetup
                  active={selectedStepIndex}
                  address={address}
                  key="3"
                  lang={lang}
                  loadingButton={loadingButton}
                  orderConfirm={orderConfirm}
                  stripePayment={handleStripePayment}
                  text={text}
                />,
                <LoadableSuccess active={selectedStepIndex} key="4" />,
              ]}
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default withContext(StoreCheckOutPage);
