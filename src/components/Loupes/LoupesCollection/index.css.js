import styled, { css, keyframes } from 'styled-components';
import Img from 'gatsby-image';
import TeethImg1 from '!svg-react-loader!../../../../static/images/loupes/head.svg';
import TeethImg2 from '!svg-react-loader!../../../../static/images/loupes/mouth.svg';
import { colors, screens } from '../../../constants/theme';

export const fadeOutCss = keyframes`
  from {
    opacity: 1;
    transform: translateY(0px);
  }
  to {
    opacity: 0;
    transform: translateY(-15px);
  }
`;

export const fadeInCss = keyframes` 
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0px);
  }
`;

export const slideInCss = keyframes` 
  from {
    transform:translate(-20px,20px);
  }
  to {
    transform:translateX(0px) translateY(0px);
  }
`;

export const LoupesCollectionCss = styled.div`
  background: ${colors.primaryBlack};
`;

export const LoupesCollectionWrapperCss = styled.div`
  align-content: space-between;
  align-items: flex-start;
  background: ${colors.primaryBlack};
  display: grid;
  grid-template-areas: 'circle info' 'circle details';
  grid-template-columns: 1fr 1fr;
  max-width: 100vw;
  overflow: hidden;
  padding: 7rem 0 10rem;

  @media (max-width: ${screens.xl}) {
    grid-template-areas: 'info' 'circle' 'details';
    grid-template-columns: 1fr;
    margin: auto;
    padding: 5rem 0 10rem;
    width: 70%;
  }

  @media (max-width: ${screens.xl}) {
    grid-gap: 50px;
  }

  @media (max-width: ${screens.md}) {
    width: 100%;
  }

  .goOut {
    animation: ${fadeOutCss} 600ms ease-in;
    left: 0px;
    opacity: 0;
    position: absolute;
    width: 100%;
  }

  .goIn {
    animation-fill-mode: backwards;
    animation: ${fadeInCss} 400ms 200ms;
    left: 0px;
    position: absolute;
    width: 100%;
  }
`;
export const CircleSwitchWrapperCss = styled.div`
  width: 100%;
  height: 100%;

  padding: 55px 62px 55px 95px;
  @media (max-width: ${screens.md}) {
    padding: 25px 36px;
  }
`;

export const CircleSwitchCss = styled.div`
  grid-area: circle;
  margin: 20px 0px 0px auto;
  align-self: center;

  @media (max-width: ${screens.xl}) {
    margin: 0 auto;
    padding-right: 0px;
    padding-left: 0px;
  }
`;

export const InfoCss = styled.div`
  grid-area: info;
  margin-top: 85px;
  margin-right: 50px;
  margin-left: 150px;

  @media (max-width: 1500px) {
    margin-left: 75px;
  }

  @media (max-width: 1350px) {
    margin-left: 30px;
  }

  @media (max-width: ${screens.xl}) {
    /* margin: 25px 4.7vw 0px; */
    max-width: 550px;
    margin: 25px auto 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  p {
    max-width: 555px;
    min-height: 175px;
    position: relative;
    color: ${colors.secondaryGray3};

    @media (max-width: 1350px) {
      min-height: 200px;
    }

    @media (max-width: ${screens.xl}) {
      text-align: center;
      max-width: none;
    }

    @media (max-width: ${screens.md}) {
      margin: 0px;
      min-height: 0;
    }
  }

  h2 {
    position: relative;
    @media (max-width: ${screens.md}) {
      text-align: center;
    }
  }

  .placeholder {
    visibility: hidden;
  }
`;

export const TechDetailsCss = styled.div`
  grid-area: details;
  margin-bottom: 0px;
  margin-right: 50px;
  margin-left: 150px;

  @media (max-width: 1500px) {
    margin-left: 75px;
  }

  @media (max-width: 1350px) {
    margin: 0;
  }

  @media (max-width: ${screens.md}) {
    margin: 0px 10px 10px;
    padding-top: 0;
  }
  h2 {
    position: relative;
    span {
      width: 100%;
    }
  }
  .placeholder {
    visibility: hidden;
  }
`;

export const DetailsLineCss = styled.div`
  display: flex;
  margin: 0px 0px 51px;
  align-items: center;

  @media (max-width: ${screens.xl}) {
    justify-content: center;
  }

  @media (max-width: ${screens.md}) {
    margin: 0px auto 27px;
    width: 270px;
  }

  &.last {
    margin: 0;

    @media (max-width: ${screens.md}) {
      margin: 0px auto;
    }
  }
`;

export const DetailsLineIconCss = styled.div`
  margin-right: 69px;
  @media (max-width: ${screens.md}) {
    margin-right: 40px;
  }

  svg {
    @media (max-width: ${screens.md}) {
      width: 59px;
      height: 59px;
    }
  }
`;

export const DetailsLineTextCss = styled.div`
  width: 100%;

  @media (max-width: ${screens.xl}) {
    width: 225px;
  }

  h6 {
    margin: 0px 0px 10px;
    color: ${colors.secondaryGray3};
    text-transform: uppercase;

    @media (max-width: ${screens.md}) {
      margin: 0px 0px 5px;
    }
  }

  h2 {
    margin: 0px;
  }
`;

export const PhotosContainerCss = styled.div`
  width: 650px;
  height: 650px;
  position: relative;

  margin: 0px;
  @media (max-width: 1700px) {
    height: 40vw;
    width: 40vw;
  }
  @media (max-width: 700px) {
    height: 270px;
    margin: 10px auto;
    width: 270px;
  }
`;
export const SmallPhotosCss = styled.div`
  bottom: 0;
  clip-path: url(#clipSmall);
  left: 0px;
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  z-index: 1;
`;
export const SmallPhotoHolderCss = styled.div`
  bottom: 34px;
  height: 266px;
  left: -90px;
  position: absolute;
  width: 266px;
  z-index: 10;

  @media (max-width: 1700px) {
    bottom: 25px;
    height: 16vw;
    left: -60px;
    width: 16vw;
  }

  @media (max-width: ${screens.md}) {
    bottom: 12px;
    height: 110px;
    left: -35px;
    width: 110px;
  }
`;

export const SmallPhotoCss = styled(Img)`
  bottom: 0;
  left: 0;
  opacity: 0;
  position: absolute !important;
  right: 0;
  top: 0;
  transition: 1s;
  width: 100%;
  z-index: 1 !important;

  &.show {
    animation: ${slideInCss} 1500ms 300ms;
    animation-fill-mode: backwards;
    left: 0;
    opacity: 1;
    transition: 1s;
    z-index: 2;
  }
`;

export const TeethPhotosCss = styled.div`
  clip-path: url(#clipTeeth);
  position: absolute;
  width: 100%;
  height: 100%;
`;

export const TeethImgCss = css`
  bottom: 50%;
  height: 100%;
  margin: auto;
  opacity: 0;
  position: absolute !important;
  top: 50%;
  transform: translateZ(0);
  transition: 1s;
  width: 100%;
  z-index: -2 !important;

  ${props =>
    props.show &&
    `
    z-index: 1;
    opacity: 1;
  `}
`;

export const TeethImg1Css = styled(TeethImg1)`
  ${TeethImgCss}

  ${props =>
    props.zoom &&
    `
    transform: translate(0%, 0%) scale(${props.zoom}) ;
    `};
`;
export const TeethImg2Css = styled(TeethImg2)`
  ${TeethImgCss}

  ${props =>
    props.zoom &&
    `
    transform: translate(0%, 2%) scale(${props.zoom}) ;
    `};

  ${props =>
    props.zoom > 1 &&
    `
    transform: translate(0%,-15%) scale(${props.zoom}) ;
    `};
  ${props =>
    props.zoom > 2 &&
    `
    transform: translate(50%, -25%) scale(${props.zoom}) ;
    `};
`;

export const SmallCircleCss = styled.svg`
  z-index: -5;
`;

export const SmallPhotoRingCss = styled.svg`
  z-index: 10;
  position: absolute;
`;

export const BigCircleCss = styled.svg`
  transform: rotate(-150deg);
`;

export const SwitchItemCss = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  height: 142px;
  justify-content: center;
  position: absolute;
  width: 217px;
  z-index: 10;

  @media (max-width: ${screens.md}) {
    width: 92px;
    height: 72px;
  }

  &.selected {
    p {
      color: ${colors.primaryBlue};
    }
    circle {
      stroke: ${colors.primaryBlue};
    }
  }

  p {
    color: ${colors.primaryWhite};
    margin: 0px;
    position: absolute;
    transition: 1s;
  }

  circle {
    transition: 1s;
    stroke: ${colors.secondaryGray3};
    stroke-width: 2px;
    r: 17px;

    @media (max-width: ${screens.md}) {
      r: 6.9px;
    }
  }
`;
