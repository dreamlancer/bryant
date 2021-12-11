import styled from 'styled-components';
import { screens, colors } from '../../../constants/theme';

export const TitleCss = styled.h1`
  color: ${colors.primaryWhite};
  margin-bottom: 25px;

  span {
    color: ${colors.primaryBlue};
  }

  @media (max-width: ${screens.lg}) {
    margin-bottom: 15px;
  }
`;
