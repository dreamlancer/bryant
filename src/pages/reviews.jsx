/* global $ Sirv */
import React from 'react';
import { graphql } from 'gatsby';
import ReactModal from 'react-modal';
import disableScroll from 'disable-scroll';
import StarRatings from 'react-star-ratings';
import Img from 'gatsby-image';

import Seo from '../components/Seo';
import withContext from '../helpers/withContext';
import inView from '../js/in-view.min';
import { blue, darkblue } from '../components/Shared/variables';

import ReviewsList from '../components/ReviewsList';
import Map from '../components/Map';
import SupportCall from '../components/SupportCall';
import TestimonialsSmall from '../components/TestimonialsSmall';
import WriteModal from '../components/ReviewsList/WriteModal';
import text from '../text/reviews.text';

let timeout = null;
let timeout2 = null;

class Review extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: null,
      load: false,
      writeReview: false,
    };
  }

  componentDidMount() {
    this.props.store.fetchReviews(0, true);
    timeout2 = setTimeout(() => {
      this.props.store.loaded(false);

      this.setState({
        load: true,
      });
    }, 500);

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

  static getDerivedStateFromProps(props, state) {
    if (props.store.reviews !== state.reviews) {
      return { reviews: props.store.reviews };
    }
    return null;
  }

  componentWillUnmount() {
    clearTimeout(timeout);
    clearTimeout(timeout2);
  }

  openWriteReview = () => {
    this.setState({ writeReview: true });
  };

  closeWriteReview = () => {
    disableScroll.off();
    this.setState({ writeReview: false });
  };

  renderStars(rating, dimension) {
    return (
      <StarRatings
        rating={rating}
        starRatedColor={blue}
        starEmptyColor={darkblue}
        numberOfStars={5}
        name="rating"
        starDimension={dimension}
        starSpacing="1px"
      />
    );
  }

  renderBadge = img => {
    const {
      data: { reviewsLogo, googleLogo, facebookLogo },
    } = this.props;
    let image;
    if (img === 'facebook') {
      image = facebookLogo;
    } else if (img === 'google') {
      image = googleLogo;
    } else if (img === 'reviews') {
      image = reviewsLogo;
    }

    return (
      <div className="badge">
        <div className="top" />
        <div className="badge-content">
          <Img
            fluid={image.childImageSharp.fluid}
            alt="Reviews Logo"
            title="Reviews Logo"
          />
        </div>
      </div>
    );
  };

  render() {
    const {
      state: { reviews, load, writeReview },
      props: {
        store: {
          fetchReviews,
          isMobile,
          products,
          reviewsCurrentPage,
          reviewsItemsCount,
          reviewsItemsPerPage,
          reviewsLoading,
          addReview,
          addReviewLoading,
          lang,
        },
        data: { reviewsLogo, googleLogo, facebookLogo },
      },
      openWriteReview,
      closeWriteReview,
    } = this;

    return (
      <div className="review-page page-container">
        <Seo
          keywords="bryant dental reviews, dental loupes review, professional dental loupes reviews, dental loupes headlight review, best dental loupes, bryant dental"
          title="Dental Loupes Reviews"
          url="reviews"
          description="Bryant Dental reviews. We don’t advertise because our customers do it for us. See honest reviews for our next-gen dental loupes and wireless headlight here."
        />

        <div className="review-page-content feedback-container">
          <div className="no-filter-container">
            <h1
              dangerouslySetInnerHTML={{
                __html: text.title[lang] ? text.title[lang] : text.title['en'],
              }}
            />
            <div className="no-filter-separator" />
            <div
              className="no-filter-description"
              dangerouslySetInnerHTML={{
                __html: text.description[lang]
                  ? text.description[lang]
                  : text.description['en'],
              }}
            />
            <div className="badges">
              <div style={{ display: 'flex' }}>
                <div className="col-md-4">
                  <a href="https://www.google.com/maps/place/Bryant+Dental/@51.2887781,-0.3544768,17z/data=!4m14!1m6!3m5!1s0x486e3f8e28df6a75:0x733b1f086182d227!2sBryant+Dental+Practice!8m2!3d51.6597562!4d-3.5051339!3m6!1s0x4876035c6e0b9d5f:0xc6acd4e1440e1939!8m2!3d51.2887781!4d-0.3522828!9m1!1b1">
                    {this.renderBadge('google')}
                  </a>
                </div>
                <div className="col-md-4">
                  <div className="image-wrapper">
                    <a href="https://www.facebook.com/pg/BryantDentalOfficial/reviews/?ref=page_internal">
                      {this.renderBadge('facebook')}
                    </a>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="image-wrapper">
                    <a href="https://www.reviews.co.uk/company-reviews/store/bryant-dental">
                      {this.renderBadge('reviews')}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="overall-rating">
            <div className="container">
              <div className="row">
                <div className="col-md-3">
                  <div className="overall-rating-value">
                    <h3
                      className="rating-text"
                      dangerouslySetInnerHTML={{
                        __html: text.overallRating[lang]
                          ? text.overallRating[lang]
                          : text.overallRating['en'],
                      }}
                    />
                    <h2 className="rating-numbers">
                      4.9<span className="rating-small">/5</span>
                    </h2>
                    <div className="reviews">
                      <div className="reviews-stars">
                        {this.renderStars(5, '1.8em')}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-9 overall-rating-call-action">
                  <h3
                    className="sub-title"
                    dangerouslySetInnerHTML={{
                      __html: text.subTitle[lang]
                        ? text.subTitle[lang]
                        : text.subTitle['en'],
                    }}
                  />

                  <div>
                    <button
                      className="btn blue-btn write-review-btn"
                      onClick={this.openWriteReview}
                      dangerouslySetInnerHTML={{
                        __html: text.writeReview[lang]
                          ? text.writeReview[lang]
                          : text.writeReview['en'],
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <TestimonialsSmall openWriteReview={openWriteReview} /> */}
          {load && reviews && reviews.length > 0 ? (
            <ReviewsList
              reviews={reviews}
              reviewsLogo={reviewsLogo}
              fetchReviews={fetchReviews}
              reviewsCurrentPage={reviewsCurrentPage}
              reviewsItemsPerPage={reviewsItemsPerPage}
              reviewsItemsCount={reviewsItemsCount}
              reviewsLoading={reviewsLoading}
              isMobile={isMobile}
            />
          ) : (
            <p
              dangerouslySetInnerHTML={{
                __html: text.writeReview[lang]
                  ? text.writeReview[lang]
                  : text.writeReview['en'],
              }}
            />
          )}
        </div>

        {load && <SupportCall />}
        {load && <Map />}

        <ReactModal
          isOpen={writeReview}
          ariaHideApp={false}
          onAfterOpen={() => disableScroll.on()}
          // className="write-review-modal"
          // overlayClassName="write-review-modal-underlay"
          onRequestClose={closeWriteReview}
          shouldCloseOnOverlayClick
          shouldCloseOnEsc
        >
          <WriteModal
            closeWriteReview={closeWriteReview}
            products={products}
            addReview={addReview}
            addReviewLoading={addReviewLoading}
            lang={lang}
          />
        </ReactModal>
      </div>
    );
  }
}

export default withContext(Review);

export const query = graphql`
  query {
    reviewsLogo: file(relativePath: { eq: "reviews/reviews-logo.png" }) {
      childImageSharp {
        fluid(maxWidth: 200, quality: 90) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    googleLogo: file(relativePath: { eq: "reviews/google-logo.png" }) {
      childImageSharp {
        fluid(maxWidth: 200, quality: 90) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    facebookLogo: file(relativePath: { eq: "reviews/facebook-logo0.png" }) {
      childImageSharp {
        fluid(maxWidth: 200, quality: 90) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
  }
`;
