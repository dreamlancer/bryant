/* global $ */
import React from 'react';
import { Link } from 'gatsby';
import Button from '../../Shared/Button';
import './index.scss';

let parallaxWrapper = null;
let parallaxContent = null;
let hero = null;
let heightPos = 0;

class Parallax extends React.Component {
  constructor(props) {
    super(props);

    this.initParallax = this.initParallax.bind(this);
    this.handleParallax = this.handleParallax.bind(this);
  }

  componentDidMount() {
    parallaxWrapper = document.querySelector('.parallax-wrapper');
    parallaxContent = document.querySelector('.parallax-content');
    hero = document.querySelector('.hero');

    // Throttle function for resize
    const throttle = (type, name, obj) => {
      obj = obj || window;
      let running = false;
      const func = () => {
        if (running) {
          return;
        }
        running = true;
        requestAnimationFrame(() => {
          obj.dispatchEvent(new CustomEvent(name));
          running = false;
        });
      };
      obj.addEventListener(type, func);
    };

    /* init - you can init any event */
    throttle('resize', 'optimizedResize');
    // handle event
    window.addEventListener('optimizedResize', this.handleResize, false);

    this.initParallax();
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleParallax, false);
    window.removeEventListener('scroll', this.handleParallax, false);
  }

  handleResize = () => {
    heightPos = hero.offsetHeight;

    window.removeEventListener('scroll', this.handleParallax, false);
    this.initParallax();

    // Setting the same height for text paragraphs on resize
    const contentText = Array.from(document.querySelectorAll('.content-text'));
    if (contentText.length === 2) {
      const max = Math.max(
        contentText[0].offsetHeight,
        contentText[1].offsetHeight
      );

      contentText[0].style.minHeight = `${max}px`;
      contentText[1].style.minHeight = `${max}px`;
    }
  };

  getScrollTop() {
    return (
      window.pageYOffset ||
      (document.documentElement && document.documentElement.scrollTop)
    );
  }

  handleParallax() {
    const scrollPos = this.getScrollTop();
    heightPos = hero.offsetHeight; // need initial height
    parallaxWrapper.style.height = `${parallaxContent.offsetHeight}px`;
    let marginTop = window.innerHeight - parallaxContent.offsetHeight;
    if (marginTop < 0) {
      marginTop = 0;
    }

    if (scrollPos < heightPos - window.innerHeight) {
      parallaxContent.style.opacity = 0;
    } else {
      parallaxContent.style.opacity = 1;
    }

    if (scrollPos < heightPos - marginTop) {
      parallaxWrapper.style.marginTop = `${marginTop >= 0 ? marginTop : 0}px`;
      parallaxContent.style.marginTop = `${marginTop >= 0 ? marginTop : 0}px`;
      parallaxContent.style.position = 'fixed';
    } else {
      parallaxContent.style.position = 'relative';
      parallaxWrapper.style.marginTop = '0px';
      parallaxContent.style.marginTop = '0px';
    }

    if (scrollPos < heightPos - marginTop - 50) {
      hero.classList.remove('no-shadow');
    } else {
      hero.classList.add('no-shadow');
    }

    // Setting the same height for text paragraphs
    const contentText = Array.from(document.querySelectorAll('.content-text'));
    if (contentText.length === 2) {
      const max = Math.max(
        contentText[0].offsetHeight,
        contentText[1].offsetHeight
      );

      contentText[0].style.minHeight = `${max}px`;
      contentText[1].style.minHeight = `${max}px`;
    }
  }

  initParallax() {
    if (!this.props.isMobile) {
      parallaxWrapper.style.height = `${parallaxContent.offsetHeight}px`;
      const marginTop = window.innerHeight - parallaxContent.offsetHeight;
      parallaxWrapper.style.marginTop = `${marginTop >= 0 ? marginTop : 0}px`;
      parallaxContent.style.marginTop = `${marginTop >= 0 ? marginTop : 0}px`;

      parallaxContent.style.position = 'fixed';

      window.addEventListener('scroll', this.handleParallax, false);
    } else {
      parallaxContent.style.opacity = 1;
    }
  }

  render() {
    const {
      store: { lang },
      text,
    } = this.props;
    return (
      <div className="parallax-wrapper">
        <div className="parallax-content">
          <div className="homepage-content">
            <div className="background-color">
              <div className="row">
                <div className="col-md-6 left-color">
                  <div className="wrapper" />
                </div>
                <div className="col-md-6 right-color">
                  <div className="wrapper" />
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <div className="row">
                    <div className="loupes-wrapper">
                      <h2
                        className="content-title"
                        dangerouslySetInnerHTML={{
                          __html: text.parallaxLeftTitle[lang]
                            ? text.parallaxLeftTitle[lang]
                            : text.parallaxLeftTitle['en'],
                        }}
                      />
                      <div className="content-img" />
                      <div className="background">
                        <img
                          className="Sirv lazy"
                          src="https://chanappr-cdn.sirv.com/Bryant-dental/global/home-page/bg-left.jpg?q=100"
                          alt="Dental Loupes UK by Bryant Dental"
                          title="Dental Loupes UK by Bryant Dental"
                        />
                      </div>
                      <p
                        className="content-text"
                        dangerouslySetInnerHTML={{
                          __html: text.parallaxLeftText[lang]
                            ? text.parallaxLeftText[lang]
                            : text.parallaxLeftText['en'],
                        }}
                      />

                      <Link to="/loupes">
                        <Button type="secondary" className="learn-more">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: text.learnMore[lang]
                                ? text.learnMore[lang]
                                : text.learnMore['en'],
                            }}
                          />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="row">
                    <div className="lights-wrapper">
                      <h2
                        className="content-title"
                        dangerouslySetInnerHTML={{
                          __html: text.parallaxRightTitle[lang]
                            ? text.parallaxRightTitle[lang]
                            : text.parallaxRightTitle['en'],
                        }}
                      />
                      <div className="content-img" />
                      <div className="background">
                        <img
                          className="Sirv lazy"
                          src="https://chanappr-cdn.sirv.com/Bryant-dental/global/home-page/right-light-image.png?q=100"
                          alt="Dental Lights UK by Bryant Dental"
                          title="Dental Lights UK by Bryant Dental"
                        />
                      </div>
                      <p
                        className="content-text"
                        dangerouslySetInnerHTML={{
                          __html: text.parallaxRightText[lang]
                            ? text.parallaxRightText[lang]
                            : text.parallaxRightText['en'],
                        }}
                      />
                      <Link to="/headlights">
                        <Button type="secondary" className="learn-more">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: text.learnMore[lang]
                                ? text.learnMore[lang]
                                : text.learnMore['en'],
                            }}
                          />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Parallax;
