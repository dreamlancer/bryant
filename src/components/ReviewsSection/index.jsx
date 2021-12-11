import React from 'react';
import StarRatings from 'react-star-ratings';
import Img from 'gatsby-image';
import inView from '../../js/in-view.min';
import SectionWrapper from '../Shared/SectionWrapper';
import { colors } from '../../constants/theme';

import {
  ReviewsWrapperCss,
  TitleBlockCss,
  TitleCss,
  RatingRow,
  RatingText,
  RatingAverage,
  RatingStars,
  CarouselCss,
  CarouselBlockCss,
  ReviewBlock,
  ProductZone,
  ProductName,
  ReviewImage,
  ProductMagnification,
  ReviewZone,
  ReviewStars,
  ReviewTitle,
  ReviewTitleMobile,
  ReviewAuthor,
  EmphasizedText,
  ReviewDate,
  ReviewMessage,
  ReviewParagraph,
  ReviewChecks,
  ReviewVerifiedBuyer,
  ReviewsTag,
  ClickableArea,
} from './index.css';

class ReviewsSection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentReview: 0,
      lockedNavigation: false,
    };

    // Reference for adding event listeners
    this.swipeableRef = React.createRef();
    // Initial value when a swipe starts
    this.initSwipeX = null;
    // If the slides were changed, no more swipes are allowed in this swipe event
    this.swiped = false;
  }

  componentDidMount() {
    // Adding event listeners for all touch events
    if (this.swipeableRef.current) {
      this.swipeableRef.current.addEventListener(
        'touchstart',
        this.handleTouchStart,
        false
      );
      this.swipeableRef.current.addEventListener(
        'touchmove',
        this.handleTouchMove,
        false
      );
      this.swipeableRef.current.addEventListener(
        'touchend',
        this.handleTouchEnd,
        false
      );
      this.swipeableRef.current.addEventListener(
        'touchcancel',
        this.handleTouchCancel,
        false
      );
    }

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
    // Removing event listeners
    if (this.swipeableRef.current) {
      this.swipeableRef.current.removeEventListener(
        'touchstart',
        this.handleTouchStart,
        false
      );
      this.swipeableRef.current.removeEventListener(
        'touchmove',
        this.handleTouchMove,
        false
      );
      this.swipeableRef.current.removeEventListener(
        'touchend',
        this.handleTouchEnd,
        false
      );
      this.swipeableRef.current.removeEventListener(
        'touchcancel',
        this.handleTouchCancel,
        false
      );
    }
  }

  // Initializing data for a swipe event
  handleTouchStart = e => {
    this.initSwipeX = e.touches[0].clientX;
    this.swiped = false;
  };

  // Computing and performing actions for the swipe
  handleTouchMove = e => {
    // Performing swiping only if there is a initial value and this event
    // did not already changed slides
    if (!this.initSwipeX || this.swiped) {
      return;
    }

    let currSwipeX = e.touches[0].clientX;

    if (this.initSwipeX - currSwipeX > 100) {
      // Swiped from right to left
      this.nextReview();
      this.swiped = true;
    } else if (this.initSwipeX - currSwipeX < -100) {
      // Swiped from left to right
      this.prevReview();
      this.swiped = true;
    }
  };

  // Resetting data after a swipe is done
  handleTouchEnd = () => {
    this.initSwipeX = null;
  };

  // Resetting data if a swipe is cancelled
  handleTouchCancel = () => {
    this.initSwipeX = null;
  };

  // Switches to the previous slide
  prevReview() {
    if (!this.state.lockedNavigation) {
      const { currentReview } = this.state;

      this.setState(
        { currentReview: this.prevOf(currentReview), lockedNavigation: true },
        () =>
          setTimeout(() => {
            this.setState({ lockedNavigation: false });
          }, 800)
      );
    }
  }

  // Switches to the next slide
  nextReview() {
    if (!this.state.lockedNavigation) {
      const { currentReview } = this.state;

      this.setState(
        { currentReview: this.nextOf(currentReview), lockedNavigation: true },
        () =>
          setTimeout(() => {
            this.setState({ lockedNavigation: false });
          }, 800)
      );
    }
  }

  // Computes the previous slide's index
  prevOf(index) {
    const { reviews } = this.props;

    if (index === 0) {
      return reviews.length - 1;
    }

    return index - 1;
  }

  // Computes the next slide's index
  nextOf(index) {
    const { reviews } = this.props;

    if (index === reviews.length - 1) {
      return 0;
    }

    return index + 1;
  }

  renderStars(rating) {
    const { page } = this.props;

    return (
      <StarRatings
        rating={parseFloat(rating)}
        starRatedColor={
          page === 'headlights' ? colors.secondaryViolet : colors.secondaryBlue
        }
        starEmptyColor={colors.secondaryGray2}
        numberOfStars={5}
        name="rating"
        starDimension={'27px'}
        starSpacing="4px"
      />
    );
  }

  computeAverageRating() {
    const { reviews } = this.props;

    // return (
    //   reviews.map(review => review.stars).reduce((total, x) => total + x, 0) /
    //   reviews.length
    // );

    return 4.9;
  }

  renderReviewBlock(review, key) {
    return (
      <ReviewBlock key={key}>
        <ProductZone>
          <ProductName>{review.productName || ''}</ProductName>
          <ReviewImage imageLayout={this.props.imageLayout || 'product'}>
            <Img fluid={review.productImage || this.props.image} />
          </ReviewImage>
          <ProductMagnification>
            {review.productMagnification || ''}
          </ProductMagnification>
        </ProductZone>

        <ReviewZone>
          <ReviewStars>{this.renderStars(review.stars)}</ReviewStars>
          <ReviewTitle className="d-none d-md-block">
            {review.title || ''}
          </ReviewTitle>
          <ReviewTitleMobile className="d-md-none d-block">
            {review.title || ''}
          </ReviewTitleMobile>
          <ReviewAuthor>
            <EmphasizedText>{review.author}</EmphasizedText>

            {review.from && (
              <>
                {' from '}
                <EmphasizedText>{review.from}</EmphasizedText>
              </>
            )}
            <ReviewDate> on {review.date}</ReviewDate>
          </ReviewAuthor>
          <ReviewMessage>
            {review.message.map((paragraph, index) => (
              <ReviewParagraph key={index}>
                {paragraph}
                {index !== review.message.length - 1 && <br />}
              </ReviewParagraph>
            ))}
          </ReviewMessage>
          <ReviewChecks>
            <ReviewVerifiedBuyer isVerifiedBuyer={review.isVerifiedBuyer}>
              Verified Buyer
            </ReviewVerifiedBuyer>
            <ReviewsTag />
          </ReviewChecks>
        </ReviewZone>
      </ReviewBlock>
    );
  }

  render() {
    const { lang, text, page, reviews } = this.props;
    const { currentReview } = this.state;

    return (
      <ReviewsWrapperCss>
        <SectionWrapper fluid>
          <TitleBlockCss>
            <TitleCss>{text['reviewsTitle'][lang ? lang : 'en']}</TitleCss>
            <RatingRow>
              <RatingText>
                {text['overallRating'][lang ? lang : 'en']}
              </RatingText>
              <RatingAverage color={page === 'headlights' ? 'violet' : 'blue'}>
                {this.computeAverageRating()} / 5
              </RatingAverage>
              <RatingStars>
                {this.renderStars(this.computeAverageRating())}
              </RatingStars>
            </RatingRow>
          </TitleBlockCss>
          <CarouselCss ref={this.swipeableRef} className="lazy-show">
            {reviews.map((review, index) => (
              <CarouselBlockCss
                key={index}
                isPrevPrev={index === this.prevOf(this.prevOf(currentReview))}
                isPrev={index === this.prevOf(currentReview)}
                isCurrent={index === currentReview}
                isNext={index === this.nextOf(currentReview)}
                isNextNext={index === this.nextOf(this.nextOf(currentReview))}
              >
                {this.renderReviewBlock(review, index)}
              </CarouselBlockCss>
            ))}
            <ClickableArea className="left" onClick={() => this.prevReview()} />
            <ClickableArea
              className="right"
              onClick={() => this.nextReview()}
            />
          </CarouselCss>
        </SectionWrapper>
      </ReviewsWrapperCss>
    );
  }
}

export default ReviewsSection;
