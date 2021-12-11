/* global ScrollMagic, Linear, TimelineMax */
import React from 'react';

import './index.scss';
import inView from '../../js/in-view.min';
import computeIsMobile from 'js/isMobile';
const isMobile = computeIsMobile();

let controller = null;
let scene1 = null;
let scene2 = null;
let scene3 = null;
let scene4 = null;
let scene5 = null;
let scene6 = null;
let tl = null;
let imageHeight = null;

const basicPath =
  'https://chanappr.sirv.com/Bryant-dental/360/Lights/glasses_shortLoupes_x3_';
let width = null;

if (typeof window !== 'undefined') {
  if (window.innerWidth >= 1400 && window.innerWidth < 2000) {
    width = 1800;
  } else if (window.innerWidth >= 676 && window.innerWidth < 1400) {
    width = 1600;
  } else if (window.innerWidth < 676) {
    width = 1200;
  }
}

const frames = 136;
const dataPath = `${basicPath}{index}.jpg?q=100${width ? `&w=${width}` : ''}`;
const firstImg = `${basicPath}001.jpg?q=100${width ? `&w=${width}` : ''}`;
const lastImg = `${basicPath}${frames}.jpg?q=100${width ? `&w=${width}` : ''}`;

let images = [];
const obj = { curImg: 0 };
const animationsHeight = 1500;
const t1Height = 800;
const t2Height = 450;
const t3Height = 450;
let interval = null;

class LightsAnimation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      entered: false,
      loading: true,
      imageHeight: 0,
    };
  }

  componentDidMount() {
    for (let i = 192; i <= 215; i += 1) {
      this.createImg(i);
    }
    // Create images for scroll animation
    for (let i = 0; i <= frames; i += 1) {
      this.createImg(i);
    }

    // Start an interval to check if all images loaded.
    // If so call loaded with false to remove the loader.
    let cnt = images.length;
    interval = setInterval(() => {
      if (cnt <= 0) {
        clearInterval(interval);
        this.props.finishLoading();
        if (this.props.imageLoaded) {
          this.props.loaded(false);
        }
        return;
      }
      images.forEach(img => {
        const x = this.IsImageOk(img);
        if (x) {
          cnt -= 1;
          if (this.state.imageHeight === 0) {
            imageHeight = images[0].naturalHeight;
            this.setState({
              imageHeight,
            });
            this.initAnimation(imageHeight);
          }
        } else {
          cnt = images.length;
        }
      });
    }, 500);

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

    // TODO check if we need resize handler
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
  }

  static getDerivedStateFromProps(nextProps, state) {
    if (state.loading !== nextProps.loading) {
      return {
        loading: nextProps.loading,
        entered: true,
      };
    }
    return null;
  }

  componentWillUnmount() {
    clearInterval(interval);

    window.removeEventListener('optimizedResize', this.updateScreen, false);
    scene2 && scene2.remove();
    scene3 && scene3.remove();
    scene4 && scene4.remove();
    scene5 && scene5.remove();
    scene6 && scene6.remove();
    if (scene1) {
      scene1.removeTween(tl);
      scene1.remove();
    }
    controller && controller.removeScene([scene1]);
    controller && controller.destroy();

    tl && tl.kill();

    controller = null;
    scene1 = null;
    tl = null;

    images = [];
  }

  initAnimation = imageHeight => {
    let imgHeight = null;
    controller = new ScrollMagic.Controller();
    tl = new TimelineMax();

    const windowHeight = window.innerHeight;
    let blockHeight = 0;
    if (windowHeight > 700) {
      blockHeight = 700;
    } else {
      blockHeight = windowHeight;
    }
    const windowWidth = window.innerWidth;
    if (windowWidth <= 768) {
      imgHeight = 0;
    }

    const triggerPos = (windowHeight - blockHeight) / 2 / windowHeight;

    tl.to(obj, 8, {
      // -> We can think of this like flex is calculationg all the times and is slpiting the scene timeline into x parts
      curImg: images.length - 1, // animate propery curImg to number of images
      roundProps: 'curImg', // only integers so it can be used as an array index
      repeat: 0,
      immediateRender: true, // load first image automatically
      ease: Linear.easeNone, // show every image the same ammount of time
      onUpdate: () => {
        const image = document.getElementById('myimg');
        if (image) {
          image.src = images[parseInt(obj.curImg, 10)].src;
        }
      },
    }).to(
      '.lights-wrapper',
      3,
      {
        top: imgHeight !== null ? imgHeight : `-${imageHeight * 0.5}px`,
        ease: Linear.easeInOut,
      },
      4
    );

    scene1 = new ScrollMagic.Scene({
      triggerElement: '#trigger',
      triggerHook: triggerPos, // 0 - 1 -> 0 = start of the page 1 - bottom of the page
      duration: animationsHeight,
    })
      .setTween(tl)
      .setPin('.pinned-animation', { pushFollowers: false })
      // .addIndicators() // add indicators (requires plugin)
      .addTo(controller);

    scene2 = new ScrollMagic.Scene({
      triggerElement: '#trigger1',
      triggerHook: 0.5,
    })
      .setClassToggle('.lights-wrapper', 'active')
      // .addIndicators()
      .addTo(controller);

    scene3 = new ScrollMagic.Scene({
      triggerElement: '#trigger1',
      triggerHook: 0.5,
      duration: t1Height,
    })
      .setClassToggle('.lights-section-1', 'active')
      // .addIndicators()
      .addTo(controller);

    scene4 = new ScrollMagic.Scene({
      triggerElement: '#trigger2',
      triggerHook: 0.5,
      duration: t2Height,
    })
      .setClassToggle('.lights-section-2', 'active')
      .on('enter leave', () => {
        const sec = document.querySelector('.lights-section-1');
        if (sec) {
          sec.classList.toggle('hide-top');
        }
      })
      // .addIndicators()
      .addTo(controller);

    scene5 = new ScrollMagic.Scene({
      triggerElement: '#trigger3',
      triggerHook: 0.5,
      duration: t3Height,
    })
      .setClassToggle('.lights-section-3', 'active')
      .on('enter leave', () => {
        const sec = document.querySelector('.lights-section-2');
        if (sec) {
          sec.classList.toggle('hide-top');
        }
      })
      // .addIndicators()
      .addTo(controller);

    scene6 = new ScrollMagic.Scene({
      triggerElement: '#trigger4',
      triggerHook: 0.5,
    })
      .setClassToggle('.lights-section-4', 'active')
      .on('enter leave', () => {
        const sec = document.querySelector('.lights-section-3');
        if (sec) {
          sec.classList.toggle('hide-top');
        }
      })
      // .addIndicators()
      .addTo(controller);
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

  render() {
    const { entered, imageHeight } = this.state;
    const { lang, text } = this.props;
    return (
      <div
        className={`lights-animation lazy-show ${entered ? 'entered' : ''}`}
        style={{
          height: isMobile
            ? `${animationsHeight + imageHeight + 100}px`
            : `${animationsHeight + imageHeight}px`,
        }}
      >
        <div className="lights-header lazy-title">
          <h2
            className="lights-title"
            dangerouslySetInnerHTML={{
              __html: text.animationTitle[lang]
                ? text.animationTitle[lang]
                : text.animationTitle['en'],
            }}
          />
        </div>
        <div className="trigger-wrapper">
          <div
            className="text-trigger"
            id="trigger1"
            style={{ height: `${t1Height}px` }}
          />
          <div
            className="text-trigger"
            id="trigger2"
            style={{ height: `${t2Height}px` }}
          />
          <div
            className="text-trigger"
            id="trigger3"
            style={{ height: `${t3Height}px` }}
          />
          <div className="text-trigger" id="trigger4" />
        </div>
        <div className="container">
          <div id="trigger" />
          <div className="pinned-animation">
            <div className="lights-section-wrapper">
              <div className="lights-section lights-section-1">
                <h4
                  className="section-title"
                  dangerouslySetInnerHTML={{
                    __html: text.animationSection1Title[lang]
                      ? text.animationSection1Title[lang]
                      : text.animationSection1Title['en'],
                  }}
                />
                <h5
                  className="section-subtitle highlight"
                  dangerouslySetInnerHTML={{
                    __html: text.animationSection1Subtitle[lang]
                      ? text.animationSection1Subtitle[lang]
                      : text.animationSection1Subtitle['en'],
                  }}
                />
                <p
                  className="section-content"
                  dangerouslySetInnerHTML={{
                    __html: text.animationSection1Text[lang]
                      ? text.animationSection1Text[lang]
                      : text.animationSection1Text['en'],
                  }}
                />
              </div>
              <div className="lights-section lights-section-2">
                <h4
                  className="section-title"
                  dangerouslySetInnerHTML={{
                    __html: text.animationSection2Title[lang]
                      ? text.animationSection2Title[lang]
                      : text.animationSection2Title['en'],
                  }}
                />
                <h5
                  className="section-subtitle highlight"
                  dangerouslySetInnerHTML={{
                    __html: text.animationSection2Subtitle[lang]
                      ? text.animationSection2Subtitle[lang]
                      : text.animationSection2Subtitle['en'],
                  }}
                />
                <p
                  className="section-content"
                  dangerouslySetInnerHTML={{
                    __html: text.animationSection2Text[lang]
                      ? text.animationSection2Text[lang]
                      : text.animationSection2Text['en'],
                  }}
                />
              </div>
              <div className="lights-section lights-section-3">
                <h4
                  className="section-title"
                  dangerouslySetInnerHTML={{
                    __html: text.animationSection3Title[lang]
                      ? text.animationSection3Title[lang]
                      : text.animationSection3Title['en'],
                  }}
                />
                <h5
                  className="section-subtitle highlight"
                  dangerouslySetInnerHTML={{
                    __html: text.animationSection3Subtitle[lang]
                      ? text.animationSection3Subtitle[lang]
                      : text.animationSection3Subtitle['en'],
                  }}
                />
                <p
                  className="section-content"
                  dangerouslySetInnerHTML={{
                    __html: text.animationSection3Text[lang]
                      ? text.animationSection3Text[lang]
                      : text.animationSection3Text['en'],
                  }}
                />
              </div>
              <div className="lights-section lights-section-4">
                <h4
                  className="section-title"
                  dangerouslySetInnerHTML={{
                    __html: text.animationSection4Title[lang]
                      ? text.animationSection4Title[lang]
                      : text.animationSection4Title['en'],
                  }}
                />
                <h5
                  className="section-subtitle highlight"
                  dangerouslySetInnerHTML={{
                    __html: text.animationSection4Subtitle[lang]
                      ? text.animationSection4Subtitle[lang]
                      : text.animationSection4Subtitle['en'],
                  }}
                />
                <p
                  className="section-content"
                  dangerouslySetInnerHTML={{
                    __html: text.animationSection4Text[lang]
                      ? text.animationSection4Text[lang]
                      : text.animationSection4Text['en'],
                  }}
                />
              </div>
            </div>
            <div className="lights-wrapper">
              <div className="img-wrapper">
                <img
                  id="myimg"
                  src={firstImg}
                  alt="Bryant Dental lights"
                  title="Bryant Dental lights"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LightsAnimation;
