import styled, { keyframes, css } from 'styled-components';
import { colors, screens } from '../../constants/theme';

export const ContainerCss = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  overflow: hidden;
`;

export const TitleCss = styled.h1`
  text-align: center;
  margin-bottom: 45px;
`;

export const TabTitleCss = styled.div`
  display: grid;
  justify-content: space-between;
  grid-auto-flow: column;
  grid-gap: 60px;
  width: 100%;
  padding: 0 40px;
  min-width: fit-content;
  border-bottom: 1px solid ${colors.secondaryGray2};
  align-self: start;
  @media screen and (max-width: ${screens.md}) {
    grid-gap: 80px;
    padding: 0 40px 0 20px;
  }
`;

export const ContentZoneCss = styled.div`
  position: relative;
  height: calc(${props => props.height || 0}px + 30px);
  width: 100%;
`;

const fadingIn = keyframes`
  0% {
    opacity: 0;
    visibility: hidden;
    transform: translateY(30px);
  }
  60% {
    opacity: 1;
    visbility: visible;
  }
  100% {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
`;

const fadingOut = keyframes`
  0% {
    opacity: 1;
    visibility: visible;
  }
  100% {
    opacity: 0;
    visibility: hidden;
  }
`;

const animFadeIn = () => css`
  animation: ${fadingIn} 1s 0.2s forwards;
`;

const animFadeOut = () => css`
  animation: ${fadingOut} 0.2s forwards;
`;

export const ContentCss = styled.div`
  position: absolute;
  width: 100%;
  opacity: 0;
  visibility: hidden;
  ${props => props.isFadingOut && animFadeOut};
  ${props => props.isFadingIn && animFadeIn};
`;
