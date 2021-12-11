import React from 'react';
import SectionWrapper from '../../Shared/SectionWrapper';
import InfoBubble from '../../Shared/InfoBubble/index';

import {
  LoupesPostureCss,
  LoupesPostureWrapperCss,
  BadPostureWrapperCss,
  GoodPostureWrapperCss,
  BadPostureCss,
  BadInfoBubbleWrapperCss,
  GoodPostureCss,
  GoodInfoBubbleWrapperCss,
  TitleCss,
  HighlightTitleCss,
  InfoBlockCss,
  InfoHrCss,
  InfoTitleCss,
  InfoTitleMobileCss,
  InfoDetailsCss,
} from './index.css';

class LoupesPosture extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { lang, text } = this.props;
    return (
      <LoupesPostureCss>
        <SectionWrapper>
          <LoupesPostureWrapperCss className="row">
            <BadPostureWrapperCss className="col-12 col-md-6 order-2 order-md-1">
              <div style={{ position: 'relative' }}>
                <BadPostureCss />
                <BadInfoBubbleWrapperCss>
                  <InfoBubble
                    type="bubble"
                    title={text['badPostureTooltipTitle'][lang ? lang : 'en']}
                    text={text['badPostureTooltipDetails'][lang ? lang : 'en']}
                  />
                </BadInfoBubbleWrapperCss>
              </div>
            </BadPostureWrapperCss>

            <GoodPostureWrapperCss className="col-12 col-md-6 order-4 order-md-2">
              <div style={{ position: 'relative' }}>
                <GoodPostureCss />
                <GoodInfoBubbleWrapperCss>
                  <InfoBubble
                    type="bubble"
                    title={text['goodPostureTooltipTitle'][lang ? lang : 'en']}
                    text={text['goodPostureTooltipDetails'][lang ? lang : 'en']}
                  />
                </GoodInfoBubbleWrapperCss>
              </div>
            </GoodPostureWrapperCss>

            <div className="col-12 order-1 order-md-3">
              <TitleCss>
                {text['posturesTitle'][lang ? lang : 'en']['left']}{' '}
                <br className="d-md-none" />
                <HighlightTitleCss>
                  {text['posturesTitle'][lang ? lang : 'en']['highlight']}
                </HighlightTitleCss>{' '}
                {text['posturesTitle'][lang ? lang : 'en']['right']}
              </TitleCss>
            </div>

            <div className="col-12 col-md-6 order-3 order-md-4">
              <InfoBlockCss floatTo="right">
                <InfoHrCss />
                <InfoTitleCss className="d-none d-md-block">
                  {text['badPostureTitle'][lang ? lang : 'en']}
                </InfoTitleCss>
                <InfoTitleMobileCss className="d-block d-md-none">
                  {text['badPostureTitle'][lang ? lang : 'en']}
                </InfoTitleMobileCss>
                <InfoDetailsCss>
                  {text['badPostureDetails'][lang ? lang : 'en']}
                </InfoDetailsCss>
              </InfoBlockCss>
            </div>

            <div className="col-12 col-md-6 order-5 order-md-5">
              <InfoBlockCss floatTo="left">
                <InfoHrCss />
                <InfoTitleCss className="d-none d-md-block">
                  {text['goodPostureTitle'][lang ? lang : 'en']}
                </InfoTitleCss>
                <InfoTitleMobileCss className="d-block d-md-none">
                  {text['goodPostureTitle'][lang ? lang : 'en']}
                </InfoTitleMobileCss>
                <InfoDetailsCss>
                  {text['goodPostureDetails'][lang ? lang : 'en']}
                </InfoDetailsCss>
              </InfoBlockCss>
            </div>
          </LoupesPostureWrapperCss>
        </SectionWrapper>
      </LoupesPostureCss>
    );
  }
}

export default LoupesPosture;
