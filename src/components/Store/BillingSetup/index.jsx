import React, { Component } from 'react';
import ModalStripePayment from './ModalStripePayment';

class BillingSetup extends Component {
  render() {
    const {
      active,
      stripePayment,
      orderConfirm,
      address,
      loadingButton,
      text,
      lang,
    } = this.props;
    return (
      <div className={`${active === 3 ? 'show' : 'hidden'}`}>
        <div className="cart-delivery-setup-row" style={{ border: 'none' }}>
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div
                className="row-name"
                dangerouslySetInnerHTML={{
                  __html: text.paymentType[lang]
                    ? text.paymentType[lang]
                    : text.paymentType['en'],
                }}
              />
              <ModalStripePayment
                stripePayment={stripePayment}
                orderConfirm={orderConfirm}
                address={address}
                loadingButton={loadingButton}
                text={text}
                lang={lang}
              />
            </div>
          </div>
          <div className="card-list">
            <div className="row">
              <div className="col-lg-8 offset-lg-2">
                <div className="card-list-content">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: text.weAccept[lang]
                        ? text.weAccept[lang]
                        : text.weAccept['en'],
                    }}
                  />
                  <div className="cards-wrapper">
                    <i className="fab fa-cc-visa" />
                    <i className="fab fa-cc-mastercard" />
                    <i className="fab fa-cc-amex" />
                    <i className="fab fa-cc-jcb" />
                    <i className="fab fa-cc-discover" />
                    <i className="fab fa-cc-diners-club" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BillingSetup;
