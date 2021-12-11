/* global Sirv $ */
import React from 'react';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';

import Loadable from 'react-loadable';

import { graphql } from 'gatsby';
// import MadeInBritain from '!svg-react-loader!../../static/images/lights/made-in-britain.svg';
import Seo from '../components/Seo';
import Button from '../components/Shared/Button';
import { ReactTypeformEmbed } from 'react-typeform-embed';

import withContext from '../helpers/withContext';
import text from '../text/headlights.text';
import inView from '../js/in-view.min';
import BubbleMobileModal from '../components/BubbleMobileModal';
import Loader from '../components/Shared/Loader';

import smoothscroll from 'smoothscroll-polyfill';
import InfoBubble from '../components/Shared/InfoBubble';
if (typeof window !== 'undefined') {
  smoothscroll.polyfill();
  window.__forceSmoothScrollPolyfill__ = true;
}

import FirstSection from '../components/Headlights/HeadlightsFirstSection';

const LoadableHeadlightsComparisons = Loadable({
  loader: () => import('../components/Headlights/HeadlightsComparisons'),
  loading() {
    return <Loader />;
  },
});

const LoadableReviews = Loadable({
  loader: () => import('../components/Headlights/HeadlightsReviews'),
  loading() {
    return <Loader />;
  },
});

const LoadableTechnicalDetailsLights = Loadable({
  loader: () => import('../components/TechnicalDetailsLights'),
  loading() {
    return <Loader />;
  },
});

const LoadableLightsAnimation = Loadable({
  loader: () => import('../components/LightsAnimation'),
  loading() {
    return <Loader />;
  },
});

let timeout = null;
let timeout2 = null;
let infoGlasses = null;

class Headlights extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animationLoaded: false,
      imageLoaded: false,
      isBubbleModalOpen: false,
      bubbleModalInfo: '',
      load: false,
      productReviews: null,
    };
  }
  componentDidMount() {
    this.props.store.fetchReviews(1);
    infoGlasses = Array.from(document.querySelectorAll('.glasses-info'));
    timeout = setTimeout(() => {
      const pageContainer = document.querySelector('.page-container');
      pageContainer && pageContainer.classList.add('show');
    }, 100);
    timeout2 = setTimeout(() => {
      this.setState({
        load: true,
      });
    }, 600);

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
  }

  static getDerivedStateFromProps(props, state) {
    if (props.store.reviews !== state.reviews) {
      const reviews =
        props.store.reviews &&
        props.store.reviews.filter(review => {
          if (review.comments && review.comments.length < 90) {
            return false;
          }
          if (review.reviewer && review.reviewer.first_name === 'Anonymous') {
            return false;
          }
          return true;
        });
      const productReviews = {
        name: 'Bryant Dental Lights',
        rating: '4.9',
        image: null,
        reviews: { reviews },
      };

      return { productReviews, reviews: props.store.reviews };
    }
    return null;
  }

  componentWillUnmount() {
    clearTimeout(timeout);
    clearTimeout(timeout2);
  }

  closeInfoBubbles() {
    infoGlasses.forEach(info => {
      info.classList.add('collapsed');
    });
  }

  // Handles the little info circles on the glasses
  // It will toggle the circle open/close and close other open circles
  toggleInfoGlasses = e => {
    e.stopPropagation();
    const clickedInfo = e.currentTarget;

    infoGlasses.forEach(info => {
      if (clickedInfo !== info) info.classList.add('collapsed');
    });
    clickedInfo.classList.toggle('collapsed');
  };

  technicalDetails() {
    const element = document.querySelector('.technical-details');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  removeOverlay = () => {
    const { loaded, loaderLoading } = this.props.store;
    const { animationLoaded } = this.state;
    this.setState({
      imageLoaded: true,
    });
    if (loaderLoading && animationLoaded) {
      loaded(false);
    }
  };

  openInfoModal = bubbleModalInfo => {
    this.setState({ isBubbleModalOpen: true, bubbleModalInfo });
  };

  closeInfoModal = () => {
    this.setState({ isBubbleModalOpen: false });
  };

  openForm = () => {
    this.typeformEmbed.typeform.open();
  };

  render() {
    const {
      toggleInfoGlasses,
      openInfoModal,
      closeInfoModal,
      openForm,
      props: {
        location,
        store: { isMobile, loaded, lang },
        data: {
          lightsTop,
          reviewIgnis,
          charger,
          battery,
          batteryLight,
          arrowLeft,
          arrowRight,
        },
      },
      state: { isBubbleModalOpen, bubbleModalInfo, productReviews },
    } = this;
    const { imageLoaded, load } = this.state;

    return (
      <ParallaxProvider>
        <>
          <Seo
            title="Dental Headlights"
            url="headlights"
            keywords="bryant dental, dental loupes, dental headlights, dentist headlight, dental headlight uk, ignis, headlight for dental loupes UK,  wireless dental headlight"
            description="Ignis – the wireless headlight of the future. Attachable to any frame style and any brand of dental loupes. Expertly engineered to actually decrease the weight on your nose, meaning you can use it all day without any discomfort."
          >
            {this.state.reviews && (
              <script type="application/ld+json">
                {`
                {
                  "@context": "http://schema.org",
                  "@type": "Product",
                  "url": "https://bryant.dental/headlights",
                  "name": "Bryant Dental Lights",
                  "description": "The Wireless Headlight of the Future. Ignis® Wireless Headlight can be attached to any frame style and any brand of loupes.",
                  "brand": {
                    "@type": "Thing",
                    "name": "Bryant Dental: Loupes & Headlights"
                  },
                  "image": "https://chanappr.sirv.com/Bryant-dental/seo/Ignis_2.jpg"

                  ${
                    this.state.reviews && this.state.reviews.length > 0
                      ? ','
                      : ''
                  }
                  ${
                    this.state.reviews && this.state.reviews.length > 0
                      ? `
                        "aggregateRating": {
                          "@type": "AggregateRating",
                          "bestRating": "5",
                          "ratingValue": "4.9",
                          "reviewCount": "${this.state.reviews.length}"
                        },
                        "review": [
                          ${this.state.reviews.map(
                            review =>
                              `{
                              "@type": "Review",
                              "author": "${review.reviewer.first_name} ${
                                review.reviewer.last_name
                              }",
                              "datePublished": "${review.date_created}",
                              "reviewBody": "${review.comments}",
                              "reviewRating": {
                                "@type": "Rating",
                                "bestRating": "5",
                                "ratingValue": "${review.rating}",
                                "worstRating": "1"
                              }
                            }`
                          )}
                        ]`
                      : ''
                  }
                }
              `}
              </script>
            )}
          </Seo>

          <BubbleMobileModal
            isModalOpen={isBubbleModalOpen}
            title={bubbleModalInfo.title}
            text={bubbleModalInfo.text}
            onCloseModal={closeInfoModal}
          />
          <div className="headlights-page">
            <FirstSection
              lightsTop={lightsTop}
              text={text}
              lang={lang}
              onLoad={this.removeOverlay}
              openForm={openForm}
            />

            {load && (
              <section className="lights-store">
                <div className="container no-padding-container">
                  <div className="go-store-wrapper">
                    <div className="image-wrapper">
                      <div className="row">
                        <div className="col-12 col-md-6">
                          <div className="go-store-image" />
                        </div>
                        <div className="col-12 col-md-6">
                          <div className="go-store-image right-image d-none d-md-block" />
                        </div>
                      </div>
                    </div>
                    <div className="text-wrapper">
                      <div className="go-store-text">
                        <p
                          className="sub-title"
                          dangerouslySetInnerHTML={{
                            __html: text.ignisSubtitle[lang]
                              ? text.ignisSubtitle[lang]
                              : text.ignisSubtitle['en'],
                          }}
                        />
                        <Button type="primary" onClick={openForm}>
                          <span
                            dangerouslySetInnerHTML={{
                              __html: text.waitingList[lang]
                                ? text.waitingList[lang]
                                : text.waitingList['en'],
                            }}
                          />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}
            {load && (
              <LoadableLightsAnimation
                finishLoading={() => this.setState({ animationLoaded: true })}
                imageLoaded={imageLoaded}
                loaded={loaded}
                text={text}
                lang={lang}
              />
            )}
            {/* <div className="made-in-britain">
              <MadeInBritain />
            </div> */}
            {load && (
              <section className="lights-go-to-store lazy-show">
                <div className="container lazy-title">
                  <div className="lights-go-to-store-title">
                    <h2>
                      <span
                        onClick={openForm}
                        className="highlight"
                        dangerouslySetInnerHTML={{
                          __html: text.waitingList[lang]
                            ? text.waitingList[lang]
                            : text.waitingList['en'],
                        }}
                      />{' '}
                      <span
                        dangerouslySetInnerHTML={{
                          __html: text.moreInfo[lang]
                            ? text.moreInfo[lang]
                            : text.moreInfo['en'],
                        }}
                      />
                    </h2>
                  </div>
                </div>
                <div className="image-wrapper">
                  <Parallax
                    className="custom-class"
                    y={[15, -20]}
                    tagOuter="figure"
                  >
                    <img
                      src="https://chanappr.sirv.com/Bryant-dental/global/lights-page/new-lights.png?q=100"
                      alt="Bryant Dental Lights"
                      title="Bryant Dental Lights"
                    />
                  </Parallax>
                </div>

                <div className="lights-go-to-store-footer">
                  <Button onClick={openForm} type="primary">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: text.waitingList[lang]
                          ? text.waitingList[lang]
                          : text.waitingList['en'],
                      }}
                    />
                  </Button>
                </div>
              </section>
            )}

            {load && (
              <div className="ExamplePopup">
                <ReactTypeformEmbed
                  popup={true}
                  autoOpen={false}
                  url={'https://bryantdental.typeform.com/to/pXuiLy'}
                  hideHeaders={true}
                  hideFooter={true}
                  buttonText="Go!"
                  style={{ position: 'relative' }}
                  ref={tf => (this.typeformEmbed = tf)}
                />
              </div>
            )}

            {/* {load && (
              <LoadableTechnicalDetailsLights
                openForm={openForm}
                lang={lang}
                text={text}
              />
            )} */}

            {load && (
              <LoadableHeadlightsComparisons
                text={text}
                lang={lang}
                charger={charger}
                battery={battery}
                batteryLight={batteryLight}
                arrowLeft={arrowLeft}
                arrowRight={arrowRight}
              />
            )}

            {load && (
              <LoadableReviews
                text={text}
                lang={lang}
                reviewIgnis={reviewIgnis}
              />
            )}
          </div>
        </>
      </ParallaxProvider>
    );
  }
}

export default withContext(Headlights);

export const query = graphql`
  query {
    lightsTop: file(relativePath: { eq: "lights/lights-top.png" }) {
      childImageSharp {
        fluid(maxHeight: 800, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp_noBase64
        }
      }
    }

    reviewIgnis: file(relativePath: { eq: "lights/reviewIgnis.png" }) {
      childImageSharp {
        fluid(maxHeight: 800, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }

    charger: file(relativePath: { eq: "lights/charger.png" }) {
      childImageSharp {
        fluid(maxHeight: 800, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }

    battery: file(relativePath: { eq: "lights/battery.png" }) {
      childImageSharp {
        fluid(maxHeight: 800, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }

    batteryLight: file(relativePath: { eq: "lights/batteryLight.png" }) {
      childImageSharp {
        fluid(maxHeight: 800, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }

    arrowLeft: file(relativePath: { eq: "lights/arrowLeft.png" }) {
      childImageSharp {
        fluid(maxHeight: 800, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }

    arrowRight: file(relativePath: { eq: "lights/arrowRight.png" }) {
      childImageSharp {
        fluid(maxHeight: 800, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`;
