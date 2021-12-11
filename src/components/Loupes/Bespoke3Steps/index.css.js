import styled, { css } from 'styled-components';
import { colors, screens } from '../../../constants/theme';

// *** Global *** //

export const BespokeWrapperCss = styled.div`
  background: ${colors.secondaryBlack1};
  position: relative;
  overflow: hidden;
`;
const BasicBlock = css`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  transition: transform 660ms cubic-bezier(0.64, 0.04, 0.35, 1),
    opacity 660ms cubic-bezier(0.64, 0.04, 0.35, 1);

  opacity: ${props => (props.active ? '1' : '0')};
  transition-delay: ${props => (props.active ? '200ms' : '0')};
`;

export const InitialWrapperCss = styled.div`
  ${BasicBlock};
  transform: ${props =>
    props.active ? 'translateX(0px)' : 'translateX(-260px)'};
`;

export const StepsWrapperCss = styled.div`
  ${BasicBlock};
  transform: ${props =>
    props.active ? 'translateX(0px)' : 'translateX(260px)'};
`;

export const RelativeWrapperCss = styled.div`
  position: relative;
  height: ${props => props.height + 'px'};
  transition: height 800ms ease-in-out;
`;

// *** INITIAL VIEW *** //

export const InitialViewWrapperCss = styled.div`
  display: flex;

  @media (max-width: ${screens.lg}) {
    flex-direction: column;
    justify-content: center;
  }
`;

export const ViewLeftCss = styled.div`
  flex: 1;
  padding-left: 80px;

  @media (max-width: ${screens.lg}) {
    padding-left: 0;
    display: none;
  }
`;

export const ViewRightCss = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`;

export const LeftSmallTitleCss = styled.h6`
  color: ${colors.primaryBlue};
  text-transform: uppercase;
  margin-bottom: 50px;
  @media (max-width: ${screens.lg}) {
    text-align: center;
  }
`;

export const LeftTitleCss = styled.h1`
  color: ${colors.primaryWhite};
  @media (max-width: ${screens.lg}) {
    text-align: center;
  }
`;

export const LeftTextCss = styled.p`
  color: ${colors.secondaryGray3};
`;

export const LeftActionButtonCss = styled.h6`
  align-items: center;
  color: ${colors.primaryBlue};
  display: flex;
  text-transform: uppercase;
  margin-top: 100px;
  cursor: pointer;

  svg {
    margin-left: 7px;
  }
`;

export const FrameWrapperCss = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  img {
    width: 100%;
    height: 100%;
    margin-left: 15%;
  }
`;

export const FrontLoupeCss = styled.div`
  position: absolute;
  top: 13%;
  left: -17%;
  width: 55%;
  z-index: 10;
  transform: ${props => `rotate(-${props.rotate}deg)`};
  transform-origin: 100% 40%;

  @media (max-width: ${screens.lg}) {
    top: 7%;
    left: -16%;
  }
`;

export const BackLoupeCss = styled.div`
  position: absolute;
  top: 4%;
  left: -13%;
  width: 46%;
  z-index: 5;
  transform: ${props => `rotate(-${props.rotate}deg)`};
  transform-origin: 100% 40%;
  @media (max-width: ${screens.lg}) {
    top: 4%;
    left: -12%;
  }
`;

export const InfoBlockCss = styled.div`
  border-left: 1px solid white;
  bottom: 55%;
  height: 100%;
  left: 15%;

  max-height: ${props => (props.active ? '100%' : '0%')};

  padding-left: 15px;
  position: absolute;
  transition: ${props =>
    props.active
      ? 'max-height 800ms ease-in-out'
      : 'max-height 800ms ease-in-out 430ms'};
  z-index: 10;
  display: flex;
  flex-direction: column;

  @media (max-width: ${screens.lg}) {
    left: 10%;
    top: 35%;
    max-height: ${props => (props.active ? '50%' : '0%')};
    justify-content: flex-end;
  }
  @media (max-width: ${screens.md}) {
    top: 30%;
    max-height: ${props => (props.active ? '50%' : '0%')};
    justify-content: flex-end;
  }

  h6,
  p {
    opacity: ${props => (props.active ? 1 : 0)};

    transition: ${props =>
      props.active
        ? 'opacity 430ms cubic-bezier(0.64, 0.04, 0.35, 1) 800ms'
        : 'opacity 430ms cubic-bezier(0.64, 0.04, 0.35, 1)'};
  }
`;

export const InfoTitleCss = styled.h6`
  color: ${colors.primaryWhite};
  margin-bottom: 15px;
`;

export const InfoTextCss = styled.p`
  color: ${colors.secondaryGray3};
`;

// *** STEPS VIEW *** //

export const MobileFaceImageWrapperCss = styled.div`
  display: none;
  position: relative;
  @media (max-width: ${screens.lg}) {
    display: block;
    max-width: 400px;
    margin: 0 auto;
  }
`;
export const FaceImageWrapperCss = styled.div`
  max-width: 700px;
  position: relative;
  width: 100%;
`;

export const InitialStepWrapperCss = styled.div`
  display: flex;
  @media (max-width: ${screens.lg}) {
    padding: 0;
    flex: 1;
  }
`;

export const StepButtonCss = styled.p`
  color: ${props => (props.active ? colors.primaryBlue : colors.primaryWhite)};
  text-transform: uppercase;
  cursor: pointer;
  transition: color 250ms ease-in-out;
  padding: 0;
  margin-bottom: 15px;
`;

export const StepLeftCss = styled.div`
  flex: 0.8;
  padding-left: 80px;
  @media (max-width: ${screens.lg}) {
    flex: 1;
    padding: 0;
  }
`;

export const StepRightCss = styled.div`
  flex: 1.2;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: ${screens.lg}) {
    display: none;
  }
`;

export const MaskWrapperCss = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: ${props => (props.active ? 1 : 0)};
  transform: ${props => (props.active ? 'translateX(0)' : 'translateX(-50px)')};

  transition: ${props =>
    props.active
      ? 'all 830ms cubic-bezier(0.64, 0.04, 0.35, 1) 0.25s'
      : 'all 830ms cubic-bezier(0.64, 0.04, 0.35, 1)'};
`;

export const BackButtonCss = styled.div`
  position: absolute;
  top: 0;
  left: 10px;
  width: 40px;
  height: 40px;
  z-index: 100;
  cursor: pointer;

  svg {
    width: 100%;
  }
`;

export const StepsTextWrapperCss = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  align-items: flex-start;
  position: relative;
`;

export const StepContentCss = styled.div`
  max-height: ${props => (props.active ? `${props.height}px` : '0px')};
  opacity: ${props => (props.active ? 1 : 0)};
  transform: ${props =>
    props.active
      ? 'translateY(0)'
      : `translateY(${-50 * (props.activeStep - props.currentStep)}px)`};
  transition: ${props =>
    props.active
      ? 'transform 750ms cubic-bezier(0.64, 0.04, 0.35, 1), max-height 830ms ease-in-out, opacity 1s cubic-bezier(0.64, 0.04, 0.35, 1);'
      : 'transform 750ms cubic-bezier(0.64, 0.04, 0.35, 1), max-height 830ms ease-in-out, opacity 1s cubic-bezier(0.64, 0.04, 0.35, 1);'};

  overflow: hidden;
  transition-delay: 0s;
`;

export const StepTitleCss = styled.h1`
  color: ${colors.primaryWhite};
  margin: 20px 0 30px;
`;

export const StepDescriptionCss = styled.p`
  color: ${colors.secondaryGray3};
  margin-bottom: 50px;

  @media (max-width: ${screens.lg}) {
    text-align: left;
    max-width: 500px;
    margin: 0 auto;
    padding-bottom: 20px;
  }
`;

export const StepsArrowContainerCss = styled.div`
  position: relative;
  width: 100%;
  @media (max-width: ${screens.lg}) {
    text-align: center;
  }
`;

export const StepsArrowWrapperCss = styled.div`
  width: 8px;
  position: absolute;
  left: -17px;
  top: ${props => props.buttonHeight * props.step + props.step * 17 + 3 + 'px'};
  transition: all 830ms cubic-bezier(0.64, 0.04, 0.35, 1);
  @media (max-width: ${screens.lg}) {
    display: none;
  }
`;

// Mobile only view

export const ViewMobileTitleCss = styled.div`
  @media (min-width: ${screens.lg}) {
    display: none;
  }
`;

export const ViewMobileContentCss = styled.div`
  margin-top: 70px;
  opacity: ${props => (props.active ? 1 : 0)};
  transition: ${props =>
    props.active
      ? 'opacity 830ms cubic-bezier(0.64, 0.04, 0.35, 1) 800ms'
      : 'opacity 830ms cubic-bezier(0.64, 0.04, 0.35, 1)'};
  @media (min-width: ${screens.lg}) {
    display: none;
  }
`;
