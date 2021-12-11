import React, { Component } from 'react';
import { Link } from 'gatsby';
import CartItem from '../CartItem';

export default class CartItemsPreview extends Component {
  render() {
    const { cart, deleteCartItem, updateCartItem, lang, text } = this.props;

    if (!cart || cart.products.length === 0) {
      return (
        <div className="col-md-10 offset-md-2 empty-message">
          <h3
            dangerouslySetInnerHTML={{
              __html: text.emptyCart[lang]
                ? text.emptyCart[lang]
                : text.emptyCart['en'],
            }}
          />
          <Link to="/bryant-store/all">
            <span
              dangerouslySetInnerHTML={{
                __html: text.visitStore[lang]
                  ? text.visitStore[lang]
                  : text.visitStore['en'],
              }}
            />
          </Link>
        </div>
      );
    }

    return (
      <ul className="cart-item-list">
        {cart.products.map(item => (
          <CartItem
            item={item}
            key={item.key}
            deleteCartItem={deleteCartItem}
            updateCartItem={updateCartItem}
            text={text}
            lang={lang}
          />
        ))}
      </ul>
    );
  }
}
