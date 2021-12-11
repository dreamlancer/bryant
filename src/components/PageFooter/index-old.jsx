import React from 'react';
import { Link } from 'gatsby';
import StarRatings from 'react-star-ratings';
import BdLogo from '!svg-react-loader!../../../static/images/bd-logo.svg';
import Tooltip from '@material-ui/core/Tooltip';
import ReactGA from 'react-ga';
import { blue, purple, darkblue } from '../Shared/variables';
import inView from '../../js/in-view.min';
import './index.scss';
import { telHref } from '../../helpers/actionUrls';
import { OFFICE_NUMBER } from '../../constants/phoneNumbers';
import { XENOSYS } from '../../constants/externalLinks';
import text from '../../text/components/pageFooter.text';
import smoothscroll from 'smoothscroll-polyfill';

if (typeof window !== 'undefined') {
  smoothscroll.polyfill();
  window.__forceSmoothScrollPolyfill__ = true;
}

const titles = [
  '"Extraordinary"',
  '"Excellent service"',
  '"Fantastic service"',
  '"Efficient service"',
  '"Amazing product"',
];

class PageFooter extends React.Component {
  state = {
    titleIndex: 0,
    fading: false,
  };

  componentDidMount() {
    this.titleInterval = setInterval(() => {
      const titleIndex =
        this.state.titleIndex + 1 < titles.length
          ? this.state.titleIndex + 1
          : 0;
      this.setState({ fading: true });
      this.titleTimer = setTimeout(() => {
        this.setState({ titleIndex: titleIndex, fading: false });
      }, 500);
    }, 5000);

    // titleInterval = setInterval(() => {
    //   titleIndex = titleIndex + 1 < titles.length ? titleIndex + 1 : 0;

    //   $('.footer-reviews .title')
    //     .fadeOut(function() {
    //       $(this).text(titles[titleIndex]);
    //     })
    //     .fadeIn();
    // }, 5000);

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

  renderStars(rating, dim) {
    return (
      <StarRatings
        rating={rating}
        starRatedColor={this.props.active === 'headlights' ? purple : blue}
        starEmptyColor={darkblue}
        numberOfStars={5}
        name="rating"
        starDimension={dim}
        starSpacing="2px"
      />
    );
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
    const {
      store: { lang, changeLanguage },
    } = this.props;
    return (
      <section
        className="footer lazy-show"
        itemScope
        itemType="http://schema.org/PostalAddress"
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-3">
                  <div className="footer-left left lazy-title">
                    <div className="first-row">
                      <Link
                        className="footer-logo"
                        to="/"
                        onClick={this.scrollTop}
                      >
                        <BdLogo />
                      </Link>

                      {/* <div className="langs">
                        <div className="lang active">
                          <button
                            onClick={() => {
                              changeLanguage('en');
                            }}
                            style={{ color: 'white' }}
                          >
                            EN
                          </button>
                        </div>
                        <div className="spacer" />
                        <div className="lang">
                          <button
                            onClick={() => {
                              changeLanguage('es');
                            }}
                            style={{ color: 'white' }}
                          >
                            ES
                          </button>
                        </div>
                      </div> */}
                    </div>
                    <div className="second-row">
                      <p
                        style={{ opacity: 0 }}
                        dangerouslySetInnerHTML={{
                          __html: text.corporate[lang]
                            ? text.corporate[lang]
                            : text.corporate['en'],
                        }}
                      />
                      <a
                        className="partner-link"
                        href={XENOSYS}
                        target="_blank"
                      >
                        <span>Xenosys</span> Partner
                      </a>
                      <Link to="/kings-college-london-sponsorship">
                        KCL Dental Society
                      </Link>
                      <Link to="/barts-&-the-london-dental-society">
                        Barts & the London Dental Society
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="footer-center center footer-reviews  lazy-title">
                    <Link className="reviews-overall-indicator" to="/reviews">
                      <div
                        className={`title ${
                          this.state.fading
                            ? 'title-fading-out'
                            : 'title-fading-in'
                        }`}
                      >
                        {titles[this.state.titleIndex]}
                      </div>
                      <div className="rating-value">
                        <div className="val">4.9/5</div>
                        {this.renderStars(5, '2.3em')}
                      </div>
                    </Link>
                    <div className="actions-wrapper">
                      <div className="actions">
                        <p
                          className="action"
                          onClick={() => {
                            fbq('track', 'BookADemo');
                            
                            ReactGA.event({
                              category: 'BookADemo',
                              action: 'BookADemo',
                            });
                            Intercom(
                              'showNewMessage',
                              'Hi, Can I arrange a free demo?'
                            );
                          }}
                          dangerouslySetInnerHTML={{
                            __html: text.bookDemo[lang]
                              ? text.bookDemo[lang]
                              : text.bookDemo['en'],
                          }}
                        />
                        <div className="spacer" />
                        <Link
                          to="/about-us"
                          state={{
                            rep: true,
                          }}
                          className="action"
                          onClick={this.handleRep}
                        >
                          <span
                            dangerouslySetInnerHTML={{
                              __html: text.findRep[lang]
                                ? text.findRep[lang]
                                : text.findRep['en'],
                            }}
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="footer-right right lazy-title">
                    <div className="social-wrapper">
                      <ul className="social">
                        {/* <li className="phone">
                          <a
                            target="_blank"
                            rel="noopener"
                            href={telHref(OFFICE_NUMBER)}
                          >
                            <i className="fas fa-phone" />
                          </a>
                        </li> */}
                        <li className="facebook">
                          <a
                            target="_blank"
                            rel="noopener"
                            href="https://www.facebook.com/BryantDentalOfficial"
                          >
                            <i className="fab fa-facebook-f" />
                          </a>
                        </li>
                        <li className="instagram">
                          <a
                            target="_blank"
                            rel="noopener"
                            href="https://www.instagram.com/bryantdental/"
                          >
                            <i className="fab fa-instagram" />
                          </a>
                        </li>
                        <li className="mail">
                          <a
                            target="_blank"
                            rel="noopener"
                            href="https://www.linkedin.com/company/bryant-dental/about/"
                          >
                            <i className="fab fa-linkedin" />
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="address">
                      <p>
                        <a
                          target="_blank"
                          rel="noopener"
                          href={telHref(OFFICE_NUMBER)}
                        >
                          {OFFICE_NUMBER}
                        </a>
                      </p>
                      <p>
                        <a
                          target="_blank"
                          rel="noopener"
                          href="mailto:info@bryant.dental"
                        >
                          info@bryant.dental
                        </a>
                      </p>
                      <p>Fetcham Park House</p>
                      <p>Lower Road, Fetcham</p>
                      <p>Surrey, KT22 9HD, UK</p>
                      {/* <p>Company No. 10396020</p> */}
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="footer-contact lazy-title">
                <h3 className="footer-title d-none d-sm-block">
                  Get in touch:
                </h3>
                <ul className="social-wrapper">
                  <li className="social">
                    <a
                      target="_blank" rel="noopener"
                      href="https://www.facebook.com/BryantDentalOfficial"
                    >
                      <i className="fab fa-facebook-f" />
                    </a>
                  </li>
                  <li className="social">
                    <a
                      target="_blank" rel="noopener"
                      href="https://www.instagram.com/bryantdental/"
                    >
                      <i className="fab fa-instagram" />
                    </a>
                  </li>
                  <li className="social">
                    <a target="_blank" rel="noopener" href="https://twitter.com/Bryant_Dental">
                      <i className="fab fa-twitter" />
                    </a>
                  </li>
                </ul>
                <div className="address-wrapper lazy-content d-none d-sm-block">
                  <h2 className="address" itemProp="streetAddress">
                    Fetcham House, Lower Road, Fetcham, Surrey,{' '}
                    <span itemProp="postalCode">KT22 9HD</span>
                  </h2>
                </div>
                <ul className="contact-wrapper">
                  <li className="contact">
                    <a href={telHref(OFFICE_NUMBER)} itemProp="telephone">
                      {OFFICE_NUMBER}
                    </a>
                  </li>
                  <li className="contact">
                    <a
                      href="mailto:info@bryant.dental"
                      itemProp="email"
                      content="info@bryant.dental"
                    >
                      info@bryant.dental
                    </a>
                  </li>
                  <li className="contact d-none d-md-inline-block">
                    <a href="/" itemProp="url">
                      bryant.dental
                    </a>
                  </li>
                </ul>
                <div className="clearfix" />
              </div>
              <div className="address-wrapper lazy-content d-sm-none">
                <h2 className="address">
                  Fetcham House, Lower Road, Fetcham, Surrey, KT22 9HD
                </h2>
              </div> */}

              <div className="footer-pages lazy-content">
                <ul className="pages">
                  {/* <li className="page">
                    <Link to="/kings-college-london-sponsorship">
                      KCL Dental Society
                    </Link>
                  </li> */}
                  {/* <li className="madeby">
                    <a href="https://www.linkedin.com/company/kappalondon/about/">
                      <Tooltip title={'Made by Kappa.London'} placement="top">
                        <i className="fas fa-info" />
                      </Tooltip>
                    </a>
                  </li> */}
                  <li className="page">
                    <Link to="/jobs">
                      <span
                        dangerouslySetInnerHTML={{
                          __html: text.jobs[lang]
                            ? text.jobs[lang]
                            : text.jobs['en'],
                        }}
                      />
                    </Link>
                  </li>
                  <li className="page">
                    <Link to="/support">
                      <span
                        dangerouslySetInnerHTML={{
                          __html: text.support[lang]
                            ? text.support[lang]
                            : text.support['en'],
                        }}
                      />
                    </Link>
                  </li>
                  <li className="page">
                    <Link to="/students">
                      <span
                        dangerouslySetInnerHTML={{
                          __html: text.students[lang]
                            ? text.students[lang]
                            : text.students['en'],
                        }}
                      />
                    </Link>
                  </li>
                  <li className="page">
                    <a
                      href="https://help.bryant.dental/"
                      dangerouslySetInnerHTML={{
                        __html: text.faqs[lang]
                          ? text.faqs[lang]
                          : text.faqs['en'],
                      }}
                    />
                  </li>
                  <li className="page">
                    <Link to="/returns">
                      <span
                        dangerouslySetInnerHTML={{
                          __html: text.returns[lang]
                            ? text.returns[lang]
                            : text.returns['en'],
                        }}
                      />
                    </Link>
                  </li>
                  <li className="page">
                    <Link to="/terms">
                      <span
                        dangerouslySetInnerHTML={{
                          __html: text.terms[lang]
                            ? text.terms[lang]
                            : text.terms['en'],
                        }}
                      />
                    </Link>
                  </li>
                  <li className="page">
                    <Link to="/account">
                      <span
                        dangerouslySetInnerHTML={{
                          __html: text.account[lang]
                            ? text.account[lang]
                            : text.account['en'],
                        }}
                      />
                    </Link>
                  </li>
                  <li className="page">
                    <Link to="/lumadent">
                      <span>Lumadent</span>
                    </Link>
                  </li>
                </ul>
                <div className="under-pages">
                  <div
                    className="legal"
                    dangerouslySetInnerHTML={{
                      __html: text.legal[lang]
                        ? text.legal[lang]
                        : text.legal['en'],
                    }}
                  />
                  <div className="madeby">
                    <a href="https://www.linkedin.com/company/kappalondon/about/">
                      Powered by Kappa.London
                    </a>
                  </div>
                  <div style={{ clear: 'both' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default PageFooter;
