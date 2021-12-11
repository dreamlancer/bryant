import React, { Component } from 'react';
import {
  BespokeWrapperCss,
  InitialWrapperCss,
  StepsWrapperCss,
  RelativeWrapperCss,
} from './index.css';
import SectionWrapper from '../../Shared/SectionWrapper';
import StepsView from './StepsView';
import InitialView from './InitialView';

// This component handles transition between initial step and bespoke steps and
// the initial scroll into view animation

class Bespoke3Steps extends Component {
  constructor(props) {
    super(props);
    this.container = React.createRef();
  }
  state = {
    step: 0,
    sectionHeight: 0,
  };

  handleSwitch = () => this.setState({ step: this.state.step === 0 ? 1 : 0 });
  updateSectionHeight = height => {
    this.setState({
      sectionHeight: height,
    });
  };

  sectionScrollTop = () => {
    if (this.container.current) {
      this.container.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  render() {
    const { step, sectionHeight } = this.state;
    const { data } = this.props;
    return (
      <BespokeWrapperCss ref={this.container} className="bespoke-section">
        <SectionWrapper>
          <RelativeWrapperCss height={sectionHeight}>
            <InitialWrapperCss active={step === 0}>
              <InitialView
                data={data}
                step={step}
                handleSwitch={this.handleSwitch}
                updateSectionHeight={this.updateSectionHeight}
              />
            </InitialWrapperCss>

            <StepsWrapperCss active={step === 1}>
              <StepsView
                sectionScrollTop={this.sectionScrollTop}
                data={data}
                step={step}
                handleSwitch={this.handleSwitch}
                updateSectionHeight={this.updateSectionHeight}
              />
            </StepsWrapperCss>
          </RelativeWrapperCss>
        </SectionWrapper>
      </BespokeWrapperCss>
    );
  }
}

export default Bespoke3Steps;
