import React, { Component } from 'react';
import Img from 'gatsby-image';
import updateOnScroll from 'uos';
import { isMobile } from '../../../js/isMobile';
import getOffsetTop from '../../../js/getOffsetTop';
import inView from '../../../js/in-view.min';
import {
  InitialViewWrapperCss,
  ViewLeftCss,
  ViewRightCss,
  LeftSmallTitleCss,
  LeftTitleCss,
  LeftTextCss,
  LeftActionButtonCss,
  FrameWrapperCss,
  FrontLoupeCss,
  BackLoupeCss,
  InfoBlockCss,
  InfoTitleCss,
  InfoTextCss,
  ViewMobileTitleCss,
  ViewMobileContentCss,
} from './index.css';

class InitialView extends Component {
  constructor(props) {
    super(props);
    this.container = React.createRef();

    this.state = {
      rotate: 0,
      hideToolTip: false,
    };
  }

  componentDidMount() {
    this.updateContainerHeight();
    window.setTimeout(() => {
      this.updateContainerHeight();
    }, 500);

    inView({
      selector: '.bespoke-section',
      enter: () => {
        const offsetTop = getOffsetTop(this.container.current);

        const windowHeight = window.innerHeight;
        const windowWidth = window.innerWidth;
        const containerHeight = this.container.current
          ? this.container.current.offsetHeight
          : 0;

        // Start the animation when the section is 50% in view
        let scrollHeight = offsetTop - windowHeight + containerHeight / 1.3333;
        if (isMobile) {
          scrollHeight = offsetTop - windowHeight + containerHeight / 2;
          if (windowWidth < 400) {
            scrollHeight = offsetTop - windowHeight + containerHeight / 4;
          }
          updateOnScroll(
            scrollHeight + 300,
            scrollHeight + 200 + containerHeight / 2,
            progress => {
              this.setState({ hideToolTip: progress === 1 });
            }
          );
        }
        updateOnScroll(
          scrollHeight,
          scrollHeight + containerHeight / 2,
          progress => {
            this.setState({ rotate: progress * 6 });
          }
        );
      },
      offset: 0,
      exit: el => {},
    });

    window.addEventListener('resize', this.updateContainerHeight);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateContainerHeight);
  }

  componentDidUpdate(newProps) {
    if (this.props.step !== newProps.step) {
      this.updateContainerHeight();
    }
  }

  updateContainerHeight = () => {
    if (this.container.current && this.props.step === 0) {
      this.props.updateSectionHeight(this.container.current.offsetHeight);
    }
  };

  renderTitle = () => {
    return (
      <>
        <LeftSmallTitleCss>3 steps to bespoke loupes</LeftSmallTitleCss>
        <LeftTitleCss>
          Engineered
          <br />
          to fit you
        </LeftTitleCss>
      </>
    );
  };

  renderContent = () => {
    return (
      <>
        <LeftTextCss>
          Every face is different, so our loupes are tailored to be as
          individual as you are. We design our products to be in harmony with
          your facial features and working posture. Your BD loupes will provide
          comfort and unrivalled clarity across your entire visual field.
        </LeftTextCss>
        <LeftTextCss>
          See how we make sure your loupes are truly bespoke
        </LeftTextCss>
        <LeftActionButtonCss onClick={this.props.handleSwitch}>
          explore
          <svg
            width="20"
            height="8"
            viewBox="0 0 20 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.3536 4.35355C19.5488 4.15829 19.5488 3.84171 19.3536 3.64645L16.1716 0.464466C15.9763 0.269204 15.6597 0.269204 15.4645 0.464466C15.2692 0.659728 15.2692 0.976311 15.4645 1.17157L18.2929 4L15.4645 6.82843C15.2692 7.02369 15.2692 7.34027 15.4645 7.53553C15.6597 7.7308 15.9763 7.7308 16.1716 7.53553L19.3536 4.35355ZM0 4.5H19V3.5H0V4.5Z"
              fill="#3A97C9"
            />
          </svg>
        </LeftActionButtonCss>
      </>
    );
  };

  render() {
    const { data } = this.props;
    const { rotate, hideToolTip } = this.state;
    return (
      <InitialViewWrapperCss ref={this.container}>
        <ViewMobileTitleCss>{this.renderTitle()}</ViewMobileTitleCss>
        <ViewLeftCss>
          {this.renderTitle()}
          {this.renderContent()}
        </ViewLeftCss>
        <ViewRightCss>
          <FrameWrapperCss>
            <Img
              alt="Bespoke Frame"
              title="Bespoke Frame"
              fluid={data.bespokeFrame.childImageSharp.fluid}
              critical
            />
            <FrontLoupeCss rotate={rotate}>
              <Img
                alt="Bespoke Frame"
                title="Bespoke Frame"
                fluid={data.frontLoupe.childImageSharp.fluid}
                critical
              />
            </FrontLoupeCss>
            <BackLoupeCss rotate={rotate}>
              <Img
                alt="Bespoke Frame"
                title="Bespoke Frame"
                fluid={data.frontLoupe.childImageSharp.fluid}
                critical
              />
            </BackLoupeCss>
            <ViewMobileContentCss active={hideToolTip}>
              {this.renderContent()}
            </ViewMobileContentCss>
            <InfoBlockCss active={rotate === 6 && !hideToolTip}>
              <InfoTitleCss>TAILORED TO SUIT YOU</InfoTitleCss>
              <InfoTextCss>
                For a completely bespoke fit, our measurement process calculates
                the perfect declination angle for your loupes telescopes, to
                prevent eye strain and maintain a safe and comfortable range of
                cervical fexion.
              </InfoTextCss>
            </InfoBlockCss>
          </FrameWrapperCss>
        </ViewRightCss>
      </InitialViewWrapperCss>
    );
  }
}

export default InitialView;
