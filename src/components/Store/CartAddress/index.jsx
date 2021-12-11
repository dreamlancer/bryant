import React, { Component } from 'react';

export default class CartAddress extends Component {
  state = { address: null };
  static getDerivedStateFromProps(props, state) {
    if (props.address !== state.address) {
      return { address: props.address };
    }
    return null;
  }
  render() {
    const {
      state: { address },
      props: { selectStep, lang, text },
    } = this;
    return (
      <div className="cart-deliver-to">
        <div className="row">
          <div className="col-md-10 offset-md-2">
            <div
              className="point-label"
              dangerouslySetInnerHTML={{
                __html: text.deliver[lang]
                  ? text.deliver[lang]
                  : text.deliver['en'],
              }}
            />
            <div className="point-value">
              <div className="address-line-one">
                {`${address.country}, ${address.zone}, ${address.city}`}
              </div>
              <div className="address-line-one">{address.address_1}</div>
              <div className="address-line-two">{address.address_2}</div>
              <div className="address-line-two">{address.postcode}</div>
              <button
                className="change-address-btn highlight"
                onClick={() => selectStep(1)}
                dangerouslySetInnerHTML={{
                  __html: text.changeAddress[lang]
                    ? text.changeAddress[lang]
                    : text.changeAddress['en'],
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
