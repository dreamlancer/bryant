import styled, { css } from 'styled-components';
import { colors, screens, fonts } from '../../constants/theme';

export const NavbarWrapperCss = styled.div`
  padding: 7px 0;
  background: ${props =>
    props.opaque ? colors.primaryBlack + 'EE' : colors.primaryBlack};

  @media (max-width: ${screens.xs}) {
    padding: 0;
  }
`;

export const NavbarCss = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .menu-link {
    letter-spacing: 0.5px;
    padding: 17px 14px 12px !important;
    position: relative;
  }
`;

export const NavbarGroupCss = styled.div`
  align-items: center;
  display: flex;
  @media (max-width: ${screens.lg}) {
    padding: 0 3%;
  }

  ${props =>
    props.maxMobile &&
    `
    @media (max-width: ${screens.lg}) {
      flex: 1;
      justify-content: space-around;
    }
  `}

  .navbar-book-demo {
    margin: 0 14px;
    @media (max-width: 400px) {
      margin: 0;
    }
  }
`;

export const LogoWrapperCss = styled.div`
  width: 48px;
  margin-right: 30px;

  svg {
    width: 100%;
    height: 100%;
    path {
      fill: ${colors.primaryBlue};
      transition: fill 0.4s cubic-bezier(0.215, 0.61, 0.355, 1);
    }
  }

  @media (max-width: ${screens.lg}) {
    margin-right: 0;
  }

  @media (max-width: ${screens.xs}) {
    width: 30px;
    padding: 7px 0;
  }
`;

export const MenuLinkCss = styled.h5`
  color: ${props =>
    props.active ? `${colors.primaryWhite} !important` : colors.primaryBlue};
  transition: color 0.6s cubic-bezier(0.215, 0.61, 0.355, 1);
  margin: 0;
  cursor: pointer;

  &:hover {
    color: ${colors.primaryWhite} !important;
  }
  @media (max-width: ${screens.lg}) {
    span {
      font-size: 22px;
    }
  }
`;

export const MenuTextSpan = css`
  .mobile {
    display: none;
    @media (max-width: ${screens.lg}) {
      display: block;
    }
  }
  @media (max-width: ${screens.lg}) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    a {
      padding: 25px 0;
    }
  }
  @media (max-width: ${screens.xs}) {
    a {
      padding: 15px 0;
    }
  }
`;

export const PrimaryMenuCss = styled.div`
  display: flex;
  font-family: ${fonts.primary};
  ${MenuTextSpan}
`;

export const SecondaryMenuCss = styled.div`
  display: flex;
  font-family: ${fonts.primary};
  ${MenuTextSpan}
`;

export const ToggleButtonCss = styled.button`
  display: none;
  z-index: 100000000;
  margin: 0;

  @media (max-width: ${screens.lg}) {
    display: block;
  }

  background: transparent !important;
  border: none;

  &:hover {
    background: transparent !important;
  }

  &:focus {
    outline: none;
  }

  .icon-bar {
    background: ${colors.primaryBlue};
    border-radius: 50px;
    display: block;
    height: 1px;
    margin: 7px 0;
    transition: all 0.4s cubic-bezier(0.215, 0.61, 0.355, 1);
    width: 22px;
  }

  .top-bar {
    background: ${colors.primaryWhite};
    transform-origin: 0% 50%;
    transform: rotate(45deg);
  }

  .middle-bar {
    opacity: 0;
  }

  .bottom-bar {
    background: ${colors.primaryWhite};
    transform-origin: 0% 50%;
    transform: rotate(-45deg);
  }

  ${props =>
    !props.active &&
    `
    .top-bar {
      background: ${colors.primaryBlue};
      transform: rotate(0);
    }
    .middle-bar {
      opacity: 1;
    }
    .bottom-bar {
      background: ${colors.primaryBlue};
      transform: rotate(0);
    }
  `};
`;

export const HideOnMobileCss = styled.div`
  display: block;
  @media (max-width: ${screens.lg}) {
    display: none;
  }
`;

export const CurrencyCss = styled.div`
  align-items: flex-start;
  background: transparent;
  border: 0;
  cursor: ${props => (props.active ? 'default' : 'pointer')};
  font-family: ${fonts.primary};
  margin: 0;
  position: relative;
  text-align: center;

  svg {
    width: 13px;
    height: 100%;

    path {
      fill: ${colors.primaryBlue};
      transition: fill 1s cubic-bezier(0.215, 0.61, 0.355, 1);
    }
  }
  span {
    color: ${colors.primaryBlue};
    font-size: 25px;
    font-weight: 200;
    line-height: 25px;
  }
`;

export const CurrencyDropDownCss = styled.div`
  background: ${colors.secondaryBlack1};
  border: 1px solid ${colors.secondaryGray3};
  opacity: ${props => (props.active ? 1 : 0)};
  padding: 20px 25px;
  pointer-events: ${props => (props.active ? 'all' : 'none')};
  position: absolute;
  right: 0;
  top: 100%;
  transition: ${props =>
    props.active
      ? 'all 1s cubic-bezier(0.215, 0.61, 0.355, 1)'
      : 'all 1s cubic-bezier(0.215, 0.61, 0.355, 1)'};
  z-index: ${props => (props.active ? 10 : -1)};

  .currency-inner-wrapper {
    opacity: ${props => (props.active ? 1 : 0)};

    display: flex;
    flex-direction: column;
    @media (max-width: ${screens.lg}) {
      transition: ${props =>
        props.active
          ? 'opacity 1000ms cubic-bezier(0.64, 0.04, 0.35, 1) 0.5s'
          : 'opacity 1000ms cubic-bezier(0.64, 0.04, 0.35, 1)'};
      padding-top: ${props => props.navbarHeight + 'px'};
    }
  }

  @media (max-width: ${screens.lg}) {
    border: none;
    opacity: 1;
    bottom: 0;
    height: ${props => (props.active ? '100vh' : '0vh')};
    left: 0;
    overflow: hidden;
    position: fixed;
    right: 0;
    top: 0;
    width: 100%;
    transition: ${props =>
      props.active
        ? 'all 1s cubic-bezier(0.215, 0.61, 0.355, 1)'
        : 'all 1s cubic-bezier(0.215, 0.61, 0.355, 1) 0.3s'};

    &:before {
      background: ${colors.primaryBlack};
      content: '';
      height: ${props => props.navbarHeight + 'px'};
      left: 0;
      position: absolute;
      right: 0;
      top: 0;
    }
  }
`;

export const CurrencyTitleCss = styled.h6`
  color: ${colors.primaryWhite};
  white-space: nowrap;
  margin: 0;
  @media (max-width: ${screens.lg}) {
    margin: 20px 0;
  }
`;

export const CurrencyOptionCss = styled.h5`
  color: ${props =>
    props.active ? `${colors.primaryBlue} !important` : colors.primaryWhite};
  margin: 12px 0;
  padding: 0;
  text-align: left;

  span {
    color: ${props =>
      props.active ? `${colors.primaryBlue} !important` : colors.primaryWhite};
    font-family: ${fonts.primary};
    font-style: normal;
    font-weight: 300;
    font-size: 26px;
    line-height: 28px;
    margin-right: 10px;
  }

  &:hover {
    color: ${colors.primaryBlue};
    cursor: pointer;
  }

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: ${screens.lg}) {
    width: 80px;
    margin: 12px auto;
  }
`;

export const CartIconWrapperCss = styled.div`
  cursor: pointer;
  height: 100%;
  position: relative;
  width: 100%;

  svg {
    width: 26px;
    height: 100%;
    path {
      stroke: ${colors.primaryBlue};
      transition: stroke 0.4s cubic-bezier(0.215, 0.61, 0.355, 1);
    }
  }

  ${props => {
    if (props.hasItems) {
      return `svg {
          path {
            stroke: ${colors.primaryWhite} !important;
          }
        }
      `;
    }
  }}
`;

export const ItemCountCss = styled.div`
  align-items: center;
  background: ${colors.primaryBlue};
  border-radius: 50%;
  color: ${colors.primaryWhite};
  display: flex;
  font-family: ${fonts.primary};
  font-size: 9px;
  font-weight: bold;
  height: 12px;
  justify-content: center;
  line-height: 9px;
  margin: 0;
  padding: 1px 0 0 1px;
  position: absolute;
  right: -4px;
  text-align: center;
  top: -5px;
  width: 12px;
`;

export const MobileMenuCss = styled.div`
  align-items: center;
  background: ${colors.secondaryBlack1};
  bottom: 0;
  display: flex;
  flex-direction: column;
  height: ${props => (props.active ? '100vh' : '0vh')};
  justify-content: flex-start;
  left: 0;
  overflow: hidden;
  pointer-events: ${props => (props.active ? 'all' : 'none')};
  position: fixed;
  right: 0;
  top: 0;
  transition: ${props =>
    props.active
      ? 'all 1000ms cubic-bezier(0.64, 0.04, 0.35, 1)'
      : 'all 1000ms cubic-bezier(0.64, 0.04, 0.35, 1) 0.3s'};

  z-index: ${props => (props.active ? 10 : -1)};

  .menu-inner-wrapper {
    opacity: ${props => (props.active ? 1 : 0)};
    padding-top: ${props => props.navbarHeight + 'px'};
    transition: ${props =>
      props.active
        ? 'opacity 1000ms cubic-bezier(0.64, 0.04, 0.35, 1) 0.5s'
        : 'opacity 1000ms cubic-bezier(0.64, 0.04, 0.35, 1)'};
  }

  &:before {
    background: ${colors.primaryBlack};
    content: '';
    height: ${props => props.navbarHeight + 'px'};
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
  }
`;

export const MenuUnderlineCss = styled.div`
  height: 1px;
  background: ${colors.primaryWhite};
  position: absolute;
  top: 67%;
  left: ${props => props.left + 'px'};
  width: ${props => props.width + 'px'};
  transition: all 0.6s cubic-bezier(0.215, 0.61, 0.355, 1);
`;
