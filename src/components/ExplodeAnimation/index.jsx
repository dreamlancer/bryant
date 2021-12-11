/* global ScrollMagic, Linear, TimelineMax */
import React, { Component } from 'react';

import inView from '../../js/in-view.min';
import './morph.scss';
import anime from '../../js/anime.min';
import ReactGA from 'react-ga';
import Button from '../Shared/Button';
import { ExplodeTitleCss } from './index.css';

let controller = null;
let tl = null;

const basicPath =
  'https://chanappr.sirv.com/Bryant-dental/explode-animation/final-animation/BryantDental_glasses_exploded_00';
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

const frames = 200;

const dataPath = `${basicPath}{index}.png?q=100${width ? `&w=${width}` : ''}`;
const firstImg = `${basicPath}001.png?q=100${width ? `&w=${width}` : ''}`;
const lastImg = `${basicPath}${frames}.png?q=100${width ? `&w=${width}` : ''}`;

let images = [];
const obj = { curImg: 0 };
const animationsHeight = 1500;
let interval = null;
let scene1 = null;
let scene2 = null;
let scene3 = null;
let scene4 = null;
let scene5 = null;

const t1Height = 250;
const t2Height = 350;
const t3Height = 350;

const DOM = {};
let activeMorph = 0;
let lastActiveMorph = 0;

const shapes = [
  {
    path:
      'M 262.9,252.2 C 210.1,338.2 212.6,487.6 288.8,553.9 372.2,626.5 511.2,517.8 620.3,536.3 750.6,558.4 860.3,723 987.3,686.5 1089,657.3 1168,534.7 1173,429.2 1178,313.7 1096,189.1 995.1,130.7 852.1,47.07 658.8,78.95 498.1,119.2 410.7,141.1 322.6,154.8 262.9,252.2 Z',
    pathAlt:
      'M 262.9,252.2 C 210.1,338.2 273.3,400.5 298.5,520 323.7,639.6 511.2,537.2 620.3,555.7 750.6,577.8 872.2,707.4 987.3,686.5 1102,665.6 1218,547.8 1173,429.2 1128,310.6 1096,189.1 995.1,130.7 852.1,47.07 658.8,78.95 498.1,119.2 410.7,141.1 322.6,154.8 262.9,252.2 Z',
    scaleX: 0.7,
    scaleY: 0.5,
    rotate: 0,
    tx: -30,
    ty: 0,
    fill: {
      // color: "#282faf",
      duration: 500,
      easing: 'linear',
    },
    animation: {
      path: {
        duration: 3000,
        easing: 'easeOutElastic',
        elasticity: 600,
      },
      svg: {
        duration: 2000,
        easing: 'easeOutElastic',
      },
    },
  },
  {
    path:
      'M 383.8,163.4 C 335.8,352.3 591.6,317.1 608.7,420.8 625.8,524.5 580.5,626 647.3,688 714,750 837.1,760.5 940.9,661.5 1044,562.3 1041,455.8 975.8,393.6 909.8,331.5 854.2,365.4 784.4,328.1 714.6,290.8 771.9,245.2 733.1,132.4 694.2,19.52 431.9,-25.48 383.8,163.4 Z',
    pathAlt:
      'M 383.8,163.4 C 345.5,324.9 591.6,317.1 608.7,420.8 625.8,524.5 595.1,597 647.3,688 699.5,779 837.1,760.5 940.9,661.5 1044,562.3 1068,444.4 975.8,393.6 884,342.8 854.2,365.4 784.4,328.1 714.6,290.8 820.3,237.2 733.1,132.4 645.9,27.62 422.1,1.919 383.8,163.4 Z',
    scaleX: 0.9,
    scaleY: 0.5,
    rotate: -20,
    tx: 250,
    ty: 150,
    fill: {
      // color: "#282faf",
      duration: 500,
      easing: 'linear',
    },
    animation: {
      path: {
        duration: 3000,
        easing: 'easeOutElastic',
        elasticity: 600,
      },
      svg: {
        duration: 2500,
        easing: 'easeOutElastic',
      },
    },
  },
  {
    path:
      'M 247.6,239.6 C 174.3,404.5 245.5,601.9 358.5,624.3 471.5,646.6 569.1,611.6 659.7,655.7 750.4,699.7 1068,687.6 1153,534.4 1237,381.1 1114,328.4 1127,227.4 1140,126.3 1016,51.08 924.6,116.8 833.8,182.5 928.4,393.8 706.8,283.5 485.2,173.1 320.8,74.68 247.6,239.6 Z',
    pathAlt:
      'M 247.6,239.6 C 174.3,404.5 271.3,550.3 358.5,624.3 445.7,698.3 569.1,611.6 659.7,655.7 750.4,699.7 1145,699 1153,534.4 1161,369.8 1114,328.4 1127,227.4 1140,126.3 1016,51.08 924.6,116.8 833.8,182.5 894.5,431 706.8,283.5 519.1,136 320.8,74.68 247.6,239.6 Z',
    scaleX: 1,
    scaleY: 0.7,
    rotate: 0,
    tx: 250,
    ty: 50,
    fill: {
      // color: "#282faf",
      duration: 500,
      easing: 'linear',
    },
    animation: {
      path: {
        duration: 3000,
        easing: 'easeOutElastic',
        elasticity: 600,
      },
      svg: {
        duration: 2000,
        easing: 'easeOutExpo',
      },
    },
  },
  {
    path:
      'M 262.9,252.2 C 210.1,338.2 212.6,487.6 288.8,553.9 372.2,626.5 511.2,517.8 620.3,536.3 750.6,558.4 860.3,723 987.3,686.5 1089,657.3 1168,534.7 1173,429.2 1178,313.7 1096,189.1 995.1,130.7 852.1,47.07 658.8,78.95 498.1,119.2 410.7,141.1 322.6,154.8 262.9,252.2 Z',
    pathAlt:
      'M 262.9,252.2 C 210.1,338.2 273.3,400.5 298.5,520 323.7,639.6 511.2,537.2 620.3,555.7 750.6,577.8 872.2,707.4 987.3,686.5 1102,665.6 1218,547.8 1173,429.2 1128,310.6 1096,189.1 995.1,130.7 852.1,47.07 658.8,78.95 498.1,119.2 410.7,141.1 322.6,154.8 262.9,252.2 Z',
    scaleX: 0.9,
    scaleY: 0.4,
    rotate: -20,
    tx: 0,
    ty: -50,
    fill: {
      // color: "#282faf",
      duration: 500,
      easing: 'linear',
    },
    animation: {
      path: {
        duration: 3000,
        easing: 'easeOutQuad',
        elasticity: 600,
      },
      svg: {
        duration: 3000,
        easing: 'easeOutElastic',
      },
    },
  },
  {
    path:
      'M 247.6,239.6 C 174.3,404.5 245.5,601.9 358.5,624.3 471.5,646.6 569.1,611.6 659.7,655.7 750.4,699.7 1068,687.6 1153,534.4 1237,381.1 1114,328.4 1127,227.4 1140,126.3 1016,51.08 924.6,116.8 833.8,182.5 928.4,393.8 706.8,283.5 485.2,173.1 320.8,74.68 247.6,239.6 Z',
    pathAlt:
      'M 247.6,239.6 C 174.3,404.5 271.3,550.3 358.5,624.3 445.7,698.3 569.1,611.6 659.7,655.7 750.4,699.7 1145,699 1153,534.4 1161,369.8 1114,328.4 1127,227.4 1140,126.3 1016,51.08 924.6,116.8 833.8,182.5 894.5,431 706.8,283.5 519.1,136 320.8,74.68 247.6,239.6 Z',
    scaleX: 1,
    scaleY: 0.7,
    rotate: 0,
    tx: 250,
    ty: 50,
    fill: {
      // color: "#282faf",
      duration: 500,
      easing: 'linear',
    },
    animation: {
      path: {
        duration: 3000,
        easing: 'easeOutElastic',
        elasticity: 600,
      },
      svg: {
        duration: 2000,
        easing: 'easeOutExpo',
      },
    },
  },
  // footer shape:
  {
    path:
      'M 262.9,252.2 C 210.1,338.2 212.6,487.6 288.8,553.9 372.2,626.5 511.2,517.8 620.3,536.3 750.6,558.4 860.3,723 987.3,686.5 1089,657.3 1168,534.7 1173,429.2 1178,313.7 1096,189.1 995.1,130.7 852.1,47.07 658.8,78.95 498.1,119.2 410.7,141.1 322.6,154.8 262.9,252.2 Z',
    pathAlt:
      'M 262.9,252.2 C 210.1,338.2 273.3,400.5 298.5,520 323.7,639.6 511.2,537.2 620.3,555.7 750.6,577.8 872.2,707.4 987.3,686.5 1102,665.6 1218,547.8 1173,429.2 1128,310.6 1096,189.1 995.1,130.7 852.1,47.07 658.8,78.95 498.1,119.2 410.7,141.1 322.6,154.8 262.9,252.2 Z',
    scaleX: 1,
    scaleY: 0.8,
    rotate: 0,
    tx: 0,
    ty: -50,
    fill: {
      // color: "#282faf",
      duration: 500,
      easing: 'linear',
    },
    animation: {
      path: {
        duration: 3000,
        easing: 'easeOutQuad',
        elasticity: 600,
      },
      svg: {
        duration: 3000,
        easing: 'easeOutElastic',
      },
    },
  },
];

class ExplodeAnimation extends Component {
  componentDidMount() {
    const explodeContainer = document.querySelector('.explode-animation');
    const lazyContent = Array.from(
      explodeContainer.querySelectorAll('.lazy-content')
    );

    inView({
      selector: '.lazy-show',
      enter: el => {
        el.classList.add('entered');
      },
      offset: 0.4,
      exit: el => {
        el.classList.remove('entered');
      },
    });

    if (this.props.isMobile) {
      lazyContent[0].classList.remove('d-md-none');
      lazyContent[1].classList.remove('d-md-block');
    } else {
      controller = new ScrollMagic.Controller();
      tl = new TimelineMax();

      this.initMorph();
      DOM.svg = document.querySelector('.morph');
      DOM.shapeEl = DOM.svg.querySelector('path');

      // Create images for scroll animation
      for (let i = 0; i <= frames; i += 1) {
        this.createImg(i);
      }

      tl.to(obj, 8, {
        // -> We can think of this like flex is calculationg all the times and is slpiting the scene timeline into x parts
        curImg: images.length - 1, // animate propery curImg to number of images
        roundProps: 'curImg', // only integers so it can be used as an array index
        repeat: 0,
        immediateRender: true, // load first image automatically
        ease: Linear.easeNone, // show every image the same ammount of time
        onUpdate: () => {
          const image = document.getElementById('explode-image');
          if (image) {
            image.src = images[parseInt(obj.curImg, 10)].src;
          }
        },
      });

      scene1 = new ScrollMagic.Scene({
        triggerElement: '#trigger',
        triggerHook: 0.25, // 0 - 1 -> 0 = start of the page 1 - bottom of the page
        duration: animationsHeight,
      })
        .setTween(tl)
        .setPin('.pinned-animation', { pushFollowers: false })
        // .addIndicators() // add indicators (requires plugin)
        .addTo(controller);

      scene2 = new ScrollMagic.Scene({
        triggerElement: '#trigger1',
        triggerHook: 0.5,
        duration: t1Height,
      })
        .on('enter leave', () => {
          this.handleMorphChange(0);
        })
        // .addIndicators()
        .addTo(controller);

      scene3 = new ScrollMagic.Scene({
        triggerElement: '#trigger2',
        triggerHook: 0.5,
        duration: t2Height,
      })
        .on('enter leave', () => {
          this.handleMorphChange(1);
        })
        // .addIndicators()
        .addTo(controller);

      scene4 = new ScrollMagic.Scene({
        triggerElement: '#trigger3',
        triggerHook: 0.5,
        duration: t3Height,
      })
        .on('enter leave', () => {
          this.handleMorphChange(2);
        })
        // .addIndicators()
        .addTo(controller);

      scene5 = new ScrollMagic.Scene({
        triggerElement: '#trigger4',
        triggerHook: 0.5,
      })
        .on('enter leave', () => {
          this.handleMorphChange(3);
        })
        // .addIndicators()
        .addTo(controller);
    }
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
    images.push(img);
  };

  componentWillUnmount() {
    clearInterval(interval);
    scene1 && scene1.remove();
    scene2 && scene2.remove();
    scene3 && scene3.remove();
    scene4 && scene4.remove();
    scene5 && scene5.remove();
    if (controller) {
      controller.removeScene([scene1]);
      controller.destroy();
    }
    tl && tl.kill();

    controller = null;
    scene1 = null;
    tl = null;
    images = [];
  }

  initMorph = () => {
    const initShapeEl = () => {
      anime.remove(DOM.svg);
      anime({
        targets: DOM.svg,
        duration: 1,
        easing: 'linear',
        scaleX: shapes[0].scaleX,
        scaleY: shapes[0].scaleY,
        translateX: `${shapes[0].tx}px`,
        translateY: `${shapes[0].ty}px`,
        rotate: `${shapes[0].rotate}deg`,
      });

      this.initShapeLoop();
    };

    // TODO check if image loaded then init shapes
    initShapeEl();
  };

  initShapeLoop = pos => {
    pos = pos || 0;
    anime.remove(DOM.shapeEl);
    anime({
      targets: DOM.shapeEl,
      easing: 'linear',
      d: [
        { value: shapes[pos].pathAlt, duration: 3500 },
        { value: shapes[pos].path, duration: 3500 },
      ],
      loop: true,
      fill: {
        value: shapes[pos].fill.color,
        duration: shapes[pos].fill.duration,
        easing: shapes[pos].fill.easing,
      },
      direction: 'alternate',
    });
  };

  handleMorphChange = index => {
    activeMorph = index;
    if (lastActiveMorph !== activeMorph) {
      if (!shapes[activeMorph]) {
        return;
      }
      lastActiveMorph = activeMorph;
      anime.remove(DOM.shapeEl);
      anime({
        targets: DOM.shapeEl,
        duration: shapes[activeMorph].animation.path.duration,
        easing: shapes[activeMorph].animation.path.easing,
        elasticity: shapes[activeMorph].animation.path.elasticity || 0,
        d: shapes[activeMorph].path,
        fill: {
          value: shapes[activeMorph].fill.color,
          duration: shapes[activeMorph].fill.duration,
          easing: shapes[activeMorph].fill.easing,
        },
        complete: () => {
          this.initShapeLoop(activeMorph);
        },
      });

      anime.remove(DOM.svg);
      const x = shapes;

      anime({
        targets: DOM.svg,
        duration: shapes[activeMorph].animation.svg.duration,
        easing: shapes[activeMorph].animation.svg.easing,
        elasticity: shapes[activeMorph].animation.svg.elasticity || 0,
        scaleX: shapes[activeMorph].scaleX,
        scaleY: shapes[activeMorph].scaleY,
        translateX: `${shapes[0].tx}px`,
        translateY: `${shapes[0].ty}px`,
        rotate: `${shapes[0].rotate}deg`,
      });
    }
  };

  render() {
    const {
      text,
      store: { lang },
      isMobile,
    } = this.props;
    return (
      <section className="explode-animation lazy-show">
        <ExplodeTitleCss className="lazy-title">
          <h2
            dangerouslySetInnerHTML={{
              __html: text.explodeTitle[lang]
                ? text.explodeTitle[lang]
                : text.explodeTitle['en'],
            }}
          />
        </ExplodeTitleCss>

        <div className="lazy-content d-md-none">
          <div className="container">
            <div className="explode-content">
              <img
                src="https://chanappr.sirv.com/Bryant-dental/explode-animation/explode-animation.gif?q=100"
                alt="Bryant Dental loupes explode"
                title="Bryant Dental loupes explode"
              />
            </div>
          </div>
        </div>
        <div className="lazy-content d-none d-md-block">
          <div className="container">
            <div className="explode-content">
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
              <div id="trigger" />
              <div className="explode-animation-wrapper">
                <div className="morph-wrap">
                  <svg
                    className="morph"
                    width="1400"
                    height="770"
                    viewBox="0 0 1400 770"
                  >
                    <path d="M 262.9,252.2 C 210.1,338.2 212.6,487.6 288.8,553.9 372.2,626.5 511.2,517.8 620.3,536.3 750.6,558.4 860.3,723 987.3,686.5 1089,657.3 1168,534.7 1173,429.2 1178,313.7 1096,189.1 995.1,130.7 852.1,47.07 658.8,78.95 498.1,119.2 410.7,141.1 322.6,154.8 262.9,252.2 Z" />
                  </svg>
                  <img
                    src={firstImg}
                    id="explode-image"
                    alt="3.5x Sideview Bryant Xenosys"
                    title="3.5x Sideview Bryant Xenosys"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Button
          type="primary"
          className={`explode-book-btn ${isMobile ? 'mobile-explode-btn' : ''}`}
          onClick={() => {
            fbq('track', 'BookADemo');

            ReactGA.event({
              category: 'BookADemo',
              action: 'BookADemo',
            });
            Intercom('showNewMessage', 'Hi, Can I arrange a free demo?');
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
      </section>
    );
  }
}

export default ExplodeAnimation;
