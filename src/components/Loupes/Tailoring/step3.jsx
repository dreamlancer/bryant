import React from 'react';

class Step3 extends React.Component {
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
            <div className="explanation-image-wrapper last">
              <img
                ref={this.img}
                className="Sirv explanation-image"
                src="https://chanappr.sirv.com/Bryant-dental/global/ilustrations/illustration-3.png"
                alt="Demo"
                data-options="lazy: false;"
              />
            </div>
          </div>
          <div className="col-md-7">
            <div className="explanation-wrapper">
              <div className="explanation-text">
                <h2 className="explanation-step highlight">Step 3:</h2>
                <h2 className="explanation-title">Measurement Process</h2>
                <h4 className="explanation-description">
                  Bryant Dental measurement process includes high-end
                  technologies and 3D scanning. Our glasses are custom-tailored
                  based on extensive measurements taken with the purpose of
                  offering you a true pair of custom-made loupes.
                  <br />
                  1. Vertex distance
                  <br />
                  2. Pupillary height
                  <br />
                  3. Head and ear shapes measurements
                  <br />
                  4. Independent measurements for both eyes
                  <br />
                  5. IPD measurement taken from 300 mm to infinity
                  <br />
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Step3;
