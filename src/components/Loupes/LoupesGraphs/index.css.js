import styled from 'styled-components';
import { screens, fonts, colors } from '../../../constants/theme';

export const GraphsSectionCss = styled.div`
  background: ${colors.primaryBlack};
  padding: 80px 0;
  padding-bottom: 0;
  font-family: ${fonts.primary};

  .graph-section-wrapper {
    padding: 0 100px;

    @media (max-width: ${screens.lg}) {
      padding: 0 10px;
    }
  }

  .switcher {
    margin-left: 0;
    margin-top: 0;
    @media (max-width: ${screens.lg}) {
      margin-bottom: 2rem;
    }
  }
  .disclaimer-wrapper {
    margin-top: 15px;
    margin: 0 auto;
    max-width: 20px;
    opacity: 0.5;
  }
  .graphs-separator {
    height: 102%;
    margin-top: -1rem;
    text-align: center;

    .line-separator {
      background-color: white;
      margin-top: 0;
      margin: 0 auto;
      opacity: 0.2;
      width: 2px;
    }

    .button-separator {
      border: 1px solid white;
      color: white;
      font-family: ${fonts.primary};
      font-size: 0.8rem;
      letter-spacing: 1px;
      margin: 0 auto;
      padding: 0.5rem 1rem;
      text-transform: uppercase;
    }

    .switcher {
      margin-left: 0;
      margin-top: 0;
      border: 2px solid rgba(255, 255, 255, 0.2);

      @media (max-width: ${screens.lg}) {
        margin-bottom: 2rem;
      }

      .nav-item {
        display: inline-block;
        margin: 0;
        padding: 1.5rem 0;
        width: 50%;
        .nav-link {
          padding: 0;

          p {
            &::after {
              bottom: 0.1em;
            }
          }
        }
      }
    }
  }

  .graph-title {
    margin-bottom: 80px;
    position: relative;
    text-align: center;
    z-index: 10;

    @media (max-width: ${screens.lg}) {
      margin-bottom: 60px;
    }
  }

  .graph-sub-title {
    color: ${colors.primaryBlue};
    margin-bottom: 4rem;
    margin-top: 0.6rem;
    position: relative;
    text-align: center;
    text-transform: uppercase;
    z-index: 10;
    @media (max-width: ${screens.lg}) {
      margin-bottom: 1rem;
    }
  }

  .graph-info {
    margin-bottom: 10rem;
    text-align: center;

    @media (max-width: ${screens.lg}) {
      margin-bottom: 5rem;
    }

    @media (max-width: ${screens.md}) {
      text-align: left;
    }
  }

  .axis path {
    fill: none;
    shape-rendering: crispEdges;
  }

  .tick {
    stroke: rgba(232, 232, 232, 0.05);
  }

  .area {
    fill: rgba(255, 255, 255, 0.1);
    stroke-width: 1;
    stroke: white;
  }

  .right-line-faker {
    stroke-width: 1;
    stroke: white;
  }

  .area2 {
    fill: rgba(72, 192, 219, 0.4);
    stroke-width: 1;
    stroke: rgba(72, 192, 219, 1);
  }

  .right-line-faker-2 {
    stroke-width: 1;
    stroke: rgba(72, 192, 219, 1);
  }

  .label-circle-graph {
    font-size: 30px;
    font-family: ${fonts.primary};
  }

  .label .sub-label-bottom {
    text-transform: uppercase;
    font-weight: bold;
  }

  .svg-container {
    display: inline-block;
    position: relative;
    width: 100%;
    padding-bottom: 70%; /* aspect ratio */
    vertical-align: top;
    overflow: hidden;
  }

  .svg-container-2 {
    padding-bottom: 80%; /* aspect ratio */
  }

  .svg-content-responsive {
    display: inline-block;
    position: absolute;
    top: 10px;
    left: 0;
  }

  .nav {
    margin-left: -20%;
    margin-top: -1.1rem;

    .nav-left {
      margin-left: auto;
      @media (max-width: 1120px) {
        margin-left: auto;
        margin-right: auto;
      }
    }

    .nav-right {
      margin-right: auto;
      @media (max-width: 1120px) {
        margin-left: auto;
        margin-right: auto;
      }
    }

    .nav-link {
      color: ${colors.primaryWhite};

      p {
        font-family: ${fonts.primary};
      }

      &.active {
        color: ${colors.primaryBlue};
        p {
          display: inline-block;
          position: relative;
          &::after {
            content: '';
            position: absolute;
            bottom: -0.1em;
            left: 0;
            right: 0;
            width: 100%;
            height: 2px;
            z-index: 1;
            background: #3a97c99e;
            @media (max-width: ${screens.lg}) {
              bottom: -0.35em;
            }
          }
        }
      }
    }
  }

  @media (max-width: 767px) {
    .svg-container {
      padding-bottom: 80%;
    }

    .graph-sub-title {
      margin-left: 0;
    }

    .label-circle-graph {
      font-size: 30px;
    }

    .nav {
      margin-left: 0;
    }
  }
`;
