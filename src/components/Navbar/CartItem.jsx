import React, { Component } from 'react';
import { Link } from 'gatsby';
import withContext from '../../helpers/withContext';
import {
  CartItemCss,
  ItemImageCss,
  ItemNameCss,
  ItemPriceCss,
  ItemDescriptionCss,
  ItemCounterCss,
  CountArrowCss,
  CountCss,
} from './CartModal.css';

import CartArrowUp from '!svg-react-loader!../../../static/images/cart-arrow-up.svg';
import CartArrowDown from '!svg-react-loader!../../../static/images/cart-arrow-down.svg';

class CartItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: props.item.quantity,
    };
  }

  render() {
    const { item } = this.props;
    const { quantity } = this.state;
    return (
      <CartItemCss key={item.key}>
        <ItemImageCss imgSrc={item.thumb} />
        <ItemDescriptionCss>
          <ItemNameCss>{item.name}</ItemNameCss>
          <ItemPriceCss>
            {item.recurring ? item.recurring.text_formatted : item.price}
          </ItemPriceCss>
        </ItemDescriptionCss>
        <ItemCounterCss>
          <CountArrowCss onClick={() => this.updateQuantity(1)}>
            <CartArrowUp />
          </CountArrowCss>
          <CountCss
            maxLength="2"
            min="0"
            onChange={this.handleChangeQuantity}
            onBlur={this.handleUpdateCartItem}
            onKeyPress={this.handleEnter}
            pattern="[0-9]*"
            step="1"
            type="number"
            value={quantity}
          />
          <CountArrowCss onClick={() => this.updateQuantity(-1)}>
            <CartArrowDown />
          </CountArrowCss>
        </ItemCounterCss>
      </CartItemCss>
    );
  }

  updateQuantity = cnt => {
    this.setState(
      {
        quantity: Number(this.state.quantity) + Number(cnt),
      },
      () => {
        this.handleUpdateCartItem();
      }
    );
  };

  handleChangeQuantity = e => {
    let fieldValue = parseInt(e.target.value, 10);

    if (fieldValue === '' || fieldValue <= 0) {
      fieldValue = 0;
    }

    if (fieldValue > 99) {
      fieldValue = 99;
    }

    this.setState({
      quantity: fieldValue,
    });
  };

  handleEnter = e => {
    if (e.key !== 'Enter') return;
    this.handleUpdateCartItem();
  };

  handleUpdateCartItem = () => {
    const {
      item,
      store: { deleteCartItem, updateCartItem },
    } = this.props;

    const { quantity } = this.state;

    if (quantity <= 0) {
      deleteCartItem(item);
      return;
    }

    updateCartItem(item, quantity);
  };
}

export default withContext(CartItem);
