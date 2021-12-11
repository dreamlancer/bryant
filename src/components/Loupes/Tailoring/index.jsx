import React from 'react';

import inView from 'js/in-view.min';

import Step1 from './step1';
import Step2 from './step2';
import Step3 from './step3';

class Tailoring extends React.Component {
  componentDidMount() {
    const explanationImages = Array.from(
      document.querySelectorAll('.slide-explanation')
    );
    inView({
      selector: '.slide-explanation',
      enter: el => {
        explanationImages.forEach(img => img.classList.remove('active'));
        el.classList.add('active');
      },
      offset: this.props.isMobile ? 0.7 : 0.5,
      exit: el => {
        explanationImages.forEach((img, index) => {
          if (img === el && index > 0) {
            explanationImages[index - 1].classList.add('active');
          }
        });
        el.classList.remove('active');
      },
    });
  }

  render() {
    return (
      <div className="tailoring-wrapper lazy-show">
        <div className="tailoring">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="tailoring-title-wrapper lazy-title">
                  <h2 className="tailoring-title">
                    Bryant Dental Ultra Bespoke Process
                    <br />{' '}
                    <span className="highlight">
                      Custom-tailored loupes for your amazing dentistry
                    </span>
                  </h2>
                </div>
              </div>
            </div>
          </div>
          <Step1 />
          <Step2 />
          <Step3 />
        </div>
      </div>
    );
  }
}

export default Tailoring;
