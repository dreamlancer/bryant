import styled from 'styled-components';
import { colors, screens } from '../../constants/theme';

export const ExplodeTitleCss = styled.div`
  h2 {
    color: ${colors.primaryWhite};
    margin-bottom: 50px;

    @media (max-width: ${screens.xs}) {
      font-size: 24px;
      line-height: 30px;
    }
  }
`;
