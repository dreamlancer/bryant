import React, { Component } from 'react';
import { Link } from 'gatsby';
import withContext from '../helpers/withContext';
import Seo from '../components/Seo';

class cookies extends Component {
  componentDidMount() {
    this.props.store.loaded(false);
  }

  render() {
    return (
      <div className="cookie-page">
        <Seo
          title="Cookies"
          url="cookies"
          description="Find out more about Bryant Dental's Cookies policy"
        />
        <div className="container">
          <div className="row">
            <div className="col-sm-10 offset-sm-1">
              <h1>Cookie Policy for Bryant Dental</h1>

              <p className="page-info">
                This is the Cookie Policy for Bryant Dental, accessible from{' '}
                <Link to="/" className="link">
                  https://bryant.dental/
                </Link>
              </p>

              <p className="page-info">
                <strong className="page-section">What Are Cookies</strong>
              </p>

              <p className="page-info">
                As is common practice with almost all professional websites this
                site uses cookies, which are tiny files that are downloaded to
                your computer, to improve your experience. This page describes
                what information they gather, how we use it and why we sometimes
                need to store these cookies. We will also share how you can
                prevent these cookies from being stored however this may
                downgrade or 'break' certain elements of the sites
                functionality.
              </p>

              <p className="page-info">
                For more general information on cookies see the Wikipedia
                article on HTTP Cookies.
              </p>

              <p className="page-info">
                <strong className="page-section">How We Use Cookies</strong>
              </p>

              <p className="page-info">
                We use cookies for a variety of reasons detailed below.
                Unfortunately in most cases there are no industry standard
                options for disabling cookies without completely disabling the
                functionality and features they add to this site. It is
                recommended that you leave on all cookies if you are not sure
                whether you need them or not in case they are used to provide a
                service that you use.
              </p>

              <p className="page-info">
                <strong className="page-section">Disabling Cookies</strong>
              </p>

              <p className="page-info">
                You can prevent the setting of cookies by adjusting the settings
                on your browser (see your browser Help for how to do this). Be
                aware that disabling cookies will affect the functionality of
                this and many other websites that you visit. Disabling cookies
                will usually result in also disabling certain functionality and
                features of the this site. Therefore it is recommended that you
                do not disable cookies.
              </p>

              <p className="page-info">
                <strong className="page-section">The Cookies We Set</strong>
              </p>

              <ul>
                <li>
                  <p className="page-info">Account related cookies</p>
                  <p className="page-info">
                    If you create an account with us then we will use cookies
                    for the management of the signup process and general
                    administration. These cookies will usually be deleted when
                    you log out however in some cases they may remain afterwards
                    to remember your site preferences when logged out.
                  </p>
                </li>

                <li>
                  <p className="page-info">Login related cookies</p>
                  <p className="page-info">
                    We use cookies when you are logged in so that we can
                    remember this fact. This prevents you from having to log in
                    every single time you visit a new page. These cookies are
                    typically removed or cleared when you log out to ensure that
                    you can only access restricted features and areas when
                    logged in.
                  </p>
                </li>

                <li>
                  <p className="page-info">Orders processing related cookies</p>
                  <p className="page-info">
                    This site offers e-commerce or payment facilities and some
                    cookies are essential to ensure that your order is
                    remembered between pages so that we can process it properly.
                  </p>
                </li>

                <li>
                  <p className="page-info">Surveys related cookies</p>
                  <p className="page-info">
                    From time to time we offer user surveys and questionnaires
                    to provide you with interesting insights, helpful tools, or
                    to understand our user base more accurately. These surveys
                    may use cookies to remember who has already taken part in a
                    survey or to provide you with accurate results after you
                    change pages.
                  </p>
                </li>

                <li>
                  <p className="page-info">Forms related cookies</p>
                  <p className="page-info">
                    When you submit data to through a form such as those found
                    on contact pages or comment forms cookies may be set to
                    remember your user details for future correspondence.
                  </p>
                </li>
              </ul>

              <p className="page-info">
                <strong className="page-section">Third Party Cookies</strong>
              </p>

              <p className="page-info">
                In some special cases we also use cookies provided by trusted
                third parties. The following section details which third party
                cookies you might encounter through this site.
              </p>

              <ul>
                <li>
                  <p className="page-info">
                    This site uses Google Analytics which is one of the most
                    widespread and trusted analytics solution on the web for
                    helping us to understand how you use the site and ways that
                    we can improve your experience. These cookies may track
                    things such as how long you spend on the site and the pages
                    that you visit so we can continue to produce engaging
                    content.
                  </p>
                  <p className="page-info">
                    For more information on Google Analytics cookies, see the
                    official Google Analytics page.
                  </p>
                </li>

                <li>
                  <p className="page-info">
                    Third party analytics are used to track and measure usage of
                    this site so that we can continue to produce engaging
                    content. These cookies may track things such as how long you
                    spend on the site or pages you visit which helps us to
                    understand how we can improve the site for you.
                  </p>
                </li>
              </ul>

              <p className="page-info">
                <strong className="page-section">More Information</strong>
              </p>

              <p className="page-info">
                Hopefully that has clarified things for you and as was
                previously mentioned if there is something that you aren't sure
                whether you need or not it's usually safer to leave cookies
                enabled in case it does interact with one of the features you
                use on our site. This Cookies Policy was created with the help
                of the Generator of{' '}
                <a href="https://cookiepolicygenerator.com" className="link">
                  GDPR Cookies Policy
                </a>{' '}
                and the{' '}
                <a href="https://privacypolicygenerator.info" className="link">
                  GDPR Privacy Policy
                </a>
                .
              </p>

              <p className="page-info">
                However if you are still looking for more information then you
                can contact us through one of our preferred contact methods:
              </p>

              <ul>
                <li>
                  Email:{' '}
                  <a
                    className="link"
                    href="mailto:office@bryant.dental"
                    itemProp="email"
                    content="info@bryant.dental"
                  >
                    office@bryant.dental
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withContext(cookies);
