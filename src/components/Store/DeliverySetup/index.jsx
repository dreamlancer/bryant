import React, { Component } from 'react';
import MobxReactForm from 'mobx-react-form';

import { fields, plugins } from './formSetup';
import Input from '../../Inputs/SimpleInput';
import InputSuggest from '../../Inputs/InputSuggest';
import Button from '../../Shared/FormButton';

const COUNTRY = 'country';
const ZONE = 'zone';

// Mobx setup
const form = new MobxReactForm({ fields }, { plugins });

class DeliverySetup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      countries: null,
      delivery: 'delivery',
      zones: null,
      billingZones: null,
      sameAddress: true,
      addresses: null,
      isLoggedIn: false,
      existingAddresses: null,
      selectedAddress: null,
      useExistingAddress: false,
      defaultCity: null,
      defaultCountry: null,
    };
  }

  componentDidMount() {
    const { getCountries } = this.props;
    getCountries();
  }

  static getDerivedStateFromProps(props, state) {
    let customProps = {};
    if (props.isLoggedIn !== state.isLoggedIn && props.isLoggedIn) {
      props.getShippingAddress();
      customProps = {
        ...customProps,
        isLoggedIn: props.isLoggedIn,
      };
    }

    if (props.existingAddresses !== state.existingAddresses) {
      customProps = {
        ...customProps,
        existingAddresses: props.existingAddresses,
      };
    }

    if (props.countries !== state.countries) {
      customProps = {
        ...customProps,
        countries: props.countries,
      };
    }

    if (props.zones !== state.zones) {
      customProps = {
        ...customProps,
        zones: props.zones,
      };
    }

    if (props.billingZones !== state.billingZones) {
      customProps = {
        ...customProps,
        billingZones: props.billingZones,
      };
    }

    return customProps;
  }

  onSubmit = () => {
    form.submit({
      onSuccess: fieldset => this.handleOnSuccess(fieldset),
      onError: fieldset => {
        // TODO Scroll to the first field with error !
        console.log('wof', fieldset.errors());
      },
    });
  };

  handleCountrySelect = name => {
    const { getZones } = this.props;
    const countryId = this.findValue(COUNTRY, name);
    if (countryId) {
      getZones(countryId, 'shipping');
    }
  };

  handleBillingCountrySelect = name => {
    const { getZones } = this.props;
    const countryId = this.findValue(COUNTRY, name);
    if (countryId) {
      getZones(countryId, 'billing');
    }
  };

  findValue = (type, value) => {
    let found = null;
    if (type === COUNTRY) {
      const { countries } = this.state;
      if (!countries) return null;
      const item = countries.filter(
        country => country.name.toLowerCase() === value.toLowerCase()
      );
      found = item.length > 0 && item[0].country_id;
    } else if (type === ZONE) {
      const { zones } = this.state;
      if (!zones) return null;
      const item = zones.filter(
        zone => zone.name.toLowerCase() === value.toLowerCase()
      );
      found = item.length > 0 && item[0].zone_id;
    }

    return found;
  };

  handleOnSuccess = fieldset => {
    const {
      nextStep,
      createGuest,
      createGuestShipping,
      isLoggedIn,
      setPaymentAddress,
      setShippingAddress,
      getShippingMethods,
      setPaymentAddressExisting,
      setShippingAddressExisting,
    } = this.props;
    const {
      delivery,
      sameAddress,
      useExistingAddress,
      selectedAddress,
    } = this.state;

    if (useExistingAddress && selectedAddress) {
      setPaymentAddressExisting(selectedAddress).then(response => {
        if (response !== 'error') {
          setShippingAddressExisting(selectedAddress).then(res => {
            if (res !== 'error') {
              getShippingMethods(delivery);
              nextStep();
            }
          });
        }
      });
      return;
    }
    const values = fieldset.values();

    let zone;
    let countryId;
    let country;
    let city;
    let zoneId;
    let address1;
    let postCode;
    let billing_zone;
    let billing_city;
    let billing_country;
    let billing_countryId;
    let billing_zoneId;
    let billing_address1;
    let billing_postCode;

    if (delivery === 'collect') {
      zone = 'Aberdeen';
      city = 'London';
      country = 'United Kingdom';
      countryId = '222';
      zoneId = '3513';
      address1 = 'Placeholder address';
      postCode = 'e15pa';
    } else {
      zone = values.zone;
      city = values.city;
      country = values.country;
      countryId = this.findValue(COUNTRY, values.country);
      zoneId = this.findValue(ZONE, zone);
      address1 = values.address_1;
      postCode = values.postal_code;
    }

    if (!sameAddress) {
      billing_city = values.billing_city;
      billing_zone = values.billing_zone;
      billing_country = values.billing_country;
      billing_countryId = this.findValue(COUNTRY, values.billing_country);
      billing_zoneId = this.findValue(ZONE, billing_zone);
      billing_address1 = values.billing_address_1;
      billing_postCode = values.billing_postal_code;
    }

    const body = {
      address_1: address1,
      address_2: values.address_2 || '',
      city: city,
      country: country,
      country_id: countryId,
      email: values.email,
      firstname: values.firstName,
      lastname: values.lastName,
      postcode: postCode,
      telephone: values.mobile,
      zone: values.zone,
      zone_id: zoneId,
    };

    const billingBody = {
      address_1: sameAddress ? address1 : billing_address1,
      address_2: sameAddress
        ? values.address_2 || ''
        : values.billing_address_2 || '',
      city: sameAddress ? city : billing_city,
      country: country,
      country_id: sameAddress ? countryId : billing_countryId,
      email: values.email,
      firstname: values.firstName,
      lastname: values.lastName,
      postcode: sameAddress ? postCode : billing_postCode,
      telephone: values.mobile,
      zone: values.zone,
      zone_id: sameAddress ? zoneId : billing_zoneId,
    };

    if (!isLoggedIn) {
      createGuest(body).then(() => {
        createGuestShipping(body).then(res => {
          if (res !== 'error') {
            getShippingMethods(delivery);
            nextStep();
          }
        });
      });
    } else {
      setPaymentAddress(billingBody).then(response => {
        if (sameAddress) {
          setShippingAddressExisting(response).then(res => {
            if (res !== 'error') {
              getShippingMethods(delivery);
              nextStep();
            }
          });
        } else {
          setShippingAddress(body).then(res => {
            if (res !== 'error') {
              getShippingMethods(delivery);
              nextStep();
            }
          });
        }
      });
    }
  };

  handleDelivery = e => {
    const { value } = e.target;
    this.setState({ delivery: value });
    form.each(field => {
      switch (field.name) {
        case 'address_1': {
          field.set('rules', value === 'collect' ? '' : 'required|string');
          break;
        }
        case 'city': {
          field.set('rules', value === 'collect' ? '' : 'required|string');
          break;
        }
        case 'postal_code': {
          field.set('rules', value === 'collect' ? '' : 'required|string');
          break;
        }
        default:
          break;
      }
    });
  };

  toggleAddress = () => {
    const { sameAddress } = this.state;
    this.setState({ sameAddress: !sameAddress });
    this.handleChangeField();
    form.each(field => {
      switch (field.name) {
        case 'address_1': {
          field.set('rules', !sameAddress ? '' : 'required|string');
          break;
        }
        case 'city': {
          field.set('rules', !sameAddress ? '' : 'required|string');
          break;
        }
        case 'postal_code': {
          field.set('rules', !sameAddress ? '' : 'required|string');
          break;
        }
        case 'billing_address_1': {
          field.set('rules', !sameAddress ? '' : 'required|string');
          break;
        }
        case 'billing_city': {
          field.set('rules', !sameAddress ? '' : 'required|string');
          break;
        }
        case 'billing_postal_code': {
          field.set('rules', !sameAddress ? '' : 'required|string');
          break;
        }
        default:
          break;
      }
    });
  };

  handleSelectAddress = e => {
    const {
      account,
      resetStep,
      store: { setAddress, getCountries, getZones },
    } = this.props;
    if (e === 0) return;
    const address = JSON.parse(e.target.value);
    const addressId = address.address_id;
    resetStep();
    setAddress(address);
    // Populate fields
    form.each(field => {
      switch (field.name) {
        case 'firstName': {
          field.set('value', address.firstname || '');
          break;
        }
        case 'lastName': {
          field.set('value', address.lastname || '');
          break;
        }
        case 'mobile': {
          field.set('value', (account && account.telephone) || '');
          break;
        }
        case 'email': {
          field.set('value', (account && account.email) || '');
          break;
        }
        case 'address_1': {
          field.set('value', address.address_1 || '');
          break;
        }
        case 'address_2': {
          field.set('value', address.address_2 || '');
          break;
        }
        case 'postal_code': {
          field.set('value', address.postcode || '');
          break;
        }
        case 'city': {
          field.set('value', address.city || '');
          break;
        }
        case 'country': {
          field.set('value', address.country || '');
          this.setState({ defaultCountry: '' }, () => {
            this.setState({ defaultCountry: address.country });
          });
          this.handleCountrySelect(address.country);
          break;
        }
        case 'zone': {
          getCountries().then(res => {
            if (res === 'error') return;
            const ctry = res.filter(
              e => e.country_id === parseInt(address.country_id, 10)
            );
            if (ctry.length === 0) return;
            getZones(ctry[0].country_id, 'shipping').then(zones => {
              if (zones === 'error') return;
              const zone = zones.filter(z => z.zone_id === address.zone_id);
              if (zone.length === 0) return;

              field.set('value', zone[0].name || '');
              this.setState({ defaultCity: '' }, () => {
                this.setState({ defaultCity: zone[0].name });
              });
            });
          });

          break;
        }
        default:
          break;
      }
    });

    // Set selected value
    this.setState({
      selectedAddress: addressId,
      useExistingAddress: true,
    });
  };

  handleChangeField = () => {
    const { resetStep } = this.props;
    resetStep();
    this.setState({ useExistingAddress: false });
  };

  render() {
    const {
      props: { active, isLoggedIn, loadingButton, text, lang },
      state: {
        countries,
        delivery,
        zones,
        billingZones,
        sameAddress,
        existingAddresses,
        defaultCity,
        defaultCountry,
      },
      handleDelivery,
    } = this;

    return (
      <div className={`${active === 1 ? 'show' : 'hidden'}`}>
        <div className="cart-delivery-setup-row">
          {existingAddresses && (
            <div className="row">
              <div className="col-10 offset-1">
                <div className="field-wrapper">
                  <div className="measure">
                    <div
                      className="light-silver"
                      dangerouslySetInnerHTML={{
                        __html: text.selectPrevAddr[lang]
                          ? text.selectPrevAddr[lang]
                          : text.selectPrevAddr['en'],
                      }}
                    />
                    <select onChange={this.handleSelectAddress}>
                      <option
                        key={0}
                        value="other"
                        dangerouslySetInnerHTML={{
                          __html: text.otherAddress[lang]
                            ? text.otherAddress[lang]
                            : text.otherAddress['en'],
                        }}
                      />
                      {existingAddresses.map(address => {
                        const {
                          address_id,
                          address_1,
                          address_2,
                          firstname,
                          lastname,
                          country,
                          city,
                          postcode,
                        } = address;
                        return (
                          <option
                            key={address_id}
                            id={address_id}
                            value={JSON.stringify(address)}
                          >
                            {`${firstname} ${lastname}, ${country}, ${city}, ${address_1}${address_2}, ${postcode}`}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="row">
            <div className="col-10 offset-1">
              <div className="row">
                <div className="col-md-4">
                  <Input
                    field={form.$('firstName')}
                    req
                    handleOnChange={this.handleChangeField}
                  />
                </div>
                <div className="col-md-4">
                  <Input
                    field={form.$('lastName')}
                    req
                    handleOnChange={this.handleChangeField}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <Input
                    field={form.$('mobile')}
                    req
                    handleOnChange={this.handleChangeField}
                  />
                </div>
                <div className="col-md-4">
                  <Input
                    field={form.$('email')}
                    req
                    handleOnChange={this.handleChangeField}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="cart-delivery-setup-row">
          <div className="row">
            <div className="col-10 offset-1">
              <div className="row">
                <div className="col-md-4">
                  <div className="field-wrapper">
                    <div className="measure">
                      <div
                        className="light-silver"
                        dangerouslySetInnerHTML={{
                          __html: text.deliveryMethod[lang]
                            ? text.deliveryMethod[lang]
                            : text.deliveryMethod['en'],
                        }}
                      />
                      <select onChange={handleDelivery}>
                        <option
                          value="delivery"
                          dangerouslySetInnerHTML={{
                            __html: text.delivery[lang]
                              ? text.delivery[lang]
                              : text.delivery['en'],
                          }}
                        />
                        <option
                          value="collect"
                          dangerouslySetInnerHTML={{
                            __html: text.collect[lang]
                              ? text.collect[lang]
                              : text.collect['en'],
                          }}
                        />
                      </select>
                    </div>
                  </div>
                </div>

                <div
                  className={`col-md-4 ${
                    delivery === 'collect' ? 'hidden' : 'show'
                  }`}
                >
                  <InputSuggest
                    required={delivery !== 'collect'}
                    values={countries}
                    id={COUNTRY}
                    defaultValue={defaultCountry}
                    placeholder="Enter country"
                    field={form.$('country')}
                    onChange={() => {
                      this.handleChangeField();
                      this.setState({ zones: null });
                    }}
                    handleCountrySelect={this.handleCountrySelect}
                    req
                  />
                </div>

                <div
                  className={`col-md-4 ${
                    delivery === 'collect' ? 'hidden' : 'show'
                  }`}
                >
                  <InputSuggest
                    required={delivery !== 'collect'}
                    values={zones}
                    defaultValue={defaultCity}
                    id={ZONE}
                    onChange={this.handleChangeField}
                    placeholder="Enter county/state"
                    field={form.$('zone')}
                    handleCountrySelect={() => {}}
                    req
                  />
                </div>
                <div
                  className={`col-md-4 ${
                    delivery === 'collect' ? 'hidden' : 'show'
                  }`}
                >
                  <Input
                    field={form.$('address_1')}
                    req
                    handleOnChange={this.handleChangeField}
                  />
                </div>
                <div
                  className={`col-md-4 ${
                    delivery === 'collect' ? 'hidden' : 'show'
                  }`}
                >
                  <Input
                    field={form.$('address_2')}
                    handleOnChange={this.handleChangeField}
                  />
                </div>
                <div
                  className={`col-md-4 ${
                    delivery === 'collect' ? 'hidden' : 'show'
                  }`}
                >
                  <Input
                    field={form.$('city')}
                    req
                    handleOnChange={this.handleChangeField}
                  />
                </div>
                <div
                  className={`col-md-4 ${
                    delivery === 'collect' ? 'hidden' : 'show'
                  }`}
                >
                  <Input
                    field={form.$('postal_code')}
                    req
                    handleOnChange={this.handleChangeField}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {isLoggedIn && delivery !== 'collect' && (
          <div className="row">
            <div className="col-10 offset-1">
              <label className="use-same-address">
                <input
                  type="checkbox"
                  value={sameAddress}
                  defaultChecked={sameAddress}
                  onChange={this.toggleAddress}
                />
                <span
                  dangerouslySetInnerHTML={{
                    __html: text.useSameAddr[lang]
                      ? text.useSameAddr[lang]
                      : text.useSameAddr['en'],
                  }}
                />
              </label>
            </div>
          </div>
        )}
        {isLoggedIn && (
          <div
            className={`cart-delivery-setup-row ${
              sameAddress || delivery === 'collect' ? 'hide' : 'show'
            }`}
          >
            <div className="row">
              <div className="col-10 offset-1">
                <div className="row">
                  <div
                    className={`col-md-4 ${
                      delivery === 'collect' ? 'hidden' : 'show'
                    }`}
                  >
                    <InputSuggest
                      required={
                        isLoggedIn && delivery !== 'collect' && !sameAddress
                      }
                      values={countries}
                      id={COUNTRY}
                      placeholder="Enter country"
                      field={form.$('billing_country')}
                      onChange={() => {
                        this.handleChangeField();
                        this.setState({ zones: null });
                      }}
                      handleCountrySelect={this.handleBillingCountrySelect}
                      req
                    />
                  </div>

                  <div
                    className={`col-md-4 ${
                      delivery === 'collect' ? 'hidden' : 'show'
                    }`}
                  >
                    <InputSuggest
                      required={
                        isLoggedIn && delivery !== 'collect' && !sameAddress
                      }
                      values={billingZones}
                      onChange={this.handleChangeField}
                      id={ZONE}
                      placeholder="Enter city"
                      field={form.$('billing_zone')}
                      handleCountrySelect={() => {}}
                      req
                    />
                  </div>
                  <div
                    className={`col-md-4 ${
                      delivery === 'collect' ? 'hidden' : 'show'
                    }`}
                  >
                    <Input
                      field={form.$('billing_address_1')}
                      req
                      handleOnChange={this.handleChangeField}
                    />
                  </div>
                  <div
                    className={`col-md-4 ${
                      delivery === 'collect' ? 'hidden' : 'show'
                    }`}
                  >
                    <Input
                      field={form.$('billing_address_2')}
                      handleOnChange={this.handleChangeField}
                    />
                  </div>
                  <div
                    className={`col-md-4 ${
                      delivery === 'collect' ? 'hidden' : 'show'
                    }`}
                  >
                    <Input
                      field={form.$('billing_city')}
                      req
                      handleOnChange={this.handleChangeField}
                    />
                  </div>
                  <div
                    className={`col-md-4 ${
                      delivery === 'collect' ? 'hidden' : 'show'
                    }`}
                  >
                    <Input
                      field={form.$('billing_postal_code')}
                      req
                      handleOnChange={this.handleChangeField}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="cart-delivery-action">
          <div className="actions">
            <Button
              className="btn blue-btn"
              onClick={this.onSubmit}
              loading={loadingButton}
            >
              <span
                dangerouslySetInnerHTML={{
                  __html: text.next[lang] ? text.next[lang] : text.next['en'],
                }}
              />
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default DeliverySetup;
