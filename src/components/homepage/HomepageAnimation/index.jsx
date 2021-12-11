import React from 'react';
import is from 'is_js';
import ReactGA from 'react-ga';

import inView from '../../../js/in-view.min';
import Button from '../../Shared/Button';

import { TitleCss } from './index.css';

const basicPath =
  'https://chanappr.sirv.com/Images/jpg-animation/BryantDental_glassesWLights_jpeg_00';
let width = 1800;
let interval = null;

if (typeof window !== 'undefined') {
  if (window.innerWidth >= 2000) {
    width = 1800;
  } else if (window.innerWidth >= 1400 && window.innerWidth < 2000) {
    width = 1600;
  } else if (window.innerWidth >= 676 && window.innerWidth < 1400) {
    width = 1400;
  } else if (window.innerWidth < 676) {
    width = 1200;
  }
}

const dataPath = `${basicPath}{index}.jpg?w=${width}`;
const firstImg = `${basicPath}001.jpg?q=100&w=${width}`;
const lastImg = `${basicPath}143.jpg?q=100&w=${width}`;

let images = [];
const frames = 144;
let imageWrapper = null;
let desktopArrowDown = null;

let lastScroll = 0;
let timeout = null;
let maxScroll;
const index = is.edge() ? 4 : 6;
let orientation = null;
const scrollDif = 6;
const maxPos = 1200;

class HomepageAnimation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      entered: false,
      loading: true,
    };
  }

  componentDidMount() {
    imageWrapper = document.querySelector('.animation-wrapper');
    desktopArrowDown = document.querySelector('.desktop-arrow-down');
    maxScroll = document.querySelector('.hero').offsetHeight;
    // Create images for scroll animation
    let i = 1;
    for (i = 0; i <= frames; i += 1) {
      this.createImg(i);
    }

    if (window.innerWidth > window.innerHeight) {
      orientation = 'horizontal';
    } else {
      orientation = 'vertical';
    }

    // Start an interval to check if all images loaded.
    // If so call loaded with false to remove the loader.
    let cnt = images.length;

    interval = setInterval(() => {
      if (cnt <= 0) {
        clearInterval(interval);
        this.props.loaded(false);
        this.scrollAnimation(0);
        this.forceUpdate();
        return;
      }
      images.forEach(img => {
        const x = this.IsImageOk(img);
        if (x) {
          cnt -= 1;
        } else {
          cnt = images.length;
        }
      });
    }, 500);

    this.setInitialImage();

    // Lazy intro only for homepage animation
    inView({
      selector: '.lazy-intro',
      enter: () => {
        if (!this.state.loading) {
          this.setState({
            entered: true,
          });
        }
      },
      exit: () => {
        this.setState({
          entered: false,
        });
      },
      offset: 0,
    });
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
    window.addEventListener('optimizedResize', this.updateScreen, false);

    window.addEventListener('scroll', this.handleScrollJumps, true);
  }

  static getDerivedStateFromProps(nextProps, state) {
    if (state.loading !== nextProps.loading) {
      return {
        loading: nextProps.loading,
        entered: true,
      };
    }
    return { ...state };
  }

  componentWillUnmount() {
    this.scrollAnimation(0);
    clearInterval(interval);
    clearInterval(timeout);
    window.removeEventListener('optimizedResize', this.updateScreen, false);
    window.removeEventListener('scroll', this.handleScrollJumps, true);

    images = [];
  }

  setInitialImage = () => {
    const scrollpos = this.getScrollTop();
    this.scrollAnimation(scrollpos);
  };

  // Gets the image index based on scroll position
  getScrollIndex = scrollpos => {
    const scrollIndex = parseInt(scrollpos * 0.12, 10);

    if (scrollIndex <= 0) {
      return 0;
    } else if (scrollIndex > 0 && scrollIndex < frames) {
      return scrollIndex;
    }
    return frames;
  };

  // Gets the image left prop based on scroll position
  getLeftIndex = scrollpos => {
    if (orientation === 'horizontal') {
      const leftIndex = scrollpos * 0.055;
      if (leftIndex <= 0) {
        return '0%';
      } else if (leftIndex > 0 && leftIndex < 55) {
        return `${leftIndex}%`;
      }
      return '55%';
    }

    // Vertical index
    if (this.props.isMobile && orientation === 'vertical') {
      const leftIndex = scrollpos * 0.027 - 55;
      if (leftIndex <= -55) {
        return '-55%';
      } else if (leftIndex > -55 && leftIndex < -23) {
        return `${leftIndex}%`;
      }
      return '-23%';
    }

    // Tablet
    if (is.tablet()) {
      const leftIndex = scrollpos * 0.043 - 30;
      if (leftIndex <= -30) {
        return '-30%';
      } else if (leftIndex > -30 && leftIndex < 20) {
        return `${leftIndex}%`;
      }
      return '20%';
    }

    const leftIndex = scrollpos * 0.06 - 55;
    // Set upper and lower bound
    if (leftIndex <= -55) {
      return '-55%';
    } else if (leftIndex > -55 && leftIndex < -10) {
      return `${leftIndex}%`;
    }
    return '-10%';
  };

  // Gets the image translateY based on scroll position
  getUpIndex = (scrollpos, isForTransform) => {
    const endIndex = orientation === 'vertical' ? 50 : 30;
    // if (orientation === 'vertical') {
    //   if (isForTransform) {
    //     if (this.props.isMobile && orientation === "vertical") {
    //       return "65%";
    //     }
    //     return "35%";
    //   }
    //   return "35%"; // .bottom style
    // }

    const upIndex = (scrollpos - 550) * 0.085;
    if (upIndex <= 0) {
      return '0%';
    } else if (upIndex > 0 && upIndex < endIndex) {
      return `${upIndex}%`;
    }
    return `${endIndex}%`;
  };

  // Gets the image scale prop based on scroll position
  getScaleIndex = scrollpos => {
    if (this.props.isMobile && orientation === 'vertical') {
      if (window.innerWidth >= 375) {
        return 1.6;
      }
      return 1.3;
    }

    const scaleIndex = scrollpos * -0.0006502 + 1.3;
    if (scaleIndex <= 1.1) {
      return 1.1;
    } else if (scaleIndex > 1.1 && scaleIndex <= 1.3) {
      return scaleIndex;
    }
    return 1.3;
  };

  // Gets the text position based on scroll position
  getTextIndex = scrollpos => {
    const textIndex = scrollpos * 0.07;
    if (textIndex <= 0) {
      return '0%';
    } else if (textIndex > 0 && textIndex < 90) {
      return `${textIndex}%`;
    }
    return '90%';
  };

  // Gets the text opacity based on scroll position
  getTextOpacity = scrollpos => {
    const textOpacityIndex = (scrollpos - 200) * -0.09 + 100;

    if (textOpacityIndex <= 15) {
      return 0;
    } else if (textOpacityIndex > 0 && textOpacityIndex < 100) {
      return textOpacityIndex / 100;
    }
    return 1;
  };

  // Gets scroll position
  getScrollTop = () => {
    return (
      window.pageYOffset ||
      (document.documentElement && document.documentElement.scrollTop)
    );
  };

  // Setting transform for all browsers
  setTransformPrefix = (item, scale, translateX, translateY) => {
    $(item).css({
      webkitTransform: `scale3d(${scale}, ${scale}, 1) translate3d(${translateX}, ${translateY}, 0)`, // IE
      MozTransform: `scale3d(${scale}, ${scale}, 1) translate3d(${translateX}, ${translateY}, 0)`, // Chrome and Safari
      msTransform: `scale3d(${scale}, ${scale}, 1) translate3d(${translateX}, ${translateY}, 0)`, // Firefox
      OTransform: `scale3d(${scale}, ${scale}, 1) translate3d(${translateX}, ${translateY}, 0)`, // Opera
      transform: `scale3d(${scale}, ${scale}, 1) translate3d(${translateX}, ${translateY}, 0)`, // Someday this may get adopted
    });
  };

  updateScreen = () => {
    const scrollpos = this.getScrollTop();
    if (window.innerWidth > window.innerHeight) {
      orientation = 'horizontal';
    } else {
      orientation = 'vertical';
    }

    this.scrollAnimation(scrollpos);
    this.forceUpdate();
  };

  // Magic. Creates a new image for each frame and stores it in images
  // So we wont need to fetch images every time we change it
  createImg = number => {
    const img = new Image();
    if (number === 0) {
      img.setAttribute('src', firstImg);
    } else if (number === frames) {
      img.setAttribute('src', lastImg);
    } else if (number < 10) {
      img.setAttribute('src', dataPath.replace('{index}', `00${number}`));
    } else if (number < 100) {
      img.setAttribute('src', dataPath.replace('{index}', `0${number}`));
    } else {
      img.setAttribute('src', dataPath.replace('{index}', number));
    }

    images.push(img);
  };

  // Checks if images loaded
  IsImageOk = img => {
    // During the onload event, IE correctly identifies any images that
    // weren’t downloaded as not complete. Others should too. Gecko-based
    // browsers act like NS4 in that they report this incorrectly.
    if (!img.complete) {
      return false;
    }

    // However, they do have two very useful properties: naturalWidth and
    // naturalHeight. These give the true size of the image. If it failed
    // to load, either of these should be zero.
    if (img.naturalWidth === 0) {
      // TODO remove the failed image.
      console.log('FAILED');
    }

    // No other way of checking: assume it’s ok.
    return true;
  };

  // Getting all the positions and image index and updating the image src
  scrollAnimation = scrollpos => {
    const image = document.getElementById('image');
    const textWrapper = document.querySelector('.text-wrapper');

    const scrollIndex = this.getScrollIndex(scrollpos); // animation frame
    const leftIndex = this.getLeftIndex(scrollpos); // animations left
    const upIndexTransform = this.getUpIndex(scrollpos, true); // animations up
    const upIndex = this.getUpIndex(scrollpos); // animations up
    const scaleIndex = this.getScaleIndex(scrollpos); // animation text
    const textIndex = this.getTextIndex(scrollpos); // text left
    const textOpacity = this.getTextOpacity(scrollpos); // test opacity

    if (scrollIndex > 17) {
      if (desktopArrowDown.style.display !== 'none') {
        desktopArrowDown.style.display = 'none';
      }
    } else {
      if (desktopArrowDown.style.display !== 'block') {
        desktopArrowDown.style.display = 'block';
      }
    }

    if (scrollIndex === 0) {
      image.src = firstImg;
    } else if (scrollIndex >= frames) {
      image.src = lastImg;
    } else {
      image.src = images[scrollIndex].src;
    }

    // element / scale x and y / translateX translateY
    this.setTransformPrefix(
      imageWrapper,
      scaleIndex,
      leftIndex,
      upIndexTransform
    );
    imageWrapper.style.bottom = upIndex;
    // Move text and animation only on horizontal
    if (orientation === 'horizontal') {
      this.setTransformPrefix(textWrapper, 1, textIndex, '-50%');
      textWrapper.style.opacity = textOpacity;
    } else {
      this.setTransformPrefix(textWrapper, 1, 0, `-${upIndexTransform}`);
      textWrapper.style.opacity = textOpacity;
    }

    lastScroll = scrollpos > maxPos ? maxPos : scrollpos;
  };

  // Debounce function to go throw all animation layers on fast scolls
  handleScrollJumps = () => {
    const scrollpos = this.getScrollTop();
    if (is.windows()) {
      if (timeout) {
        clearInterval(timeout);
      }
      if (
        scrollpos < maxScroll &&
        (scrollpos - lastScroll > scrollDif ||
          lastScroll - scrollpos > scrollDif)
      ) {
        timeout = setInterval(() => {
          if (
            lastScroll === maxPos ||
            (scrollpos - index <= lastScroll && scrollpos + index >= lastScroll)
          ) {
            clearInterval(timeout);
          }
          this.scrollAnimation(
            scrollpos > lastScroll ? lastScroll + index : lastScroll - index
          );
        }, 1);
      } else {
        this.scrollAnimation(scrollpos);
      }
    } else {
      this.scrollAnimation(scrollpos);
    }
  };

  render() {
    const {
      state: { entered },
      props: {
        store: { lang },
        text,
        xenosysLogo,
      },
    } = this;

    let injectPropsToImg = {};
    let injectPropsToAnimationWrapper = {};

    if (this.props.isMobile && orientation === 'vertical') {
      injectPropsToImg = {
        style: {
          height: '270px', // mobile height for image
        },
      };
      injectPropsToAnimationWrapper = {
        style: {
          width: '448px', // simple fixed width to not worry about adjusting transform position
        },
      };
    }

    return (
      <div
        className={`animation-section lazy-intro ${orientation} ${
          entered ? 'entered' : ''
        }`}
      >
        <div className="desktop-arrow-down arrow-down lazy-button">
          <span className="scroll-down-arrow" />
        </div>
        <div className="animation-title">
          <div className="container">
            <div className="row">
              <div
                className={`col-6 ${
                  orientation === 'vertical' ? 'col-12 order-2' : ''
                }`}
              >
                <div className="lazy-image">
                  <div
                    {...injectPropsToAnimationWrapper}
                    className="animation-wrapper"
                  >
                    <div className="shadow" />
                    <img
                      {...injectPropsToImg}
                      src={firstImg}
                      alt="Bryant Dental Loupes Evolution.png"
                      title="Bryant Dental Loupes Evolution.png"
                      id="image"
                    />
                  </div>
                </div>
              </div>
              <div
                className={`col-6 ${
                  orientation === 'vertical' ? 'col-12 order-1' : ''
                }`}
              >
                <div className="row">
                  <div className="box">
                    <div className="text-wrapper">
                      <TitleCss
                        className="lazy-title"
                        dangerouslySetInnerHTML={{
                          __html: text.title[lang]
                            ? text.title[lang]
                            : text.title['en'],
                        }}
                      />

                      <Button
                        className="lazy-button"
                        type="primary"
                        onClick={() => {
                          fbq('track', 'BookADemo');

                          ReactGA.event({
                            category: 'BookADemo',
                            action: 'BookADemo',
                          });
                          Intercom(
                            'showNewMessage',
                            'Hi, Can I arrange a free demo?'
                          );
                        }}
                      >
                        <span
                          dangerouslySetInnerHTML={{
                            __html: text.bookADemo[lang]
                              ? text.bookADemo[lang]
                              : text.bookADemo['en'],
                          }}
                        />
                      </Button>

                      <div
                        className={`arrow-down lazy-button ${
                          orientation === 'vertical' ? '' : 'd-md-none'
                        }`}
                      >
                        <span className="scroll-down-arrow" />
                      </div>
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

export default HomepageAnimation;
