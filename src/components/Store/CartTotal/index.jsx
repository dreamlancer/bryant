import React, { Component } from 'react';
import { Link } from 'gatsby';
import Button from '../../Shared/FormButton';
import withContext from '../../../helpers/withContext';

class CartTotal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      recurringTotal: 0,
    };
  }

  static getDerivedStateFromProps(props, state) {
    const response = {};
    if (props.cart.total !== state.total) {
      response.total = props.cart.total;
    }
    if (props.store.recurringTotal !== state.recurringTotal) {
      response.recurringTotal = props.store.recurringTotal;
    }
    return response;
  }

  disableButton = () => {
    const { cart } = this.props;

    if (cart && cart.products.length > 0) {
      return false;
    }
    return true;
  };

  renderButton = () => {
    const { button, action, loadingButton, cart, lang, text } = this.props;
    if (button === 'checkout') {
      return (
        <Link
          to={action}
          className={`btn blue-btn 
            ${!cart || cart.products.length === 0 ? 'disabled' : ''}
          `}
        >
          <span
            dangerouslySetInnerHTML={{
              __html: text.checkout[lang]
                ? text.checkout[lang]
                : text.checkout['en'],
            }}
          />
        </Link>
      );
    } else if (button === 'next') {
      return (
        <Button
          onClick={action}
          className="btn blue-btn"
          disabled={this.disableButton()}
          loading={loadingButton}
        >
          <span
            dangerouslySetInnerHTML={{
              __html: text.next[lang] ? text.next[lang] : text.next['en'],
            }}
          />
        </Button>
      );
    }
    return null;
  };

  render() {
    const { text, lang } = this.props;
    const { total, recurringTotal } = this.state;

    return (
      <div className="cart-total">
        <div className="row">
          <div className="col-md-10 offset-md-2">
            <div className="clearfix">
              <div
                className="point-label"
                dangerouslySetInnerHTML={{
                  __html: text.total[lang]
                    ? text.total[lang]
                    : text.total['en'],
                }}
              />
              <div className="point-value">{total}</div>
            </div>
            {recurringTotal !== 0 && (
              <div className="clearfix monthly">
                <div
                  className="point-label"
                  dangerouslySetInnerHTML={{
                    __html: text.monthly[lang]
                      ? text.monthly[lang]
                      : text.monthly['en'],
                  }}
                />
                <div className="point-value">{recurringTotal}</div>
              </div>
            )}
          </div>
          <div className="col-12">
            <div className="actions">
              {/* <Link to="/">See our Financing Options ></Link> */}
              {/* <br /> */}
              {this.renderButton()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withContext(CartTotal);
