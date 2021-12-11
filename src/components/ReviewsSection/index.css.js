import styled, { css } from 'styled-components';
import { colors, screens } from '../../constants/theme';
import ReviewsLogo from '!svg-react-loader!../../../static/images/reviews/reviews-logo-new.svg';

export const ReviewsWrapperCss = styled.div`
  background-color: ${colors.primaryBlack};
  width: 100%;
  overflow: hidden;
`;

export const TitleBlockCss = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const TitleCss = styled.h1`
  margin-bottom: 0.5rem;
  text-align: center;

  @media screen and (max-width: ${screens.md}) {
    margin-bottom: 1.5rem;
  }
`;

export const RatingRow = styled.div`
  display: grid;
  grid-gap: 1rem;
  align-items: center;
`;

export const RatingText = styled.h6`
  text-transform: uppercase;
  margin: 0;
  grid-row: 1;

  @media screen and (max-width: ${screens.md}) {
    letter-spacing: 0.15rem;
  }
`;

export const RatingAverage = styled.h6`
  color: ${props =>
    props.color === 'violet' ? colors.secondaryViolet : colors.secondaryBlue};
  margin: 0;
  grid-row: 1;

  @media screen and (max-width: ${screens.md}) {
    letter-spacing: 0.15rem;
  }
`;

export const RatingStars = styled.div`
  grid-row: 1;

  @media screen and (max-width: ${screens.md}) {
    grid-row: 2;
    grid-column: span 2;
    margin: auto;
  }
`;

export const CarouselCss = styled.div`
  position: relative;
  width: 100%;
  height: calc(640px + 10rem);
  opacity: 0;
  transform: translate3d(5%, 0, 0) scale(0.98);
  transition: all 0.5s ease-out;
  padding: 5rem 0;

  &.entered {
    opacity: 1;
    transform: translate3d(0, 0, 0) scale(1);
  }

  @media screen and (max-width: ${screens.md}) {
    margin-top: 3rem;
    height: 90vh;
    padding: 0;

    transition: all 1s ease-out;
    transform: translate3d(100%, 0, 0) scale(0.9);
  }
`;

export const CarouselBlockCss = styled.div`
  position: absolute;
  transition: transform 1s, left 1s, opacity 1s, z-index 0s;

  transform: translateX(-50%) scale(${props => (props.isCurrent ? '1' : '0.8')});

  left: ${props =>
    props.isPrevPrev
      ? '0%'
      : props.isPrev
      ? '15%'
      : props.isCurrent
      ? '50%'
      : props.isNext
      ? '85%'
      : props.isNextNext
      ? '100%'
      : '0'};

  opacity: ${props =>
    props.isCurrent ? 1 : props.isPrev || props.isNext ? 0.3 : 0};

  z-index: ${props =>
    props.isPrevPrev || props.isNextNext
      ? '0'
      : props.isPrev || props.isNext
      ? '1'
      : props.isCurrent
      ? '2'
      : '-1'};

  @media screen and (max-width: ${screens.md}) {
    transform: translate3d(
        ${props =>
          props.isPrevPrev || props.isPrev
            ? '-100%'
            : props.isCurrent
            ? '-50%'
            : props.isNext || props.isNextNext
            ? '0%'
            : '0'},
        0,
        0
      )
      scale(${props => (props.isCurrent ? '1' : '0.9')});

    left: ${props =>
      props.isPrevPrev || props.isPrev
        ? '0'
        : props.isCurrent
        ? '50%'
        : props.isNext || props.isNextNext
        ? '100%'
        : '0'};

    opacity: ${props => (props.isCurrent ? 1 : 0)};
  }
`;

export const ReviewBlock = styled.div`
  height: 640px;
  width: 900px;
  background-color: #1118;
  display: flex;
  flex-direction: row;
  border: 1px solid ${colors.secondaryGray2};
  box-shadow: 1px 1px 5px 0px #000;

  @media screen and (max-width: ${screens.lg}) {
    width: 700px;
  }

  @media screen and (max-width: ${screens.md}) {
    height: 90vh;
    width: 90vw;
    flex-direction: column;
  }
`;

export const ProductZone = styled.div`
  flex: 45%;
  background-color: ${colors.primaryBlack};
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;

  @media screen and (max-width: ${screens.md}) {
    flex: 30%;
    min-height: 200px;
    justify-content: flex-start;
  }
`;

export const ProductName = styled.h5`
  text-align: center;
  color: ${colors.secondaryGray3};
  margin-top: 80px;

  @media screen and (max-width: ${screens.md}) {
    margin: 14px 0 14px 0;
  }
`;

const productImageLayout = css`
  margin-top: 64px;
  width: 120%;
  margin-left: -20%;

  @media screen and (max-width: ${screens.lg}) {
    margin-top: 104px;
  }

  @media screen and (max-width: ${screens.md}) {
    width: 220px;
    margin: 0 auto;
  }
`;

const bdLogoImageLayout = css`
  width: 60%;
  margin-top: 100px;

  @media screen and (max-width: ${screens.lg}) {
    width: 70%;
    margin-top: 120px;
  }

  @media screen and (max-width: ${screens.md}) {
    width: 200px;
    margin-top: 0;
  }
`;

export const ReviewImage = styled.div`
  ${props =>
    props.imageLayout === 'homepage'
      ? bdLogoImageLayout
      : props.imageLayout === 'product'
      ? productImageLayout
      : ''};
`;

export const ProductMagnification = styled.h4`
  text-align: center;
  color: ${colors.secondaryGray3};
  position: absolute;
  bottom: 90px;

  @media screen and (max-width: ${screens.lg}) {
    bottom: 140px;
  }

  @media screen and (max-width: ${screens.md}) {
    bottom: 0;
  }
`;

export const ReviewZone = styled.div`
  flex: 55%;
  background-color: ${colors.secondaryBlack2};
  padding: 5rem 2.5rem 2.5rem;
  position: relative;

  @media screen and (max-width: ${screens.lg}) {
    padding: 2.5rem;
  }

  @media screen and (max-width: ${screens.md}) {
    flex: 70%;
  }
`;

export const ReviewStars = styled.div`
  @media screen and (max-width: ${screens.md}) {
    display: flex;
    justify-content: center;
  }
`;

export const ReviewTitle = styled.h4`
  margin-top: 0.5rem;
  margin-bottom: 1rem;
`;

export const ReviewTitleMobile = styled.h5`
  text-align: center;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
`;

export const ReviewAuthor = styled.p`
  color: ${colors.secondaryGray3};

  @media screen and (max-width: ${screens.md}) {
    text-align: center;
    margin-top: 0;
  }
`;

export const EmphasizedText = styled.span`
  color: ${colors.primaryWhite};
  border-bottom: 1px solid ${colors.primaryWhite};
`;

export const ReviewDate = styled.span`
  @media screen and (max-width: ${screens.md}) {
    display: none;
  }
`;

export const ReviewMessage = styled.div`
  color: ${colors.secondaryGray3};

  @media screen and (max-width: ${screens.md}) {
    max-height: calc(70 / 100 * 90vh - 240px);
    min-height: 50px;
    overflow: scroll;
  }
`;

export const ReviewParagraph = styled.p``;

export const ReviewChecks = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 2.5rem;
`;

export const ReviewVerifiedBuyer = styled.div`
  display: ${props => (props.isVerifiedBuyer ? 'block' : 'none')};
  background-color: ${colors.secondaryGray1};
  color: ${colors.secondaryWhite};
  font-family: Yantramanav, sans-serif;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
  position: relative;
  height: 27px;
  line-height: 27px;

  padding-left: 32px;
  padding-right: 15px;
  margin-right: 20px;

  &:after {
    content: '';
    position: absolute;
    width: 7px;
    height: 15px;
    top: 3px;
    left: 15px;
    border-bottom: 2px solid ${colors.primaryWhite};
    border-right: 2px solid ${colors.primaryWhite};
    transform: rotate(45deg);
  }
`;
export const ReviewsTag = styled(ReviewsLogo)``;

export const ClickableArea = styled.div`
  position: absolute;
  width: 50%;
  height: 100%;
  top: 0;
  z-index: 2;

  &.left {
    left: 0;
  }

  &.right {
    right: 0;
  }

  @media screen and (max-width: ${screens.md}) {
    display: none;
  }
`;
