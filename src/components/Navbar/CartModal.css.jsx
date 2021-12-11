import styled, { css } from 'styled-components';
import { colors, fonts, screens } from '../../constants/theme';

export const CartModalWrapperCss = styled.div`
  background: ${colors.secondaryBlack1};
  border: 1px solid ${colors.secondaryGray3};
  opacity: ${props => (props.active ? 1 : 0)};
  padding: 20px 25px;
  pointer-events: ${props => (props.active ? 'all' : 'none')};
  position: absolute;
  right: 0;
  top: 100%;
  transition: all 1s cubic-bezier(0.215, 0.61, 0.355, 1);
  width: 500px;
  z-index: ${props => (props.active ? 10 : -1)};

  @media (max-width: ${screens.lg}) {
    border: none;
    bottom: 0;
    height: ${props => (props.active ? '100vh' : '0vh')};
    left: 0;
    opacity: 1;
    overflow: hidden;
    position: fixed;
    right: 0;
    top: 0;
    width: 100%;

    transition: ${props =>
      props.active
        ? 'all 1s cubic-bezier(0.215, 0.61, 0.355, 1)'
        : 'all 1s cubic-bezier(0.215, 0.61, 0.355, 1) 0.3s'};

    .cart-inner-wrapper {
      display: flex;
      height: 100%;
      flex-direction: column;
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
  }
`;

export const CartItemsCss = styled.div`
  margin-right: -25px;
  max-height: 50vh;
  overflow: auto;
  padding-right: 25px;
  @media (max-width: ${screens.lg}) {
    flex: 1;
    max-height: 100vh;
  }
`;

export const NoItemsCss = styled.h5`
  color: ${colors.secondaryGray1};
`;

export const CartItemCss = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  &:last-child {
    margin-bottom: 0px;
  }
`;

export const ItemImageCss = styled.div`
  background-image: ${props => `url(${props.imgSrc})`};
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100px;
  margin-right: 15px;
  width: 98px;
`;

export const ItemDescriptionCss = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
`;
const ItemText = css`
  color: ${colors.secondaryGray3};
  margin: 0;
  padding: 0;
`;

export const ItemNameCss = styled.p`
  ${ItemText};
`;

export const ItemPriceCss = styled.p`
  ${ItemText};
`;

export const ItemCounterCss = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  position: relative;
`;

export const CountArrowCss = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  height: 25px;
  justify-content: center;
`;

export const CountCss = styled.input`
  background: #c4c4c4;
  border: none;
  box-shadow: none;
  box-sizing: border-box;
  font-family: ${fonts.primary};
  height: 24px;
  margin: 0;
  overflow: hidden;
  padding: 0;
  text-align: center;
  width: 24px;

  &[type='number']::-webkit-inner-spin-button,
  &[type='number']::-webkit-outer-spin-button {
    appearance: none;
    margin: 0;
  }

  &[type='number'] {
    appearance: none;
  }
`;

export const CartSpacerCss = styled.div`
  background: ${colors.secondaryGray3};
  height: 1px;
  margin: 30px 0;
  width: 100%;
`;

export const CartFooterCss = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  button {
    span {
      color: ${colors.primaryWhite} !important;
    }
  }
  @media (max-width: ${screens.lg}) {
    padding-right: 80px;
  }
`;

export const TotalWrapperCss = styled.div`
  display: flex;
  flex-direction: column;
  display: none;
  @media (max-width: ${screens.lg}) {
    display: block;
  }
`;

export const TotalCss = styled.p`
  color: ${colors.primaryWhite};
  padding: 0;
  margin: 0;

  @media (max-width: ${screens.lg}) {
    display: ${props => (props.web ? 'none' : 'block')};
  }
`;

export const CartTitleCss = styled.h6`
  display: none;
  color: ${colors.primaryWhite};
  @media (max-width: ${screens.lg}) {
    display: block;
  }
`;
