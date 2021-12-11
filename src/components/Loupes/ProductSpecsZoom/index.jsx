import React, { Component } from 'react';
import './index.scss';
import disableScroll from 'disable-scroll';
import inView from '../../../js/in-view.min';

let timeout = null;
let timeout2 = null;
let controller = null;
let tl = null;
const animationsHeight = 8700;
let imageHeight = 0;
let windowHeight = 0;
let interval = null;
let slide = null;
let scene = null;

let activeSection = 0;

import computeIsMobile from 'js/isMobile';
const isMobile = computeIsMobile();

const tHeight = 700;

// Explode
const basicPath =
  'https://chanappr.sirv.com/Bryant-dental/explode-animation/zoom-animation/BryantDental_glasses_exploded_00';
let width = null;

if (typeof window !== 'undefined') {
  if (window.innerWidth >= 1400 && window.innerWidth < 2000) {
    width = 1700;
  } else if (window.innerWidth >= 676 && window.innerWidth < 1400) {
    width = 1500;
  } else if (window.innerWidth < 676) {
    width = 800;
  }
}

const frames = 180;

const dataPath = `${basicPath}{index}.jpg?q=100${width ? `&w=${width}` : ''}`;
const firstImg = `${basicPath}001.jpg?q=100${width ? `&w=${width}` : ''}`;
const lastImg = `${basicPath}${frames}.jpg?q=100${width ? `&w=${width}` : ''}`;

let images = [];
const obj = { curImage: 0 };

export default class ProductSpecsZoom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageLoaded: false,
      hideMask: false,
    };
  }
  componentDidMount() {
    // Create images for scroll animation
    for (let i = 0; i <= frames; i += 1) {
      this.createImg(i + 10);
    }

    // Start an interval to check if all images loaded.
    // If so call loaded with false to remove the loader.
    let cnt = images.length;

    interval = setInterval(() => {
      if (cnt <= 0) {
        clearInterval(interval);
        return;
      }
      images.forEach(img => {
        const x = this.IsImageOk(img);
        if (x) {
          cnt -= 1;
          this.initZoomAnimation();
        } else {
          cnt = images.length;
        }
      });
    }, 500);

    inView({
      selector: '.lazy-show',
      enter: el => {
        el.classList.add('entered');
        if (el.classList.contains('explode-animation')) {
          offset = explodeContainer.offsetTop + 100;
          lastScroll = offset;
        }
      },
      offset: 0.2,
      exit: el => {
        el.classList.remove('entered');
      },
    });
  }

  componentWillUnmount() {
    clearTimeout(timeout);
    clearTimeout(timeout2);
    clearInterval(interval);
    if (slide) {
      slide.remove();
    }
    if (scene) {
      scene.remove();
    }
    if (controller) {
      controller.destroy();
      tl && tl.kill();
      controller = null;
      tl = null;
    }

    obj.curImage = 0;
    images = [];
  }

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

    if (number === 74) {
      for (let i = 0; i < 150; i++) {
        images.push(img);
      }
    }
    images.push(img);
  };

  initZoomAnimation = (index = 0) => {
    // If we remove this condition scrollmagic will create an infinite loop
    if (index === 0) {
      if (this.state.imageLoaded) return;
      this.setState({ imageLoaded: true });
    }

    // Check if image exists and has height otherwise run again when it does.
    const img = document.querySelector('.img-wrapper .zoom-loupes');
    imageHeight = img ? img.offsetHeight : 0;

    let timeout;
    if (imageHeight === 0) {
      timeout = setTimeout(() => {
        this.initZoomAnimation(1);
      }, 500);
      return;
    } else {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      this.forceUpdate(); // to update imageHeight
    }, 100);

    controller = new ScrollMagic.Controller();
    tl = new TimelineMax();

    tl.to(obj, 10, {
      // -> We can think of this like flex is calculationg all the times and is slpiting the scene timeline into x parts
      curImage: images.length - 1, // animate propery curImage to number of images
      roundProps: 'curImage', // only integers so it can be used as an array index
      repeat: 0,
      immediateRender: true, // load first image automatically
      ease: Linear.easeNone, // show every image the same ammount of time
      onUpdate: () => {
        const image = document.getElementById('explode-image-zoom');
        if (image) {
          image.src = images[parseInt(obj.curImage, 10)].src;
        }
      },
    });

    // TODO: try to update the trigger pos on window resize
    // We need image height and windowHeight to center the image
    windowHeight = window.innerHeight;
    const triggerPos = (windowHeight - imageHeight - 30) / 2 / windowHeight;

    scene = new ScrollMagic.Scene({
      triggerElement: '#specsTriggerZoom',
      triggerHook: triggerPos, // 0 - 1 -> 0 = start of the page 1 - bottom of the page
      duration: animationsHeight - imageHeight,
    })
      .setTween(tl)
      .setPin('.specs-animation-zoom', { pushFollowers: false })
      // .addIndicators() // add indicators (requires plugin)
      .addTo(controller);

    this.createSlide({
      triggerHook: triggerPos,
      duration: tHeight,
      index: 1,
      tl,
    });

    this.createSlide({
      triggerHook: triggerPos,
      duration: tHeight,
      index: 2,
    });

    this.createSlide({
      triggerHook: triggerPos,
      duration: tHeight,
      index: 3,
    });
    this.createSlide({
      triggerHook: triggerPos,
      duration: tHeight,
      index: 4,
    });
    this.createSlide({
      triggerHook: triggerPos,
      duration: tHeight,
      index: 5,
    });
    this.createSlide({
      triggerHook: triggerPos,
      duration: tHeight,
      index: 6,
    });
    this.createSlide({
      triggerHook: triggerPos,
      index: 7,
      tl,
    });
  };

  createSlide = ({ triggerHook, duration, index, tl }) => {
    let maskIndex = index; // For step 4 and 5 use the same mask
    if (maskIndex >= 5) maskIndex--;

    const specsWrapper = document.querySelector('.specs-wrapper');
    const text = document.querySelector(`.specs-section-${index}`);
    const title = document.querySelector(`.specs-header-${index}`);

    slide = new ScrollMagic.Scene({
      triggerElement: `#specsTriggerZoom${index}`,
      triggerHook,
      duration,
    })
      .setClassToggle(`.mask${maskIndex}`, 'active')
      // .addIndicators()
      .addTo(controller);

    slide.on('enter leave', event => {
      const image = document.getElementById('explode-image-zoom');
      this.hijackScroll(index, event);

      if (index === 1) {
        image.src = images[74].src;
        if (event.type === 'enter' && event.scrollDirection === 'FORWARD') {
          tl.pause();
        } else if (
          event.type === 'leave' &&
          event.scrollDirection === 'REVERSE'
        ) {
          tl.play();
        }
      } else if (index === 7) {
        image.src = images[74].src;
        if (event.type === 'enter' && event.scrollDirection === 'FORWARD') {
          tl.play();
          this.setState({ hideMask: true }, () => {
            timeout2 = setTimeout(() => {
              this.setState({ hideMask: false });
            }, 200);
          });
        } else if (
          event.type === 'leave' &&
          event.scrollDirection === 'REVERSE'
        ) {
          tl.pause();
        }
      }

      if (event.type === 'enter') {
        specsWrapper && specsWrapper.classList.add(`zoom-${index}`);
        title && title.classList.add('active');
        text && text.classList.add('active');
      } else if (event.type === 'leave') {
        specsWrapper && specsWrapper.classList.remove(`zoom-${index}`);
        title && title.classList.remove('active');
        text && text.classList.remove('active');
      }
    });
  };

  hijackScroll = (index, event) => {
    if (event.type === 'enter') {
      if (index === 7) return; // 7 is the last bit of explode animation
      // Set a scroll listener to block the scroll and remove it after 500ms
      document.addEventListener('scroll', stopScroll);
      setTimeout(() => {
        document.removeEventListener('scroll', stopScroll);
      }, 500);
    }

    function stopScroll() {
      const myTrigger = document.getElementById(`specsTriggerZoom${index}`);
      myTrigger.scrollIntoView({ block: 'start' });
      window.scrollBy(0, 10);
    }
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

  // Gets scroll position
  getScrollTop = () => {
    return (
      window.pageYOffset ||
      (document.documentElement && document.documentElement.scrollTop)
    );
  };

  render() {
    const { text, lang } = this.props;
    return (
      <section className="loupes-specs lazy-show">
        <h2
          className="specs-main-title lazy-title"
          dangerouslySetInnerHTML={{
            __html: text.animationTitle[lang]
              ? text.animationTitle[lang]
              : text.animationTitle['en'],
          }}
        />
        <div className="container">
          <div
            className="animation-content-wrapper"
            style={{
              height: `${animationsHeight}px`,
            }}
          >
            <div className="trigger-wrapper">
              <div
                className="text-trigger"
                id="specsTriggerZoom1"
                style={{ height: `${tHeight}px` }}
              />
              <div
                className="text-trigger"
                id="specsTriggerZoom2"
                style={{ height: `${tHeight}px` }}
              />
              <div
                className="text-trigger"
                id="specsTriggerZoom3"
                style={{ height: `${tHeight}px` }}
              />
              <div
                className="text-trigger"
                id="specsTriggerZoom4"
                style={{ height: `${tHeight}px` }}
              />
              <div
                className="text-trigger"
                id="specsTriggerZoom5"
                style={{ height: `${tHeight}px` }}
              />
              <div
                className="text-trigger"
                id="specsTriggerZoom6"
                style={{ height: `${tHeight}px` }}
              />
              <div className="text-trigger" id="specsTriggerZoom7" />
            </div>

            <div id="specsTriggerZoom" />

            <div
              className={`specs-animation-zoom ${
                windowHeight < imageHeight + 80 ? 'margin-top' : ''
              }`}
            >
              <div className="specs-header specs-header-1">
                <h2
                  className="specs-title"
                  dangerouslySetInnerHTML={{
                    __html: text.animationSubTitle1[lang]
                      ? text.animationSubTitle1[lang]
                      : text.animationSubTitle1['en'],
                  }}
                />
              </div>
              <div className="specs-header specs-header-2">
                <h2
                  className="specs-title"
                  dangerouslySetInnerHTML={{
                    __html: text.animationSubTitle2[lang]
                      ? text.animationSubTitle2[lang]
                      : text.animationSubTitle2['en'],
                  }}
                />
              </div>
              <div className="specs-header specs-header-3">
                <h2
                  className="specs-title"
                  dangerouslySetInnerHTML={{
                    __html: text.animationSubTitle3[lang]
                      ? text.animationSubTitle3[lang]
                      : text.animationSubTitle3['en'],
                  }}
                />
              </div>
              <div className="specs-header specs-header-4">
                <h2
                  className="specs-title"
                  dangerouslySetInnerHTML={{
                    __html: text.animationSubTitle4[lang]
                      ? text.animationSubTitle4[lang]
                      : text.animationSubTitle4['en'],
                  }}
                />
              </div>
              <div className="specs-header specs-header-5">
                <h2
                  className="specs-title"
                  dangerouslySetInnerHTML={{
                    __html: text.animationSubTitle5[lang]
                      ? text.animationSubTitle5[lang]
                      : text.animationSubTitle5['en'],
                  }}
                />
              </div>
              <div className="specs-header specs-header-6">
                <h2
                  className="specs-title"
                  dangerouslySetInnerHTML={{
                    __html: text.animationSubTitle6[lang]
                      ? text.animationSubTitle6[lang]
                      : text.animationSubTitle6['en'],
                  }}
                />
              </div>
              <div className="specs-section-wrapper">
                <div className="specs-section specs-section-1">
                  <h2
                    dangerouslySetInnerHTML={{
                      __html: text.animationText1[lang]
                        ? text.animationText1[lang]
                        : text.animationText1['en'],
                    }}
                  />
                </div>

                <div className="specs-section specs-section-2">
                  <h2
                    dangerouslySetInnerHTML={{
                      __html: text.animationText2[lang]
                        ? text.animationText2[lang]
                        : text.animationText2['en'],
                    }}
                  />
                </div>

                <div className="specs-section specs-section-3">
                  <h2
                    dangerouslySetInnerHTML={{
                      __html: text.animationText3[lang]
                        ? text.animationText3[lang]
                        : text.animationText3['en'],
                    }}
                  />
                </div>

                <div className="specs-section specs-section-4">
                  <h2
                    dangerouslySetInnerHTML={{
                      __html: text.animationText4[lang]
                        ? text.animationText4[lang]
                        : text.animationText4['en'],
                    }}
                  />
                </div>

                <div className="specs-section specs-section-5">
                  <h2
                    dangerouslySetInnerHTML={{
                      __html: text.animationText5[lang]
                        ? text.animationText5[lang]
                        : text.animationText5['en'],
                    }}
                  />
                </div>

                <div className="specs-section specs-section-6">
                  <h2
                    dangerouslySetInnerHTML={{
                      __html: text.animationText6[lang]
                        ? text.animationText6[lang]
                        : text.animationText6['en'],
                    }}
                  />
                </div>
              </div>
              <div className="specs-wrapper">
                <div className="img-wrapper">
                  <img
                    src={firstImg}
                    className="loupes zoom-loupes"
                    id="explode-image-zoom"
                    alt="Bryant Dental Loupes"
                    title="Bryant Dental Loupes"
                  />
                </div>
                <div
                  className={`mask-wrapper ${
                    this.state.hideMask ? 'hidden' : ''
                  }`}
                >
                  <img
                    className="mask mask1"
                    src="https://chanappr.sirv.com/Bryant-dental/explode-animation/zoom-animation/mask/mask-1.png"
                    alt="Loupes Mask 1"
                    title="Loupes Mask 1"
                  />
                  <img
                    className="mask mask2"
                    src="https://chanappr.sirv.com/Bryant-dental/explode-animation/zoom-animation/mask/mask-2.png"
                    alt="Loupes Mask 2"
                    title="Loupes Mask 2"
                  />
                  <img
                    className="mask mask3"
                    src="https://chanappr.sirv.com/Bryant-dental/explode-animation/zoom-animation/mask/mask-3.png"
                    alt="Loupes Mask 3"
                    title="Loupes Mask 3"
                  />
                  <img
                    className="mask mask4"
                    src="https://chanappr.sirv.com/Bryant-dental/explode-animation/zoom-animation/mask/mask-4.png"
                    alt="Loupes Mask 4"
                    title="Loupes Mask 4"
                  />
                  <img
                    className="mask mask5"
                    src="https://chanappr.sirv.com/Bryant-dental/explode-animation/zoom-animation/mask/mask-5.png"
                    alt="Loupes Mask 5"
                    title="Loupes Mask 5"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
