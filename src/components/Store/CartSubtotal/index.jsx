import React, { Component } from 'react';
import withContext from '../../../helpers/withContext';

class CartSubtotal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subTotalWithVat: 0,
      subTotal: 0,
      totalVat: 0,
      showPromoCode: false,
      address: null,
      shippingText: '0',
      promoText: '',
      promoCode: null,
      promoValue: null,
      continentCode: null,
    };
  }

  static getDerivedStateFromProps(props, state) {
    const subTotal = props.findTotalValue('Sub-Total');
    const totalVat = props.findTotalValue('VAT');

    function getPriceValue(value) {
      if (!value) return null;

      const price = value.match(/[0-9]*\.?[0-9]*/g).filter(e => !!e);
      return price.length > 0 ? parseFloat(price[0]) : null;
    }

    if (
      subTotal !== state.subTotal ||
      totalVat !== state.totalVat ||
      props.shippingText !== state.shippingText
    ) {
      const currencySymbol = props.store.currencySymbol;
      let subTotalWithVat = getPriceValue(totalVat) + getPriceValue(subTotal);

      subTotalWithVat =
        currencySymbol !== '€'
          ? `${props.store.currencySymbol}${subTotalWithVat.toFixed(2)}`
          : `${subTotalWithVat.toFixed(2)}${props.store.currencySymbol}`;
      return {
        subTotalWithVat,
        subTotal,
        totalVat,
        shippingText: props.shippingText,
      };
    }

    if (props.address !== state.address) {
      return { address: props.address };
    }

    if (props.store.continentCode !== state.continentCode) {
      return { continentCode: props.store.continentCode };
    }

    if (state.promoCode && !state.promoValue) {
      return { promoValue: props.findTotalValue(state.promoCode) };
    }

    return null;
  }

  sendCoupon = () => {
    const { getCoupon } = this.props;
    const { promoText } = this.state;
    getCoupon(promoText).then(res => {
      if (res !== 'error') {
        this.setState({
          promoText: '',
          showPromoCode: false,
          promoCode: res.message && res.message.length > 0 && res.message[0],
        });
      }
    });
  };

  changePromo = e => {
    const { value } = e.target;
    e.preventDefault();
    e.stopPropagation();

    this.setState({
      promoText: value.toUpperCase(),
    });
  };

  openCoupon = e => {
    e.preventDefault();
    e.stopPropagation();
    window.addEventListener('click', this.closeCoupon);
    this.setState({ showPromoCode: !this.state.showPromoCode });
  };

  closeCoupon = () => {
    this.setState({ showPromoCode: false });
  };

  render() {
    const { couponError, text, lang } = this.props;
    const {
      subTotalWithVat,
      subTotal,
      totalVat,
      shippingText,
      promoText,
      promoValue,
      continentCode,
    } = this.state;

    return (
      <div className="cart-sub-total">
        <div className="row">
          <div className="col-md-10 offset-md-2">
            <ul>
              <li className="clearfix">
                <div
                  className="point-label"
                  dangerouslySetInnerHTML={{
                    __html: text.subtotal[lang]
                      ? text.subtotal[lang]
                      : text.subtotal['en'],
                  }}
                />
                <div className="point-value">
                  {continentCode === 'EU' ? subTotal : subTotalWithVat}
                </div>
              </li>
              {shippingText && (
                <li className="clearfix">
                  <div
                    className="point-label"
                    dangerouslySetInnerHTML={{
                      __html: text.shipping[lang]
                        ? text.shipping[lang]
                        : text.shipping['en'],
                    }}
                  />
                  <div className="point-value">
                    {shippingText === '£0'
                      ? text.free[lang]
                        ? text.free[lang]
                        : text.free['en']
                      : shippingText}
                  </div>
                </li>
              )}
              {continentCode === 'EU' ? (
                <li className="clearfix">
                  <div
                    className="point-label"
                    dangerouslySetInnerHTML={{
                      __html: text.vat[lang] ? text.vat[lang] : text.vat['en'],
                    }}
                  />
                  <div className="point-value">{totalVat || 0}</div>
                </li>
              ) : (
                <li className="clearfix">
                  <div
                    className="point-label"
                    dangerouslySetInnerHTML={{
                      __html: text.importDuty[lang]
                        ? text.importDuty[lang]
                        : text.importDuty['en'],
                    }}
                  />
                </li>
              )}
              <li className="clearfix">
                <div className="point-label">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: text.promoCode[lang]
                        ? text.promoCode[lang]
                        : text.promoCode['en'],
                    }}
                  />
                  {!this.state.showPromoCode ? (
                    <button
                      className="highlight"
                      onClick={this.openCoupon}
                      dangerouslySetInnerHTML={{
                        __html: text.enterPromoCode[lang]
                          ? text.enterPromoCode[lang]
                          : text.enterPromoCode['en'],
                      }}
                    />
                  ) : (
                    <div className="input-wrpper">
                      <input
                        type="text"
                        value={promoText}
                        onChange={this.changePromo}
                        onClick={e => e.stopPropagation()}
                      />
                      <button
                        className="promocode-btn"
                        onClick={this.sendCoupon}
                        dangerouslySetInnerHTML={{
                          __html: text.submit[lang]
                            ? text.submit[lang]
                            : text.submit['en'],
                        }}
                      />
                    </div>
                  )}
                  <p className="error">{couponError}</p>
                </div>
                <div className="point-value">{promoValue || ''}</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default withContext(CartSubtotal);
