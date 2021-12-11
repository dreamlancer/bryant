import React, { Component } from 'react';
import Img from 'gatsby-image';
import BespokeArrow from '!svg-react-loader!../../../../static/images/loupes/bespoke/bespoke-arrow.svg';
import BespokeBackButton from '!svg-react-loader!../../../../static/images/loupes/bespoke/bespoke-back.svg';
import isMobile from '../../../js/isMobile';
import {
  InitialStepWrapperCss,
  StepLeftCss,
  StepRightCss,
  FaceImageWrapperCss,
  MobileFaceImageWrapperCss,
  MaskWrapperCss,
  BackButtonCss,
  StepsTextWrapperCss,
  StepContentCss,
  StepTitleCss,
  StepDescriptionCss,
  StepButtonCss,
  StepsArrowContainerCss,
  StepsArrowWrapperCss,
} from './index.css';

class StepsView extends Component {
  constructor(props) {
    super(props);
    this.container = React.createRef();
    this.step1 = React.createRef();
    this.step2 = React.createRef();
    this.step3 = React.createRef();
    this.stepButtonRef = React.createRef();

    this.state = {
      maskStep: isMobile ? 0 : -1,
      step1Height: -1,
      step2Height: -1,
      step3Height: -1,
      stepButtonHeight: -1,
    };
  }

  componentDidMount() {
    this.updateContainerHeight();
    window.setTimeout(() => {
      // Just in case after 500ms update the height (in case images load longer)
      this.updateContainerHeight();
    }, 500);

    // Setting the heights for each section and after setting the state we update the height
    this.setState(
      {
        step1Height: this.step1.current.offsetHeight,
        step2Height: this.step2.current.offsetHeight,
        step3Height: this.step3.current.offsetHeight,
        stepButtonHeight: this.stepButtonRef.current.offsetHeight,
      },
      () => this.updateContainerHeight()
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.maskStep !== this.state.maskStep) {
      this.updateContainerHeight();

      this.props.sectionScrollTop();

      window.setTimeout(() => {
        // Just in case after 1s update the height (in case images load longer)
        this.updateContainerHeight();
      }, 500);
    }
    if (this.props.step !== prevProps.step) {
      this.updateContainerHeight();
      window.setTimeout(() => {
        this.props.sectionScrollTop();
        // Just in case after 1s update the height (in case images load longer)
        this.updateContainerHeight();
      }, 1000);
    }
    if (this.props.step === 1 && prevProps.step !== 1) {
      this.setState({
        maskStep: 0,
      });
    }
  }

  updateContainerHeight = () => {
    if (this.container.current && this.props.step === 1) {
      this.props.updateSectionHeight(this.container.current.offsetHeight);
    }
  };

  updateMaskStep = index => {
    this.setState({ maskStep: index });
  };

  handleBackClick = () => {
    // Call handleSwitch to change the step
    this.props.handleSwitch();

    // Set mask step at beginning
    this.setState({
      maskStep: isMobile ? 0 : -1,
    });
  };

  render() {
    const {
      props: { data, handleSwitch },
      state: {
        maskStep,
        step1Height,
        step2Height,
        step3Height,
        stepButtonHeight,
      },
      updateMaskStep,
      handleBackClick,
    } = this;

    return (
      <InitialStepWrapperCss ref={this.container}>
        <StepLeftCss>
          <BackButtonCss onClick={handleBackClick}>
            <BespokeBackButton />
          </BackButtonCss>

          <StepsTextWrapperCss>
            <StepsArrowContainerCss>
              <StepsArrowWrapperCss
                buttonHeight={stepButtonHeight}
                step={maskStep}
              >
                <BespokeArrow />
              </StepsArrowWrapperCss>
              <StepButtonCss
                active={maskStep === 0}
                onClick={() => updateMaskStep(0)}
                ref={this.stepButtonRef}
              >
                STEP 1
              </StepButtonCss>
              <StepContentCss
                ref={this.step1}
                height={step1Height}
                active={maskStep === 0 || step1Height < 0}
                activeStep={maskStep}
                currentStep={0}
              >
                <StepTitleCss>
                  Exploration <br />
                  of needs
                </StepTitleCss>
                <MobileFaceImageWrapperCss active>
                  <Img
                    alt="Bespoke Frame"
                    title="Bespoke Frame"
                    fluid={data.faceBespoke.childImageSharp.fluid}
                    critical
                  />
                  <MaskWrapperCss active>
                    <Img
                      alt="Bespoke Frame"
                      title="Bespoke Frame"
                      fluid={data.faceBespokeMask1.childImageSharp.fluid}
                      critical
                    />
                  </MaskWrapperCss>
                </MobileFaceImageWrapperCss>
                <StepDescriptionCss>
                  Every dentist has unique requirements, which we will discuss
                  in depth at your consultation. This will include a full
                  exploration of the different magnifications available along
                  with the various advantages and disadvantages of each.
                  Headlight options will also be discussed. Your representative
                  will be a highly trained dentist who uses the product
                  him/herself so will be able to expertly guide you through the
                  entire process.
                </StepDescriptionCss>
              </StepContentCss>
              <StepButtonCss
                active={maskStep === 1}
                onClick={() => updateMaskStep(1)}
              >
                STEP 2
              </StepButtonCss>
              <StepContentCss
                ref={this.step2}
                height={step2Height}
                active={maskStep === 1 || step2Height < 0}
                activeStep={maskStep}
                currentStep={1}
              >
                <StepTitleCss>Personalize</StepTitleCss>
                <MobileFaceImageWrapperCss active>
                  <Img
                    alt="Bespoke Frame"
                    title="Bespoke Frame"
                    fluid={data.faceBespoke.childImageSharp.fluid}
                    critical
                  />
                  <MaskWrapperCss active>
                    <Img
                      alt="Bespoke Frame"
                      title="Bespoke Frame"
                      fluid={data.faceBespokeMask2.childImageSharp.fluid}
                      critical
                    />
                  </MaskWrapperCss>
                </MobileFaceImageWrapperCss>
                <StepDescriptionCss>
                  We take a 3D scan to assess your head shape and ear position,
                  relative to the bridge of your nose. This gives a highly
                  accurate guide for us to construct your bespoke frames,
                  ensuring they are angled and balanced correctly.
                </StepDescriptionCss>
              </StepContentCss>
              <StepButtonCss
                active={maskStep === 2}
                onClick={() => updateMaskStep(2)}
              >
                STEP 3
              </StepButtonCss>
              <StepContentCss
                ref={this.step3}
                height={step3Height}
                active={maskStep === 2 || step3Height < 0}
                activeStep={maskStep}
                currentStep={2}
              >
                <StepTitleCss>Try out</StepTitleCss>
                <MobileFaceImageWrapperCss active>
                  <Img
                    alt="Bespoke Frame"
                    title="Bespoke Frame"
                    fluid={data.faceBespoke.childImageSharp.fluid}
                    critical
                  />
                  <MaskWrapperCss active>
                    <Img
                      alt="Bespoke Frame"
                      title="Bespoke Frame"
                      fluid={data.faceBespokeMask3.childImageSharp.fluid}
                      critical
                    />
                  </MaskWrapperCss>
                </MobileFaceImageWrapperCss>
                <StepDescriptionCss>
                  You will have the opportunity to try on all the available
                  magnifications, headlight options and frame styles. Your rep
                  will talk you through how to compare magnifications so you’ll
                  have a complete understanding of loupes and be well positioned
                  to compare our loupes to any other brand. See the difference
                  for yourself.
                </StepDescriptionCss>
              </StepContentCss>
            </StepsArrowContainerCss>
          </StepsTextWrapperCss>
        </StepLeftCss>
        <StepRightCss>
          <FaceImageWrapperCss>
            <Img
              alt="Bespoke Frame"
              title="Bespoke Frame"
              fluid={data.faceBespoke.childImageSharp.fluid}
              critical
            />
            <MaskWrapperCss active={maskStep === 0}>
              <Img
                alt="Bespoke Frame"
                title="Bespoke Frame"
                fluid={data.faceBespokeMask1.childImageSharp.fluid}
                critical
              />
            </MaskWrapperCss>
            <MaskWrapperCss active={maskStep === 1}>
              <Img
                alt="Bespoke Frame"
                title="Bespoke Frame"
                fluid={data.faceBespokeMask2.childImageSharp.fluid}
                critical
              />
            </MaskWrapperCss>
            <MaskWrapperCss active={maskStep === 2}>
              <Img
                alt="Bespoke Frame"
                title="Bespoke Frame"
                fluid={data.faceBespokeMask3.childImageSharp.fluid}
                critical
              />
            </MaskWrapperCss>
          </FaceImageWrapperCss>
        </StepRightCss>
      </InitialStepWrapperCss>
    );
  }
}

export default StepsView;
