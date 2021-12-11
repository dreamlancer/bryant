import React, { Component } from 'react';
import Swiper from 'swiper';
import './index.scss';
import Img from 'gatsby-image';

let mySwiper = null;
let timeout = null;

class LoupesBespoke extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movePageLeft: false,
    };
  }

  componentDidMount() {
    mySwiper = new Swiper('.swiper-container-bespoke', {
      slidesPerView: 1,
      mousewheel: true,
      // speed: 600,
      // autoplay: {
      //   delay: 5000,
      // },
      keyboard: {
        enabled: true,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next-bespoke',
        prevEl: '.swiper-button-prev-bespoke',
      },
    });
    mySwiper.autoplay.stop();
    mySwiper.slideTo(0, 1, () => {});
  }

  static getDerivedStateFromProps(props, state) {
    if (props.movePageLeft !== state.movePageLeft) {
      // if (!props.movePageLeft) {
      //   mySwiper.autoplay.stop();
      //   timeout = setTimeout(() => {
      //     mySwiper.slideTo(0, 1, () => {});
      //   }, 500);
      // } else {
      //   mySwiper.autoplay.start();
      // }
      return { movePageLeft: props.movePageLeft };
    }
    return null;
  }

  componentWillUnmount() {
    clearTimeout(timeout);
    if (mySwiper) {
      mySwiper.destroy();
      mySwiper = null;
    }
  }

  renderSlide1 = () => {
    const { lang, text } = this.props;
    return (
      <div className="container slide-explanation lazy-content active">
        <div className="row">
          <div className="col-md-4">
            <div className="explanation-image-wrapper first">
              <div className="line" />
              <img
                ref={this.img}
                className="Sirv explanation-image"
                src="https://chanappr.sirv.com/Bryant-dental/global/ilustrations/illustration-1.png"
                alt="Angle of Declination"
                title="Angle of Declination"
                data-options="lazy: false;"
              />
            </div>
          </div>
          <div className="col-md-8">
            <div className="explanation-wrapper">
              <div className="explanation-text">
                <h2
                  className="explanation-step highlight"
                  dangerouslySetInnerHTML={{
                    __html: text.bespokeStep1[lang]
                      ? text.bespokeStep1[lang]
                      : text.bespokeStep1['en'],
                  }}
                />
                <h2
                  className="explanation-title"
                  dangerouslySetInnerHTML={{
                    __html: text.bespokeStep1Title[lang]
                      ? text.bespokeStep1Title[lang]
                      : text.bespokeStep1Title['en'],
                  }}
                />
                <h4
                  className="explanation-description"
                  dangerouslySetInnerHTML={{
                    __html: text.bespokeStep1Description[lang]
                      ? text.bespokeStep1Description[lang]
                      : text.bespokeStep1Description['en'],
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  renderSlide2 = () => {
    const { lang, text } = this.props;
    return (
      <div className="container slide-explanation lazy-content">
        <div className="row">
          <div className="col-md-4">
            <div className="explanation-image-wrapper">
              <div className="line" />
              <img
                ref={this.img}
                className="Sirv explanation-image"
                src="https://chanappr.sirv.com/Bryant-dental/global/ilustrations/illustration-2.png"
                alt="Loupes Material"
                title="Loupes Material"
                data-options="lazy: false;"
              />
            </div>
          </div>
          <div className="col-md-8">
            <div className="explanation-wrapper">
              <div className="explanation-text">
                <h2
                  className="explanation-step highlight"
                  dangerouslySetInnerHTML={{
                    __html: text.bespokeStep2[lang]
                      ? text.bespokeStep2[lang]
                      : text.bespokeStep2['en'],
                  }}
                />
                <h2
                  className="explanation-title"
                  dangerouslySetInnerHTML={{
                    __html: text.bespokeStep2Title[lang]
                      ? text.bespokeStep2Title[lang]
                      : text.bespokeStep2Title['en'],
                  }}
                />
                <h4
                  className="explanation-description"
                  dangerouslySetInnerHTML={{
                    __html: text.bespokeStep2Description[lang]
                      ? text.bespokeStep2Description[lang]
                      : text.bespokeStep2Description['en'],
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  renderSlide3 = () => {
    const { lang, text } = this.props;
    return (
      <div className="container slide-explanation lazy-content">
        <div className="row">
          <div className="col-md-4">
            <div className="explanation-image-wrapper last">
              <img
                ref={this.img}
                className="Sirv explanation-image"
                src="https://chanappr.sirv.com/Bryant-dental/global/ilustrations/illustration-3.png"
                alt="Depth of Focus & Field of View"
                title="Depth of Focus & Field of View"
                data-options="lazy: false;"
              />
            </div>
          </div>
          <div className="col-md-8">
            <div className="explanation-wrapper">
              <div className="explanation-text">
                <h2
                  className="explanation-step highlight"
                  dangerouslySetInnerHTML={{
                    __html: text.bespokeStep3[lang]
                      ? text.bespokeStep3[lang]
                      : text.bespokeStep3['en'],
                  }}
                />
                <h2
                  className="explanation-title"
                  dangerouslySetInnerHTML={{
                    __html: text.bespokeStep3Title[lang]
                      ? text.bespokeStep3Title[lang]
                      : text.bespokeStep3Title['en'],
                  }}
                />
                <h4
                  className="explanation-description"
                  dangerouslySetInnerHTML={{
                    __html: text.bespokeStep3Description[lang]
                      ? text.bespokeStep3Description[lang]
                      : text.bespokeStep3Description['en'],
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { togglePagePosition, arrowLeft, lang, text } = this.props;

    return (
      <div className="loupes-bespoke back">
        <button
          className="loupes-switch arrow-back d-none d-lg-block"
          onClick={togglePagePosition}
        >
          <span
            dangerouslySetInnerHTML={{
              __html: text.backButton[lang]
                ? text.backButton[lang]
                : text.backButton['en'],
            }}
          />
          <div className="arrow-left">
            <Img
              fluid={arrowLeft.childImageSharp.fluid}
              critical
              alt="back"
              title="back"
            />
          </div>
        </button>
        <button
          className="loupes-switch close-x"
          onClick={togglePagePosition}
        />
        <h2
          className="tailoring-title"
          dangerouslySetInnerHTML={{
            __html: text.bespokeTitle[lang]
              ? text.bespokeTitle[lang]
              : text.bespokeTitle['en'],
          }}
        />

        <div className="control-wrapper">
          <div className="swiper-button-prev-bespoke">
            <div className="arrow-left" />
          </div>
          <div className="swiper-pagination" />
          <div className="swiper-button-next-bespoke">
            <div className="arrow-right" />
          </div>
        </div>

        <div className="swiper-container-bespoke">
          <div className="swiper-wrapper">
            <div className="swiper-slide">{this.renderSlide1()}</div>
            <div className="swiper-slide">{this.renderSlide2()}</div>
            <div className="swiper-slide">{this.renderSlide3()}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoupesBespoke;
