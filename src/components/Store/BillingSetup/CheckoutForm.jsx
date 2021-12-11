import React from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import Button from '../../Shared/FormButton';

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
      loading: false,
    };
  }
  handleSubmit = ev => {
    const {
      props: { stripePayment, orderConfirm, address, stripe },
    } = this;

    this.setState({ loading: true });

    ev.preventDefault();
    stripe
      .createSource({
        type: 'card',
        metadata: {
          order_id: orderConfirm.order_id,
          is_recurring: '0',
          payment_button: '0',
          store_id: orderConfirm.store_id,
        },
        owner: {
          address: {
            city: address.city,
            country: address.country,
            line1: address.address_1,
            line2: address.address_2,
            postal_code: address.postcode,
            state: null,
          },
          email: address.email,
          name: `${address.firstname} ${address.lastname}`,
          phone: address.telephone,
          verified_address: null,
          verified_email: null,
          verified_name: null,
          verified_phone: null,
        },
      })
      .then(token => {
        stripePayment(token);
        this.setState({ loading: false });
      });
  };

  render() {
    const { loadingButton, text, lang } = this.props;
    const { error, loading } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <h4 className="error">{error}</h4>
        <CardElement style={{ base: { fontSize: '18px' } }} hidePostalCode />
        <Button className="submit-button" loading={loadingButton || loading}>
          <span
            dangerouslySetInnerHTML={{
              __html: text.confirm[lang]
                ? text.confirm[lang]
                : text.confirm['en'],
            }}
          />
        </Button>
      </form>
    );
  }
}

export default injectStripe(CheckoutForm);
