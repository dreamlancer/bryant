import React from 'react';
import { Link } from 'gatsby';
import withContext from '../../helpers/withContext';

let cartComponent = null;
let cartWrapper = null;

class CartModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cart: null,
      modalPositionLeft: 0,
      modalPositionTop: 0,
      isCartModalOpen: false,
      recurringTotal: 0,
    };
  }

  componentDidMount() {
    cartComponent = document.querySelector('.nav-item .cart');
    cartWrapper = document.querySelector('.navbar-wrapper');
  }

  static getDerivedStateFromProps(props, state) {
    const response = {};
    if (props.isCartModalOpen !== state.isCartModalOpen) {
      response.modalPositionLeft = cartComponent.getBoundingClientRect().x;
      response.modalPositionTop = cartWrapper.getBoundingClientRect().height;
    }
    if (props.store.recurringTotal !== state.recurringTotal) {
      response.recurringTotal = props.store.recurringTotal;
    }
    return response;
  }

  removeItem = item => {
    this.props.store.deleteCartItem(item);
  };

  renderItems = () => {
    const {
      cart,
      closeModal,
      store: { getProduct, lang },
      text,
    } = this.props;

    if (!cart || cart.products === 0) {
      return (
        <li className="no-items">
          <span
            dangerouslySetInnerHTML={{
              __html: text.emptyCart[lang]
                ? text.emptyCart[lang]
                : text.emptyCart['en'],
            }}
          />{' '}
          <Link to="/bryant-store/all" onClick={closeModal}>
            <span
              dangerouslySetInnerHTML={{
                __html: text.visitStore[lang]
                  ? text.visitStore[lang]
                  : text.visitStore['en'],
              }}
            />
          </Link>
          .
        </li>
      );
    }

    return [
      cart.products.map((cartItem, index) => {
        if (index >= 2) return '';
        const prod = getProduct('id', cartItem.product_id);
        if (!prod) return '';
        return (
          <li key={cartItem.key} className="cart-modal-list-item">
            <Link to={`/bryant-store/${prod.seo_url}`} onClick={closeModal}>
              <div
                className="cart-modal-list-item-image"
                style={{ backgroundImage: `url(${cartItem.thumb})` }}
              />
              <div className="cart-modal-list-item-details">
                <div className="title-wrapper">
                  <div className="title">{cartItem.name}</div>
                </div>
                <div className="price">
                  {cartItem.recurring
                    ? cartItem.recurring.text_formatted
                    : cartItem.price}
                </div>
              </div>
              <div className="cart-modal-clear-float" />
            </Link>
            <div className="quantity">Qty: {cartItem.quantity}</div>
            <div
              className="remove-btn"
              onClick={() => this.removeItem(cartItem)}
              dangerouslySetInnerHTML={{
                __html: text.remove[lang]
                  ? text.remove[lang]
                  : text.remove['en'],
              }}
            />
          </li>
        );
      }),
      cart.products.length > 2 && (
        <div className="more-items" key="100">
          <span>{`${cart.products.length - 2} more item(s)`}</span>
        </div>
      ),
    ];
  };

  getCartTotal = () => {
    let total = 0;
    const { cart } = this.props;
    if (cart) {
      cart.totals.map(price => {
        if (price.title === 'Total') {
          let value = price.text;
          if (value.includes('£')) {
            value = value.split('£')[1];
          } else if (value.includes('€')) {
            value = value.split('€')[0];
          } else if (value.includes('$')) {
            value = value.split('$')[1];
          }
          total = value.replace(',', '');
        }
      });
    }
    return parseInt(total);
  };

  render() {
    const {
      state: { modalPositionTop, modalPositionLeft, recurringTotal },
      props: { cart, isCartModalOpen, closeModal, currencySymbol, text, lang },
    } = this;
    const CART_MODAL_WIDTH = 394;
    const cartProducts = cart && cart.products ? cart.products.length : 0;
    return (
      <div
        className={`cart-modal ${isCartModalOpen ? 'open' : 'closed'}`}
        onClick={e => {
          e.stopPropagation();
        }}
        style={{
          left: `${modalPositionLeft - CART_MODAL_WIDTH}px`,
          top: `${modalPositionTop}px`,
        }}
      >
        <ul className="cart-modal-list">{this.renderItems()}</ul>
        {!cart || cart.products === 0 ? null : (
          <React.Fragment>
            <div className="cart-modal-total">
              <div
                className="left"
                dangerouslySetInnerHTML={{
                  __html: text.total[lang]
                    ? text.total[lang]
                    : text.total['en'],
                }}
              />
              <div className="right">
                {cart
                  ? cart.total
                  : currencySymbol !== '€'
                  ? `${currencySymbol}0`
                  : `0${currencySymbol}`}
              </div>
              <div className="cart-modal-clear-float" />
            </div>
            {recurringTotal !== 0 && (
              <div className="cart-modal-total">
                <div
                  className="left monthly"
                  dangerouslySetInnerHTML={{
                    __html: text.monthly[lang]
                      ? text.monthly[lang]
                      : text.monthly['en'],
                  }}
                />
                <div className="right">{recurringTotal}</div>
                <div className="cart-modal-clear-float" />
              </div>
            )}
            <div className="cart-modal-action">
              <Link
                className="btn btn-view-cart"
                to="/cart"
                onClick={closeModal}
              >
                <span
                  dangerouslySetInnerHTML={{
                    __html: text.viewCart[lang]
                      ? text.viewCart[lang]
                      : text.viewCart['en'],
                  }}
                />
              </Link>
              <Link
                className={`btn btn-check-out blue-btn 
                  ${cartProducts === 0 ? 'disabled' : ''}
                `}
                to="/checkout"
                onClick={closeModal}
              >
                <span
                  dangerouslySetInnerHTML={{
                    __html: text.checkOut[lang]
                      ? text.checkOut[lang]
                      : text.checkOut['en'],
                  }}
                />
              </Link>
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default withContext(CartModal);
