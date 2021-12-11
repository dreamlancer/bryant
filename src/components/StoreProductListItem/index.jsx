import React from 'react';
import { navigate } from 'gatsby';
import formatPrice from '../../helpers/formatPrice';
import withContext from '../../helpers/withContext';
import text from '../../text/components/store/storeProductListItem.text';

class StoreProductListItem extends React.Component {
  renderProductPrice = () => {
    const {
      product,
      currencySymbol,
      store: { lang },
    } = this.props;
    let optionPrice = 0;
    if (product.options) {
      product.options.map(option => {
        if (option.name === 'Recurring') {
          option.option_value.map(opt => {
            optionPrice += opt.price;
          });
        }
      });
    }
    if (product.quantity === 0) {
      return text.outOfStock[lang]
        ? text.outOfStock[lang]
        : text.outOfStock['en'];
    } else if (product.name === 'Ignis Wireless Headlight') {
      return text.joinWaitingList[lang]
        ? text.joinWaitingList[lang]
        : text.joinWaitingList['en'];
    } else {
      let displayPrice = product.price_formated;
      const recurringPrice = displayPrice
        .match(/[0-9]*\.?[0-9]*/g)
        .filter(e => !!e);
      if (recurringPrice[0] === '0.00' || recurringPrice[0] === 0) {
        displayPrice =
          currencySymbol !== '€'
            ? `${currencySymbol}${optionPrice.toFixed(2)}`
            : `${optionPrice.toFixed(2)}${currencySymbol}`;
      }
      return displayPrice;
    }
  };

  render() {
    const { product, isSelected } = this.props;

    return (
      <button
        data-src={`bryant-store/${product.seo_url}`}
        className="related-item"
        onClick={() => navigate(`bryant-store/${product.seo_url}`)}
      >
        <div className={`product-box ${isSelected ? 'active' : ''}`}>
          <div
            className="product-image"
            ref={this.image}
            style={{
              backgroundImage: `url(${product.image})`,
            }}
          />
          <h5 className="product-name">{product.name}</h5>
          <p className="product-price">{this.renderProductPrice()}</p>
        </div>
      </button>
    );
  }
}

export default withContext(StoreProductListItem);
