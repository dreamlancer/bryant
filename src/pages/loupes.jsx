/* global Sirv $ */
import React from 'react';
import Loadable from 'react-loadable';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';

import Seo from '../components/Seo';
import withContext from '../helpers/withContext';
import inView from '../js/in-view.min';
import Loader from '../components/Shared/Loader';

import text from '../text/loupes.text';

import smoothscroll from 'smoothscroll-polyfill';

if (typeof window !== 'undefined') {
  smoothscroll.polyfill();
  window.__forceSmoothScrollPolyfill__ = true;
}

const LoadableLoupesBespoke = Loadable({
  loader: () => import('../components/Loupes/LoupesBespoke'),
  loading() {
    return <Loader />;
  },
});

import LoupesSlider from '../components/Loupes/LoupesSlider';
import LoupesFirstSection from '../components/Loupes/LoupesFirstSection';

const LoadableLoupes360 = Loadable({
  loader: () => import('../components/Loupes/Loupes360'),
  loading() {
    return <Loader />;
  },
});

const LoadableLoupesPosture = Loadable({
  loader: () => import('../components/Loupes/LoupesPosture'),
  loading() {
    return <Loader />;
  },
});
const LoadableBespoke3Steps = Loadable({
  loader: () => import('../components/Loupes/Bespoke3Steps'),
  loading() {
    return <Loader />;
  },
});

const LoadableLoupesGallery = Loadable({
  loader: () => import('../components/Loupes/LoupesGallery'),
  loading() {
    return <Loader />;
  },
});

const LoadableProductSpecsZoom = Loadable({
  loader: () => import('../components/Loupes/ProductSpecsZoom'),
  loading() {
    return <Loader />;
  },
});

import LoupesGraphs from '../components/Loupes/LoupesGraphs';

const LoadableTechnicalDetailsLoupes = Loadable({
  loader: () => import('../components/Loupes/TechnicalDetailsLoupes'),
  loading() {
    return <Loader />;
  },
});

const LoadableRating = Loadable({
  loader: () => import('../components/Rating'),
  loading() {
    return <Loader />;
  },
});

const LoadableReviews = Loadable({
  loader: () => import('../components/Loupes/LoupesReviews'),
  loading() {
    return <Loader />;
  },
});

const LoadableLoupesCollection = Loadable({
  loader: () => import('../components/Loupes/LoupesCollection'),
  loading() {
    return <Loader />;
  },
});

let timeout1 = null;
let timeout2 = null;
let timeout3 = null;

class Loupes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      load: false,
      movePageLeft: false,
      showClass: null,
      showSwitchBtn: false,
      touchedBespoke: false,
      productReviews: null,
      reviews: null,
    };
  }

  componentDidMount() {
    // Start sirv
    Sirv.start();
    this.props.store.fetchReviews(0, false, 30);

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
    timeout1 = setTimeout(() => {
      this.setState({
        showClass: 'show',
      });
    }, 100);
    timeout2 = setTimeout(() => {
      this.setState({
        showSwitchBtn: true,
        load: true,
      });
    }, 600);

    // Move remove overlay in first section on load
    // Or a similar action to remove the overlay
    this.removeOverlay();
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
        name: 'Bryant dental loupes',
        rating: '4.9',
        image: null,
        reviews: { reviews },
      };

      return { productReviews, reviews: props.store.reviews };
    }
    return null;
  }

  componentWillUnmount() {
    clearTimeout(timeout1);
    clearTimeout(timeout2);
    clearTimeout(timeout3);
  }

  getScrollTop = () => {
    return (
      window.pageYOffset ||
      (document.documentElement && document.documentElement.scrollTop)
    );
  };

  skipToTechnical = e => {
    e.preventDefault();
    // Scroll to a certain element
    document.querySelector('#technical-details').scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'start',
    });
  };

  removeOverlay = () => {
    const { loaded } = this.props.store;
    timeout3 = setTimeout(() => {
      loaded(false);
    }, 1500);
  };

  togglePagePosition = () => {
    const { movePageLeft } = this.state;
    const { toggleNavbar } = this.props.store;
    toggleNavbar();
    this.setState({ movePageLeft: !movePageLeft });
  };

  renderMeta = () => {
    const {
      props: { location },
      state: { reviews },
    } = this;
    return (
      <Seo
        title="Dental Loupes"
        url="loupes"
        image="https://chanappr.sirv.com/Bryant-dental/360/Big%20loupes/BryantDental_glasses_360_longLoupes_00005.jpg"
        imageType="image/jpg"
        description="The world’s lightest dental loupes. Unrivalled in clarity, field of view and depth of focus, Bryant Dental loupes are the best addition into your life as a dentist. Book a free demo to get measured up and start your journey."
        keywords="dental loupes, loupes for dentists, best dental loupes, dentist loupes, dental loupe, dental loupes uk, xenosys loupes"
      >
        <script type="application/ld+json">
          {`
            {
              "@context": "http://schema.org",
              "@type": "Product",
              "url": "https://bryant.dental/loupes",
              "name": "Bryant Dental Loupes",
              "description": "The World's Lightest Dental Loupes.",
              "brand": {
                "@type": "Thing",
                "name": "Bryant Dental: Loupes & Headlights"
              },
              "image": "https://chanappr.sirv.com/Bryant-dental/360/Big%20loupes/BryantDental_glasses_360_longLoupes_00005.jpg"

              ${reviews && reviews.length > 0 ? ',' : ''}
              ${
                reviews && reviews.length > 0
                  ? `
                    "aggregateRating": {
                      "@type": "AggregateRating",
                      "bestRating": "5",
                      "ratingValue": "4.9",
                      "reviewCount": "${reviews.length}"
                    },
                    "review": [
                      ${reviews.map(
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
      </Seo>
    );
  };

  render() {
    const {
      data,
      data: {
        downInfo,
        upInfo,
        spin,
        bigLoupes,
        smallLoupes,
        arrowRightDouble,
        arrowLeftDouble,
        xenosysLogo,
        loupesImg1,
        loupesImg2,
        loupesImg3,
        loupesImg4,
        loupesImg5,
        reviewLoupes25,
        reviewLoupes28,
        reviewLoupes35,
        reviewLoupes50,
        reviewLoupes75,
        loupesSlider25,
        loupesSlider28,
        loupesSlider35,
        loupesSlider50,
        loupesSlider75,
      },
      store: { isMobile, lang },
    } = this.props;
    const {
      movePageLeft,
      showClass,
      showSwitchBtn,
      load,
      touchedBespoke,
      productReviews,
    } = this.state;

    let imgSlider = [
      loupesSlider35.childImageSharp.fluid.src,
      loupesSlider50.childImageSharp.fluid.src,
      loupesSlider75.childImageSharp.fluid.src,
      loupesSlider25.childImageSharp.fluid.src,
      loupesSlider28.childImageSharp.fluid.src,
    ];

    return [
      <>
        {this.renderMeta()}
        <LoupesSlider img={imgSlider} lang={lang} />
        {load && <LoadableLoupesPosture text={text} lang={lang} />}
        {load && (
          <LoadableLoupesCollection
            text={text}
            lang={lang}
            loupesCollectionImages={{
              loupesImg1,
              loupesImg2,
              loupesImg3,
              loupesImg4,
              loupesImg5,
            }}
          />
        )}
        {load && <LoadableBespoke3Steps data={data} />}

        <div
          key="2"
          className={`loupes-page loupes-page-test1 
          ${movePageLeft ? 'movePageLeft' : ''}
          ${showClass ? showClass : ''}
        `}
        >
          {/* {load && (
            <LoadableProductSpecsZoom data={data} text={text} lang={lang} />
          )} */}

          {/* {load && (
            <LoadableLoupes360
              spin={spin.childImageSharp.fluid}
              text={text}
              lang={lang}
            />
          )} */}

          {load && <LoupesGraphs text={text} lang={lang} />}
          {load && (
            <LoadableTechnicalDetailsLoupes
              text={text}
              lang={lang}
              xenosysLogo={xenosysLogo.childImageSharp.fluid}
            />
          )}
          {<LoadableLoupesGallery />}
          {/* {load && productReviews && (
            <LoadableRating product={productReviews} productReview />
          )} */}
          {load && (
            <LoadableReviews
              text={text}
              lang={lang}
              reviewLoupes25={reviewLoupes25}
              reviewLoupes28={reviewLoupes28}
              reviewLoupes35={reviewLoupes35}
              reviewLoupes50={reviewLoupes50}
              reviewLoupes75={reviewLoupes75}
            />
          )}
        </div>
      </>,
    ];
  }
}

export default withContext(Loupes);

export const query = graphql`
  query {
    upInfo: file(relativePath: { eq: "loupes/up-info.png" }) {
      childImageSharp {
        fluid(maxHeight: 100, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    downInfo: file(relativePath: { eq: "loupes/down-info.png" }) {
      childImageSharp {
        fluid(maxHeight: 100, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    spin: file(relativePath: { eq: "new-spin.png" }) {
      childImageSharp {
        fluid(maxHeight: 800, quality: 100) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    bigLoupes: file(relativePath: { eq: "loupes/big-loupes.jpg" }) {
      childImageSharp {
        fluid(maxHeight: 800, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    smallLoupes: file(relativePath: { eq: "loupes/small-loupes.jpg" }) {
      childImageSharp {
        fluid(maxHeight: 800, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    loupes1: file(relativePath: { eq: "loupes/specs/specs-glasses-1.png" }) {
      childImageSharp {
        fluid(maxHeight: 800, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    specsMask1: file(relativePath: { eq: "loupes/specs/specs-mask-1.png" }) {
      childImageSharp {
        fluid(maxHeight: 800, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    loupes2: file(relativePath: { eq: "loupes/specs/specs-glasses-2.png" }) {
      childImageSharp {
        fluid(maxHeight: 800, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    specsMask2: file(relativePath: { eq: "loupes/specs/specs-mask-2.png" }) {
      childImageSharp {
        fluid(maxHeight: 800, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    loupes3: file(relativePath: { eq: "loupes/specs/specs-glasses-3.png" }) {
      childImageSharp {
        fluid(maxHeight: 800, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    specsMask3: file(relativePath: { eq: "loupes/specs/specs-mask-3.png" }) {
      childImageSharp {
        fluid(maxHeight: 800, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    loupes4: file(relativePath: { eq: "loupes/specs/specs-glasses-4.png" }) {
      childImageSharp {
        fluid(maxHeight: 800, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    specsMask4: file(relativePath: { eq: "loupes/specs/specs-mask-4.png" }) {
      childImageSharp {
        fluid(maxHeight: 800, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    loupes5: file(relativePath: { eq: "loupes/specs/specs-glasses-5.png" }) {
      childImageSharp {
        fluid(maxHeight: 800, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    specsMask5: file(relativePath: { eq: "loupes/specs/specs-mask-5.png" }) {
      childImageSharp {
        fluid(maxHeight: 800, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    loupes6: file(relativePath: { eq: "loupes/specs/specs-glasses-6.png" }) {
      childImageSharp {
        fluid(maxHeight: 800, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    specsMask6: file(relativePath: { eq: "loupes/specs/specs-mask-6.png" }) {
      childImageSharp {
        fluid(maxHeight: 800, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    explodeLoupe: file(relativePath: { eq: "loupes/explode-loupes.png" }) {
      childImageSharp {
        fluid(maxHeight: 800, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    mask1: file(relativePath: { eq: "loupes/specs/mask-1.png" }) {
      childImageSharp {
        fluid(maxHeight: 800, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    mask2: file(relativePath: { eq: "loupes/specs/mask-2.png" }) {
      childImageSharp {
        fluid(maxHeight: 800, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    mask3: file(relativePath: { eq: "loupes/specs/mask-3.png" }) {
      childImageSharp {
        fluid(maxHeight: 800, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    mask4: file(relativePath: { eq: "loupes/specs/mask-4.png" }) {
      childImageSharp {
        fluid(maxHeight: 800, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    mask5: file(relativePath: { eq: "loupes/specs/mask-5.png" }) {
      childImageSharp {
        fluid(maxHeight: 800, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    arrowRightDouble: file(relativePath: { eq: "arrow-right-double.png" }) {
      childImageSharp {
        fluid(maxHeight: 800, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    arrowLeftDouble: file(relativePath: { eq: "arrow-left-double.png" }) {
      childImageSharp {
        fluid(maxHeight: 800, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    xenosysLogo: file(relativePath: { eq: "xenosys_logo.png" }) {
      childImageSharp {
        fluid(maxHeight: 800, quality: 100) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }

    loupesImg1: file(relativePath: { eq: "loupes/2.5.png" }) {
      childImageSharp {
        fluid(maxHeight: 800, quality: 100) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }

    loupesImg2: file(relativePath: { eq: "loupes/2.8.png" }) {
      childImageSharp {
        fluid(maxHeight: 800, quality: 100) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }

    loupesImg3: file(relativePath: { eq: "loupes/3.5.png" }) {
      childImageSharp {
        fluid(maxHeight: 800, quality: 100) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }

    loupesImg4: file(relativePath: { eq: "loupes/5.0.png" }) {
      childImageSharp {
        fluid(maxHeight: 800, quality: 100) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }

    loupesImg5: file(relativePath: { eq: "loupes/7.5.png" }) {
      childImageSharp {
        fluid(maxHeight: 800, quality: 100) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }

    bespokeFrame: file(relativePath: { eq: "loupes/bespoke/frame.png" }) {
      childImageSharp {
        fluid(maxHeight: 800, quality: 100) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }

    frontLoupe: file(relativePath: { eq: "loupes/bespoke/front_loupe.png" }) {
      childImageSharp {
        fluid(maxHeight: 800, quality: 100) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }

    faceBespoke: file(relativePath: { eq: "loupes/bespoke/face-bespoke.png" }) {
      childImageSharp {
        fluid(maxHeight: 800, quality: 100) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }

    faceBespokeMask1: file(
      relativePath: { eq: "loupes/bespoke/face-bespoke-mask1.png" }
    ) {
      childImageSharp {
        fluid(maxHeight: 800, quality: 100) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }

    faceBespokeMask2: file(
      relativePath: { eq: "loupes/bespoke/face-bespoke-mask2.png" }
    ) {
      childImageSharp {
        fluid(maxHeight: 800, quality: 100) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }

    faceBespokeMask3: file(
      relativePath: { eq: "loupes/bespoke/face-bespoke-mask3.png" }
    ) {
      childImageSharp {
        fluid(maxHeight: 800, quality: 100) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }

    reviewLoupes25: file(relativePath: { eq: "loupes/loupes-2.5.png" }) {
      childImageSharp {
        fluid(maxWidth: 400, quality: 100) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }

    reviewLoupes28: file(relativePath: { eq: "loupes/loupes-2.8.png" }) {
      childImageSharp {
        fluid(maxWidth: 400, quality: 100) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }

    reviewLoupes35: file(relativePath: { eq: "loupes/loupes-3.5.png" }) {
      childImageSharp {
        fluid(maxWidth: 400, quality: 100) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }

    reviewLoupes50: file(relativePath: { eq: "loupes/loupes-5.0.png" }) {
      childImageSharp {
        fluid(maxWidth: 400, quality: 100) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }

    reviewLoupes75: file(relativePath: { eq: "loupes/loupes-7.5.png" }) {
      childImageSharp {
        fluid(maxWidth: 400, quality: 100) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    loupesSlider25: file(relativePath: { eq: "loupes/loupesSlider25.png" }) {
      childImageSharp {
        fluid(maxHeight: 800, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }

    loupesSlider28: file(relativePath: { eq: "loupes/loupesSlider28.png" }) {
      childImageSharp {
        fluid(maxHeight: 800, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }

    loupesSlider35: file(relativePath: { eq: "loupes/loupesSlider35.png" }) {
      childImageSharp {
        fluid(maxHeight: 800, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }

    loupesSlider50: file(relativePath: { eq: "loupes/loupesSlider50.png" }) {
      childImageSharp {
        fluid(maxHeight: 800, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }

    loupesSlider75: file(relativePath: { eq: "loupes/loupesSlider75.png" }) {
      childImageSharp {
        fluid(maxHeight: 800, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`;
