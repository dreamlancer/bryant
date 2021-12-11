/* global $ Sirv */
import React from 'react';
import Loadable from 'react-loadable';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';

import Seo from '../components/Seo';
import withContext from '../helpers/withContext';
import inView from '../js/in-view.min';
import Loader from '../components/Shared/Loader';
import Magnifier from '!svg-react-loader!../../static/images/support/magnifier.svg';
import Message from '!svg-react-loader!../../static/images/support/message.svg';
import Book from '!svg-react-loader!../../static/images/support/book.svg';
import text from '../text/support.text';

const LoadableSupportCall = Loadable({
  loader: () => import('../components/SupportCall'),
  loading() {
    return <Loader />;
  },
});
const LoadableMap = Loadable({
  loader: () => import('../components/Map'),
  loading() {
    return <Loader />;
  },
});

let timeout = null;
let timeout2 = null;

class Support extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCallBookOpen: false,
    };
  }

  componentDidMount() {
    // Start sirv
    Sirv.start();

    // Start inview to fade in/out elements on page
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

    timeout = setTimeout(() => {
      $('.page-container').addClass('show');
    }, 100);
  }

  componentWillUnmount() {
    clearTimeout(timeout);
    clearTimeout(timeout2);
  }

  toggleCallBook = () => {
    this.setState({ isCallBookOpen: !this.state.isCallBookOpen });
  };

  removeOverlay = () => {
    const { loaded, loaderLoading } = this.props.store;
    if (loaderLoading) {
      timeout2 = setTimeout(() => loaded(false), 500);
    }
  };

  render() {
    const {
      data: { supportHero },
      store: { lang },
    } = this.props;

    return (
      <div className="support-page page-container">
        <Seo
          title="Support"
          keywords="bryant dental, dental loupes, dental loupes support, bryant dental support, bryant dental chat"
          url="support"
          description="You can contact Bryant Dental Support by live chat, email or phone. We'll respond within 24 hours. Often a lot sooner."
        />

        <section className="support-hero hero2 lazy-show">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="image-wrapper2 lazy-title">
                  <Img
                    fluid={supportHero.childImageSharp.fluid}
                    alt="Bryant Dental Loupes"
                    title="Bryant Dental Loupes"
                    critical
                    onLoad={this.removeOverlay}
                  />
                </div>

                <div className="text-wrapper lazy-content">
                  <h1
                    className="title"
                    dangerouslySetInnerHTML={{
                      __html: text.title[lang]
                        ? text.title[lang]
                        : text.title['en'],
                    }}
                  />
                  <h5
                    className="subtitle"
                    dangerouslySetInnerHTML={{
                      __html: text.description[lang]
                        ? text.description[lang]
                        : text.description['en'],
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="support-centre lazy-show">
          <div className="container lazy-title">
            <h2
              className="small-title"
              dangerouslySetInnerHTML={{
                __html: text.supportCentre[lang]
                  ? text.supportCentre[lang]
                  : text.supportCentre['en'],
              }}
            />
            <h5
              className="small-subtitle"
              dangerouslySetInnerHTML={{
                __html: text.supportCentreDescription[lang]
                  ? text.supportCentreDescription[lang]
                  : text.supportCentreDescription['en'],
              }}
            />

            <div className="row lazy-content">
              <div className="offset-md-1 col-md-10">
                <div className="row">
                  <div className="col-md-4 col-sm-4 col-xs-12 order-0">
                    <a href="https://help.bryant.dental/">
                      <div className="support-item-wrapper">
                        <div className="icon-wrapper">
                          <Magnifier />
                        </div>
                        <h3
                          className="item-name"
                          dangerouslySetInnerHTML={{
                            __html: text.item1Title[lang]
                              ? text.item1Title[lang]
                              : text.item1Title['en'],
                          }}
                        />
                        <h4
                          className="item-description"
                          dangerouslySetInnerHTML={{
                            __html: text.item1Description[lang]
                              ? text.item1Description[lang]
                              : text.item1Description['en'],
                          }}
                        />
                      </div>
                    </a>
                  </div>
                  <div className="col-md-4 col-sm-4 col-xs-12 order-2 order-md-1">
                    <a onClick={() => this.toggleCallBook()}>
                      <div className="support-item-wrapper">
                        <div className="icon-wrapper">
                          <Message />
                        </div>
                        <h3
                          className="item-name"
                          dangerouslySetInnerHTML={{
                            __html: text.item2Title[lang]
                              ? text.item2Title[lang]
                              : text.item2Title['en'],
                          }}
                        />
                        <h4
                          className="item-description"
                          dangerouslySetInnerHTML={{
                            __html: text.item2Description[lang]
                              ? text.item2Description[lang]
                              : text.item2Description['en'],
                          }}
                        />
                      </div>
                    </a>
                  </div>
                  <div className="col-md-4 col-sm-4 col-xs-12 order-1 order-md-2">
                    <a href="https://static1.squarespace.com/static/57e18cc89f74569a6b910ee7/t/5a4a46cac83025f8449e364d/1514817303548/Bryant+Dental+Manuals.pdf">
                      <div className="support-item-wrapper xs-last">
                        <div className="icon-wrapper">
                          <Book />
                        </div>
                        <h3
                          className="item-name"
                          dangerouslySetInnerHTML={{
                            __html: text.item3Title[lang]
                              ? text.item3Title[lang]
                              : text.item3Title['en'],
                          }}
                        />
                        <h4
                          className="item-description"
                          dangerouslySetInnerHTML={{
                            __html: text.item3Description[lang]
                              ? text.item3Description[lang]
                              : text.item3Description['en'],
                          }}
                        />
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`call-book ${
                !this.state.isCallBookOpen ? 'hidden' : ''
              }`}
            >
              <iframe
                title="calendly"
                src="https://calendly.com/bryant-dental/phone-consultation"
                width="100%"
                height="100%"
                frameBorder="0"
              />
            </div>
          </div>
        </section>

        <LoadableSupportCall />
        <LoadableMap />
      </div>
    );
  }
}

export default withContext(Support);

export const query = graphql`
  query {
    supportHero: file(relativePath: { eq: "support/hero.png" }) {
      childImageSharp {
        fluid(maxHeight: 800, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`;
