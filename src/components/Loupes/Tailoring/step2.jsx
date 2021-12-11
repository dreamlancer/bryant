import React from 'react';

class Step2 extends React.Component {
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
      <div className="container slide-explanation lazy-content">
        <div className="row">
          <div className="col-md-5">
            <div className="explanation-image-wrapper">
              <div className="line" />
              <img
                ref={this.img}
                className="Sirv explanation-image"
                src="https://chanappr.sirv.com/Bryant-dental/global/ilustrations/illustration-2.png"
                alt="Demo"
                data-options="lazy: false;"
              />
            </div>
          </div>
          <div className="col-md-7">
            <div className="explanation-wrapper">
              <div className="explanation-text">
                <h2 className="explanation-step highlight">Step 2:</h2>
                <h2 className="explanation-title">
                  Magnification and Frame Style
                </h2>
                <h4 className="explanation-description">
                  Magnification preferences are individual for each person, as
                  dentists ourselves we understand that being able to test and
                  choose from multiple magnifications is what you need. We have
                  4 different magnifications for you to chose from, each of them
                  with multiple frame options. By using ultra-light aerospace
                  grade aluminum, frame selection becomes a matter of comfort
                  and style, not a matter of weight.
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Step2;
