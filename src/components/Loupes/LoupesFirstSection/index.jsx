import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import { XENOSYS } from '../../../constants/externalLinks';
import ReactGA from 'react-ga';

import BubbleMobileModal from '../../BubbleMobileModal';

let infoGlasses = null;
let loadTimeout = null;
let timeout = null;

class LoupesFirstSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isBubbleModalOpen: false,
      bubbleModalText: '',
      load: false,
    };
  }

  componentDidMount() {
    timeout = setTimeout(() => {
      $('.page-container').addClass('show');
    }, 100);
    loadTimeout = setTimeout(() => {
      this.setState({ load: true }, () => {
        infoGlasses = Array.from(document.querySelectorAll('.glasses-info'));
        window.addEventListener('click', this.closeInfoBubbles, false);
      });
    }, 300);
  }

  componentWillUnmount() {
    clearTimeout(loadTimeout);
    clearTimeout(timeout);
    window.removeEventListener('click', this.closeInfoBubbles, false);
  }

  closeInfoBubbles = () => {
    infoGlasses &&
      infoGlasses.forEach(info => {
        info.classList.add('collapsed');
      });
  };

  // Handles the little info circles on the glasses
  // It will toggle the circle open/close and close other open circles
  toggleInfoGlasses = e => {
    e.stopPropagation();
    const clickedInfo = e.currentTarget;

    infoGlasses.forEach(info => {
      if (clickedInfo !== info) info.classList.add('collapsed');
    });
    clickedInfo.classList.toggle('collapsed');
  };

  openInfoModal = bubbleModalText => {
    this.setState({ isBubbleModalOpen: true, bubbleModalText });
  };

  closeInfoModal = () => {
    this.setState({ isBubbleModalOpen: false });
  };

  switchGlasses = e => {
    const selectedGlass = e.currentTarget;
    if (!selectedGlass.classList.contains('clickable')) return;
    const changeGlasses =
      selectedGlass.previousElementSibling || selectedGlass.nextElementSibling;
    changeGlasses.classList.add('small');
    changeGlasses.classList.remove('show-info');
    selectedGlass.classList.remove('small');
    selectedGlass.classList.remove('clickable');
    selectedGlass.addEventListener('transitionend', this.bringBackInfo, false);

    const specBig = Array.from(document.querySelectorAll('.glasses-specs-big'));
    const specSmall = Array.from(
      document.querySelectorAll('.glasses-specs-small')
    );

    specBig.forEach(spec => {
      spec.style.opacity = '0';
    });
    specSmall.forEach(spec => {
      spec.style.opacity = '0';
    });
  };

  // Switch glasses
  bringBackInfo = e => {
    const selectedGlass = e.currentTarget;
    infoGlasses.forEach(info => {
      info.classList.add('collapsed');
    });
    const changeGlasses =
      selectedGlass.previousElementSibling || selectedGlass.nextElementSibling;

    changeGlasses.classList.add('clickable');
    selectedGlass.classList.add('show-info');
    selectedGlass.removeEventListener(e.type, this.bringBackInfo, false);

    const specBig = Array.from(document.querySelectorAll('.glasses-specs-big'));
    const specSmall = Array.from(
      document.querySelectorAll('.glasses-specs-small')
    );

    specBig.forEach(spec => {
      spec.style.opacity = '100';
    });
    specSmall.forEach(spec => {
      spec.style.opacity = '100';
    });
  };

  render() {
    const {
      openInfoModal,
      closeInfoModal,
      toggleInfoGlasses,
      props: {
        upInfo,
        downInfo,
        bigLoupes,
        smallLoupes,
        removeOverlay,
        isMobile,
        onClickBespokeButton,
        onMouseOverBespokeButton,
        text,
        lang,
        xenosysLogo,
      },
      state: { isBubbleModalOpen, bubbleModalText, load },
    } = this;

    const bigLoupesInfo = [
      {
        title: text.bigLoupesTitle1[lang]
          ? text.bigLoupesTitle1[lang]
          : text.bigLoupesTitle1['en'],
        text: text.bigLoupesInfo1[lang]
          ? text.bigLoupesInfo1[lang]
          : text.bigLoupesInfo1['en'],
      },
      {
        title: text.bigLoupesTitle2[lang]
          ? text.bigLoupesTitle2[lang]
          : text.bigLoupesTitle2['en'],
        text: text.bigLoupesInfo2[lang]
          ? text.bigLoupesInfo2[lang]
          : text.bigLoupesInfo2['en'],
      },
      {
        title: text.bigLoupesTitle3[lang]
          ? text.bigLoupesTitle3[lang]
          : text.bigLoupesTitle3['en'],
        text: text.bigLoupesInfo3[lang]
          ? text.bigLoupesInfo3[lang]
          : text.bigLoupesInfo3['en'],
      },
    ];

    const smallLoupesInfo = [
      {
        title: text.smallLoupesTitle1[lang]
          ? text.smallLoupesTitle1[lang]
          : text.smallLoupesTitle1['en'],
        text: text.smallLoupesInfo1[lang]
          ? text.smallLoupesInfo1[lang]
          : text.smallLoupesInfo1['en'],
      },
      {
        title: text.smallLoupesTitle2[lang]
          ? text.smallLoupesTitle2[lang]
          : text.smallLoupesTitle2['en'],
        text: text.smallLoupesInfo2[lang]
          ? text.smallLoupesInfo2[lang]
          : text.smallLoupesInfo2['en'],
      },
      {
        title: text.smallLoupesTitle3[lang]
          ? text.smallLoupesTitle3[lang]
          : text.smallLoupesTitle3['en'],
        text: text.smallLoupesInfo3[lang]
          ? text.smallLoupesInfo3[lang]
          : text.smallLoupesInfo3['en'],
      },
    ];

    return (
      <React.Fragment>
        <BubbleMobileModal
          isModalOpen={isBubbleModalOpen}
          text={bubbleModalText}
          onCloseModal={closeInfoModal}
        />
        <div className="top-glasses page-container">
          <div className="partnership-wrapper">
            <div className="container">
              <a href={XENOSYS} target="_blank" className="partnership">
                <span className="partnership-text">in partnership with</span>
                <span className="xenosys-logo">
                  <Img
                    fluid={xenosysLogo}
                    critical
                    alt="xenosys"
                    title="xenosys"
                  />
                </span>
              </a>
            </div>
          </div>
          <div className="container">
            <div className="slide-content">
              <div className="content-title">
                <div className="buttons-wrapper d-md-none">
                  {/* {this.props.external && (
                    <Link to="/tailoring">
                      <div className="btn bespoke-btn">bespoke process</div>
                    </Link>
                  )} */}
                  <div
                    className="btn arrange-demo-btn"
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
                    dangerouslySetInnerHTML={{
                      __html: text.bookDemo[lang]
                        ? text.bookDemo[lang]
                        : text.bookDemo['en'],
                    }}
                  />
                  <div
                    className="btn bespoke-btn mobile-bespoke-btn"
                    onClick={onClickBespokeButton}
                    onMouseOver={onMouseOverBespokeButton}
                    dangerouslySetInnerHTML={{
                      __html: text.bespokeButton2[lang]
                        ? text.bespokeButton2[lang]
                        : text.bespokeButton2['en'],
                    }}
                  />
                  <br />
                  <br />
                  <br />
                </div>
                <h1 className="title">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: text.title1[lang]
                        ? text.title1[lang]
                        : text.title1['en'],
                    }}
                  />
                  <span
                    className="highlight"
                    onClick={this.props.openBespoke}
                    style={{ cursor: 'pointer' }}
                    dangerouslySetInnerHTML={{
                      __html: text.title2[lang]
                        ? text.title2[lang]
                        : text.title2['en'],
                    }}
                  />
                  <span
                    dangerouslySetInnerHTML={{
                      __html: text.title3[lang]
                        ? text.title3[lang]
                        : text.title3['en'],
                    }}
                  />
                </h1>
                <div className="buttons-wrapper d-none d-md-block">
                  {this.props.external && (
                    <Link to="/tailoring">
                      <div
                        className="btn bespoke-btn"
                        dangerouslySetInnerHTML={{
                          __html: text.bespokeButton2[lang]
                            ? text.bespokeButton2[lang]
                            : text.bespokeButton2['en'],
                        }}
                      />
                    </Link>
                  )}
                  <div
                    className="btn arrange-demo-btn"
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
                    dangerouslySetInnerHTML={{
                      __html: text.bookDemo[lang]
                        ? text.bookDemo[lang]
                        : text.bookDemo['en'],
                    }}
                  />
                </div>
              </div>

              <div className="content-glasses">
                <div
                  className="glasses big-glasses show-info"
                  // onClick={this.switchGlasses}
                >
                  <Img
                    fluid={bigLoupes}
                    critical
                    onLoad={removeOverlay}
                    alt="Bryant Dental Loupes - Prismatic"
                    title="Bryant Dental Loupes - Prismatic"
                  />
                  <div className="glasses-specs-big">
                    <div className="specs">
                      <Img
                        fluid={downInfo}
                        critical
                        alt="Down indicator"
                        title="Down indicator"
                      />
                    </div>
                    <div className="value">3.5x | 5.0x</div>
                  </div>
                  <div className="glasses-specs-small">
                    <div className="specs">
                      <Img
                        fluid={upInfo}
                        critical
                        alt="Up indicator"
                        title="Up indicator"
                      />
                    </div>
                    <div className="value">3.5x | 5.0x</div>
                  </div>
                  {load && [
                    <div
                      className="circle glasses-info info-big-1 collapsed"
                      key="1"
                      onClick={
                        isMobile
                          ? () => openInfoModal(bigLoupesInfo[0].text)
                          : toggleInfoGlasses
                      }
                    >
                      <div className="info-content">
                        <h3 className="info-content-title">
                          {bigLoupesInfo[0].title}
                        </h3>
                        <p className="info-content-text">
                          {bigLoupesInfo[0].text}
                        </p>
                      </div>
                      <div className="circle info-middle" />
                      <div className="circle info-inner" />
                    </div>,
                    <div
                      className="circle glasses-info info-big-2 collapsed"
                      key="2"
                      onClick={
                        isMobile
                          ? () => openInfoModal(bigLoupesInfo[1].text)
                          : toggleInfoGlasses
                      }
                    >
                      <div className="info-content">
                        <h3 className="info-content-title">
                          {bigLoupesInfo[1].title}
                        </h3>
                        <p className="info-content-text">
                          {bigLoupesInfo[1].text}
                        </p>
                      </div>
                      <div className="circle info-middle" />
                      <div className="circle info-inner" />
                    </div>,
                    <div
                      className="circle glasses-info info-big-3 collapsed"
                      key="3"
                      onClick={
                        isMobile
                          ? () => openInfoModal(bigLoupesInfo[2].text)
                          : toggleInfoGlasses
                      }
                    >
                      <div className="info-content">
                        <h3 className="info-content-title">
                          {bigLoupesInfo[2].title}
                        </h3>
                        <p className="info-content-text">
                          {bigLoupesInfo[2].text}
                        </p>
                      </div>
                      <div className="circle info-middle" />
                      <div className="circle info-inner" />
                    </div>,
                  ]}
                </div>
                <div
                  className="glasses small-glasses small clickable"
                  // onClick={this.switchGlasses}
                >
                  <Img
                    fluid={smallLoupes}
                    critical
                    onLoad={removeOverlay}
                    alt="Bryant Dental Loupes - Galilean"
                    title="Bryant Dental Loupes - Galilean"
                  />
                  <div className="glasses-specs-big">
                    <div className="specs">
                      <Img
                        fluid={downInfo}
                        critical
                        alt="Down indicator"
                        title="Down indicator"
                      />
                    </div>
                    <div className="value">2.5x | 2.8x</div>
                  </div>
                  <div className="glasses-specs-small">
                    <div className="specs">
                      <Img
                        fluid={upInfo}
                        critical
                        alt="Up indicator"
                        title="Up indicator"
                      />
                    </div>
                    <div className="value">2.5x | 2.8x</div>
                  </div>
                  {load && [
                    <div
                      className="circle glasses-info info-small-1 collapsed"
                      key="1"
                      onClick={
                        isMobile
                          ? () => openInfoModal(smallLoupesInfo[0].text)
                          : toggleInfoGlasses
                      }
                    >
                      <div className="info-content">
                        <h3 className="info-content-title">
                          {smallLoupesInfo[0].title}
                        </h3>
                        <p className="info-content-text">
                          {smallLoupesInfo[0].text}
                        </p>
                      </div>
                      <div className="circle info-middle" />
                      <div className="circle info-inner" />
                    </div>,

                    <div
                      className="circle glasses-info info-small-3 collapsed"
                      key="3"
                      onClick={
                        isMobile
                          ? () => openInfoModal(smallLoupesInfo[1].text)
                          : toggleInfoGlasses
                      }
                    >
                      <div className="info-content">
                        <h3 className="info-content-title">
                          {smallLoupesInfo[1].title}
                        </h3>
                        <p className="info-content-text">
                          {smallLoupesInfo[1].text}
                        </p>
                      </div>
                      <div className="circle info-middle" />
                      <div className="circle info-inner" />
                    </div>,

                    <div
                      className="circle glasses-info info-small-4 collapsed"
                      key="4"
                      onClick={
                        isMobile
                          ? () => openInfoModal(smallLoupesInfo[2].text)
                          : toggleInfoGlasses
                      }
                    >
                      <div className="info-content">
                        <h3 className="info-content-title">
                          {smallLoupesInfo[2].title}
                        </h3>
                        <p className="info-content-text">
                          {smallLoupesInfo[2].text}
                        </p>
                      </div>
                      <div className="circle info-middle" />
                      <div className="circle info-inner" />
                    </div>,
                  ]}
                </div>
              </div>

              <div className="arrow-down lazy-button d-md-none">
                <span id="scroll-down" />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default LoupesFirstSection;
