import React, { Component } from 'react';
import StarRatings from 'react-star-ratings';
import { blue, darkblue } from '../Shared/variables';

class ReviewBox extends Component {
  renderStars(rating, dimention) {
    return (
      <StarRatings
        rating={rating}
        starRatedColor={blue}
        starEmptyColor={darkblue}
        numberOfStars={5}
        name="rating"
        starDimension={dimention}
        starSpacing="1px"
      />
    );
  }

  formatDateCreated = dateString =>
    dateString
      .split(' ')[0]
      .split('-')
      .reverse()
      .join('/');

  computeGalleryImages = images => {
    return images.map(image => image.image);
  };

  render() {
    const {
      computeGalleryImages,
      formatDateCreated,
      props: { review, onOpenImage },
    } = this;

    return (
      <div className="review-list-item">
        <div className="row">
          <div className="col-12 col-6 col-lg-3 order-0">
            {this.renderStars(parseInt(review.rating, 8), '1.4rem')}
            <h4 className="list-item-name">
              {review.reviewer.first_name} {review.reviewer.last_name}
            </h4>
            <h5 className="list-item-verified-tag">
              {review.reviewer.verified_buyer ? 'Verified Customer' : ''}
            </h5>
            <h5 className="list-item-date">
              {review.timeago
                ? review.timeago
                : formatDateCreated(review.date_created)}
            </h5>
          </div>
          <div className="col-lg-9 order-2 order-lg-1">
            <p className="list-item-review">
              {review.review ? review.review : review.comments}
            </p>
          </div>
          {review.images && review.images.length > 0 && (
            <div className="col-12 col-lg-9 offset-lg-3 order-last">
              <div className="list-item-images">
                <div className="row">
                  {review.images.map((imageObject, index) => (
                    <div key={imageObject.id} className="col-2">
                      <div className="row">
                        <div className="image-wrapper">
                          <img
                            src={imageObject.image}
                            alt="Review image"
                            title="Review image"
                            onClick={() =>
                              onOpenImage(
                                index,
                                computeGalleryImages(review.images)
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ReviewBox;
