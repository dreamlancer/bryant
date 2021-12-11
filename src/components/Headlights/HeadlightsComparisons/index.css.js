import styled, { css, keyframes } from 'styled-components';
import { colors, screens } from '../../../constants/theme';

const fadeUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(30px);
  }

  60% {
    opacity: 1;
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeRight = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-10px);
  }

  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

const fade = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

const fill = keyframes`
  0% {
    width: 0;
  }

  100% {
    width: 100%;
  }
`;

const chargerSlide = keyframes`
  0% {
    transform: translate(30%, -10%);
  }

  100% {
    transform: translate(0%, 0%);
  }
`;

const batterySlide = keyframes`
  0% {
    transform: translate(-30%, 10%);
  }

  100% {
    transform: translate(0%, 0%);
  }
`;

const batteryLightOn = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

const animFadeUp = delay => css`
  animation: ${fadeUp} 1s ${delay}s both;
`;

const animFadeRight = delay => css`
  animation: ${fadeRight} 0.5s ${delay}s both;
`;

const animFade = delay => css`
  animation: ${fade} 1s ${delay}s both;
`;

const animFill = delay => css`
  animation: ${fill} 1s ${delay}s both;
`;

const animChargerSlide = () => css`
  animation: ${chargerSlide} 1.5s cubic-bezier(0.6, 0.2, 0.4, 0.9) 1s both;
`;

const animBatterySlide = () => css`
  animation: ${batterySlide} 1.5s cubic-bezier(0.6, 0.2, 0.4, 0.9) 1s both;
`;

const animBatteryLightOn = () => css`
  animation: ${batteryLightOn} 1s ease 3s both;
`;

export const HeadlightsComparisonsCss = styled.div`
  background: ${colors.primaryBlack};
`;

export const HeadlightsComparisonsWrapperCss = styled.div`
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s ease-out;

  &.entered {
    opacity: 1;
    transform: translateY(0px);
  }

  @media (max-width: ${screens.lg}) {
    margin: 0 -15px;
  }
`;

export const TabTitleWrapperCss = styled.div`
  position: relative;
  color: ${props =>
    props.isActive ? colors.primaryWhite : colors.secondaryGray2};
  white-space: nowrap;

  &:hover {
    cursor: pointer;
    color: ${props =>
      props.isActive ? colors.primaryWhite : colors.secondaryGray3};
  }
`;

export const TabTitleCss = styled.h3``;

export const TabTitleMobileCss = styled.h4``;

export const TabTitleInfoBubbleWrapperCss = styled.div`
  opacity: ${props => (props.isActive ? 1 : 0)};
  visibility: ${props => (props.isActive ? 'visible' : 'hidden')};
  position: absolute;
  top: 8px;
  right: -40px;

  @media screen and (max-width: ${screens.md}) {
    top: 2px;
    right: -30px;
  }
`;

export const TabContentInfoCss = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-row-gap: 30px;
  align-items: end;
  padding: 30px 30px 10px;
  margin: auto;
  width: 100%;
  min-width: fit-content;

  &.colour-temp {
    padding: 95px 30px 10px;
    grid-template-columns: auto 1fr auto;
  }

  ${props => props.isActive && animFadeUp(0.4)};

  @media screen and (max-width: ${screens.md}) {
    padding: 40px 30px 30px;
    grid-row-gap: 35px;
    width: 100%;

    &.colour-temp {
      padding: 70px 30px 30px;
      align-items: end;
    }

    ${props => props.isActive && animFade(0.4)};
  }

  @media screen and (max-width: 340px) {
    &.colour-temp {
      padding: 70px 5px 30px;
    }
  }
`;

export const InfoBlockCss = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: relative;

  ${props => props.isActive && animFadeRight(1)};

  &.colour-temp {
    margin-left: 20px;
  }

  &.is-for-padding {
    visibility: hidden;
  }
`;

export const InfoTextCss = styled.h4`
  text-align: right;
  margin: 0;
`;

export const InfoTextMobileCss = styled.p`
  font-weight: 400;
  margin-bottom: 0;

  @media screen and (max-width: ${screens.md}) {
    margin-top: 0px;
  }
`;

export const InfoDetailsCss = styled.h6`
  color: ${colors.secondaryGray2};
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const PurpleDot = styled.div`
  width: 12px;
  height: 12px;
  background-color: ${colors.secondaryViolet};
  border-radius: 50%;
`;

export const InfoPurpleDotCss = styled(PurpleDot)`
  position: absolute;
  top: 14px;
  left: -20px;
  display: ${props => (props.shown ? 'block' : 'none')};

  @media screen and (max-width: ${screens.md}) {
    top: 5px;
    left: -18px;
  }
`;

export const InfoGraphBarCss = styled.div`
  margin-left: 20px;
  margin-bottom: 7px;
  margin-top: ${props => (props.marginTop ? '12px' : '0')};

  &.colour-temp {
    margin-right: 20px;
  }

  @media screen and (max-width: ${screens.md}) {
    margin-bottom: 5px;
    margin-top: 0;
  }
`;

export const InfoBrandCss = styled.h6`
  text-transform: uppercase;
  margin-bottom: 10px;
  margin-top: 0;
  letter-spacing: 2px;

  &.colour-temp {
    width: 150%;
  }
`;

export const InfoBarWrapperCss = styled.div`
  width: ${props => props.width || '100%'};
`;

export const InfoBarCss = styled.div`
  height: 9px;
  width: 100%;
  background-color: ${props =>
    props.primaryColor ? colors.secondaryViolet : colors.secondaryGray3};

  ${props => props.isActive && animFill(0.4)};
`;

export const BatteryContentCss = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 100px;

  @media screen and (max-width: ${screens.md}) {
    flex-direction: column;
    margin: 60px 30px;
  }
`;

export const ChargerAndBattery = styled.div`
  position: relative;
  flex-basis: 40%;
  max-width: 300px;

  @media screen and (max-width: ${screens.md}) {
    flex-basis: auto;
    width: 65%;
  }
`;

export const ChargerImage = styled.div`
  ${props => props.isActive && animChargerSlide};
`;

export const BatteryImageCss = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;

  ${props => props.isActive && animBatterySlide};
`;

export const BatteryLightImageCss = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;

  ${props => props.isActive && animBatteryLightOn};
`;

export const BatteryDetailsCss = styled.p`
  color: ${colors.secondaryGray3};
  flex-basis: 60%;
  max-width: 510px;
  margin-left: 100px;

  @media screen and (max-width: ${screens.md}) {
    flex-basis: auto;
    margin-left: 0px;
    max-width: none;
    margin-top: 80px;
  }
`;

export const ColourTempLimitsCss = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  padding-top: 5px;

  display: flex;
  justify-content: center;

  @media screen and (max-width: ${screens.md}) {
    padding-top: 15px;
  }
`;

export const ColourTempLimit = styled.div`
  &.ideal-range {
    padding-right: 35px;
    flex-basis: 100%;
    text-align: right;

    div {
      margin-right: 0;
      margin-left: auto;
    }
  }

  &.increased-risk {
    padding-left: 35px;
    flex-basis: 100%;
  }

  @media screen and (max-width: ${screens.md}) {
    &.ideal-range {
      padding-right: 20px;
    }

    &.increased-risk {
      padding-left: 20px;
    }
  }
`;

export const ColourTempLimitText = styled.h6`
  text-transform: uppercase;
  color: ${colors.secondaryGray2};
  margin-top: 20px;
  letter-spacing: 2px;
  margin-bottom: 5px;

  @media screen and (max-width: ${screens.md}) {
    margin-top: 0;
  }
`;

export const ColourTempLimitArrow = styled.div`
  width: 144px;
`;

export const ColourTempDashedLine = styled.div`
  border-right: 2px dashed ${colors.secondaryGray2};
  height: calc(100% - 20px);

  @media screen and (max-width: ${screens.md}) {
    height: calc(100% - 40px);
  }
`;

export const ColourTempMoreDetails = styled.div`
  display: grid;
  grid-auto-flow: column;
  justify-content: end;
  margin-top: 50px;
  color: ${colors.secondaryGray2};
  ${props => props.isActive && animFadeRight(1)};

  @media screen and (max-width: 1105px) {
    grid-auto-flow: row;
    justify-content: center;
    grid-gap: 20px;
    margin: 20px 3rem 0;
  }
`;

export const DetailsRow = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  margin: 0 auto;
`;

export const DetailsPurpleDot = styled(PurpleDot)`
  position: absolute;
  top: 8px;
  left: -18px;

  @media screen and (max-width: ${screens.md}) {
    top: 6px;
    left: -15px;
  }
`;

export const DetailsText = styled.p`
  padding: 0 4px;
  text-align: center;
  margin: 0;
`;

export const HereLink = styled.span`
  font-weight: 500;
  font-size: 16px;
  text-transform: uppercase;
`;
