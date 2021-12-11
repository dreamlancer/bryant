/* global Sirv */
import React from 'react';
import Swiper from 'swiper';
import './index.scss';
import inView from '../../js/in-view.min';

let mySwiper = null;

class TestimonialsSmall extends React.Component {
  componentDidMount() {
    mySwiper = new Swiper('.swiper-container', {
      loop: true,
      centeredSlides: true,
      grabCursor: true,
      slideToClickedSlide: true,
      breakpointsInverse: true,
      breakpoints: {
        0: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        410: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
        650: {
          slidesPerView: 4,
          spaceBetween: 10,
        },
        992: {
          slidesPerView: 4,
          spaceBetween: 15,
        },
        1130: {
          slidesPerView: 5,
          spaceBetween: 15,
        },
        1333: {
          slidesPerView: 5,
          spaceBetween: '50%',
        },
      },
    });

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

  componentWillUnmount() {
    if (mySwiper) {
      mySwiper.destroy(true, true);
      mySwiper = null;
    }
  }

  render() {
    return (
      <section className="feedback-container lazy-show">
        <div className="swiper-container">
          <div className="swiper-wrapper">
            {[
              {
                name: 'Jorge De Abajo',
                avatar:
                  'https://chanappr-cdn.sirv.com/Bryant-dental/testimonial/testimonial1.jpg',
                comment: 'Very nice product.',
              },
              {
                name: 'Afaq Mahmood',
                avatar:
                  'https://chanappr-cdn.sirv.com/Bryant-dental/testimonial/testimonial2.jpg',
                comment: 'Received my loupes this week',
              },
              {
                name: 'Sunil',
                avatar:
                  'https://chanappr-cdn.sirv.com/Bryant-dental/testimonial/testimonial3.jpg',
                comment: 'Excellent customer service.',
              },
              {
                name: 'Neha Singh',
                avatar:
                  'https://chanappr-cdn.sirv.com/Bryant-dental/testimonial/testimonial4.jpg',
                comment: 'I am very happy',
              },
              {
                name: 'Kim Kristiansen',
                avatar:
                  'https://chanappr-cdn.sirv.com/Bryant-dental/testimonial/testimonial4.jpg',
                comment: 'I been using Lumadent',
              },
            ].map((review, index) => (
              <div className="swiper-slide" key={index}>
                <div className="feedback-box">
                  <div className="name-wrapper">
                    <h3 className="name">{review.name}</h3>
                  </div>
                  <div className="img">
                    <img
                      className="Sirv"
                      data-src={review.avatar}
                      alt="Review avatar"
                      title="Review avatar"
                      data-options="lazy: false;"
                    />
                  </div>
                  {this.renderStars(5, '1.1em')}
                  <div className="text-wrapper">
                    <div className="product-label">2.5x Loupes</div>
                    <div className="message">"{review.comment}"</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
}

export default TestimonialsSmall;
