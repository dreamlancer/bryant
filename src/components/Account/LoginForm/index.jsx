import React, { Component } from 'react';
import MobxReactForm from 'mobx-react-form';
import Button from '../../Shared/FormButton';
import text from '../../../text/components/loginForm.text';

import './loginForm.scss';

import {
  fields as fieldsLogin,
  plugins as pluginsLogin,
} from './formLoginSetup';

import {
  fields as fieldsSignup,
  plugins as pluginsSignup,
} from './formSignupSetup';

import {
  fields as fieldsRecover,
  plugins as pluginsRecover,
} from './formRecoverSetup';

import Input from '../../Inputs/SimpleInput';
import Password from '../../Inputs/SimplePassword';

// Mobx setup
const formLogin = new MobxReactForm(
  { fields: fieldsLogin },
  { plugins: pluginsLogin }
);
const formSignup = new MobxReactForm(
  { fields: fieldsSignup },
  { plugins: pluginsSignup }
);
const formRecover = new MobxReactForm(
  { fields: fieldsRecover },
  { plugins: pluginsRecover }
);

class LoginFrom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      login: true,
      secondTab: 'signup',
    };
  }

  handleLogin = () => {
    const { login } = this.props.store;
    formLogin.submit({
      onSuccess: fieldset => {
        const { email, password } = fieldset.values();

        login(email, password);
      },
      onError: fieldset => {
        // TODO Scroll to the first field with error !
        console.log('wof', fieldset.errors());
      },
    });
  };

  handleSignup = () => {
    const { register } = this.props.store;
    formSignup.submit({
      onSuccess: fieldset => {
        const {
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
          telephone,
        } = fieldset.values();

        register({
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
          telephone,
        });
      },
      onError: fieldset => {
        // TODO Scroll to the first field with error !
        console.log('wof', fieldset.errors());
      },
    });
  };
  handleForgotten = () => {
    const { forgottenPassword } = this.props.store;
    formRecover.submit({
      onSuccess: fieldset => {
        const { email } = fieldset.values();
        console.log('email', email);
        forgottenPassword({ email });
      },
      onError: fieldset => {
        // TODO Scroll to the first field with error !
        console.log('Recover error', fieldset.errors());
      },
    });
  };
  switch = secondTab => {
    this.setState({ login: !this.state.login, secondTab });
  };

  render() {
    const { login, secondTab } = this.state;
    const {
      loadingButton,
      store: { loginError, successMessage, lang },
    } = this.props;
    return (
      <React.Fragment>
        {loginError && <p className="error">{loginError}</p>}
        {successMessage && <p className="success">{successMessage}</p>}

        <div className={`login-form ${login ? 'login' : ''}`}>
          <div className="left">
            <div className="row">
              <div className="col-md-6">
                <Input
                  field={formLogin.$('email')}
                  onKeyPress={this.handleLogin}
                />
              </div>
              <div className="col-md-6">
                <Password
                  field={formLogin.$('password')}
                  type="password"
                  onKeyPress={this.handleLogin}
                />
              </div>

              <div className="col-md-12">
                <Button
                  className="btn blue-btn"
                  onClick={this.handleLogin}
                  loading={loadingButton}
                >
                  <span
                    dangerouslySetInnerHTML={{
                      __html: text.login[lang]
                        ? text.login[lang]
                        : text.login['en'],
                    }}
                  />
                </Button>
                <Button
                  className="btn white-btn"
                  onClick={() => this.switch('signup')}
                >
                  <span
                    dangerouslySetInnerHTML={{
                      __html: text.orSignup[lang]
                        ? text.orSignup[lang]
                        : text.orSignup['en'],
                    }}
                  />
                </Button>
              </div>
              {/* <div className="col-md-12">
                <button
                  className="btn forgotten-btn"
                  onClick={() => this.switch('forgotten')}
                >
                  <span
                    dangerouslySetInnerHTML={{
                      __html: text.forgotten[lang]
                        ? text.forgotten[lang]
                        : text.forgotten['en'],
                    }}
                  />
                </button>
              </div> */}
            </div>
          </div>

          <div className="right">
            <div
              className={`signup-wrapper ${
                secondTab === 'signup' ? 'show' : 'hidden'
              }`}
            >
              <div className="row">
                <div className="col-md-4">
                  <Input field={formSignup.$('firstName')} />
                </div>
                <div className="col-md-4">
                  <Input field={formSignup.$('lastName')} />
                </div>
                <div className="col-md-4">
                  <Input field={formSignup.$('telephone')} />
                </div>
                <div className="col-md-4">
                  <Input field={formSignup.$('email')} />
                </div>
                <div className="col-md-4">
                  <Password field={formSignup.$('password')} type="password" />
                </div>
                <div className="col-md-4">
                  <Password
                    field={formSignup.$('confirmPassword')}
                    type="password"
                  />
                </div>

                <div className="col-md-12">
                  <Button
                    className="btn blue-btn"
                    onClick={this.handleSignup}
                    loading={loadingButton}
                  >
                    <span
                      dangerouslySetInnerHTML={{
                        __html: text.signup[lang]
                          ? text.signup[lang]
                          : text.signup['en'],
                      }}
                    />
                  </Button>
                  <button
                    className="btn white-btn"
                    onClick={() => this.switch('signup')}
                  >
                    <span
                      dangerouslySetInnerHTML={{
                        __html: text.orLogin[lang]
                          ? text.orLogin[lang]
                          : text.orLogin['en'],
                      }}
                    />
                  </button>
                </div>
              </div>
            </div>

            <div
              className={`forgotten-wrapper ${
                secondTab === 'forgotten' ? 'show' : 'hidden'
              }`}
            >
              <div className="row">
                <div className="col-md-6">
                  <Input
                    field={formRecover.$('email')}
                    onKeyPress={this.handleLogin}
                  />
                </div>

                <div className="col-md-12">
                  <Button
                    className="btn blue-btn"
                    onClick={this.handleForgotten}
                    loading={loadingButton}
                  >
                    <span
                      dangerouslySetInnerHTML={{
                        __html: text.recover[lang]
                          ? text.recover[lang]
                          : text.recover['en'],
                      }}
                    />
                  </Button>
                  <button
                    className="btn white-btn"
                    onClick={() => this.switch('forgotten')}
                  >
                    <span
                      dangerouslySetInnerHTML={{
                        __html: text.orLogin[lang]
                          ? text.orLogin[lang]
                          : text.orLogin['en'],
                      }}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default LoginFrom;
