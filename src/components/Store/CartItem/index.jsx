import React, { Component } from 'react';

export default class CartItem extends Component {
  constructor(props) {
    super(props);

    this.offerContainer = React.createRef();

    this.state = {
      quantity: props.item.quantity,
      offerCollapsed: true,
    };
  }

  handleQuantityChange = e => {
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
    this.handleUpdateCartItem(e);
  };

  handleUpdateCartItem = e => {
    const { updateCartItem, item, deleteCartItem } = this.props;
    const { quantity } = this.state;

    if (e.target.value <= 0) {
      deleteCartItem(item);
      return;
    }

    updateCartItem(item, quantity);
  };

  toggleSeeMore = () => {
    this.offerContainer.current.classList.toggle('closed');
    this.setState({
      offerCollapsed: !this.state.offerCollapsed,
    });
  };

  removeItem = item => {
    this.props.deleteCartItem(item);
  };

  render() {
    const { item, text, lang } = this.props;
    const { quantity, offerCollapsed } = this.state;
    let showOptions = false;
    let options = [];

    if (item.option && item.option.length > 0) {
      options = item.option.filter(option => option.name !== 'Recurring');
      showOptions = options.length > 0;
    }
    const recurringTotal = item.recurring
      ? item.recurring.text_formatted.split(' every')[0]
      : 0;

    return (
      <li key={item.key} className="cart-item">
        <div className="row">
          <div className="col-3 col-md-2">
            <div
              className="item-image"
              style={{ backgroundImage: `url(${item.thumb})` }}
            />
          </div>
          <div className="col-9 col-md-10">
            <div className="item-details">
              <div className="item-info">
                <div className="row">
                  <div className="col-12 col-md-6">
                    <div className="item-name">{item.name}</div>
                    {item.recurring && <h4>{item.recurring.text_formatted}</h4>}
                    {showOptions && (
                      <div className="item-inner-details">
                        <div className="details-toggler">
                          <button
                            className="highlight details-btn"
                            onClick={this.toggleSeeMore}
                          >
                            <span
                              dangerouslySetInnerHTML={{
                                __html: text.details[lang]
                                  ? text.details[lang]
                                  : text.details['en'],
                              }}
                            />{' '}
                            <i
                              className={`fas fa-angle-${
                                offerCollapsed ? 'up' : 'down'
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="item-quantity">
                      Qty:
                      <input
                        type="number"
                        className="quantity-field"
                        pattern="[0-9]*"
                        min="0"
                        maxLength="2"
                        value={quantity}
                        max="99"
                        onChange={this.handleQuantityChange}
                        onBlur={this.handleUpdateCartItem}
                        onKeyPress={this.handleEnter}
                      />
                    </div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="item-price">
                      <p>{item.recurring ? recurringTotal : item.total}</p>
                    </div>
                    <div
                      className="remove-btn"
                      onClick={() => this.removeItem(item)}
                      dangerouslySetInnerHTML={{
                        __html: text.remove[lang]
                          ? text.remove[lang]
                          : text.remove['en'],
                      }}
                    />
                  </div>
                  <div className="clearfix" />
                </div>
              </div>

              {showOptions && (
                <div className="item-offers" ref={this.offerContainer}>
                  {options.map((option, index) => {
                    return (
                      <div key={index} className="item-offer">
                        <div className="offer-name">
                          {option.name}: {option.value}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </li>
    );
  }
}
