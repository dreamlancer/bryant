import styled from 'styled-components';
import { colors, fonts } from '../../constants/theme';

export const FooterTopCss = styled.section`
  background: ${colors.secondaryBlack1};
`;

export const FooterBottomCss = styled.section`
  background: ${colors.primaryBlack};
`;

export const FooterCss = styled.div`
  padding: 50px 20px;
`;

export const SubFooterCss = styled.div`
  padding: 25px 20px;
  @media (max-width: 992px) {
    padding-bottom: 30px;
  }
  .footer-right {
    float: right;
    font-family: ${fonts.primary};
    @media (max-width: 768px) {
      float: none;
      display: block;
    }
  }

  p,
  a {
    font-style: normal;
    font-weight: 300;
    font-size: 15px;
    line-height: 19px;
    color: ${colors.secondaryGray3};
    padding: 0;
    margin: 0;
    text-transform: uppercase;
  }

  @media (max-width: 768px) {
    p,
    a {
      text-align: center;
    }

    p {
      margin-bottom: 15px;
    }
  }
`;

export const LogoWrapperCss = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  padding-bottom: 50px;

  svg {
    height: 150px;
    path {
      fill: ${colors.secondaryGray3};
    }
  }
`;

export const InfoWrapperCss = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 20%;

  @media (max-width: 768px) {
    padding-left: 0;
  }
`;

export const InfoCss = styled.p`
  margin: ${props => (props.break ? '0 0 15px' : 0)};
  padding: 0;
  color: ${colors.secondaryGray3};
  /* font-size: 21px; */
  @media (max-width: 768px) {
    text-align: center;
    width: 100%;
  }
`;

export const ColumnsWrapperCss = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    max-width: 250px;
    margin: 0 auto;
  }
`;
export const ColumnCss = styled.div`
  padding-right: 15px;
  display: flex;
  flex-direction: column;
  border-top: 1px solid ${colors.secondaryGray3};
  @media (max-width: 768px) {
    margin-top: 30px;
    text-align: center;
  }
`;

export const ColumnItemCss = styled.p`
  margin: 15px 0 0;
  padding: 0;
  color: ${colors.secondaryGray3};
  font-size: 18px;
`;

export const NewsLetterCss = styled.div`
  display: flex;
  align-items: center;

  p {
    margin: 0;
    padding: 0;
    color: ${colors.primaryWhite};
    white-space: nowrap;
    margin-right: 15px;
    font-size: 21px;
  }

  @media (max-width: 992px) {
    margin-bottom: 30px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    p {
      margin-bottom: 15px;
    }
  }
`;

export const InputWrapperCss = styled.div`
  position: relative;
  width: 100%;

  input[type='text'] {
    width: 100%;
    background-color: transparent;
    background: transparent;
    border: none;
    border-bottom: 1px solid ${colors.secondaryGray3};
    box-shadow: none;
    outline: none;
    font-size: 18px;
    color: ${colors.secondaryGray3};

    &::-webkit-input-placeholder {
      color: ${colors.secondaryGray3};
      font-size: 18px;
      font-family: Yantramanav, sans-serif;
    }
    &::-moz-placeholder {
      color: ${colors.secondaryGray3};
      font-size: 18px;
      font-family: Yantramanav, sans-serif;
    }
    :-ms-input-placeholder {
      color: ${colors.secondaryGray3};
      font-size: 18px;
      font-family: Yantramanav, sans-serif;
    }
    &::placeholder {
      color: ${colors.secondaryGray3};
      font-size: 18px;
      font-family: Yantramanav, sans-serif;
    }
  }

  svg {
    width: 15px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 12px;

    line,
    polyline {
      stroke: ${colors.secondaryGray3};
    }
  }
`;

export const MediaCss = styled.div`
  display: flex;
  justify-content: flex-start;
  padding-left: 20%;

  svg {
    margin-right: 40px;
    height: 40px;

    &:nth-child(2) {
      margin-top: 4px;
    }
  }
  @media (max-width: 992px) {
    padding-left: 0;
    justify-content: center;

    svg {
      margin: 0 20px;
    }
  }
`;

export const SpacerCss = styled.div`
  margin-bottom: 30px;
`;
