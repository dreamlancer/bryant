import React from 'react';
import StarRatings from 'react-star-ratings';
import Swiper from 'swiper';
import { Link } from 'gatsby';

import inView from '../../../js/in-view.min';
import { blue, darkblue } from '../../Shared/variables';
import Button from '../../Shared/Button';
import './index.scss';

let timeout = null;
let testimonialsBigSwiper = null;

class TestimonialsBig extends React.Component {
  componentDidMount() {
    const {
      props: { isMobile },
    } = this;

    if (isMobile) {
      testimonialsBigSwiper = new Swiper('.swiper-testimonials-big', {
        loop: true,
        centeredSlides: true,
        grabCursor: true,
        slideToClickedSlide: true,
        spaceBetween: 100,

        // loop: true,
        // speed: 1000,
        // direction: 'horizontal',
        // spaceBetween: 100,
        // effect: 'fade',
        // fadeEffect: {
        //   crossFade: true,
        // },
        autoplay: {
          delay: 7000,
          disableOnInteraction: false,
        },
      });
    }

    Sirv.start();
    inView({
      selector: '.lazy-show',
      enter: el => {
        el.classList.add('entered');
        if (el.classList.contains('big-testimonials')) {
          const items = Array.from(el.querySelectorAll('.first'));
          if (items.length !== 0) {
            timeout = setTimeout(() => {
              items.forEach(e => e.classList.remove('first'));
            }, 700);
          }
        }
      },
      offset: 0.2,
      exit: el => {
        el.classList.remove('entered');
      },
    });
  }

  componentWillUnmount() {
    clearTimeout(timeout);
    if (testimonialsBigSwiper) {
      testimonialsBigSwiper.destroy(true, true);
      testimonialsBigSwiper = null;
    }
  }

  renderStars(rating) {
    return (
      <StarRatings
        rating={rating}
        starRatedColor={blue}
        starEmptyColor={darkblue}
        numberOfStars={5}
        name="rating"
        starDimension="19px"
        starSpacing="2px"
      />
    );
  }

  renderTestimonial = (review, index, isMobile = false) => {
    return (
      <div className="testimonial-wrapper">
        <div className={`image-header t${index + 1}`} />
        <div
          className={`testimonial-content ${isMobile ? '' : 'desktop-content'}`}
        >
          <h4 className="product-name">{review.name}</h4>
          <div className="stars">{this.renderStars(review.rating)}</div>
          <p className="text">{review.text}</p>
        </div>
      </div>
    );
  };

  render() {
    const {
      props: {
        isMobile,
        store: { lang },
        text,
      },
    } = this;

    const reviews = [
      {
        name: 'Hitesh Gohil',
        image:
          'https://chanappr-cdn.sirv.com/Bryant-dental/testimonial/testimonial2.jpg',
        text:
          'Both myself and my wife have practised dentistry over 20 years each. We have used a few off the peg dental loupes with moderate satisfaction. Having been introduced to Connor from Bryant Dental, we were 100% sure that we are going to get the right product. Facial scan- all measurements taken professionally, 8- 10 weeks later our custom made loupes arrived in a very smart looking case. I have used them for 1 month now and I have a massive improvement in my ability to carry out intricate procedures. I use them daily and have no headaches or eye strain after use. I can not thank the team at Bryant Dental for changing my experience with loupes. Great service before and after, and happy to recommend them to any dentist, hygienist or technician.- Anyone practising dentistry without loupes is missing the smaller picture!',
        rating: 5,
      },
      {
        name: 'Paul Simmons',
        image:
          'https://chanappr-cdn.sirv.com/Bryant-dental/testimonial/testimonial1.jpg',
        text:
          "After a slight delay in getting my loupes, my god was it worth the wait! I've previously used 3 pairs of orascoptics and after returning the interchangeable magnification ones, I was advised to go straight to 5x. I use them for everything and they are lighter than my old 2.5x. Almost every dentist in our practice now uses bryant loupes, and were still working on the owner.", // eslint-disable-line
        rating: 5,
      },
      {
        name: 'Nalin Karunarat',
        image:
          'https://chanappr-cdn.sirv.com/Bryant-dental/testimonial/testimonial5.jpeg',
        text:
          'Connor is a genuinely helpful and ethical salesman. He will give you the right advice and won’t try to con you out of your hard earned cash being a dentist himself. His service is friendly and efficient and products lasting. For dentists buyin loupes you cannot fail to be happy with every aspect of their service.',
        rating: 5,
      },
      {
        name: 'George Kris',
        image:
          'https://chanappr-cdn.sirv.com/Bryant-dental/testimonial/testimonial4.jpg',
        text:
          "Very impressed! My first set came from Orascoptic and after multiple adjustments they just never felt right which is when i made contact with Bryant dental. The clarity of the lens and the FOV is brilliant. I have gone straight in for the 5X magnification and had no issues tolerating them due to the FOV. I was also very impressed with Connor Bryant who sold me the loupes. He was very knowledgeable and friendly and I can't recommend this company enough!", // eslint-disable-line
        rating: 5,
      },
      {
        name: 'Jess Bell',
        image:
          'https://chanappr-cdn.sirv.com/Bryant-dental/testimonial/testimonial3.jpg',
        text:
          'Fully deserves all 5 stars for this one. Such a great product the frames are so comfortable and lightweight, the light is insane...finally I can actually see! Customer service is second to none...questions answered in minutes even months after purchase which fills me with confidence. Thanks Connor',
        rating: 5,
      },
      {
        name: 'Sha Patel',
        image:
          'https://chanappr-cdn.sirv.com/Bryant-dental/testimonial/testimonial2.jpg',
        text:
          'Really pleased with my new loupes. Was dubious about going for the higher magnification (5x), but Priyam convinced me I would not regret my choice. He was right. I absolutely love them. They are super ligtweight compared to others and I love the frame. Great service amazing loupes! They are super ligtweight compared to others and I love the frame. Great service amazing loupes! They are super. weight compared to others a love...',
        rating: 5,
      },
      {
        name: 'Kim Kristiansen',
        image:
          'https://chanappr-cdn.sirv.com/Bryant-dental/testimonial/testimonial1.jpg',
        text:
          'I been using Lumadent light from Bryant Dental for 2 years now. They made it easy for me to get the right fitting for my safety glasses and was happy to answer all my questions prior to my purchase. It completely eliminates shadows in my patients mouth and give a clear white daylight look to improve my treatment as much as possible. I can easily recommend to anyone wanting a top range headlight for a fantastic value. 10 out of 10 in my opinion.',
        rating: 5,
      },
    ];

    return (
      <section className="big-testimonials lazy-show">
        <div className="container">
          <h2
            className="testimonial-title lazy-title"
            dangerouslySetInnerHTML={{
              __html: text.testimonialsTitle[lang]
                ? text.testimonialsTitle[lang]
                : text.testimonialsTitle['en'],
            }}
          />

          {isMobile ? (
            <div className="swiper-testimonials-big">
              <div className="swiper-wrapper">
                {reviews.map((review, index) => (
                  <div key={index} className="swiper-slide">
                    {this.renderTestimonial(review, index, true)}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="testimonials-wrapper">
              <div className="row">
                <div className="col-md-6 d-md-block lazy-testimonial first">
                  {this.renderTestimonial(reviews[0], 0)}
                </div>

                {reviews.map((review, index) => {
                  if (index !== 0) {
                    return (
                      <div
                        key={index}
                        className="col-md-3 col-sm-4 d-sm-block small lazy-testimonial first"
                      >
                        {this.renderTestimonial(review, index)}
                      </div>
                    );
                  }
                })}
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="visit-reviews">
                    <Link to="/reviews">
                      <Button type="secondary">
                        <span
                          dangerouslySetInnerHTML={{
                            __html: text.testimonialsButton[lang]
                              ? text.testimonialsButton[lang]
                              : text.testimonialsButton['en'],
                          }}
                        />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }
}

export default TestimonialsBig;
