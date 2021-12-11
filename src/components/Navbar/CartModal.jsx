import React, { Component } from 'react';
import { navigate } from 'gatsby';
import {
  CartModalWrapperCss,
  CartItemsCss,
  NoItemsCss,
  CartSpacerCss,
  CartFooterCss,
  TotalCss,
  CartTitleCss,
  TotalWrapperCss,
} from './CartModal.css';
import CartItem from './CartItem';
import Button from '../Shared/Button';

class CartModal extends Component {
  handleNoClick = e => {
    e.stopPropagation();
  };

  navigateCheckout = () => {
    this.props.closeAllModals();
    navigate('/checkout');
  };

  render() {
    const { isOpen, cart, navbarHeight, currencySymbol } = this.props;
    let total = 0;
    if (cart) {
      [total] = cart.totals.filter(
        value => value.title.toLowerCase() === 'total'
      );
    }
    return (
      <CartModalWrapperCss
        active={isOpen}
        onClick={this.handleNoClick}
        navbarHeight={navbarHeight}
      >
        <div className="cart-inner-wrapper">
          <CartTitleCss>CART</CartTitleCss>

          <CartItemsCss>{this.renderCartItems()}</CartItemsCss>
          <CartSpacerCss />
          <CartFooterCss>
            <Button type="secondary" onClick={this.navigateCheckout}>
              CHECKOUT
            </Button>
            <TotalCss web>TOTAL</TotalCss>
            <TotalCss web>{total.text || `${currencySymbol}0`}</TotalCss>
            <TotalWrapperCss>
              <TotalCss>TOTAL</TotalCss>
              <TotalCss>{total.text || `${currencySymbol}0`}</TotalCss>
            </TotalWrapperCss>
          </CartFooterCss>
        </div>
      </CartModalWrapperCss>
    );
  }

  renderCartItems() {
    const { cart } = this.props;

    if (!cart || cart.products.length === 0) {
      return <NoItemsCss>Your cart is empty.</NoItemsCss>;
    } else {
      return cart.products.map(item => {
        return <CartItem item={item} key={item.key} />;
      });
    }
  }
}

export default CartModal;
