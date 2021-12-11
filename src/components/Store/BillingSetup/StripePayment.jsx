import React, { Component } from 'react';
import { StripeProvider, Elements } from 'react-stripe-elements';

import CheckoutForm from './CheckoutForm';
import './stripe.scss';

class StripePayment extends Component {
  render() {
    const {
      props: { stripePayment },
    } = this;

    return (
      <div className="stripe-modal-content">
        <StripeProvider apiKey={process.env.STRIPE_KEY}>
          <Elements>
            <CheckoutForm stripePayment={stripePayment} />
          </Elements>
        </StripeProvider>
      </div>
    );
  }
}

export default StripePayment;
