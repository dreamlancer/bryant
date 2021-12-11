import React from 'react';
import StarRatings from 'react-star-ratings';
import Swiper from 'swiper';
import { Link } from 'gatsby';

import inView from '../../js/in-view.min';
import { blue, purple, darkblue } from '../Shared/variables';
import './index.scss';
import Button from '../Shared/Button';
import withContext from '../../helpers/withContext';
import text from '../../text/components/rating.text';

let mySwiper = null;
const reviews = [
  {
    name: 'Sam Jones',
    // eslint-disable-next-line
    message: `Really pleased with my new loupes. Was dubious about going for the higher magnification (5x), but Priyam convinced me I would not regret my choice. He was right. I absolutely love them. They are super lightweight compared to others and I love the frame.`,
    stars: 5,
    product: 'Dental Loupes (Galilean)',
    profession: 'Dentist',
    image:
      'https://chanappr-cdn.sirv.com/Bryant-dental/testimonial/testimonial1.jpg',
  },
  {
    name: 'Kim Iloa',
    // eslint-disable-next-line
    message: `After a slight delay in getting my loupes, my god was it worth the wait! I've previously used 3 pairs of orascoptics and after returning the interchangeable magnification ones, I was advised to go straight to 5x. I use them for everything and they are lighter than my old 2.5x. Almost every dentist in our practice now uses bryant loupes, and were still working on the owner.`,
    stars: 4,
    product: 'Dental Loupes (Galilean)',
    profession: 'Dentist',
    image:
      'https://chanappr-cdn.sirv.com/Bryant-dental/testimonial/testimonial2.jpg',
  },
  {
    name: 'Emily Ly',
    message:
      'Connor is a genuinely helpful and ethical salesman. He will give you the right advice and won’t try to con you out of your hard earned cash being a dentist himself. His service is friendly and efficient and products lasting. For dentists buyin loupes you cannot fail to be happy with every aspect of their service.',
    stars: 5,
    product: 'Dental Loupes (Galilean)',
    profession: 'Dentist',
    image:
      'https://chanappr-cdn.sirv.com/Bryant-dental/testimonial/testimonial3.jpg',
  },
  {
    name: 'George Kris',
    message:
      'Very impressed! My first set came from Orascoptic and after multiple adjustments they just never felt right which is when i made contact with Bryant dental. The clarity of the lens and the FOV is brilliant. I have gone straight in for the 5X magnification and had no issues tolerating them due to the FOV.',
    stars: 4,
    product: 'Dental Loupes (Galilean)',
    profession: 'Dentist',
    image:
      'https://chanappr-cdn.sirv.com/Bryant-dental/testimonial/testimonial4.jpg',
  },
  {
    name: 'Kim Kristiansen',
    message:
      'I been using Lumadent light from Bryant Dental for 2 years now. They made it easy for me to get the right fitting for my safety glasses and was happy to answer all my questions prior to my purchase. It completely eliminates shadows in my patients mouth and give a clear white daylight look to improve my treatment as much as possible.',
    stars: 5,
    product: 'Dental Loupes (Galilean)',
    profession: 'Dentist',
    image:
      'https://chanappr-cdn.sirv.com/Bryant-dental/testimonial/testimonial5.jpeg',
  },
];

class Rating extends React.Component {
  constructor(props) {
    super(props);

    this.renderStars = this.renderStars.bind(this);
  }

  componentDidMount() {
    const ratingWrapper = document.querySelector('.rating-wrapper');
    const swiperWrapper = document.querySelector('.rating .swiper-wrapper');
    const ratingReviews = Array.from(
      document.querySelectorAll('.rating-review')
    );
    let maxHeight = 0;
    ratingReviews.forEach(rating => {
      if (rating.offsetHeight > maxHeight) {
        maxHeight = rating.offsetHeight;
      }
    });
    ratingReviews.forEach(rating => {
      rating.style.minHeight = `${ratingWrapper.offsetHeight}px`;
    });

    // if (swiperWrapper) {
    //   swiperWrapper.style.height = `${maxHeight}px`;
    // }
    mySwiper = new Swiper('.swiper-rating', {
      loop: true,
      speed: 1500,
      direction: 'horizontal',
      spaceBetween: 100,
      effect: 'fade',
      fadeEffect: {
        crossFade: true,
      },
      navigation: {
        nextEl: '.swiper-button-next-rating',
        prevEl: '.swiper-button-prev-rating',
      },
      // autoplay: {
      // delay: 7000,
      // disableOnInteraction: false,
      // },
    });

    Sirv.start();
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

  componentWillUnmount() {
    if (mySwiper && mySwiper !== 'undefined' && mySwiper !== undefined) {
      // mySwiper.destroy(true, true);
      // mySwiper = null;
    }
  }

  renderStars(rating, dim) {
    return (
      <StarRatings
        rating={parseFloat(rating)}
        starRatedColor={this.props.headlights ? purple : blue}
        starEmptyColor={darkblue}
        numberOfStars={5}
        name="rating"
        starDimension={dim}
        starSpacing="2px"
      />
    );
  }
  renderSlider = (review, key) => {
    const { product } = this.props;
    return (
      <div className="swiper-slide" key={key}>
        <div className="rating-review lazy-title">
          <div className="arrow-left" />
          <div className="reviewer">
            {/* <div className="img-wrapper">
              <img
                className="Sirv"
                src={product ? product.image : review.image}
                alt="Review Image"
                title="Review Image"
                data-options="lazy: false;"
              />
            </div> */}
            <div className="name-wrapper">
              <h3 className="name">
                {review.name ||
                  review.author ||
                  (review.reviewer &&
                    `${review.reviewer.first_name} ${
                      review.reviewer.last_name
                    }`)}
              </h3>
              {review.profession && (
                <h4 className="profession">{review.profession}</h4>
              )}
            </div>
          </div>

          <h2 className="product highlight">
            {product ? product.name : review.product}
          </h2>
          {this.renderStars(review.rating || review.stars, '1.5em')}

          <p className="review-text">
            {review.message || review.text || review.comments}
          </p>
        </div>
      </div>
    );
  };

  render() {
    const {
      product,
      productReview,
      store: { lang },
    } = this.props;
    let productRating = 4.9;

    if (
      product &&
      product.reviews &&
      parseInt(product.reviews.review_total, 10) === 0
    )
      return <React.Fragment />;

    if (product) {
      productRating = product.rating;
    }
    return (
      <section className="rating lazy-show">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="rating-wrapper lazy-title">
                <h2
                  className="rating-title"
                  dangerouslySetInnerHTML={{
                    __html: text.title[lang]
                      ? text.title[lang]
                      : text.title['en'],
                  }}
                />
                {product && (
                  <h3 className="rating-subtitle highlight">{product.name}</h3>
                )}
                <h3
                  className="rating-text"
                  dangerouslySetInnerHTML={{
                    __html: text.rating[lang]
                      ? text.rating[lang]
                      : text.rating['en'],
                  }}
                />
                <h2 className="rating-numbers">
                  {productRating}
                  <span className="rating-small">/5</span>
                </h2>

                <div className="reviews">
                  <div className="reviews-stars">
                    {this.renderStars(productRating, '2.5em')}
                  </div>
                </div>
                <Link to="/reviews">
                  <Button type="primary">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: text.button[lang]
                          ? text.button[lang]
                          : text.button['en'],
                      }}
                    />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="col-md-8">
              <div className="swiper-rating">
                <div className="control-wrapper">
                  <div className="swiper-button-prev-rating">
                    <div className="swipe-arrow-left" />
                  </div>
                  <div className="swiper-button-next-rating">
                    <div className="swipe-arrow-right" />
                  </div>
                </div>
                <div className="swiper-wrapper">
                  {!productReview
                    ? reviews.map((review, key) =>
                        this.renderSlider(review, key)
                      )
                    : product &&
                      product.reviews &&
                      product.reviews.reviews &&
                      product.reviews.reviews.map((review, key) =>
                        this.renderSlider(review, key)
                      )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default withContext(Rating);
