import React, { Component } from 'react';
import { Link } from 'gatsby';
import inView from '../../js/in-view.min';
import smoothscroll from 'smoothscroll-polyfill';
import BdLogo from '!svg-react-loader!../../../static/images/bd-logo.svg';

import Facebook from '!svg-react-loader!../../../static/images/facebook.svg';
import Linkedin from '!svg-react-loader!../../../static/images/linkedin.svg';
import Instagram from '!svg-react-loader!../../../static/images/instagram.svg';
import Observer from '../Shared/Observer/index.js';

import {
  FooterTopCss,
  FooterBottomCss,
  SubFooterCss,
  FooterCss,
  LogoWrapperCss,
  InfoWrapperCss,
  InfoCss,
  ColumnsWrapperCss,
  ColumnCss,
  ColumnItemCss,
  NewsLetterCss,
  InputWrapperCss,
  MediaCss,
  SpacerCss,
} from './index.css';

if (typeof window !== 'undefined') {
  smoothscroll.polyfill();
  window.__forceSmoothScrollPolyfill__ = true;
}

class PageFooter extends Component {
  state = {
    titleIndex: 0,
    fading: false,
  };

  componentDidMount() {
    inView({
      selector: '.footer',
      enter: el => {
        el.classList.add('entered');
      },
      offset: 0.1,
      exit: el => {
        el.classList.remove('entered');
      },
    });
  }

  componentWillUnmount() {
    clearInterval(this.titleInterval);
    clearTimeout(this.titleTimer);
  }

  handleRep = e => {
    const location = this.props.location;
    if (location.pathname.includes('about')) {
      e.preventDefault();
      const reps = document.getElementById('representatives');
      reps && reps.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  scrollTop = () => {
    const { active } = this.props;
    if (active === 'home' && typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }
  };

  render() {
    return (
      <>
        <FooterTopCss
          className="footer lazy-show"
          itemScope
          itemType="http://schema.org/PostalAddress"
        >
          <div className="container">
            <Observer>
              <FooterCss>
                <div className="row">
                  <div className="col-12 col-md-6 col-lg-12 col-xl-3 order-0">
                    <Link to="/" onClick={this.scrollTop}>
                      <LogoWrapperCss>
                        <BdLogo />
                      </LogoWrapperCss>
                    </Link>
                  </div>
                  <div className="col-12 col-md-12 col-8 col-lg-8 col-xl-6 order-2 order-lg-1">
                    <ColumnsWrapperCss>
                      <ColumnCss>
                        <Link to="/students">
                          <ColumnItemCss>Students</ColumnItemCss>
                        </Link>
                        {/* <Link to="/careers">
                        <ColumnItemCss>Careers</ColumnItemCss>
                      </Link> */}
                        {/* <Link to="/events">
                        <ColumnItemCss>Events & Courses</ColumnItemCss>
                      </Link> */}
                      </ColumnCss>
                      <ColumnCss>
                        <Link to="/account">
                          <ColumnItemCss>Account login</ColumnItemCss>
                        </Link>
                        <a href="https://help.bryant.dental/">
                          <ColumnItemCss>FAQs</ColumnItemCss>
                        </a>

                        <Link to="/support">
                          <ColumnItemCss>Support</ColumnItemCss>
                        </Link>
                      </ColumnCss>
                      <ColumnCss>
                        {/* <Link to="/distributors">
                        <ColumnItemCss>Distributors</ColumnItemCss>
                      </Link> */}
                        {/* <Link to="/transparency">
                        <ColumnItemCss>Transparency & Compliance</ColumnItemCss>
                      </Link> */}
                        {/* <Link to="/privacy">
                        <ColumnItemCss>Privacy Policy</ColumnItemCss>
                      </Link> */}
                        <Link to="/terms">
                          <ColumnItemCss>Terms of Service</ColumnItemCss>
                        </Link>
                      </ColumnCss>
                    </ColumnsWrapperCss>
                  </div>
                  <div className="col-12 col-md-6 col-lg-4 col-xl-3 order-1 order-lg-2">
                    <InfoWrapperCss>
                      <InfoCss>+ 44 (0) 193 232 00 64</InfoCss>
                      <InfoCss break>info@bryant.dental</InfoCss>
                      <InfoCss>Fetcham Park House</InfoCss>
                      <InfoCss>Lower Road, Fetcham</InfoCss>
                      <InfoCss>Surrey, KT22 9HD, UK</InfoCss>
                    </InfoWrapperCss>
                  </div>
                </div>
                <SpacerCss />
                <div className="row">
                  <div className="col-lg-8 offset-lg-0 col-xl-6 offset-xl-3">
                    {/* <NewsLetterCss>
                    <p>Subscribe to our newsletter:</p>
                    <InputWrapperCss>
                      <input type="text" placeholder="your e-mail, please" />
                      <svg
                        version="1.1"
                        id="Layer_1"
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        viewBox="0 0 36.1 25.8"
                        enableBackground="new 0 0 36.1 25.8"
                      >
                        <g>
                          <line
                            fill="none"
                            stroke="#FFFFFF"
                            strokeWidth="3"
                            strokeMiterlimit="10"
                            x1="0"
                            y1="12.9"
                            x2="34"
                            y2="12.9"
                          />
                          <polyline
                            fill="none"
                            stroke="#FFFFFF"
                            strokeWidth="3"
                            strokeMiterlimit="10"
                            points="22.2,1.1 34,12.9 22.2,24.7"
                          />
                        </g>
                      </svg>
                    </InputWrapperCss>
                  </NewsLetterCss> */}
                  </div>
                  <div className="col-12 col-lg-3">
                    <MediaCss>
                      <a
                        target="_blank"
                        rel="noopener"
                        href="https://www.facebook.com/BryantDentalOfficial"
                      >
                        <Facebook />
                      </a>
                      <a
                        target="_blank"
                        rel="noopener"
                        href="https://www.linkedin.com/company/bryant-dental/about/"
                      >
                        <Linkedin />
                      </a>
                      <a
                        target="_blank"
                        rel="noopener"
                        href="https://www.instagram.com/bryantdental/"
                      >
                        <Instagram />
                      </a>
                    </MediaCss>
                  </div>
                </div>
              </FooterCss>
            </Observer>
          </div>
        </FooterTopCss>

        <FooterBottomCss className="lower-footer">
          <div className="container">
            <Observer>
              <SubFooterCss className="row">
                <div className="col-12 col-md-8">
                  <p>
                    Bryant Medical LTD UK | UAE | Australia 2019 © All Rights
                    Reserved
                  </p>
                </div>
                <div className="col-12 col-md-4">
                  <a
                    className="footer-right"
                    href="https://www.linkedin.com/company/kappalondon/about/"
                    target="_blank"
                  >
                    designed by kappa.london
                  </a>
                </div>
              </SubFooterCss>
            </Observer>
          </div>
        </FooterBottomCss>
      </>
    );
  }
}
export default PageFooter;
