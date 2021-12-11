import React from 'react';
import Button from '../../Shared/Button';
import Img from 'gatsby-image';
import InfoBubble from '../../Shared/InfoBubble';
import SectionWrapper from '../../Shared/SectionWrapper';
import IgnisLogoSvg from '!svg-react-loader!../../../../static/images/lights/ignis-logo.svg';

import './index.scss';

class HeadlightsFirstSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    const { text, lang, onLoad, lightsTop, infoLights } = this.props;

    return (
      <section className="HeadlightsFirstSectionCss">
        <SectionWrapper>
          <div className="HeadlightsFirstSectionWrapperCss">
            <div className="ContainerCss">
              <div className="TitleCss">
                <div className="IgnisLogoWrapperCss">
                  <IgnisLogoSvg />
                </div>
                <h4
                  className="d-md-block d-none TitleDetailsCss"
                  dangerouslySetInnerHTML={{
                    __html: text.subTitle[lang]
                      ? text.subTitle[lang]
                      : text.subTitle['en'],
                  }}
                />
                <h4
                  className="d-md-none d-block TitleDetailsCss"
                  dangerouslySetInnerHTML={{
                    __html: text.subTitleMobile[lang]
                      ? text.subTitleMobile[lang]
                      : text.subTitleMobile['en'],
                  }}
                />
                <div className="ButtonsWrapperCss">
                  <Button
                    onClick={() => {
                      const element = document.querySelector(
                        '.technical-details'
                      );
                      element.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                      });
                    }}
                    type="secondary"
                    className="right-gap"
                  >
                    {text.technicalDetails[lang ? lang : 'en']}
                  </Button>
                  <Button onClick={this.props.openForm} type="primary">
                    {text.goToShop[lang ? lang : 'en']}
                  </Button>
                </div>
              </div>
            </div>

            <div className="ImageWrapperCss">
              <div style={{ position: 'relative' }}>
                <Img
                  fluid={lightsTop.childImageSharp.fluid}
                  alt="Bryant Dental Lights"
                  title="Bryant Dental Lights"
                  critical
                  onLoad={() => onLoad()}
                  placeholderStyle={{ background: 'black' }}
                />
                <div className="InfoBubbleWrapperCss filterTooltip">
                  <InfoBubble
                    title={text['filterTooltipTitle'][lang ? lang : 'en']}
                    text={text['filterTooltipText'][lang ? lang : 'en']}
                  />
                </div>
                <div className="InfoBubbleWrapperCss ignisTooltip">
                  <InfoBubble
                    title={text['ignisTooltipTitle'][lang ? lang : 'en']}
                    text={text['ignisTooltipText'][lang ? lang : 'en']}
                  />
                </div>
                <div className="InfoBubbleWrapperCss headstrapTooltip">
                  <InfoBubble
                    title={text['headstrapTooltipTitle'][lang ? lang : 'en']}
                    text={text['headstrapTooltipText'][lang ? lang : 'en']}
                  />
                </div>
                <div className="InfoBubbleWrapperCss batteryTooltip">
                  <InfoBubble
                    title={text['batteryTooltipTitle'][lang ? lang : 'en']}
                    text={text['batteryTooltipText'][lang ? lang : 'en']}
                  />
                </div>
              </div>
            </div>
          </div>
        </SectionWrapper>
      </section>
    );
  }
}

export default HeadlightsFirstSection;
