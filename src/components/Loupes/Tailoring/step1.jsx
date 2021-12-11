import React from 'react';

class Step1 extends React.Component {
  constructor(props) {
    super(props);
    this.img = React.createRef();
  }

  componentDidMount() {
    // window.addEventListener('scroll', this.handleParallax);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleParallax);
  }

  handleParallax = () => {
    const { top, bottom, height } = this.img.current.getBoundingClientRect();
    const min = -30;
    const max = 0;
    const offset = height / 2;
    const newTop = top - offset;

    const scrollPos = this.getScrollTop();
    const percentage = parseInt(
      ((scrollPos - newTop) / (bottom - newTop)) * 100,
      10
    );
    const translatePoz = (percentage * 2 * (max - min)) / 100 + min;

    if (percentage <= 0) {
      this.img.current.style.transform = `translateX(${min}%)`;
    } else if (percentage > 0 && percentage * 2 <= 100) {
      this.img.current.style.transform = `translateX(${translatePoz}%)`;
    } else if (percentage > 0 && percentage * 2 > 100) {
      this.img.current.style.transform = `translateX(${max}%)`;
    }
  };

  // Gets scroll position
  getScrollTop = () => {
    return (
      window.pageYOffset ||
      (document.documentElement && document.documentElement.scrollTop)
    );
  };

  render() {
    return (
      <div className="container slide-explanation lazy-content active">
        <div className="row">
          <div className="col-md-5">
            <div className="explanation-image-wrapper first">
              <div className="line" />
              <img
                ref={this.img}
                className="Sirv explanation-image"
                src="https://chanappr.sirv.com/Bryant-dental/global/ilustrations/illustration-1.png"
                alt="Demo"
                data-options="lazy: false;"
              />
            </div>
          </div>
          <div className="col-md-7">
            <div className="explanation-wrapper">
              <div className="explanation-text">
                <h2 className="explanation-step highlight">Step 1:</h2>
                <h2 className="explanation-title">Posture Guidelines</h2>
                <h4 className="explanation-description">
                  Working posture is unique for everyone, being able to work
                  while sitting in a comfortable position should not be a
                  luxury. As Our glasses are custom-tailored for each individual
                  working posture, we consider everything from working distance
                  to interpupillary distance and beyond that.
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Step1;
