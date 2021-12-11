import React, { Component } from 'react';
import { Link, navigate } from 'gatsby';
import updateOnScroll from 'uos';
import ReactGA from 'react-ga';

import {
  NavbarWrapperCss,
  NavbarCss,
  PrimaryMenuCss,
  SecondaryMenuCss,
  LogoWrapperCss,
  ToggleButtonCss,
  NavbarGroupCss,
  HideOnMobileCss,
  CurrencyCss,
  CurrencyDropDownCss,
  CartIconWrapperCss,
  ItemCountCss,
  MobileMenuCss,
  CurrencyTitleCss,
  CurrencyOptionCss,
  MenuLinkCss,
  MenuUnderlineCss,
} from './index.css';

import CartModal from './CartModal';
import Button from '../Shared/Button';
import withContext from '../../helpers/withContext';
import text from '../../text/components/pageNavbar.text';

import BdLogo from '!svg-react-loader!../../../static/images/bd-logo.svg';
import Cart from '!svg-react-loader!../../../static/images/cart.svg';
import Pound from '!svg-react-loader!../../../static/images/pound.svg';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencyActive: false,
      cartModalActive: false,
      menuActive: false,
      navbarHeight: 0,

      lineLeft: 0,
      lineWidth: 0,
      opaqueMenu: false,
    };

    this.navbar = React.createRef();
  }

  componentDidMount() {
    updateOnScroll(0, 300, progress => {
      this.setState({ opaqueMenu: progress === 1 });
    });
    this.updateLinePosition();
    window.addEventListener('resize', this.updateLinePosition, false);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.closeAllModals, false);
    window.removeEventListener('resize', this.updateLinePosition, false);
  }

  componentDidUpdate(prevProps, prevState) {
    const navbarHeight =
      this.navbar && this.navbar.current ? this.navbar.current.offsetHeight : 0;

    if (prevState.navbarHeight !== navbarHeight) {
      this.setState({
        navbarHeight,
      });
    }
    this.updateLinePosition();
  }

  updateLinePosition = () => {
    const { lineLeft, lineWidth } = this.state;
    const { currentPage } = this.props;
    // Initialize with current values
    let newLineLeft = lineLeft;
    let newLineWidth = lineWidth;
    let newCurrentPage = currentPage;

    // Check if the page is an actual store page
    if (
      currentPage.includes('store') ||
      currentPage === 'cart' ||
      currentPage === 'checkout'
    ) {
      newCurrentPage = 'store';
    }

    const activeMenu = document.getElementById(newCurrentPage);

    if (activeMenu) {
      const { width, left } = activeMenu.getBoundingClientRect();
      newLineLeft = left;
      newLineWidth = width;
    }

    if (newLineLeft === lineLeft && newLineWidth === lineWidth) {
      return false;
    }

    this.setState({
      lineLeft: newLineLeft,
      lineWidth: newLineWidth,
    });
    return true;
  };

  handleSelectCurrency = (e, currency) => {
    this.props.store.selectCurrency(e, currency);
    this.setState({
      currencyActive: false,
    });
  };

  closeAllModals = () => {
    this.setState({
      cartModalActive: false,
      currencyActive: false,
      menuActive: false,
    });
  };

  handleToggleCartModal = e => {
    const { cartModalActive } = this.state;
    this.closeAllModals();
    e.stopPropagation();

    if (cartModalActive) {
      // If modal is opened then remove click event
      window.removeEventListener('click', this.closeAllModals, false);
    } else {
      // If we are opening the modal we are also adding an event to close it if clicked outside
      window.addEventListener('click', this.closeAllModals, false);
    }
    this.setState({ cartModalActive: !cartModalActive });
  };

  handleToggleButton = e => {
    e.stopPropagation();
    const { cartModalActive, currencyActive, menuActive } = this.state;

    if (cartModalActive || currencyActive || menuActive) {
      // If we have any modals opened close it
      this.closeAllModals();
    } else {
      // Else open the menu
      this.setState({
        menuActive: true,
      });
    }
  };

  handleOpenCurrency = e => {
    const { currencyActive } = this.state;
    this.closeAllModals();
    e.stopPropagation();

    if (currencyActive) {
      // If modal is opened then remove click event
      window.removeEventListener('click', this.closeAllModals, false);
    } else {
      // If we are opening the modal we are also adding an event to close it if clicked outside
      window.addEventListener('click', this.closeAllModals, false);
    }
    this.setState({ currencyActive: !currencyActive });
  };

  handleSelectCurrency = (e, currency) => {
    this.props.store.selectCurrency(e, currency);
    this.setState({
      currencyActive: false,
    });
  };

  scrollTop = () => {
    const { currentPage } = this.props;
    this.setState({ currencyActive: false });
    if (currentPage === 'home' && typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    } else {
      navigate('/');
    }
  };

  render() {
    const {
      state: {
        cartModalActive,
        navbarHeight,
        currencyActive,
        menuActive,
        lineLeft,
        lineWidth,
        opaqueMenu,
      },
      props: {
        store: {
          cart,
          currencySymbol,
          lang,
          currency,
          deleteCartItem,
          updateCartItem,
        },
      },
    } = this;

    return (
      <NavbarWrapperCss ref={this.navbar} opaque={opaqueMenu}>
        <div className="container">
          <NavbarCss>
            <MenuUnderlineCss left={lineLeft} width={lineWidth} />
            <NavbarGroupCss>
              <Link to="/" onClick={this.scrollTop}>
                <LogoWrapperCss id="menu-logo">
                  <BdLogo />
                </LogoWrapperCss>
              </Link>
              <HideOnMobileCss>{this.renderPrimaryMenu()}</HideOnMobileCss>
            </NavbarGroupCss>
            <NavbarGroupCss maxMobile>
              <HideOnMobileCss>{this.renderSecondaryMenu()}</HideOnMobileCss>

              <Button
                mobileNoPadding
                type="secondary"
                className="navbar-book-demo"
                data-toggle="collapse"
                data-target=".navbar-collapse.show"
                onClick={() => {
                  Intercom('showNewMessage', 'Hi, Can I arrange a free demo?');
                  fbq('track', 'BookADemo');

                  ReactGA.event({
                    category: 'BookADemo',
                    action: 'BookADemo',
                  });
                }}
              >
                <span
                  dangerouslySetInnerHTML={{
                    __html: text.bookADemo[lang]
                      ? text.bookADemo[lang]
                      : text.bookADemo['en'],
                  }}
                />
              </Button>

              <div className="menu-link" onClick={this.handleToggleCartModal}>
                {this.renderCartImage()}
                <CartModal
                  cart={cart}
                  closeAllModals={this.closeAllModals}
                  currencySymbol={currencySymbol}
                  deleteCartItem={deleteCartItem}
                  isOpen={cartModalActive}
                  lang={lang}
                  navbarHeight={navbarHeight}
                  text={text}
                  updateCartItem={updateCartItem}
                />
              </div>

              <CurrencyCss
                className="menu-link"
                onClick={this.handleOpenCurrency}
                active={currencyActive}
              >
                <span className="currency-symbol">{this.renderSymbol()}</span>
                <CurrencyDropDownCss
                  active={currencyActive}
                  navbarHeight={navbarHeight}
                  onClick={e => e.stopPropagation()}
                >
                  <div className="currency-inner-wrapper">
                    <CurrencyTitleCss>SELECT CURRENCY</CurrencyTitleCss>
                    <CurrencyOptionCss
                      active={currency === 'GBP'}
                      onClick={e => this.handleSelectCurrency(e, 'GBP')}
                    >
                      <span>£</span>Pound
                    </CurrencyOptionCss>
                    <CurrencyOptionCss
                      active={currency === 'EUR'}
                      onClick={e => this.handleSelectCurrency(e, 'EUR')}
                    >
                      <span>€</span>Euro
                    </CurrencyOptionCss>
                    <CurrencyOptionCss
                      active={currency === 'USD'}
                      onClick={e => this.handleSelectCurrency(e, 'USD')}
                    >
                      <span>$</span>Dollar
                    </CurrencyOptionCss>
                  </div>
                </CurrencyDropDownCss>
              </CurrencyCss>
            </NavbarGroupCss>

            <ToggleButtonCss
              type="button"
              onClick={this.handleToggleButton}
              active={cartModalActive || currencyActive || menuActive}
            >
              <span className="icon-bar top-bar" />
              <span className="icon-bar middle-bar" />
              <span className="icon-bar bottom-bar" />
            </ToggleButtonCss>
          </NavbarCss>
        </div>

        <MobileMenuCss
          navbarHeight={navbarHeight}
          active={menuActive}
          onClick={e => e.stopPropagation()}
        >
          <div className="menu-inner-wrapper">
            {this.renderPrimaryMenu()}
            {this.renderSecondaryMenu()}
          </div>
        </MobileMenuCss>
      </NavbarWrapperCss>
    );
  }

  renderPrimaryMenu = () => {
    const {
      store: { lang },
      currentPage,
    } = this.props;

    return (
      <PrimaryMenuCss onClick={this.closeAllModals}>
        <Link className="menu-link mobile" to="/">
          <MenuLinkCss
            active={currentPage === 'home'}
            id="home"
            dangerouslySetInnerHTML={{
              __html: text.home[lang] ? text.home[lang] : text.home['en'],
            }}
          />
        </Link>
        <Link className="menu-link" to="/loupes">
          <MenuLinkCss
            active={currentPage === 'loupes'}
            id="loupes"
            dangerouslySetInnerHTML={{
              __html: text.loupes[lang] ? text.loupes[lang] : text.loupes['en'],
            }}
          />
        </Link>
        <Link className="menu-link" to="/headlights">
          <MenuLinkCss
            active={currentPage === 'headlights'}
            id="headlights"
            dangerouslySetInnerHTML={{
              __html: text.headlights[lang]
                ? text.headlights[lang]
                : text.headlights['en'],
            }}
          />
        </Link>
      </PrimaryMenuCss>
    );
  };

  renderSecondaryMenu = () => {
    const {
      store: { lang },
      currentPage,
    } = this.props;
    const checkStore = () => {
      if (
        currentPage.includes('store') ||
        currentPage === 'cart' ||
        currentPage === 'checkout'
      ) {
        return true;
      }
      return false;
    };
    return (
      <SecondaryMenuCss onClick={this.closeAllModals}>
        <Link className="menu-link" to="/bryant-store/all">
          <MenuLinkCss
            active={checkStore()}
            id={`${checkStore() ? 'store' : ''}`}
            dangerouslySetInnerHTML={{
              __html: text.store[lang] ? text.store[lang] : text.store['en'],
            }}
          />
        </Link>
        <Link className="menu-link" to="/reviews">
          <MenuLinkCss
            active={currentPage === 'reviews'}
            id="reviews"
            dangerouslySetInnerHTML={{
              __html: text.reviews[lang]
                ? text.reviews[lang]
                : text.reviews['en'],
            }}
          />
        </Link>
        <Link className="menu-link" to="/about-us">
          <MenuLinkCss
            active={currentPage === 'about-us'}
            id="about-us"
            dangerouslySetInnerHTML={{
              __html: text.about[lang] ? text.about[lang] : text.about['en'],
            }}
          />
        </Link>
      </SecondaryMenuCss>
    );
  };

  renderCartImage = () => {
    const { cart } = this.props.store;
    let hasItems = false;
    let productsCount = 0;

    if (cart) {
      hasItems = cart.products.length > 0;
      productsCount = cart.products.reduce((acc, prod) => {
        return acc + Number(prod.quantity);
      }, 0);
    }

    return (
      <CartIconWrapperCss hasItems={hasItems}>
        <Cart className="cart-icon" />
        {hasItems && (
          <ItemCountCss id="item-count">{productsCount}</ItemCountCss>
        )}
      </CartIconWrapperCss>
    );
  };

  renderSymbol = () => {
    const { currencySymbol } = this.props.store;
    if (currencySymbol === '£') {
      return <Pound />;
    } else {
      return currencySymbol;
    }
  };
}

export default withContext(Navbar);
