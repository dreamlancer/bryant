import React from 'react';
import Img from 'gatsby-image';
import TabBar from '../../TabBar';
import InfoBubble from '../../Shared/InfoBubble';
import inView from '../../../js/in-view.min';
import SectionWrapper from '../../Shared/SectionWrapper';

import {
  HeadlightsComparisonsCss,
  HeadlightsComparisonsWrapperCss,
  TabTitleWrapperCss,
  TabTitleCss,
  TabTitleMobileCss,
  TabTitleInfoBubbleWrapperCss,
  TabContentInfoCss,
  InfoBlockCss,
  InfoTextCss,
  InfoTextMobileCss,
  InfoDetailsCss,
  InfoPurpleDotCss,
  InfoGraphBarCss,
  InfoBrandCss,
  InfoBarWrapperCss,
  InfoBarCss,
  BatteryContentCss,
  ChargerAndBattery,
  ChargerImage,
  BatteryImageCss,
  BatteryLightImageCss,
  BatteryDetailsCss,
  ColourTempLimitsCss,
  ColourTempLimit,
  ColourTempLimitText,
  ColourTempLimitArrow,
  ColourTempDashedLine,
  ColourTempMoreDetails,
  DetailsRow,
  DetailsPurpleDot,
  DetailsText,
  HereLink,
} from './index.css';

class HeadlightsComparisons extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openedTab: undefined,
      lastOpenedTab: 0,
    };

    this.weightData = [
      {
        brand: 'bryantDental',
        value: '32 g',
        details: '84 lumens',
        width: 'calc(32 / 184 * 100%)',
      },
      {
        brand: 'sparkOrascoptic',
        value: '32 g',
        details: '32 lumens',
        width: 'calc(32 / 184 * 100%)',
      },
      {
        brand: 'perioptix',
        value: '41 g',
        width: 'calc(41 / 184 * 100%)',
      },
      {
        brand: 'ledWirelessByDV',
        value: '47 g',
        width: 'calc(47 / 184 * 100%)',
      },
      {
        brand: 'nanoFreedom',
        value: '80 g',
        width: 'calc(80 / 184 * 100%)',
      },
      {
        brand: 'xv1Orascoptic',
        value: '184 g',
        width: 'calc(184 / 184 * 100%)',
      },
    ];

    this.colourTempData = [
      {
        brand: 'bryantDental',
        value: '5,700 K',
        withCRI: true,
        width: 'calc(5500 / 6000 * 50%)',
      },
      {
        brand: 'ledWirelessByDV',
        value: '5,800 K',
        width: 'calc(5700 / 6000 * 50%)',
      },
      {
        brand: 'perioptix',
        value: '6,000 K',
        width: 'calc(6000 / 6000 * 50%)',
      },
      {
        brand: 'nanoFreedom',
        value: '6,500 K',
        width: 'calc(7000 / 6000 * 50%)',
      },
      {
        brand: 'sparkOrascoptic',
        value: '6,500 K',
        withCRI: true,
        width: 'calc(7000 / 6000 * 50%)',
      },
      {
        brand: 'xv1Orascoptic',
        value: '6,500 K',
        width: 'calc(7000 / 6000 * 50%)',
      },
    ];
  }

  componentDidMount() {
    inView({
      selector: '.lazy-show-headlights-comparisons',
      enter: el => {
        el.classList.add('entered');
        this.setState({ openedTab: this.state.lastOpenedTab });
      },
      offset: 0.2,
      exit: el => {
        el.classList.remove('entered');
        this.setState({ openedTab: undefined });
      },
    });
  }

  switchToTab(id) {
    this.setState({ lastOpenedTab: id, openedTab: id });
  }

  renderTabTitles() {
    const titles = [
      this.getText('comparisonsWeightTitle'),
      this.getText('comparisonsBatteryTitle'),
      this.getText('comparisonsColourTempTitle'),
    ];

    const infoBubbleTexts = [
      this.getText('comparisonsWeightTooltipText'),
      this.getText('comparisonsBatteryTooltipText'),
      this.getText('comparisonsColourTempTooltipText'),
    ];

    return titles.map((title, index) =>
      this.renderTabTitle(index, title, infoBubbleTexts[index])
    );
  }

  renderTabTitle(id, title, infoBubbleText) {
    return (
      <TabTitleWrapperCss
        isActive={this.state.openedTab === id}
        onClick={() => this.switchToTab(id)}
      >
        <TabTitleCss className="d-lg-block d-none">{title}</TabTitleCss>
        <TabTitleMobileCss className="d-lg-none d-block">
          {title}
        </TabTitleMobileCss>
        <TabTitleInfoBubbleWrapperCss isActive={this.state.openedTab === id}>
          <InfoBubble type="info" text={infoBubbleText} />
        </TabTitleInfoBubbleWrapperCss>
      </TabTitleWrapperCss>
    );
  }

  renderTabContents() {
    return [
      this.renderWeightContent(0),
      this.renderBatteryContent(1),
      this.renderColourTempContent(2),
    ];
  }

  renderWeightContent(id) {
    return (
      <TabContentInfoCss isActive={this.state.openedTab === id}>
        {this.weightData.map((block, index) => (
          <>
            <InfoBlockCss isActive={this.state.openedTab === id}>
              <InfoTextCss>{block.value}</InfoTextCss>
              <InfoDetailsCss>{block.details}</InfoDetailsCss>
            </InfoBlockCss>

            <InfoGraphBarCss marginTop={!block.details}>
              <InfoBrandCss>{this.getText(block.brand)}</InfoBrandCss>
              <InfoBarWrapperCss width={block.width}>
                <InfoBarCss
                  className={index === 0 ? 'info-bar' : ''}
                  primaryColor={index === 0}
                  isActive={this.state.openedTab === id}
                />
              </InfoBarWrapperCss>
            </InfoGraphBarCss>
          </>
        ))}
      </TabContentInfoCss>
    );
  }

  renderBatteryContent(id) {
    const { charger, battery, batteryLight } = this.props;
    return (
      <BatteryContentCss>
        <ChargerAndBattery>
          <ChargerImage isActive={this.state.openedTab === id}>
            <Img
              fluid={charger && charger.childImageSharp.fluid}
              alt=""
              title=""
              critical
            />
          </ChargerImage>
          <BatteryImageCss isActive={this.state.openedTab === id}>
            <Img
              fluid={battery && battery.childImageSharp.fluid}
              alt=""
              title=""
              critical
            />
          </BatteryImageCss>
          <BatteryLightImageCss isActive={this.state.openedTab === id}>
            <Img
              fluid={batteryLight && batteryLight.childImageSharp.fluid}
              alt=""
              title=""
              critical
            />
          </BatteryLightImageCss>
        </ChargerAndBattery>
        <BatteryDetailsCss>
          {this.getText('comparisonsBatteryText')}
        </BatteryDetailsCss>
      </BatteryContentCss>
    );
  }

  renderColourTempContent(id) {
    const { arrowRight, arrowLeft } = this.props;
    return (
      <>
        <TabContentInfoCss
          className="colour-temp"
          isActive={this.state.openedTab === id}
        >
          {this.colourTempData.map((block, index) => (
            <>
              <InfoBlockCss
                className="colour-temp"
                isActive={this.state.openedTab === id}
              >
                <InfoTextCss className="d-md-block d-none">
                  {block.value}
                </InfoTextCss>
                <InfoTextMobileCss className="d-block d-md-none">
                  {block.value}
                </InfoTextMobileCss>
                <InfoPurpleDotCss shown={block.withCRI} />
              </InfoBlockCss>

              <InfoGraphBarCss className="colour-temp">
                <InfoBrandCss className="colour-temp">
                  {this.getText(block.brand)}
                </InfoBrandCss>
                <InfoBarWrapperCss width={block.width}>
                  <InfoBarCss
                    primaryColor={index === 0}
                    isActive={this.state.openedTab === id}
                  />
                </InfoBarWrapperCss>
              </InfoGraphBarCss>

              <InfoBlockCss
                className="colour-temp is-for-padding"
                isActive={this.state.openedTab === id}
              >
                <InfoTextCss className="d-md-block d-none">
                  {block.value}
                </InfoTextCss>
                <InfoTextMobileCss className="d-block d-md-none">
                  {block.value}
                </InfoTextMobileCss>
                <InfoPurpleDotCss shown={block.withCRI} />
              </InfoBlockCss>
            </>
          ))}
          <ColourTempLimitsCss>
            <ColourTempLimit className="ideal-range">
              <ColourTempLimitText>
                {this.getText('comparisonsIdealRange')}
              </ColourTempLimitText>
              <ColourTempLimitArrow>
                <Img
                  fluid={arrowLeft && arrowLeft.childImageSharp.fluid}
                  alt=""
                  title=""
                  critical
                />
              </ColourTempLimitArrow>
            </ColourTempLimit>

            <ColourTempDashedLine />

            <ColourTempLimit className="increased-risk">
              <ColourTempLimitText>
                {this.getText('comparisonsIncreasedRisk')}
              </ColourTempLimitText>
              <ColourTempLimitArrow>
                <Img
                  fluid={arrowRight && arrowRight.childImageSharp.fluid}
                  alt=""
                  title=""
                  critical
                />
              </ColourTempLimitArrow>
            </ColourTempLimit>
          </ColourTempLimitsCss>
        </TabContentInfoCss>

        <ColourTempMoreDetails isActive={this.state.openedTab === id}>
          <DetailsRow>
            <DetailsPurpleDot />
            <DetailsText>{this.getText('comparisonsCRIOnRequest')}</DetailsText>
            <InfoBubble
              type="info"
              text={this.getText('comparisonsColourTempTooltipText')}
            />
          </DetailsRow>
          <DetailsText>
            {this.getText('comparisonsLearnMoreCRI')}{' '}
            <HereLink>{this.getText('comparisonsHereLink')}</HereLink>.
          </DetailsText>
          <DetailsText>
            {this.getText('comparisonsDataReport')}{' '}
            <HereLink>{this.getText('comparisonsHereLink')}</HereLink>.
          </DetailsText>
        </ColourTempMoreDetails>
      </>
    );
  }

  //return text object value from 'text' prop
  getText = str =>
    this.props.text[str][this.props.lang ? this.props.lang : 'en'];

  render() {
    const tabTitles = this.renderTabTitles();
    const tabContents = this.renderTabContents();

    return (
      <HeadlightsComparisonsCss>
        <SectionWrapper>
          <HeadlightsComparisonsWrapperCss className="lazy-show-headlights-comparisons">
            <TabBar
              title={this.getText('comparisonsTitle')}
              tabTitles={tabTitles}
              tabContents={tabContents}
              openedTab={this.state.openedTab}
            />
          </HeadlightsComparisonsWrapperCss>
        </SectionWrapper>
      </HeadlightsComparisonsCss>
    );
  }
}

export default HeadlightsComparisons;
