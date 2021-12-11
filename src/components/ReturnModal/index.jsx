import React, { Component } from 'react';
import MobxReactForm from 'mobx-react-form';
import './index.scss';

import Button from '../Shared/FormButton';
import Input from '../Inputs/SimpleInput';
import Textarea from '../Inputs/SimpleTextarea';
import { fields, plugins } from './formRegisterSetup';
// Mobx setup
const form = new MobxReactForm({ fields }, { plugins });

export default class ReturnModal extends Component {
  state = {
    selectedProduct: 'other',
    selectedModel: 'other',
    error: '',
  };

  handleOnSuccess = fieldset => {
    const {
      state: { selectedProduct, selectedModel },
      props: { returnRequest, closeModal },
    } = this;

    const values = fieldset.values();
    let address = `
      Address

      address_1: ${values.address_1},
      address_2: ${values.address_2},
      country: ${values.country},
      city: ${values.city},
      state: ${values.state},
      postCode: ${values.postCode},
    `;

    const body = {
      firstname: values.firstName,
      lastname: values.lastName,
      email: values.email,
      telephone: values.telephone,
      product: selectedProduct,
      model: selectedModel,
      order_id: values.orderNumber,
      comment: values.returnReason.concat(address),
      return_reason_id: '5',
      quantity: '1',
    };
    returnRequest(body).then(res => {
      if (res === 'success') {
        closeModal();
      } else {
        this.setState({
          error: 'Ops. An error occured. Please try again.',
        });
      }
    });
  };

  onSubmit = () => {
    form.submit({
      onSuccess: fieldset => this.handleOnSuccess(fieldset),
    });
  };

  onSelectProduct = e => {
    const value = JSON.parse(e.target.value);
    this.setState({
      selectedProduct: value.name,
      selectedModel: value.model,
      productError: '',
    });
  };

  render() {
    const {
      state: { error },
      props: { closeModal, products, loadingButton, lang, text },
    } = this;
    return (
      <div className="review-modal">
        <div className="close-modal-button" onClick={closeModal}>
          <i className="fas fa-times" />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="content-wrapper">
                <div className="title">
                  <h2
                    dangerouslySetInnerHTML={{
                      __html: text.returns[lang]
                        ? text.returns[lang]
                        : text.returns['en'],
                    }}
                  />
                </div>
                <div className="form">
                  <div className="row">
                    <div className="col-12 col-md-6">
                      <Input
                        field={form.$('firstName')}
                        req
                        onKeyPress={this.onSubmit}
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <Input
                        field={form.$('lastName')}
                        req
                        onKeyPress={this.onSubmit}
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <Input
                        field={form.$('telephone')}
                        req
                        onKeyPress={this.onSubmit}
                      />
                    </div>
                    <div className="col-12">
                      <Input
                        field={form.$('email')}
                        req
                        onKeyPress={this.onSubmit}
                      />
                    </div>

                    <div className="col-12">
                      <div className="measure">
                        <div
                          className="light-silver"
                          dangerouslySetInnerHTML={{
                            __html: text.product[lang]
                              ? text.product[lang]
                              : text.product['en'],
                          }}
                        />
                        <select onChange={this.onSelectProduct}>
                          {products &&
                            products.map(product => {
                              return (
                                <option
                                  key={product.id}
                                  value={JSON.stringify(product)}
                                >
                                  {product.name}
                                </option>
                              );
                            })}
                          <option
                            key={0}
                            value={JSON.stringify({
                              name: 'other',
                              model: 'other',
                            })}
                          >
                            <span
                              dangerouslySetInnerHTML={{
                                __html: text.other[lang]
                                  ? text.other[lang]
                                  : text.other['en'],
                              }}
                            />
                          </option>
                        </select>
                      </div>
                    </div>

                    <div className="col-12">
                      <Textarea field={form.$('returnReason')} row={6} req />
                    </div>
                    <div className="col-12">
                      <Input
                        field={form.$('orderNumber')}
                        req
                        onKeyPress={this.onSubmit}
                      />
                    </div>
                    <div className="col-12">
                      <Input
                        field={form.$('address_1')}
                        req
                        onKeyPress={this.onSubmit}
                      />
                    </div>
                    <div className="col-12">
                      <Input
                        field={form.$('address_2')}
                        req
                        onKeyPress={this.onSubmit}
                      />
                    </div>
                    <div className="col-12">
                      <Input
                        field={form.$('city')}
                        req
                        onKeyPress={this.onSubmit}
                      />
                    </div>
                    <div className="col-6">
                      <Input
                        field={form.$('state')}
                        req
                        onKeyPress={this.onSubmit}
                      />
                    </div>
                    <div className="col-6">
                      <Input
                        field={form.$('postCode')}
                        req
                        onKeyPress={this.onSubmit}
                      />
                    </div>
                    <div className="col-12">
                      <Input
                        field={form.$('country')}
                        req
                        onKeyPress={this.onSubmit}
                      />
                    </div>
                    <div className="col-12">
                      <div className="red">{error}</div>
                    </div>
                    <div className="col-12">
                      <Button
                        className="btn blue-btn"
                        onClick={this.onSubmit}
                        loading={loadingButton}
                      >
                        <span
                          dangerouslySetInnerHTML={{
                            __html: text.confirm[lang]
                              ? text.confirm[lang]
                              : text.confirm['en'],
                          }}
                        />
                      </Button>
                    </div>
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
