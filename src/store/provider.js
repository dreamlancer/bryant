import React, { Component } from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import axios from 'axios';

const apiReviews = 'https://api.reviews.co.uk';
const apiRoot = process.env.STORE_API;
const apiPath = `${apiRoot}/api/rest`;

const reviewAxios = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

const mainAxios = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'X-Oc-Currency': 'GBP',
    'X-Oc-Merchant-Id': 'ODUdrFUGCpx2pOrSxd6IhelaI2ge7aQV',
  },
});

import { Provider } from './createContext';

import computeIsMobile from '../js/isMobile';
const isMobile = computeIsMobile();

// The provider, which holds the page-wide store and its actions.
// Feel free to abstract actions and state away from this file.
class AppProvider extends Component {
  state = {
    cookie: true,
    setCookie: () => this.setCookie(),
    updateError: '',
    updateSuccess: '',
    changeUpdateError: msg => this.changeUpdateError(msg),
    updateAccount: body => this.updateAccount(body),
    forgottenPassword: body => this.forgottenPassword(body),
    successMessage: null,
    lang: 'en',
    changeLanguage: lang => this.changeLanguage(lang),
    continentCode: null,
    currency: 'GBP',
    currencySymbol: '£',
    recurringTotal: '',
    selectCurrency: (e, currency) => this.selectCurrency(e, currency),
    shippingType: null,
    setAddress: address => this.setAddress(address),
    returnRequest: body => this.returnRequest(body),
    isMobile,
    loaderLoading: true,
    menuEntered: false,
    orderConfirm: null,
    checkoutError: '',
    loaded: () => this.loaded(),
    customSetState: newState => this.customSetState(newState),
    account: null,
    sessionId: null,
    address: null,
    products: null,
    loadingButton: false,
    fetchProducts: () => this.fetchProducts(),
    cart: null,
    isLoggedIn: false,
    loading: true,
    shippingCost: 0,
    shippingText: '£0',

    hideNavbar: false,
    toggleNavbar: () => this.toggleNavbar(),
    activateNavbar: () => this.activateNavbar(),

    reviewsLoading: true,
    reviews: null,
    addReviewLoading: false,
    fetchReviews: (page, isProduct, perPage) =>
      this.fetchReviews(page, isProduct, perPage),
    addReview: data => this.addReview(data),
    getOrders: () => this.getOrders(),
    orders: null,
    getRecurrings: () => this.getRecurrings(),
    recurrings: null,
    countries: null,
    zones: null,
    billingZones: null,
    getCountries: () => this.getCountries(),
    getZones: (id, type) => this.getZones(id, type),

    addItemToCart: body => this.addItemToCart(body),
    getProduct: (prop, value) => this.getProduct(prop, value),
    deleteCartItem: product => this.deleteCartItem(product),
    fetchCart: product => this.fetchCart(product),
    updateCartItem: (product, quantity) =>
      this.updateCartItem(product, quantity),

    createGuest: body => this.createGuest(body),
    createGuestShipping: body => this.createGuestShipping(body),

    existingAddresses: null,
    setShippingAddressExisting: value => this.setShippingAddressExisting(value),
    setPaymentAddressExisting: value => this.setPaymentAddressExisting(value),
    setPaymentAddress: body => this.setPaymentAddress(body),
    getPaymentAddress: () => this.getPaymentAddress(),
    setShippingAddress: body => this.setShippingAddress(body),
    getShippingAddress: () => this.getShippingAddress(),

    setPaymentMethods: body => this.setPaymentMethods(body),
    getPaymentMethods: () => this.getPaymentMethods(),

    getShippingMethods: method => this.getShippingMethods(method),

    stripePayment: token => this.stripePayment(token),
    shippingPrices: null,
    login: (user, pass) => this.login(user, pass),
    logout: () => this.logout(),
    register: body => this.register(body),
    changePassword: (newPassword, confirmPassword) =>
      this.changePassword(newPassword, confirmPassword),
    passwordError: null,
    setPasswordError: msg => this.setPasswordError(msg),
    getCoupon: code => this.getCoupon(code),
    couponError: '',
  };

  componentDidMount() {
    let sessionId = null;
    const localSessionId = localStorage.getItem('sessionId');

    if (localSessionId) {
      this.initFetch(localSessionId);
    } else {
      mainAxios
        .get(`${apiPath}/session`)
        .then(response => {
          if (response.data.data) {
            sessionId = response.data.data.session;
            localStorage.setItem('sessionId', sessionId);
            this.initFetch(sessionId);
          } else {
            sessionId = null;
          }
          this.setState({
            sessionId,
          });
        })
        .catch(error => {
          console.log('Get session error', error);
        });
    }
  }

  // ********* Reviews ********* //
  fetchReviews = (page = 0, isProduct, perPage = 10) => {
    this.setState({ reviewsLoading: true });

    const companyReviewsEndpoint = `${apiReviews}/merchant/reviews`;
    const productsReviewsEndpoint = `${apiReviews}/product/reviews/all`;

    reviewAxios
      .get(
        `${isProduct ? productsReviewsEndpoint : companyReviewsEndpoint}${
          page !== 0
            ? `?page=${page.toString()}&order=desc&per_page=${perPage}&store=bryant-dental`
            : `?order=desc&per_page=${perPage}&store=bryant-dental`
        }`
      )
      .then(res => {
        const response = res.data;
        if (!response.reviews) return;

        let updatedState;

        if (isProduct) {
          updatedState = {
            reviews: response.reviews,
            reviewsCurrentPage: parseInt(response.current_page, 10),
            reviewsPages: response.total_pages,
            reviewsItemsPerPage: response.per_page,
            reviewsItemsCount: response.count,
          };
        } else {
          updatedState = {
            reviews: response.reviews,
            reviewsCurrentPage: parseInt(response.page, 10),
            reviewsPages: response.total_pages,
            reviewsItemsPerPage: response.per_page,
            reviewsItemsCount: response.stats.total_reviews,
          };
        }
        this.setState({ reviewsLoading: false, ...updatedState });
      });
  };

  addReview = ({ name, review, rating, id }) => {
    this.setState({ addReviewLoading: true });
    const body = {
      name,
      text: review,
      rating,
    };
    return mainAxios
      .post(`${apiPath}/products/${id}/review`, body, {
        headers: { 'X-Oc-Session': this.state.sessionId },
      })
      .then(() => {
        this.setState({ addReviewLoading: false });
        return { type: 'success' };
      })
      .catch(err => {
        this.setState({ addReviewLoading: false });
        return {
          type: 'error',
          message: err.response.data.error && err.response.data.error[0],
        };
      });
  };

  // ********* Application state & functions ********* //

  changeLanguage = lang => {
    localStorage.setItem('lang', lang);
    this.setState({ lang });
  };

  customSetState = newState => {
    this.setState({
      ...newState,
    });
  };

  setCookie = () => {
    this.setState({ cookie: true });
    localStorage.setItem('accept-cookie', true);
  };

  loaded = value => {
    const cookie = localStorage.getItem('accept-cookie');
    this.setState({
      loaderLoading: value,
      menuEntered: !value,
    });

    setTimeout(() => {
      this.setState({ cookie });
    }, 1000);
  };

  activateNavbar = () => {
    // REQUIRED FOR INITIAL FADE IN OF NAVBAR
    this.setState({ hideNavbar: false });
  };
  toggleNavbar = () => {
    this.setState({ hideNavbar: !this.state.hideNavbar });
  };

  // ********* Endpoints ********* //

  initFetch = sessionId => {
    const localContinentCode = localStorage.getItem('continentCode');
    const lang = localStorage.getItem('lang');
    let continentCode = null;

    const localeCurrency = localStorage.getItem('currency');
    const localeCurrencySymbol = localStorage.getItem('currencySymbol');
    const currency = localeCurrency || this.state.currency;
    const currencySymbol = localeCurrencySymbol || this.state.currencySymbol;

    if (localContinentCode) {
      continentCode = localContinentCode;
    } else {
      console.log(
        typeof geoplugin_continentCode !== undefined,
        typeof geoplugin_continentCode
      );
      continentCode =
        typeof geoplugin_continentCode !== undefined &&
        typeof geoplugin_continentCode !== 'undefined' &&
        typeof geoplugin_continentCode &&
        geoplugin_continentCode
          ? geoplugin_continentCode()
          : 'EU';
      localStorage.setItem('continentCode', continentCode);
    }
    this.setState(
      {
        lang,
        currency,
        currencySymbol,
        sessionId,
        loading: false,
        continentCode,
      },
      () => {
        this.getAccount(sessionId);
        this.fetchProducts(sessionId, currency);
        this.fetchCart(sessionId, currency);
        this.getShippingCost(sessionId, currency);
      }
    );
  };

  getCountries = () => {
    return mainAxios
      .get(`${apiPath}/countries`, {
        headers: { 'X-Oc-Session': this.state.sessionId },
      })
      .then(res => {
        this.setState({ countries: res.data.data });
        return res.data.data;
      })
      .catch(err => {
        return 'error';
      });
  };

  getZones = (id, type) => {
    return mainAxios
      .get(`${apiPath}/countries/${id}`, {
        headers: { 'X-Oc-Session': this.state.sessionId },
      })
      .then(res => {
        if (type === 'shipping') {
          this.setState({ zones: res.data.data.zone });
          return res.data.data.zone;
        } else if (type === 'billing') {
          this.setState({ billingZones: res.data.data.zone });
          return res.data.data.zone;
        } else {
          return 'error';
        }
      })
      .catch(err => {
        return 'error';
      });
  };

  selectCurrency = (e, currency) => {
    let currencySymbol = '';
    e.stopPropagation();
    if (currency === 'GBP') {
      currencySymbol = '£';
    } else if (currency === 'EUR') {
      currencySymbol = '€';
    } else if (currency === 'USD') {
      currencySymbol = '$';
    } else {
      currencySymbol = '';
    }

    localStorage.setItem('currency', currency);
    localStorage.setItem('currencySymbol', currencySymbol);
    this.setState(
      {
        currency,
        currencySymbol,
      },
      () => {
        this.fetchProducts(null, currency);
        this.fetchCart(null, currency);
        this.getShippingCost(null, currency);
      }
    );
  };

  // ********* USER ********* //
  catchNotLoggedIn = err => {
    if (
      err &&
      err.response &&
      err.response.data &&
      err.response.data.error &&
      err.response.data.error[0] === 'User is not logged in'
    ) {
      this.setState({ isLoggedIn: false, account: [] });
    }
  };

  getAccount = sessionId => {
    mainAxios
      .get(`${apiPath}/account`, {
        headers: { 'X-Oc-Session': sessionId || this.state.sessionId },
      })
      .then(res => {
        this.setState({ isLoggedIn: true, account: res.data.data });
      })
      .catch(this.catchNotLoggedIn);
  };

  changeUpdateError = msg => {
    this.setState({
      updateError: msg,
    });
  };

  updateAccount = body => {
    this.setState({
      updateError: '',
      updateSuccess: '',
    });
    mainAxios
      .put(`${apiPath}/account`, body, {
        headers: {
          'X-Oc-Session': this.state.sessionId,
          'X-Oc-Currency': this.state.currency,
        },
      })
      .then(() => {
        this.getAccount();
        this.setState({
          updateSuccess: 'Account was successfully updated',
        });
      })
      .catch(res => {
        this.setState({ updateError: res.response.data.error[0] });
        this.catchNotLoggedIn(res);
        return 'error';
      });
  };

  setPasswordError = (msg = null) => {
    this.setState({ passwordError: msg });
  };

  changePassword = (newPassword, confirmPassword) => {
    this.setState({
      updateError: '',
      updateSuccess: '',
    });
    const body = {
      password: newPassword,
      confirm: confirmPassword,
    };
    return mainAxios
      .put(`${apiPath}/account/password`, body, {
        headers: { 'X-Oc-Session': this.state.sessionId },
      })
      .then(() => {
        this.setState({
          updateSuccess: 'Password was successfully changed',
        });
        return 'success';
      })
      .catch(res => {
        this.setState({ updateError: res.response.data.error[0] });
        this.catchNotLoggedIn(res);
        return 'error';
      });
  };

  forgottenPassword = body => {
    this.setState({
      successMessage: null,
      loginError: null,
    });
    mainAxios
      .post(`${apiPath}/forgotten`, body, {
        headers: { 'X-Oc-Session': this.state.sessionId },
      })
      .then(res => {
        this.setState({
          successMessage: 'Success, you will receive next steps on email.',
        });
      })
      .catch(error => {
        this.setState({
          loginError: error.response.data.error[0],
        });
      });
  };

  login = (email, pass) => {
    this.setState({
      loadingButton: true,
      loginError: '',
      successMessage: null,
    });
    const body = {
      email: email,
      password: pass,
    };
    mainAxios
      .post(`${apiPath}/login`, body, {
        headers: { 'X-Oc-Session': this.state.sessionId },
      })
      .then(res => {
        this.setState({
          isLoggedIn: true,
          account: res.data.data,
          loadingButton: false,
        });
        this.fetchCart();
      })
      .catch(err => {
        this.setState({
          loadingButton: false,
          loginError:
            err &&
            err.response &&
            err.response.data &&
            err.response.data.error &&
            err.response.data.error[0],
        });
      });
  };

  logout = () => {
    mainAxios
      .post(
        `${apiPath}/logout`,
        {},
        {
          headers: { 'X-Oc-Session': this.state.sessionId },
        }
      )
      .then(res => {
        this.setState({
          isLoggedIn: false,
          cart: null,
          orders: null,
          recurrings: null,
        });
      })
      .catch(err => {
        console.log('Logout', err);
      });
  };

  register = ({
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    telephone,
  }) => {
    this.setState({
      loadingButton: true,
      successMessage: null,
      loginError: null,
    });
    const body = {
      firstname: firstName,
      lastname: lastName,
      email,
      password,
      confirm: confirmPassword,
      telephone,
      agree: '1',
    };
    mainAxios
      .post(`${apiPath}/register`, body, {
        headers: {
          'X-Oc-Session': this.state.sessionId,
          'X-Oc-Currency': this.state.currency,
        },
      })
      .then(res => {
        const account = {
          firstname: res.data.data.firstname,
          lastname: res.data.data.lastname,
        };
        this.setState({
          isLoggedIn: true,
          account,
          loadingButton: false,
        });
      })
      .catch(err => {
        this.setState({ loadingButton: false });
      });
  };

  // ********* PRODUCTS ********* //

  fetchProducts = (sessionId = null, currency = null) => {
    mainAxios
      .get(`${apiPath}/products`, {
        headers: {
          'X-Oc-Session': sessionId || this.state.sessionId,
          'X-Oc-Currency': currency || this.state.currency,
        },
      })
      .then(response => {
        const products = response.data && response.data.data;

        if (typeof products !== 'object') return;
        this.setState({
          products,
        });
      })
      .catch(error => {
        this.setState({ products: [] });
        console.log('Fetch products error', error);
      });
  };

  // Gets the product from url or product id
  // Prop: url / productId
  getProduct = (prop, value) => {
    const { products } = this.state;
    if (!products) return null;
    let product = null;
    if (prop === 'url') {
      // const url = value.split('/')[2];
      product = products.filter(prod => prod.seo_url === value);
      return product[0];
    } else if (prop === 'id') {
      product = products.filter(
        prod => parseInt(prod.product_id, 10) === parseInt(value, 10)
      );
      return product[0];
    }
    return null;
  };

  returnRequest = body => {
    this.setState({ loadingButton: true });
    return mainAxios
      .post(`${apiPath}/returns`, body, {
        headers: { 'X-Oc-Session': this.state.sessionId },
      })
      .then(response => {
        this.setState({ loadingButton: false });
        return 'success';
      })
      .catch(error => {
        this.setState({ loadingButton: false });
        return 'error';
      });
  };

  // ********* CART ********* //
  getShippingCost = (sessionId = null, currency = null) => {
    mainAxios
      .get(`${apiRoot}/index.php?route=rest/shipping_method/list_shipping`, {
        headers: {
          'X-Oc-Session': sessionId || this.state.sessionId,
          'X-Oc-Currency': currency || this.state.currency,
        },
      })
      .then(res => {
        const shippingPrices = res.data.data;
        this.setState({ shippingPrices });
      })
      .catch(error => {
        return 'error';
      });
  };

  getShippingText = cart => {
    if (!cart) return '£0';
    const shipping = cart.totals.filter(total =>
      total.title.toLowerCase().includes('shipping')
    );

    return shipping.length > 0 ? shipping[0].text : '£0';
  };

  fetchCart = (sessionId = null, currency = null) => {
    mainAxios
      .get(`${apiPath}/cart`, {
        headers: {
          'X-Oc-Session': sessionId || this.state.sessionId,
          'X-Oc-Currency': currency || this.state.currency,
        },
      })
      .then(response => {
        let cart = response.data && response.data.data;
        if (!cart || cart.length === 0) cart = null;

        // Mapping on the products array and calculating the sum for recurring products
        let recurringTotal = 0;
        if (cart && cart.products && cart.products.length > 0) {
          cart.products.map(prod => {
            if (prod.recurring) {
              const values = prod.recurring.text_formatted
                .match(/[0-9]*\.?[0-9]*/g)
                .filter(e => !!e);

              recurringTotal = recurringTotal + parseFloat(values[0]);
            }
          });
        }
        // After we got the total if not 0 then add the currency symbol
        if (recurringTotal !== 0) {
          recurringTotal =
            this.state.currencySymbol !== '€'
              ? `${this.state.currencySymbol}${recurringTotal}`
              : `${recurringTotal}${this.state.currencySymbol}`;
        }

        const shippingText = this.getShippingText(cart);
        this.setState({
          cart,
          shippingText,
          recurringTotal,
        });
      })
      .catch(error => {
        console.log('Fetch cart error', error);
      });
  };

  addItemToCart = ({ product, quantity, options, recurring }) => {
    const body = {
      product_id: product.id,
      quantity,
      option: options,
      recurring_id: recurring,
    };

    return mainAxios
      .post(`${apiPath}/cart`, body, {
        headers: {
          'X-Oc-Session': this.state.sessionId,
          'X-Oc-Currency': this.state.currency,
        },
      })
      .then(() => {
        this.fetchCart();
        return { type: 'success' };
      })
      .catch(err => {
        return { type: 'error', err };
      });
  };

  updateCartItem = (product, quantity) => {
    const body = {
      key: product.key,
      quantity,
    };
    mainAxios
      .put(`${apiPath}/cart`, body, {
        headers: {
          'X-Oc-Session': this.state.sessionId,
          'X-Oc-Currency': this.state.currency,
        },
      })
      .then(() => {
        this.fetchCart();
      })
      .catch(err => {
        console.log('Update item error', err, product);
      });
  };

  deleteCartItem = product => {
    mainAxios
      .delete(`${apiPath}/cart/${product.key}`, {
        headers: {
          'X-Oc-Session': this.state.sessionId,
          'X-Oc-Currency': this.state.currency,
        },
      })
      .then(() => {
        this.fetchCart();
      })
      .catch(err => {
        console.log('Delete item error', err, product);
      });
  };

  emptyCart = () => {
    mainAxios
      .delete(`${apiPath}/cart/empty`, {
        headers: {
          'X-Oc-Session': this.state.sessionId,
          'X-Oc-Currency': this.state.currency,
        },
      })
      .catch(err => {
        console.log('Empty cart error', err);
      });
  };

  // ********* CHECKOUT ********* //

  createGuest = body => {
    this.setState({ loadingButton: true });
    return mainAxios
      .post(`${apiPath}/guest`, body, {
        headers: {
          'X-Oc-Session': this.state.sessionId,
          'X-Oc-Currency': this.state.currency,
        },
      })
      .then(res => {
        return res;
      })
      .catch(err => {
        this.setState({ loadingButton: false });
        return 'error';
      });
  };

  createGuestShipping = body => {
    return mainAxios
      .post(`${apiPath}/guestshipping`, body, {
        headers: {
          'X-Oc-Session': this.state.sessionId,
          'X-Oc-Currency': this.state.currency,
        },
      })
      .then(() => {
        console.log('guest', body);
        this.setState({ address: body });
      })
      .catch(err => {
        const msg = err.response.data.error[0];
        this.setState({ checkoutError: msg, loadingButton: false });
        return 'error';
      });
  };

  getPaymentAddress = () => {
    return mainAxios
      .get(`${apiPath}/paymentaddress`, {
        headers: {
          'X-Oc-Session': this.state.sessionId,
          'X-Oc-Currency': this.state.currency,
        },
      })
      .then(res => {
        console.log('Get payment address', res);
        return res.data;
      })
      .catch(err => {
        console.log('Get payment address', err);
      });
  };

  setPaymentAddress = body => {
    this.setState({ loadingButton: true, address: body });
    return mainAxios
      .post(`${apiPath}/paymentaddress`, body, {
        headers: {
          'X-Oc-Session': this.state.sessionId,
          'X-Oc-Currency': this.state.currency,
        },
      })
      .then(res => {
        return res.data.data ? res.data.data.address_id : 'error';
      })
      .catch(err => {
        const msg = err.response.data.error[0];
        this.setState({ checkoutError: msg, loadingButton: false });
        return 'error';
      });
  };

  setPaymentAddressExisting = value => {
    const body = { address_id: value };
    this.setState({ loadingButton: true });
    return mainAxios
      .post(`${apiPath}/paymentaddress/existing`, body, {
        headers: {
          'X-Oc-Session': this.state.sessionId,
          'X-Oc-Currency': this.state.currency,
        },
      })
      .then(() => {
        return 'success';
      })
      .catch(err => {
        const msg = err.response.data.error[0];
        this.setState({ checkoutError: msg, loadingButton: false });
        return 'error';
      });
  };

  getShippingAddress = () => {
    return mainAxios
      .get(`${apiPath}/shippingaddress`, {
        headers: {
          'X-Oc-Session': this.state.sessionId,
          'X-Oc-Currency': this.state.currency,
        },
      })
      .then(res => {
        this.setState({ existingAddresses: res.data.data.addresses });
        return res.data;
      })
      .catch(err => {
        console.log('Get Shipping address', err);
      });
  };

  setShippingAddress = body => {
    return mainAxios
      .post(`${apiPath}/shippingaddress`, body, {
        headers: {
          'X-Oc-Session': this.state.sessionId,
          'X-Oc-Currency': this.state.currency,
        },
      })
      .then(res => {
        this.setState({ address: body });
        return res.data.data ? res.data.data.address_id : 'error';
      })
      .catch(err => {
        const msg = err.response.data.error[0];
        this.setState({ checkoutError: msg, loadingButton: false });
        return 'error';
      });
  };

  setShippingAddressExisting = value => {
    const body = { address_id: value };
    return mainAxios
      .post(`${apiPath}/shippingaddress/existing`, body, {
        headers: {
          'X-Oc-Session': this.state.sessionId,
          'X-Oc-Currency': this.state.currency,
        },
      })
      .then(res => {})
      .catch(err => {
        const msg = err.response.data.error[0];
        this.setState({ checkoutError: msg, loadingButton: false });
        return 'error';
      });
  };

  getPaymentMethods = () => {
    this.setState({ loadingButton: true });
    return mainAxios
      .get(`${apiPath}/paymentmethods`, {
        headers: {
          'X-Oc-Session': this.state.sessionId,
          'X-Oc-Currency': this.state.currency,
        },
      })
      .then(res => {
        const { data } = res.data;
        const method = Object.keys(data.payment_methods)[0];
        const code = data.payment_methods[method].code;
        return this.setPaymentMethods(code);
      })
      .catch(err => {
        let errorMessage =
          err.response.data &&
          err.response.data.error &&
          err.response.data.error.length > 0 &&
          err.response.data.error[0];

        if (errorMessage) {
          errorMessage = errorMessage.split('Warning: ')[1];
          errorMessage = errorMessage.split('Please')[0];
        }
        this.setState({
          checkoutError: errorMessage,
          loadingButton: false,
        });
      });
  };

  setPaymentMethods = code => {
    const body = {
      payment_method: code,
      agree: '1',
      comment: '',
    };
    return mainAxios
      .post(`${apiPath}/paymentmethods`, body, {
        headers: {
          'X-Oc-Session': this.state.sessionId,
          'X-Oc-Currency': this.state.currency,
        },
      })
      .then(res => {
        return this.confirmCheckout();
      })
      .catch(err => {
        let errorMessage =
          err.response.data &&
          err.response.data.error &&
          err.response.data.error.length > 0 &&
          err.response.data.error[0];

        if (errorMessage) {
          errorMessage = errorMessage.split('Warning: ')[1];
          errorMessage = errorMessage.split('Please')[0];
        }
        this.setState({
          checkoutError: errorMessage,
          loadingButton: false,
        });
      });
  };

  confirmCheckout = () => {
    return mainAxios
      .post(
        `${apiPath}/confirm`,
        {},
        {
          headers: {
            'X-Oc-Session': this.state.sessionId,
            'X-Oc-Currency': this.state.currency,
          },
        }
      )
      .then(res => {
        this.setState({
          orderConfirm: res.data.data,
          loadingButton: false,
        });
        return 'success';
      })
      .catch(err => {
        let errorMessage =
          err.response.data &&
          err.response.data.error &&
          err.response.data.error.length > 0 &&
          err.response.data.error[0];

        if (errorMessage) {
          errorMessage = errorMessage.split('Warning: ')[1];
          errorMessage = errorMessage.split('Please')[0];
        }
        this.setState({
          checkoutError: errorMessage,
          loadingButton: false,
        });
      });
  };

  payCheckout = () => {
    mainAxios
      .get(`${apiPath}/pay`, {
        headers: {
          'X-Oc-Session': this.state.sessionId,
          'X-Oc-Currency': this.state.currency,
        },
      })
      .then(res => {
        console.log('Pay', res);
      })
      .catch(err => {
        console.log('Pay', err);
      });
  };

  getShippingMethods = shippingType => {
    return mainAxios
      .get(`${apiPath}/shippingmethods`, {
        headers: {
          'X-Oc-Session': this.state.sessionId,
          'X-Oc-Currency': this.state.currency,
        },
      })
      .then(res => {
        this.setState({ loadingButton: false, shippingType });
        let methodCode;
        const methods = res.data && res.data.data;

        if (!methods) {
          return 'error';
        }
        if (shippingType === 'collect') {
          if (
            methods.shipping_methods &&
            methods.shipping_methods.pickup &&
            methods.shipping_methods.pickup.quote &&
            methods.shipping_methods.pickup.quote.pickup
          ) {
            methodCode = methods.shipping_methods.pickup.quote.pickup.code;
            this.setState({
              shippingCost: 0,
              shippingText: '£0',
              shippingTitle: 'collect',
              continentCode: 'EU',
            });
          }
        } else if (shippingType === 'delivery') {
          if (
            methods.shipping_methods &&
            methods.shipping_methods.cs &&
            methods.shipping_methods.cs.quote
          ) {
            const { quote } = methods.shipping_methods.cs;
            const key = Object.keys(quote)[0];
            if (quote[key]) {
              const continentCode =
                quote[key].title.includes('EU') ||
                quote[key].title.includes('UK')
                  ? 'EU'
                  : null;
              methodCode = quote[key].code;
              console.log(continentCode, methodCode);
              // Set code in local storage
              localStorage.setItem('continentCode', continentCode);

              this.setState({
                shippingCost: quote[key].cost,
                shippingText: quote[key].text,
                continentCode,
              });
            }
          }
        }
        return this.setShippingMethods(methodCode);
      })
      .catch(err => {
        console.log('Shipping methods', err);
        this.setState({ loadingButton: false });
      });
  };

  setShippingMethods = shippingMethod => {
    const body = {
      shipping_method: shippingMethod,
      comment: '',
    };
    return mainAxios
      .post(`${apiPath}/shippingmethods`, body, {
        headers: {
          'X-Oc-Session': this.state.sessionId,
          'X-Oc-Currency': this.state.currency,
        },
      })
      .then(res => {
        this.fetchCart();
        return res.data;
      })
      .catch(err => {
        console.log('Setting shipping methods', err);
      });
  };

  // ********* PAYMENT ********* //

  stripePayment = ({ source }) => {
    this.setState({ loadingButton: true });
    const body = {
      token: source.id,
      type: 'card',
      reusable: 1,
    };
    return mainAxios
      .post(
        `${apiRoot}/index.php?route=extension/payment/advertikon_stripe/order`,
        qs.stringify(body),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-Oc-Session': this.state.sessionId,
            'X-Oc-Currency': this.state.currency,
          },
        }
      )
      .then(res => {
        this.setState({ loadingButton: false });
        //  if res is success then call clearcart
        // TODO display some error messages somewhere
        if (!res.data.success) {
          this.setState({ checkoutError: 'Ops. Something went wrong!!!' });
          return 'error';
        }
        this.clearCart();
        return res.data;
      })
      .catch(err => {
        this.setState({
          loadingButton: false,
          checkoutError: 'Ops. Something went wrong!!! Please contact Razvan',
        });
      });
  };

  setAddress = address => {
    this.setState({ address });
  };

  clearCart = () => {
    mainAxios
      .put(
        `${apiPath}/confirm`,
        {},
        {
          headers: {
            'X-Oc-Session': this.state.sessionId,
            'X-Oc-Currency': this.state.currency,
          },
        }
      )
      .then(res => {
        this.setState({
          cart: null,
        });
      })
      .catch(err => {
        this.setState({
          loadingButton: false,
          checkoutError: 'Ops. Something went wrong!!!',
        });
      });
  };

  getCoupon = code => {
    return mainAxios
      .post(
        `${apiPath}/coupon`,
        { coupon: code },
        {
          headers: {
            'X-Oc-Session': this.state.sessionId,
            'X-Oc-Currency': this.state.currency,
          },
        }
      )
      .then(res => {
        this.fetchCart();
        this.setState({ couponError: '' });
        return res.data;
      })
      .catch(err => {
        const msg =
          err.response && err.response.data && err.response.data.error[0];
        this.setState({ couponError: msg || 'Ops!!! Something went wrong!' });
        return 'error';
      });
  };

  // ********* ORDERS ********* //
  getOrders = () => {
    return mainAxios
      .get(`${apiPath}/customerorders/limit/100/page/1`, {
        headers: {
          'X-Oc-Session': this.state.sessionId,
          'X-Oc-Currency': this.state.currency,
        },
      })
      .then(res => {
        console.log('orders res', res);
        this.setState({ orders: res.data.data });
        return res.data;
      })
      .catch(err => {
        console.log('orders error', err);
        return 'error';
      });
  };
  getOrderDetails = () => {
    return mainAxios
      .get(`${apiPath}/customerorders/limit/100/page/1`, {
        headers: {
          'X-Oc-Session': this.state.sessionId,
          'X-Oc-Currency': this.state.currency,
        },
      })
      .then(res => {
        console.log('orders res', res);
        this.setState({ orders: res.data.data });
        return res.data;
      })
      .catch(err => {
        console.log('orders error', err);
        return 'error';
      });
  };
  getRecurrings = () => {
    return mainAxios
      .get(`${apiPath}/account/recurrings`, {
        headers: {
          'X-Oc-Session': this.state.sessionId,
          'X-Oc-Currency': this.state.currency,
        },
      })
      .then(res => {
        this.setState({ recurrings: res.data.data });
        return res.data;
      })
      .catch(err => {
        console.log('reccurings error', err);
        return 'error';
      });
  };

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
