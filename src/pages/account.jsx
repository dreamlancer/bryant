/* global $ Sirv */
import React from 'react';
import { Link } from 'gatsby';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';

import Seo from '../components/Seo';
import withContext from '../helpers/withContext';
import inView from '../js/in-view.min';
import LoginForm from '../components/Account/LoginForm';
import UpdateAccountData from '../components/Account/UpdateAccountData';

import text from '../text/account.text';

let timeout = null;
let timeout2 = null;

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      account: null,
      orders: null,
      recurrings: null,
      openSettings: false,
      passwordError: null,
      successMessage: null,
    };
  }

  componentDidMount() {
    Sirv.start();

    timeout = setTimeout(() => {
      const pageContainer = document.querySelector('.page-container');
      pageContainer && pageContainer.classList.add('show');
    }, 100);

    timeout2 = setTimeout(() => {
      this.props.store.loaded(false);
    }, 500);

    inView({
      selector: '.lazy-show',
      enter: el => {
        el.classList.add('entered');
      },
      offset: 0.2,
      exit: el => {
        el.classList.remove('entered');
      },
    });
  }

  static getDerivedStateFromProps(props, state) {
    let object = {};
    if (props.store.passwordError !== state.passwordError) {
      object.passwordError = props.store.passwordError;
    }
    if (props.store.recurrings !== state.recurrings) {
      object = {
        ...object,
        recurrings: props.store.recurrings,
      };
    }
    if (props.store.orders !== state.orders) {
      object = {
        ...object,
        orders: props.store.orders,
      };
    }
    if (props.store.account !== state.account) {
      if (props.store.isLoggedIn) {
        props.store.getOrders();
        props.store.getRecurrings();
      }
      object = {
        ...object,
        account: props.store.account,
      };
    }

    return object;
  }

  componentWillUnmount() {
    clearTimeout(timeout);
    clearTimeout(timeout2);
  }

  renderStatusIcon = status => {
    const { whiteArrow, blueArrow } = this.props.data;

    if (status === 'Complete') {
      return (
        <div className="status">
          <div className="status-tex">{status}</div>
          <Img
            fluid={blueArrow && blueArrow.childImageSharp.fluid}
            alt="Blue Arrow"
            title="Blue Arrow"
          />
        </div>
      );
    } else if (status === 'Pending') {
      return (
        <div className="status">
          <div className="status-tex">{status}</div>
          <Img
            fluid={whiteArrow && whiteArrow.childImageSharp.fluid}
            alt="White Arrow"
            title="White Arrow"
          />
        </div>
      );
    } else {
      return (
        <div className="status">
          <div className="status-tex">{status}</div>
          <div className="close-icon" />
        </div>
      );
    }
  };

  updatePasswordState = (e, type) => {
    const { value } = e.target;
    this.setState({ [type]: value });
  };

  changePassword = (e = null) => {
    const { setPasswordError } = this.props.store;
    if (e && e.key && e.key !== 'Enter') {
      setPasswordError(null);
      return;
    }
    const { newPassword, confirmPassword } = this.state;
    const { changePassword } = this.props.store;
    if (!newPassword) {
      setPasswordError('New password is required');
    } else if (!confirmPassword) {
      setPasswordError('Confirmation password is required');
    } else if (newPassword !== confirmPassword) {
      setPasswordError('Passwords should match');
    } else {
      changePassword(newPassword, confirmPassword).then(res => {
        if (res === 'success') {
          this.setState({ successMessage: 'Password successfully changed' });
        }
      });
    }
  };

  renderContent = () => {
    const {
      props: {
        store: { isLoggedIn, logout, lang, updateSuccess, updateError },
        data: { wheel },
      },
      state: { account, orders, recurrings, openSettings },
    } = this;

    if (isLoggedIn) {
      return (
        <section className="account-page">
          <div className="user-info">
            <div className="left-part">
              <h2 className="username">
                {`Hi, ${account.firstname} ${account.lastname}`}
              </h2>
              <button
                className="profile"
                onClick={() => {
                  this.setState({ openSettings: !openSettings });
                }}
              >
                <Img
                  fluid={wheel && wheel.childImageSharp.fluid}
                  alt="Wheel"
                  title="Wheel"
                />
                <p
                  dangerouslySetInnerHTML={{
                    __html: text.profile[lang]
                      ? text.profile[lang]
                      : text.profile['en'],
                  }}
                />
              </button>
            </div>
            <div className="right-part">
              <button
                className="btn logout-btn"
                onClick={logout}
                dangerouslySetInnerHTML={{
                  __html: text.logOut[lang]
                    ? text.logOut[lang]
                    : text.logOut['en'],
                }}
              />
            </div>
          </div>
          <div className="spacer" />
          {openSettings && (
            <div className="settings">
              <div className="row">
                <div className="col-12">
                  {updateError && <h2 className="error">{updateError}</h2>}
                  {updateSuccess && (
                    <h2 className="success">{updateSuccess}</h2>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col-4 reset-password">
                  <h2
                    dangerouslySetInnerHTML={{
                      __html: text.changePassword[lang]
                        ? text.changePassword[lang]
                        : text.changePassword['en'],
                    }}
                  />
                  <label
                    dangerouslySetInnerHTML={{
                      __html: text.newPassword[lang]
                        ? text.newPassword[lang]
                        : text.newPassword['en'],
                    }}
                  />
                  <input
                    type="password"
                    onChange={e => this.updatePasswordState(e, 'newPassword')}
                    onKeyPress={this.changePassword}
                  />
                  <label
                    dangerouslySetInnerHTML={{
                      __html: text.confirmPassword[lang]
                        ? text.confirmPassword[lang]
                        : text.confirmPassword['en'],
                    }}
                  />
                  <input
                    type="password"
                    onChange={e =>
                      this.updatePasswordState(e, 'confirmPassword')
                    }
                    onKeyPress={this.changePassword}
                  />

                  <button
                    className="btn blue-btn"
                    onClick={this.changePassword}
                    dangerouslySetInnerHTML={{
                      __html: text.submit[lang]
                        ? text.submit[lang]
                        : text.submit['en'],
                    }}
                  />
                </div>
                <div className="col-8 update-info">
                  <UpdateAccountData />
                </div>
              </div>
              <div className="spacer" />
            </div>
          )}
          {orders && orders.length > 0 && (
            <div className="recurring-wrapper">
              <h2
                dangerouslySetInnerHTML={{
                  __html: text.orders[lang]
                    ? text.orders[lang]
                    : text.orders['en'],
                }}
              />
              <table>
                <tbody>
                  {orders.map((order, index) => {
                    return (
                      <tr key={index} className="table-row">
                        <td>ID: {order.order_id}</td>
                        <td>{order.date_added}</td>
                        <td>{order.total}</td>
                        <td>{this.renderStatusIcon(order.status)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
          {recurrings && recurrings.length > 0 && (
            <div className="recurring-wrapper">
              <h2
                dangerouslySetInnerHTML={{
                  __html: text.monthlySubscription[lang]
                    ? text.monthlySubscription[lang]
                    : text.monthlySubscription['en'],
                }}
              />
              <table>
                <tbody>
                  {recurrings.map((recurring, index) => {
                    return (
                      <tr key={index}>
                        <td>{recurring.product}</td>
                        <td>ID: {recurring.order_recurring_id}</td>
                        <td>{recurring.date_added}</td>
                        <td>{recurring.status}</td>
                        <td>
                          <button
                            onClick={() =>
                              Intercom(
                                'showNewMessage',
                                'Hi, i want to cancel my subscription.'
                              )
                            }
                            dangerouslySetInnerHTML={{
                              __html: text.requestCancel[lang]
                                ? text.requestCancel[lang]
                                : text.requestCancel['en'],
                            }}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
          {!(
            (recurrings && recurrings.length > 0) ||
            (orders && orders.length > 0)
          ) && (
            <Link className="no-orders" to="/bryant-store/all">
              <span
                dangerouslySetInnerHTML={{
                  __html: text.noOrders[lang]
                    ? text.noOrders[lang]
                    : text.noOrders['en'],
                }}
              />
            </Link>
          )}
        </section>
      );
    } else {
      return <LoginForm store={this.props.store} />;
    }
  };

  render() {
    const { account } = this.state;
    const {
      store: { lang },
    } = this.props;
    return (
      <div className="account-page page-container">
        <Seo
          title="Account"
          url="account"
          keywords="bryant dental, dental loupes, bryant dental account"
          description="Bryant Dental Loupes & Headlights account page."
        />
        <div className="container">
          <div className="row">
            <div className="content-wrapper">
              <h1
                className="account-page-title highlight"
                dangerouslySetInnerHTML={{
                  __html: text.title[lang]
                    ? text.title[lang]
                    : text.title['en'],
                }}
              />
              {!account ? (
                <p
                  dangerouslySetInnerHTML={{
                    __html: text.loading[lang]
                      ? text.loading[lang]
                      : text.loading['en'],
                  }}
                />
              ) : (
                this.renderContent()
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withContext(Account);

export const query = graphql`
  query {
    whiteArrow: file(relativePath: { eq: "account/white-arrow.png" }) {
      childImageSharp {
        fluid(maxHeight: 675, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    blueArrow: file(relativePath: { eq: "account/blue-arrow.png" }) {
      childImageSharp {
        fluid(maxHeight: 675, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    wheel: file(relativePath: { eq: "account/wheel.png" }) {
      childImageSharp {
        fluid(maxHeight: 675, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`;
