import styled from 'styled-components';
import { colors, screens } from '../../../constants/theme';

export const ButtonCss = styled.button`
  background: ${props =>
    props.type === 'primary' ? colors.primaryWhite : 'transparent'};
  border-radius: 50px;
  border: 1px solid ${colors.primaryWhite};
  box-sizing: border-box;
  color: ${props =>
    props.type === 'primary' ? colors.primaryBlack : 'transparent'};
  color: ${props =>
    props.type === 'primary' ? colors.primaryBlack : colors.primaryWhite};
  cursor: pointer;
  display: inline-block;
  letter-spacing: 1.5px;
  margin: 0;
  min-width: 100px;
  outline: none;
  overflow: hidden;
  padding: 13px 30px 9px;
  position: relative;
  text-align: center;
  text-transform: uppercase;
  transition: color 0.1s cubic-bezier(0.16, 0.08, 0.355, 1),
    background 0.1s cubic-bezier(0.16, 0.08, 0.355, 1);
  vertical-align: middle;
  width: auto;
  @media (max-width: ${screens.sm}) {
    width: auto;
    padding: 6px 20px 5px;
  }

  @media (max-width: ${screens.xs}) {
    padding: 6px 20px 5px;
    letter-spacing: 1px;
  }

  @media (max-width: 400px) {
    margin: 0;
    padding: 6px 12px 5px;
    ${props => props.mobileNoPadding && 'padding: 6px 5px 5px;'};
  }

  .inner-button {
    display: inline-block;
    font-size: 16px;
    font-style: normal;
    font-weight: normal;
    letter-spacing: 0.1em;
    line-height: 20px;
    position: relative;
    text-transform: uppercase;
    transition: all 300ms ease-out;
    will-change: transform;

    @media (max-width: ${screens.lg}) {
      font-size: 14px;
      line-height: 18px;
    }

    @media (max-width: ${screens.xs}) {
      font-size: 12px;
      line-height: 14px;
    }
  }
  @media (min-width: ${screens.lg}) {
    &:hover .inner-button {
      transform: translate3d(-10px, 0, 0);
    }
  }

  svg {
    opacity: 0;
    position: absolute;
    right: 0;
    top: 43%;
    transform: translateY(-50%);
    transition: all 300ms ease-out;
    width: 15px;
    will-change: right, opacity;
    * {
      stroke-width: 3;
      stroke: ${props =>
        props.type === 'primary' ? colors.primaryBlack : colors.primaryWhite};
    }
  }
  @media (min-width: ${screens.lg}) {
    &:hover svg {
      opacity: 1;
      right: -20px;
    }
  }
`;
