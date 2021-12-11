import React, { Component } from 'react';

import CartItemsPreview from '../CartItemsPreview';
import CartSubtotal from '../CartSubtotal';
import CartTotal from '../CartTotal';
import CartAddress from '../CartAddress';

import LoginForm from '../../Account/LoginForm';
import text from '../../../text/components/cartPreview.text';
import withContext from '../../../helpers/withContext';

class CartPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: null,
      showForm: false,
    };
  }

  componentDidMount() {
    this.props.fetchCart();
  }

  static getDerivedStateFromProps(props, state) {
    if (props.address !== state.address) {
      return { address: props.address };
    }
    return null;
  }

  findTotalValue = prop => {
    const { cart } = this.props;
    if (!cart) return 0;
    let value = 0;

    const total = cart.totals.filter(price => {
      // Check if it has vat then get anything that contains vat
      if (prop.toLowerCase().includes('vat')) {
        return price.title.includes(prop);
      }
      return price.title === prop;
    });

    value = total && total.length > 0 && total[0].text;

    return value;
  };

  continueAsGuest = () => {
    this.setState({ showForm: true });
  };

  getRecurringTotal = () => {
    const { cart } = this.props;
    let total = 0;
    if (!cart) return 0;
    cart.products.map(prod => {
      if (prod.recurring) {
        total += parseFloat(prod.recurring.price_with_tax);
      }
    });
    return total;
  };

  render() {
    const {
      props: {
        active,
        cart,
        checkout,
        deleteCartItem,
        isLoggedIn,
        nextStep,
        selectStep,
        shippingText,
        store,
        store: { lang },
        updateCartItem,
        getCoupon,
        couponError,
        loadingButton,
        shippingType,
      },
      state: { address, showForm },
    } = this;

    const recurringTotal = this.getRecurringTotal();

    return (
      <div
        className={`${checkout &&
          (active === 0 || active === 2 ? 'active' : 'hidden')}`}
      >
        {checkout && !isLoggedIn && !showForm && (
          <div
            className="cart-delivery-setup-row"
            style={{ paddingBottom: '10rem' }}
          >
            <div className="row">
              <div className="col-md-7">
                <div className="login-wrapper">
                  <h2
                    dangerouslySetInnerHTML={{
                      __html: text.notLoggedIn[lang]
                        ? text.notLoggedIn[lang]
                        : text.notLoggedIn['en'],
                    }}
                  />
                  <LoginForm store={store} loadingButton={loadingButton} />
                  <br />
                </div>
              </div>
              <div className="col-md-1">
                <div className="separator d-none d-md-block" />
              </div>
              <div className="col-md-4">
                <div className="login-wrapper">
                  <h3>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: text.or[lang] ? text.or[lang] : text.or['en'],
                      }}
                    />{' '}
                    <button
                      className="highlight guest-btn"
                      onClick={this.continueAsGuest}
                      disabled={recurringTotal !== 0}
                      dangerouslySetInnerHTML={{
                        __html: text.continueAsGuest[lang]
                          ? text.continueAsGuest[lang]
                          : text.continueAsGuest['en'],
                      }}
                    />
                    {recurringTotal !== 0 && (
                      <p
                        className="info"
                        dangerouslySetInnerHTML={{
                          __html: text.needToBeLoggedIn[lang]
                            ? text.needToBeLoggedIn[lang]
                            : text.needToBeLoggedIn['en'],
                        }}
                      />
                    )}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        )}
        {(showForm || isLoggedIn || !checkout) && (
          <React.Fragment>
            <CartItemsPreview
              active={active}
              cart={cart}
              deleteCartItem={deleteCartItem}
              updateCartItem={updateCartItem}
              lang={lang}
              text={text}
            />

            {cart && cart.products.length !== 0 && (
              <CartSubtotal
                address={address}
                active={active}
                findTotalValue={this.findTotalValue}
                shippingText={shippingText}
                getCoupon={getCoupon}
                couponError={couponError}
                recurringTotal={recurringTotal}
                lang={lang}
                text={text}
              />
            )}

            {address &&
              active !== 0 &&
              shippingType &&
              shippingType !== 'collect' && (
                <CartAddress
                  address={address}
                  selectStep={selectStep}
                  shippingType={shippingType}
                  lang={lang}
                  text={text}
                />
              )}

            {cart && cart.products.length !== 0 && (
              <CartTotal
                address={address}
                cart={cart}
                button={checkout ? 'next' : 'checkout'}
                action={checkout ? nextStep : '/checkout'}
                findTotalValue={this.findTotalValue}
                loadingButton={loadingButton}
                recurringTotal={recurringTotal}
                lang={lang}
                text={text}
              />
            )}
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default withContext(CartPreview);
