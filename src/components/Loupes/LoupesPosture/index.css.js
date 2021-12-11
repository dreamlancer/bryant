import styled, { css } from 'styled-components';
import { colors, screens } from '../../../constants/theme';
import BadPosture from '!svg-react-loader!../../../../static/images/loupes/bad-posture.svg';
import GoodPosture from '!svg-react-loader!../../../../static/images/loupes/good-posture.svg';

export const LoupesPostureCss = styled.div`
  background-color: ${colors.secondaryBlack1};
  width: 100%;

  @media screen and (max-width: ${screens.md}) {
    margin-top: 0;
  }
`;

export const LoupesPostureWrapperCss = styled.div``;

export const PostureWrapperCss = styled.div`
  display: flex;
  align-items: flex-end;
  margin-top: 1rem;

  @media screen and (max-width: ${screens.md}) {
    justify-content: center;
    margin-top: 5rem;
  }
`;

export const BadPostureWrapperCss = styled(PostureWrapperCss)`
  justify-content: flex-end;
`;

export const GoodPostureWrapperCss = styled(PostureWrapperCss)`
  justify-content: flex-start;
`;

export const PostureCss = css`
  height: auto;
  margin-bottom: 16px;

  @media screen and (max-width: ${screens.md}) {
    height: 290px;
    margin-bottom: 4.1rem;
  }
`;

export const BadPostureCss = styled(BadPosture)`
  ${PostureCss}
  margin-right: 56px;

  @media screen and (max-width: ${screens.md}) {
    margin-right: 0;
  }
`;

export const GoodPostureCss = styled(GoodPosture)`
  ${PostureCss}
  margin-left: 29px;

  @media screen and (max-width: ${screens.md}) {
    margin-left: 0;
  }
`;

export const BadInfoBubbleWrapperCss = styled.div`
  position: absolute;
  top: 30px;
  left: 50px;

  @media screen and (max-width: ${screens.md}) {
    top: 12px;
    left: 80px;
  }
`;

export const GoodInfoBubbleWrapperCss = styled.div`
  position: absolute;
  top: 65px;
  left: 40px;

  @media screen and (max-width: ${screens.md}) {
    top: 35px;
    left: 50px;
  }
`;

export const TitleCss = styled.h2`
  text-align: center;
  margin-top: 2rem;
`;

export const HighlightTitleCss = styled.span`
  color: ${colors.primaryBlue};
`;

export const InfoBlockCss = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  float: ${props => props.floatTo};

  @media screen and (max-width: ${screens.md}) {
    float: none;
  }
`;

export const InfoHrCss = styled.hr`
  background-color: ${colors.secondaryGray2};
  margin-bottom: 20px;
  width: 167px;
`;

export const InfoTitleCss = styled.h4`
  margin-bottom: 15px;
  text-align: center;
`;

export const InfoTitleMobileCss = styled.h3`
  margin-bottom: 8px;
  text-align: center;
`;

export const InfoDetailsCss = styled.p`
  color: ${colors.secondaryGray3};
  text-align: center;
  max-width: 420px;
`;
