import React, { Component } from 'react';
import Pagination from 'react-js-pagination';
import Img from 'gatsby-image';
import StarRatings from 'react-star-ratings';

import ReviewBox from './ReviewBox';
import ImagesModal from '../ImagesModal';

import smoothscroll from 'smoothscroll-polyfill';
if (typeof window !== 'undefined') {
  smoothscroll.polyfill();
  window.__forceSmoothScrollPolyfill__ = true;
}

const isProduct = reviewsType => reviewsType === 'product';

const initialModalState = {
  isImagesModalOpen: false,
  modalImageIndex: 0,
  modalImages: undefined,
  isModalOpen: false,
};

class Reviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewsType: 'product',
      writeReview: false,
      ...initialModalState,
    };
  }

  scrollUp = () => {
    const element = document.querySelector('.review-list-container');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  updateReviewType = event => {
    const { fetchReviews } = this.props;
    const reviewsType = event.target.value;

    fetchReviews(undefined, isProduct(reviewsType));
    this.setState({ reviewsType });
  };

  handleOpenModal = (imageIndex, images) => {
    this.setState({
      isImagesModalOpen: true,
      modalImageIndex: imageIndex,
      modalImages: images,
    });
  };

  handleCloseModal = () => {
    this.setState({ ...initialModalState });
  };

  renderStars(rating) {
    return (
      <StarRatings
        rating={rating}
        starRatedColor="gold"
        starEmptyColor="transparent"
        numberOfStars={rating}
        name="rating"
        starDimension="0.7rem"
        starSpacing="1px"
      />
    );
  }

  render() {
    const {
      handleOpenModal,
      handleCloseModal,
      updateReviewType,
      props: {
        reviews,
        reviewsLogo,
        fetchReviews,
        reviewsItemsPerPage,
        reviewsItemsCount,
        reviewsCurrentPage,
        reviewsLoading,
        isMobile,
      },
      state: { reviewsType, isImagesModalOpen, modalImageIndex, modalImages },
    } = this;

    return (
      <React.Fragment>
        <ImagesModal
          imageIndexClicked={modalImageIndex}
          images={modalImages}
          isModalOpen={isImagesModalOpen}
          onOpenModal={handleOpenModal}
          onCloseModal={handleCloseModal}
          isMobile={isMobile}
        />

        <div className="container">
          <div className="review-list-container">
            <div className="row">
              <div className="col-12">
                <div className="review-first-section">
                  <div className="reviews-left rating-overview-col">
                    <div className="rating-overview-container">
                      <div className="reviews-logo-wrapper">
                        <div className="pre-text">Powered by</div>
                        <Img
                          fluid={reviewsLogo.childImageSharp.fluid}
                          alt="Reviews Logo"
                          title="Reviews Logo"
                        />
                      </div>

                      <ul className="rating-overview">
                        {[
                          {
                            percentage: '97.06%',
                            reviewCount: 66,
                            starsCount: 5,
                          },
                          {
                            percentage: '2.94%',
                            reviewCount: 2,
                            starsCount: 4,
                          },
                          {
                            percentage: '0.00%',
                            reviewCount: 0,
                            starsCount: 3,
                          },
                          {
                            percentage: '0.00%',
                            reviewCount: 0,
                            starsCount: 2,
                          },
                          {
                            percentage: '0.00%',
                            reviewCount: 0,
                            starsCount: 1,
                          },
                        ].map((ratingGroup, index) => (
                          <li key={index} className="review-line">
                            <div className="value-wrapper">
                              <div>{ratingGroup.percentage}</div>
                              <div className="review-count">
                                · {ratingGroup.reviewCount} reviews
                              </div>
                            </div>
                            <div className="stars-count">
                              {this.renderStars(ratingGroup.starsCount)}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="reviews-right">
                    <div className="review-list-filters-wrapper">
                      <div className="review-list-filters">
                        <div className="row">
                          {/* <div className="col-10 col-lg-7">
                            <input
                              className="search-input-field"
                              type="text"
                              placeholder="Search for reviews"
                            />
                          </div> */}
                          <div className="col-lg-3 offset-lg-8 select-input-field-col">
                            <div className="select-input-field-wrapper">
                              <select
                                value={reviewsType}
                                onChange={updateReviewType}
                              >
                                <option value="product">Product reviews</option>
                                <option value="company">Company reviews</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="review-list">
                      {reviewsLoading && (
                        <div className="overlay">
                          <div id="loading" />
                        </div>
                      )}
                      {reviews.map(review => (
                        <ReviewBox
                          key={
                            review.product_review_id
                              ? review.product_review_id
                              : review.store_review_id
                          }
                          onOpenImage={handleOpenModal}
                          review={review}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="review-list-pagination">
            <Pagination
              activePage={reviewsCurrentPage + 1}
              itemsCountPerPage={reviewsItemsPerPage}
              totalItemsCount={reviewsItemsCount}
              pageRangeDisplayed={5}
              onChange={pageNumber => {
                this.scrollUp();
                this.setState({ page: pageNumber });
                fetchReviews(pageNumber - 1, isProduct(reviewsType));
              }}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Reviews;
