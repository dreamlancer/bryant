import React, { Component } from 'react';
import { StripeProvider, Elements } from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';
import './stripe.scss';

class ModalStripePayment extends Component {
  render() {
    const {
      stripePayment,
      orderConfirm,
      address,
      loadingButton,
      text,
      lang,
    } = this.props;

    return (
      <div className="stripe-modal-content">
        <StripeProvider apiKey={process.env.STRIPE_KEY}>
          <Elements>
            <CheckoutForm
              stripePayment={stripePayment}
              orderConfirm={orderConfirm}
              address={address}
              loadingButton={loadingButton}
              text={text}
              lang={lang}
            />
          </Elements>
        </StripeProvider>
      </div>
    );
  }
}

export default ModalStripePayment;
