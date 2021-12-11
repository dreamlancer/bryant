import React, { Component } from 'react';
import MobxReactForm from 'mobx-react-form';
import withContext from '../../../helpers/withContext';
import Input from '../../Inputs/SimpleInput';
import text from '../../../text/account.text';

import './index.scss';

import {
  fields as fieldsLogin,
  plugins as pluginsLogin,
} from './formUpdateSetup';

// Mobx setup
const formUpdate = new MobxReactForm(
  { fields: fieldsLogin },
  { plugins: pluginsLogin }
);

class UpdateAccountData extends Component {
  handleUpdate = () => {
    const { updateAccount, changeUpdateError, lang } = this.props.store;
    formUpdate.submit({
      onSuccess: fieldset => {
        const { firstName, lastName, email, phone } = fieldset.values();

        const body = {};
        if (firstName) {
          body.firstname = firstName;
        }
        if (lastName) {
          body.lastname = lastName;
        }
        if (email) {
          body.email = email;
        }
        if (phone) {
          body.phone = phone;
        }
        if (!firstName && !lastName && !email && !phone) {
          changeUpdateError(
            text.inputFields[lang]
              ? text.inputFields[lang]
              : text.inputFields['en']
          );
        } else {
          updateAccount(body);
        }
      },
      onError: fieldset => {
        console.log('Update error', fieldset.errors());
      },
    });
  };

  render() {
    const { lang } = this.props.store;
    return (
      <div className="update-account-data">
        <div className="row">
          <div className="col-md-12">
            <h2
              dangerouslySetInnerHTML={{
                __html: text.updateAccount[lang]
                  ? text.updateAccount[lang]
                  : text.updateAccount['en'],
              }}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <Input
              field={formUpdate.$('firstName')}
              // onKeyPress={this.handleUpdate}
            />
          </div>
          <div className="col-md-6">
            <Input
              field={formUpdate.$('lastName')}
              // onKeyPress={this.handleUpdate}
            />
          </div>
          <div className="col-md-6">
            <Input
              field={formUpdate.$('email')}
              // onKeyPress={this.handleUpdate}
            />
          </div>
          <div className="col-md-6">
            <Input
              field={formUpdate.$('phone')}
              // onKeyPress={this.handleUpdate}
            />
          </div>

          <div className="col-md-12">
            <button
              className="btn blue-btn update-btn"
              onClick={this.handleUpdate}
              dangerouslySetInnerHTML={{
                __html: text.update[lang]
                  ? text.update[lang]
                  : text.update['en'],
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withContext(UpdateAccountData);
