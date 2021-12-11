import React, { Component } from 'react';
import StarRatings from 'react-star-ratings';

import './WriteModal.scss';
import Button from '../Shared/FormButton';
import { blue, blueHover, darkblue } from '../Shared/variables';
import text from '../../text/reviews.text';

export default class WriteModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 5,
      nameError: '',
      reviewError: '',
      id: props.products && props.products.length > 0 && props.products[0].id,
      success: false,
    };
  }

  handleProductSelect = e => {
    const value = e.target.value;
    this.setState({ id: value });
  };

  handleInputChange = (name, e) => {
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    const {
      props: { addReview },
      state: { name, review, id, rating },
    } = this;
    if (!name || name === '') {
      this.setState({ nameError: 'Please enter a name' });
      return;
    }

    if (!review || review === '') {
      this.setState({ reviewError: `Don't forget to leave a review` }); // eslint-disable-line
      return;
    }

    addReview({
      name,
      review,
      rating,
      id,
    }).then(res => {
      if (res.type === 'success') {
        this.setState({ success: true });
      }
      if (res.type === 'error') {
        this.setState({ reviewError: res.message });
      }
    });
  };

  changeRating = rating => {
    this.setState({
      rating,
    });
  };

  renderStars = dimension => {
    const { rating } = this.state;
    return (
      <StarRatings
        rating={rating}
        starRatedColor={blue}
        starEmptyColor={darkblue}
        starHoverColor={blueHover}
        numberOfStars={5}
        name="rating"
        changeRating={this.changeRating}
        starDimension={dimension}
        starSpacing="1px"
      />
    );
  };
  renderProducts = () => {
    const {
      props: { products },
      handleProductSelect,
    } = this;
    if (!products) return <div />;
    if (products.length === 1) {
      return products[0].name;
    }
    return (
      <select
        className="review-product"
        id="product"
        onChange={handleProductSelect}
      >
        {products.map((product, index) => {
          return (
            <option key={index} value={product.id} selected={index === 0}>
              {product.name}
            </option>
          );
        })}
      </select>
    );
  };
  render() {
    const {
      props: { closeWriteReview, addReviewLoading, lang },
      state: { nameError, reviewError, success },
      handleInputChange,
      handleSubmit,
    } = this;

    return (
      <div className="review-modal-wrapper">
        <button className="close-btn" onClick={closeWriteReview}>
          <i className="fas fa-times" />
        </button>
        {!success ? (
          <React.Fragment>
            <h2
              dangerouslySetInnerHTML={{
                __html: text.tellExperience[lang]
                  ? text.tellExperience[lang]
                  : text.tellExperience['en'],
              }}
            />

            <div className="input-wrapper">
              <label
                htmlFor="product"
                dangerouslySetInnerHTML={{
                  __html: text.product[lang]
                    ? text.product[lang]
                    : text.product['en'],
                }}
              />
              {this.renderProducts()}
            </div>

            <div className="input-wrapper">
              <label
                htmlFor="reviewer-name"
                dangerouslySetInnerHTML={{
                  __html: text.name[lang] ? text.name[lang] : text.name['en'],
                }}
              />
              <input
                type="text"
                id="reviewer-name"
                className="name"
                onChange={e => handleInputChange('name', e)}
              />
              <p className="error">{nameError}</p>
            </div>

            <div className="stars">{this.renderStars('2rem')}</div>

            <div className="textarea-wrapper">
              <label
                htmlFor="review"
                dangerouslySetInnerHTML={{
                  __html: text.review[lang]
                    ? text.review[lang]
                    : text.review['en'],
                }}
              />
              <textarea
                type="text"
                id="review"
                onChange={e => handleInputChange('review', e)}
              />
              <p className="error">{reviewError}</p>
            </div>

            <div className="buttons-wrapper">
              <Button
                className="blue-btn"
                disabled={addReviewLoading}
                loading={addReviewLoading}
                onClick={handleSubmit}
              >
                <span
                  dangerouslySetInnerHTML={{
                    __html: text.submit[lang]
                      ? text.submit[lang]
                      : text.submit['en'],
                  }}
                />
              </Button>
              <Button onClick={closeWriteReview}>
                <span
                  dangerouslySetInnerHTML={{
                    __html: text.cancel[lang]
                      ? text.cancel[lang]
                      : text.cancel['en'],
                  }}
                />
              </Button>
            </div>
          </React.Fragment>
        ) : (
          <div className="success-msg">
            <h2
              dangerouslySetInnerHTML={{
                __html: text.thankYou[lang]
                  ? text.thankYou[lang]
                  : text.thankYou['en'],
              }}
            />
            <Button onClick={closeWriteReview}>
              <span
                dangerouslySetInnerHTML={{
                  __html: text.close[lang]
                    ? text.close[lang]
                    : text.close['en'],
                }}
              />
            </Button>
          </div>
        )}
      </div>
    );
  }
}
