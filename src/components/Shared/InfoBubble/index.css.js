import styled from 'styled-components';
import { colors, screens, fonts } from '../../../constants/theme';

export const InfoWrapperCss = styled.div`
  background: ${colors.secondaryGray3};
  border-radius: 50%;
  cursor: default;
  display: inline-block;
  height: 25px;
  position: relative;
  width: 25px;
  .lil-info {
    color: ${colors.primaryBlack};
    font-family: ${fonts.primary};
    left: 50%;
    margin-top: 1px;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const ButtonWrapperCss = styled.div`
  cursor: default;
  display: inline-block;
  position: relative;

  .bubble-button-text {
    color: ${colors.primaryBlue};
    cursor: default;
    margin: 0;
    padding: 0;
    text-transform: uppercase;
  }
`;

export const OverlayCss = styled.div`
  @media (max-width: ${screens.md}) {
    pointer-events: none;
    z-index: 101;
    opacity: ${props => (props.ready && props.active ? 0.7 : 0)};
    transition: opacity 0.3s ease-in-out;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${colors.primaryBlack};
  }
`;

export const MessageCss = styled.div`
  background: black;
  border: 0px solid ${colors.secondaryGray3};
  border-width: ${props => (props.ready && props.active ? '1px' : '0px')};
  max-width: 100%;
  opacity: ${props => (props.ready ? 1 : 0)};
  overflow: hidden;
  position: absolute;
  transition: ${props =>
    props.ready
      ? 'opacity 2s linear, height 0.4s ease-in-out, border-width 0.4s ease-in-out'
      : 'all 0 linear'};
  width: 300px;
  z-index: 99;
  height: ${props => {
    if (props.ready) {
      return props.active ? props.height + 'px' : '0px';
    } else {
      return 'auto';
    }
  }};

  @media (max-width: ${screens.lg}) {
    z-index: 110;
  }

  ${props => props.position}
`;

export const MessageInnerCss = styled.div`
  padding: 15px;

  h6,
  p {
    color: ${colors.secondaryGray3};
    font-family: ${fonts.primary};
  }
  p {
    font-weight: 300;
    font-size: 21px;
    line-height: 28px;
    @media (max-width: ${screens.lg}) {
      font-size: 19px;
      line-height: 24px;
    }
    @media (max-width: ${screens.xs}) {
      font-size: 16px;
      line-height: 21px;
    }
  }
  h6 {
    letter-spacing: 3px;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    @media (max-width: ${screens.lg}) {
      font-size: 14px;
      line-height: 18px;
    }
  }
`;
