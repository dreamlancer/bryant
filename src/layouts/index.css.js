import styled from 'styled-components';
import { screens, fonts } from '../constants/theme';

export const LayoutsWrapperCss = styled.div`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  a,
  button {
    font-family: ${fonts.primary};
  }

  h1 {
    font-weight: 300;
    font-size: 76px;
    line-height: 82px;
    @media (max-width: ${screens.lg}) {
      font-size: 48px;
      line-height: 50px;
    }
  }

  h2 {
    font-weight: 300;
    font-size: 58px;
    line-height: 60px;
    @media (max-width: ${screens.lg}) {
      font-size: 40px;
      line-height: 42px;
    }
  }

  h3 {
    font-weight: 300;
    font-size: 40px;
    line-height: 40px;
    @media (max-width: ${screens.lg}) {
      font-size: 36px;
      line-height: 38px;
    }
  }

  h4 {
    font-weight: 300;
    font-size: 32px;
    line-height: 40px;
    @media (max-width: ${screens.lg}) {
      font-size: 26px;
      line-height: 30px;
    }
  }

  h5 {
    font-weight: 400;
    font-size: 18px;
    line-height: 28px;
    @media (max-width: ${screens.lg}) {
      font-size: 18px;
      line-height: 25px;
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
`;
