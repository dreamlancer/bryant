import React from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3'; // TODO: check maybe can import specific
import inView from 'js/in-view.min';
import Tooltip from '@material-ui/core/Tooltip';
import computeIsMobile from 'js/isMobile';

import { GraphsSectionCss } from './index.css';
import Disclaimer from '!svg-react-loader!../../../../static/images/loupes/disclaimer.svg';

const isMobile = computeIsMobile();

class LoupesGraphs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGraph1DidShow: false, // do initial animation once
      isGraph2DidShow: false, // do initial animation once
      isGraphsDidShow: false,
      is2dot5Selected: true, // switch between 2.5 and 5.0
      isAllowSwitch: true,
    };
  }

  componentDidMount() {
    // if (isMobile) {
    const buildGraphs = () => {
      if (!this.state.isGraphsDidShow) {
        this.setState({
          isGraphsDidShow: true,
          isGraph1DidShow: true,
          isGraph2DidShow: true,
        });
        buildDepthOfFocusChart();
        buildFieldOfViewChart();
      }
    };

    inView({
      selector: '.graph-1',
      enter: () => {
        buildGraphs();
      },
      offset: 0.2,
    });
    inView({
      selector: '.graph-2',
      enter: () => {
        buildGraphs();
      },
      offset: 0.2,
    });
    // }
  }

  onShowComparisonClick = () => {
    if (!this.state.isGraphsDidShow) {
      this.setState({ isGraphsDidShow: true });
      buildDepthOfFocusChart();
      buildFieldOfViewChart();
    }
  };

  handleSwitch = is2dot5Selected => {
    // attemps to switch straight away to 2.5
    if (is2dot5Selected && !this.state.isGraphsDidShow) {
      this.setState({ isGraphsDidShow: true });
      buildDepthOfFocusChart();
      buildFieldOfViewChart();
      return;
    }

    // attemps to switch straight away to 5.0
    if (!is2dot5Selected && !this.state.isGraphsDidShow) {
      this.setState({ isGraphsDidShow: true, is2dot5Selected: false });
      buildDepthOfFocus5dot0Chart();
      buildFieldOfView5dot0Chart();
      return;
    }

    if (is2dot5Selected) {
      switchTo2dot5();
      this.setState({ is2dot5Selected: true });
    } else {
      switchTo5dot0();
      this.setState({ is2dot5Selected: false });
    }
  };

  render() {
    const {
      handleSwitch,
      props: { lang, text },
      state: { isAllowSwitch, is2dot5Selected },
    } = this;

    const depthofFocusText = text.dofText[lang]
      ? text.dofText[lang]
      : text.dofText['en'];
    const fieldOfView = text.fovText[lang]
      ? text.fovText[lang]
      : text.fovText['en'];

    return (
      <GraphsSectionCss>
        <div className="container">
          <div className="graph-section-wrapper">
            <h1
              className="graph-title lazy-title"
              dangerouslySetInnerHTML={{
                __html: text.graphsTitle[lang]
                  ? text.graphsTitle[lang]
                  : text.graphsTitle['en'],
              }}
            />
            <ul className="d-flex d-md-none switcher nav lazy-title">
              <li
                className="nav-item nav-left"
                onClick={() => (isAllowSwitch ? handleSwitch(true) : null)}
              >
                <span
                  className={`nav-link ${is2dot5Selected ? 'active' : ''}`}
                  style={{ cursor: isAllowSwitch ? 'pointer' : 'wait' }}
                >
                  <p>2.5x</p>
                </span>
              </li>
              <li
                className="nav-item nav-right"
                onClick={() => (isAllowSwitch ? handleSwitch(false) : null)}
              >
                <span
                  className={`nav-link ${!is2dot5Selected ? 'active' : ''}`}
                  style={{ cursor: isAllowSwitch ? 'pointer' : 'wait' }}
                >
                  <p>5.0x</p>
                </span>
              </li>
            </ul>
            <div className="row lazy-show">
              <div className="col-md-5 lazy-content graph-2-lazy-content graph-1">
                <div className="d-block d-md-none">
                  <h4
                    className="graph-sub-title"
                    dangerouslySetInnerHTML={{
                      __html: text.dofTitle[lang]
                        ? text.dofTitle[lang]
                        : text.dofTitle['en'],
                    }}
                  />
                </div>
                <DepthOfFocus />
                <div className="d-block d-md-none">
                  <p className="graph-info">{depthofFocusText}</p>
                </div>
              </div>
              <div className="col-2 d-none d-md-block">
                <div className="graphs-separator">
                  <div className="line-separator" style={{ height: '89%' }} />
                </div>
              </div>
              <div className="col-md-5 lazy-content graph-2-lazy-content graph-2">
                <div className="d-block d-md-none">
                  <h4
                    className="graph-sub-title"
                    dangerouslySetInnerHTML={{
                      __html: text.fovTitle[lang]
                        ? text.fovTitle[lang]
                        : text.fovTitle['en'],
                    }}
                  />
                </div>
                <FieldOfView />
                <div className="d-block d-md-none">
                  <p className="graph-info">{fieldOfView}</p>
                </div>
              </div>
            </div>

            <div className="row lazy-show d-none d-md-flex">
              <div className="col-md-5 lazy-content graph-2-lazy-content">
                <h4
                  className="graph-sub-title"
                  dangerouslySetInnerHTML={{
                    __html: text.dofTitle[lang]
                      ? text.dofTitle[lang]
                      : text.dofTitle['en'],
                  }}
                />

                <p className="graph-info left">{depthofFocusText}</p>
              </div>
              <div className="col-2 lazy-content">
                <div className="graphs-separator">
                  {/* <button
                    className="button-separator"
                    onClick={this.onShowComparisonClick}
                  >
                    show comparison
                  </button> */}
                  <ul className="switcher nav lazy-title">
                    <li
                      className="nav-item nav-left"
                      onClick={() =>
                        isAllowSwitch ? handleSwitch(true) : null
                      }
                    >
                      <span
                        className={`nav-link ${
                          is2dot5Selected ? 'active' : ''
                        }`}
                        style={{ cursor: isAllowSwitch ? 'pointer' : 'wait' }}
                      >
                        <p>2.5x</p>
                      </span>
                    </li>
                    <li
                      className="nav-item nav-right"
                      onClick={() =>
                        isAllowSwitch ? handleSwitch(false) : null
                      }
                    >
                      <span
                        className={`nav-link ${
                          !is2dot5Selected ? 'active' : ''
                        }`}
                        style={{ cursor: isAllowSwitch ? 'pointer' : 'wait' }}
                      >
                        <p>5.0x</p>
                      </span>
                    </li>
                  </ul>
                  <div
                    className="line-separator"
                    style={{
                      height: '40%',
                      marginTop: '2rem',
                      marginBottom: '1rem',
                    }}
                  />
                  <div className="disclaimer-wrapper">
                    <Tooltip
                      title={
                        text.disclaimer[lang]
                          ? text.disclaimer[lang]
                          : text.disclaimer['en']
                      }
                    >
                      <Disclaimer />
                    </Tooltip>
                  </div>
                </div>
              </div>
              <div className="col-md-5 lazy-content graph-2-lazy-content">
                <h4
                  className="graph-sub-title"
                  dangerouslySetInnerHTML={{
                    __html: text.fovTitle[lang]
                      ? text.fovTitle[lang]
                      : text.fovTitle['en'],
                  }}
                />

                <p className="graph-info">{fieldOfView}</p>
              </div>
            </div>
          </div>
        </div>
      </GraphsSectionCss>
    );
  }
}

export default LoupesGraphs;

const BUILD_DURATION = 1500;
const SWITCH_DURATION = 500;
const FADE_IN_DELAY = BUILD_DURATION / 10;
const FADE_IN_DURATION = SWITCH_DURATION;

const BLUE_COLOR_MAIN_LIGHT = '#3a97c9';
const BLUE_COLOR_MAIN = '#207FB6';
const BLUE_COLOR_3 = '#2AABD3';
const BLUE_COLOR_2 = '#4DC9EF';
const BLUE_COLOR_1 = '#82E3F9';

const BIGGEST_CIRCLE_RADIUS = 250;

function drawCircles(
  rotate,
  visContainer,
  height = 250 * 2,
  y = 300 - 250,
  circleDetails,
  isAlignRight = false
) {
  const SHIFTER = 240;
  const ALIGN_RIGHT = 150;

  let xValue = 500 - ALIGN_RIGHT;

  if (!isAlignRight) {
    xValue = 500 - SHIFTER - BIGGEST_CIRCLE_RADIUS;
  }

  const rectangle = visContainer
    .append('svg')
    .attr('x', xValue)
    .attr('y', y)
    .attr('width', 250 * 2)
    .attr('height', height);

  function rotateValue(rotate) {
    return `rotate(${rotate} 250 250)`;
  }

  circleDetails.map(circle => {
    rectangle
      .append('circle')
      .attr({
        class: 'circle-graph-circle',
        cx: circle.cx,
        cy: circle.cy,
        r: circle.r,
        fill: circle.fill,
      })
      .attr('transform', rotateValue(rotate));
  });
}

function _computeStartDataCirclularChart(data) {
  const firstCircleIndex = data.length - 1;

  return data.map(d => ({
    ...d,
    cx: data[firstCircleIndex].cx,
    cy: data[firstCircleIndex].cy,
    r: data[firstCircleIndex].r,
  }));
}

function updateCircularChartCircles(circleDetailsData, visContainer, duration) {
  visContainer
    .selectAll('.circle-graph-circle')
    .data(circleDetailsData)
    .transition()
    .duration(duration)
    .attr('cx', d => d.cx)
    .attr('cy', d => d.cy)
    .attr('r', d => d.r);
}

function buildLabel(
  label1,
  label2,
  x,
  y,
  color,
  visContainer,
  isRightAlignGraph = false
) {
  let xValue = x;

  if (isRightAlignGraph) {
    xValue = x + 230;
  }

  const label = visContainer
    .append('text')
    .attr('class', 'label-circle-graph')
    .attr('text-anchor', isRightAlignGraph ? 'end' : 'start')
    .attr('x', xValue)
    .attr('y', y)
    .attr('opacity', '0')
    .attr('fill', color);

  label
    .append('tspan')
    .text(label1)
    .attr('class', 'sub-label-top')
    .attr('x', xValue);

  label
    .append('tspan')
    .text(label2)
    .attr('class', 'sub-label-bottom')
    .attr('x', xValue)
    .attr('dy', isMobile ? 30 : 40);
}

function fadeInCircularChartLabels(visContainer) {
  visContainer.selectAll('.label-circle-graph').each(function(d, i) {
    d3.select(this)
      .transition()
      .delay(FADE_IN_DELAY * i)
      .duration(FADE_IN_DURATION)
      .attr('opacity', '1');
  });
}

function updateCircularChartLabels(circleLabelsData, visContainer) {
  visContainer
    .selectAll('.sub-label-top')
    .data(circleLabelsData)
    .transition()
    .duration(500)
    .text(d => d.label1);
}

function drawLineToLabel(
  strX,
  midX,
  endX,
  y,
  strY,
  color,
  visContainer,
  overRideMidY = false,
  isAlignRightGraph = false
) {
  visContainer
    .append('line')
    .attr('class', 'start-line')
    .style('stroke', color)
    .attr('x1', strX)
    .attr('y1', strY)
    .attr('x2', midX)
    .attr('y2', overRideMidY || y);

  visContainer
    .append('line')
    .attr('class', 'end-line')
    .style('stroke', color)
    .attr('x1', midX)
    .attr('y1', overRideMidY || y)
    .attr('x2', endX)
    .attr('y2', y);

  let cx = endX + 25;

  if (isAlignRightGraph) {
    cx = endX - 25;
  }

  visContainer.append('circle').attr({
    class: 'line-circle',
    cx: cx,
    cy: y,
    r: 4,
    fill: color,
    opacity: 0,
  });
}

function fadeInCircularChartLines(visContainer) {
  visContainer.selectAll('.line-circle').each(function(d, i) {
    d3.select(this)
      .transition()
      .delay(FADE_IN_DELAY * i)
      .duration(FADE_IN_DURATION)
      .attr('opacity', '1');
  });
}

function _computeStartDataCirclularChartLine(data) {
  return data.map(d => ({
    ...d,
    strX: d.endX,
    midX: d.endX,
    endX: d.endX,
    strY: d.y,
  }));
}

function updateCircularChartLines(
  circleLinesData,
  visContainer,
  duration,
  delay = 0
) {
  visContainer
    .selectAll('.start-line')
    .data(circleLinesData)
    .each(function(d, i) {
      d3.select(this)
        .transition()
        .delay(delay * i)
        .duration(duration)
        .style('stroke', d => d.color)
        .attr('x1', d => d.strX)
        .attr('y1', d => d.strY)
        .attr('x2', d => d.midX)
        .attr('y2', d => d.y);
    });

  visContainer
    .selectAll('.end-line')
    .data(circleLinesData)
    .each(function(d, i) {
      d3.select(this)
        .transition()
        .delay(delay * i)
        .duration(duration)
        .style('stroke', d => d.color)
        .attr('x1', d => d.midX)
        .attr('y1', d => d.y)
        .attr('x2', d => d.endX)
        .attr('y2', d => d.y);
    });
}

const LABEL_SHIFT = 140;
const LEFT_LABEL = 635;

const LEFT_LABEL_ALTERNATIVE = 0;

class DepthOfFocus extends React.Component {
  componentDidMount() {
    var dom = ReactDOM.findDOMNode(this);
    initDepthOfFocusChart(dom);
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return <div />;
  }
}

const depthOfFocus2dot5 = {
  circles: [
    {
      cx: 350 - BIGGEST_CIRCLE_RADIUS,
      cy: BIGGEST_CIRCLE_RADIUS,
      r: 100,
      fill: BLUE_COLOR_1,
    },
    {
      cx: 400 - BIGGEST_CIRCLE_RADIUS,
      cy: BIGGEST_CIRCLE_RADIUS,
      r: 150,
      fill: BLUE_COLOR_2,
    },
    {
      cx: 400 - BIGGEST_CIRCLE_RADIUS,
      cy: BIGGEST_CIRCLE_RADIUS,
      r: 150,
      fill: BLUE_COLOR_3,
    },
    {
      cx: BIGGEST_CIRCLE_RADIUS,
      cy: BIGGEST_CIRCLE_RADIUS,
      r: BIGGEST_CIRCLE_RADIUS,
      fill: BLUE_COLOR_MAIN,
    },
  ].reverse(),
  lines: [
    {
      strX: 480,
      midX: 400,
      endX: 280,
      y: 70,
      strY: 100,
      color: BLUE_COLOR_MAIN,
      // visContainer: vis,
    },
    {
      strX: 615,
      midX: 500,
      endX: 280,
      y: 220,
      strY: 250,
      color: 'white',
      // visContainer: vis,
    },
    {
      strX: 615,
      midX: 500,
      endX: 280,
      y: 360,
      strY: 340,
      color: 'white',
      // visContainer: vis,
    },
    {
      strX: 760,
      midX: 600,
      endX: 280,
      y: 500,
      strY: 340,
      color: 'white',
      // visContainer: vis,
    },
  ],
  labels: [
    {
      label1: '40cm',
      label2: 'BRYANT DENTAL',
      x: LEFT_LABEL_ALTERNATIVE,
      y: 80,
      color: BLUE_COLOR_MAIN,
    },
    {
      label1: '20cm',
      label2: '2ND BEST',
      x: LEFT_LABEL_ALTERNATIVE,
      y: 230,
      color: 'white',
    },
    {
      label1: '20cm',
      label2: '3RD BEST',
      x: LEFT_LABEL_ALTERNATIVE,
      y: 370,
      color: 'white',
    },
    {
      label1: '12.7cm',
      label2: '4TH BEST',
      x: LEFT_LABEL_ALTERNATIVE,
      y: 510,
      color: 'white',
    },
  ],
};

const depthOfFocus5dot0 = {
  circles: [
    {
      cx: 345 - BIGGEST_CIRCLE_RADIUS,
      cy: BIGGEST_CIRCLE_RADIUS,
      r: 95,
      fill: BLUE_COLOR_1,
    },
    {
      cx: 415 - BIGGEST_CIRCLE_RADIUS,
      cy: BIGGEST_CIRCLE_RADIUS,
      r: 165,
      fill: BLUE_COLOR_2,
    },
    {
      cx: 435 - BIGGEST_CIRCLE_RADIUS,
      cy: BIGGEST_CIRCLE_RADIUS,
      r: 185,
      fill: BLUE_COLOR_3,
    },
    {
      cx: BIGGEST_CIRCLE_RADIUS,
      cy: BIGGEST_CIRCLE_RADIUS,
      r: BIGGEST_CIRCLE_RADIUS,
      fill: BLUE_COLOR_MAIN,
    },
  ].reverse(),
  lines: [
    {
      strX: 650,
      midX: 400,
      endX: 280,
      y: 70,
      strY: 100,
      color: BLUE_COLOR_MAIN,
      // visContainer: vis,
    },
    {
      strX: 500,
      midX: 420,
      endX: 280,
      y: 220,
      strY: 260,
      color: 'white',
      // visContainer: vis,
    },
    {
      strX: 590,
      midX: 500,
      endX: 280,
      y: 360,
      strY: 310,
      color: 'white',
      // visContainer: vis,
    },
    {
      strX: 750,
      midX: 580,
      endX: 280,
      y: 500,
      strY: 360,
      color: 'white',
      // visContainer: vis,
    },
  ],
  labels: [
    {
      label1: '14cm',
      label2: 'BRYANT DENTAL',
      x: LEFT_LABEL_ALTERNATIVE,
      y: 80,
      color: BLUE_COLOR_MAIN,
    },
    {
      label1: '12cm',
      label2: '2ND BEST',
      x: LEFT_LABEL_ALTERNATIVE,
      y: 230,
      color: 'white',
    },
    {
      label1: '10cm',
      label2: '3RD BEST',
      x: LEFT_LABEL_ALTERNATIVE,
      y: 370,
      color: 'white',
    },
    {
      label1: '5.9cm',
      label2: '4TH BEST',
      x: LEFT_LABEL_ALTERNATIVE,
      y: 510,
      color: 'white',
    },
  ],
};

let DepthOfFocusSVG;

function initDepthOfFocusChart(node) {
  DepthOfFocusSVG = d3
    .select(node)
    .append('div')
    .classed('svg-container', true)
    .classed('svg-container-2', true)
    .append('svg')
    .attr('preserveAspectRatio', 'xMinYMin meet')
    .attr('viewBox', '0 0 850 600')
    .classed('svg-content-responsive', true);

  drawCircles(
    -180,
    DepthOfFocusSVG,
    undefined,
    undefined,
    _computeStartDataCirclularChart(depthOfFocus2dot5.circles),
    true
  );

  depthOfFocus2dot5.labels.map(label => {
    buildLabel(
      label.label1,
      label.label2,
      label.x,
      label.y,
      label.color,
      DepthOfFocusSVG,
      true
    );
  });

  _computeStartDataCirclularChartLine(depthOfFocus2dot5.lines).map(line => {
    drawLineToLabel(
      line.strX,
      line.midX,
      line.endX,
      line.y,
      line.strY,
      line.color,
      DepthOfFocusSVG,
      line.midY,
      true
    );
  });
}

function buildDepthOfFocusChart() {
  fadeInCircularChartLabels(DepthOfFocusSVG);
  fadeInCircularChartLines(DepthOfFocusSVG);

  updateCircularChartLines(
    depthOfFocus2dot5.lines,
    DepthOfFocusSVG,
    BUILD_DURATION,
    FADE_IN_DELAY
  );
  updateCircularChartCircles(
    depthOfFocus2dot5.circles,
    DepthOfFocusSVG,
    BUILD_DURATION
  );
}

//

function buildDepthOfFocus5dot0Chart() {
  fadeInCircularChartLabels(DepthOfFocusSVG);
  fadeInCircularChartLines(DepthOfFocusSVG);

  updateCircularChartLines(
    depthOfFocus5dot0.lines,
    DepthOfFocusSVG,
    BUILD_DURATION,
    FADE_IN_DELAY
  );
  updateCircularChartCircles(
    depthOfFocus5dot0.circles,
    DepthOfFocusSVG,
    BUILD_DURATION
  );
  updateCircularChartLabels(depthOfFocus5dot0.labels, DepthOfFocusSVG);
}

//////

class FieldOfView extends React.Component {
  componentDidMount() {
    var dom = ReactDOM.findDOMNode(this);
    initFieldOfViewChart(dom);
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return <div />;
  }
}

// {
//   cx: 385 - BIGGEST_CIRCLE_RADIUS,
//   cy: BIGGEST_CIRCLE_RADIUS,
//   r: 135,
//   fill: BLUE_COLOR_1,
// },

const fieldOfView2dot5Initial = {
  circles: [
    {
      cx: 350 - BIGGEST_CIRCLE_RADIUS,
      cy: BIGGEST_CIRCLE_RADIUS,
      r: 100,
      fill: BLUE_COLOR_1,
    },
    {
      cx: 435 - BIGGEST_CIRCLE_RADIUS,
      cy: BIGGEST_CIRCLE_RADIUS,
      r: 185,
      fill: BLUE_COLOR_2,
    },
    {
      cx: 435 - BIGGEST_CIRCLE_RADIUS,
      cy: BIGGEST_CIRCLE_RADIUS,
      r: 185,
      fill: BLUE_COLOR_3,
    },
    {
      cx: BIGGEST_CIRCLE_RADIUS,
      cy: BIGGEST_CIRCLE_RADIUS,
      r: BIGGEST_CIRCLE_RADIUS,
      fill: BLUE_COLOR_MAIN,
    },
  ].reverse(),
};

const fieldOfView2dot5 = {
  circles: [
    {
      cx: 400 - BIGGEST_CIRCLE_RADIUS,
      cy: BIGGEST_CIRCLE_RADIUS,
      r: 150,
      fill: BLUE_COLOR_3,
    },
    {
      cx: 415 - BIGGEST_CIRCLE_RADIUS,
      cy: BIGGEST_CIRCLE_RADIUS,
      r: 165,
      fill: BLUE_COLOR_2,
    },
    {
      cx: 435 - BIGGEST_CIRCLE_RADIUS,
      cy: BIGGEST_CIRCLE_RADIUS,
      r: 185,
      fill: BLUE_COLOR_3,
    },
    {
      cx: BIGGEST_CIRCLE_RADIUS,
      cy: BIGGEST_CIRCLE_RADIUS,
      r: BIGGEST_CIRCLE_RADIUS,
      fill: BLUE_COLOR_MAIN,
    },
  ].reverse(),
  lines: [
    {
      strX: 550 - LABEL_SHIFT,
      midX: 630 - LABEL_SHIFT,
      endX: 730 - LABEL_SHIFT,
      y: 70,
      strY: 100,
      color: BLUE_COLOR_MAIN,
      // visContainer: vis,
    },
    {
      strX: 480 - LABEL_SHIFT,
      midX: 480 - LABEL_SHIFT,
      endX: 730 - LABEL_SHIFT,
      y: 220,
      strY: 220,
      color: 'white',
      // visContainer: vis,
    },
    {
      strX: 460 - LABEL_SHIFT,
      midX: 600 - LABEL_SHIFT,
      endX: 730 - LABEL_SHIFT,
      y: 360,
      strY: 320,
      color: 'white',
      // visContainer: vis,
    },
    {
      strX: 290 - LABEL_SHIFT,
      midX: 420 - LABEL_SHIFT,
      endX: 730 - LABEL_SHIFT,
      y: 500,
      strY: 400,
      color: 'white',
      // visContainer: vis,
    },
  ],
  labels: [
    {
      label1: '15cm',
      label2: 'BRYANT DENTAL',
      x: LEFT_LABEL,
      y: 80,
      color: BLUE_COLOR_MAIN,
    },
    {
      label1: '13cm',
      label2: '2ND BEST',
      x: LEFT_LABEL,
      y: 230,
      color: 'white',
    },
    {
      label1: '10.4cm',
      label2: '3RD BEST',
      x: LEFT_LABEL,
      y: 370,
      color: 'white',
    },
    {
      label1: '8.6cm',
      label2: '4TH BEST',
      x: LEFT_LABEL,
      y: 510,
      color: 'white',
    },
  ],
};

const fieldOfView5dot0 = {
  circles: [
    {
      cx: 385 - BIGGEST_CIRCLE_RADIUS,
      cy: BIGGEST_CIRCLE_RADIUS,
      r: 135,
      fill: BLUE_COLOR_1,
    },
    {
      cx: 415 - BIGGEST_CIRCLE_RADIUS,
      cy: BIGGEST_CIRCLE_RADIUS,
      r: 165,
      fill: BLUE_COLOR_2,
    },
    {
      cx: 460 - BIGGEST_CIRCLE_RADIUS,
      cy: BIGGEST_CIRCLE_RADIUS,
      r: 210,
      fill: BLUE_COLOR_3,
    },
    {
      cx: BIGGEST_CIRCLE_RADIUS,
      cy: BIGGEST_CIRCLE_RADIUS,
      r: BIGGEST_CIRCLE_RADIUS,
      fill: BLUE_COLOR_MAIN,
    },
  ].reverse(),
  lines: [
    {
      strX: 500 - LABEL_SHIFT,
      midX: 600 - LABEL_SHIFT,
      endX: 730 - LABEL_SHIFT,
      y: 70,
      strY: 100,
      color: BLUE_COLOR_MAIN,
      // visContainer: vis,
    },
    {
      strX: 500 - LABEL_SHIFT,
      midX: 570 - LABEL_SHIFT,
      endX: 730 - LABEL_SHIFT,
      y: 220,
      strY: 240,
      color: 'white',
      // visContainer: vis,
    },
    {
      strX: 450 - LABEL_SHIFT,
      midX: 540 - LABEL_SHIFT,
      endX: 730 - LABEL_SHIFT,
      y: 360,
      strY: 310,
      color: 'white',
      // visContainer: vis,
    },
    {
      strX: 280 - LABEL_SHIFT,
      midX: 470 - LABEL_SHIFT,
      endX: 730 - LABEL_SHIFT,
      y: 500,
      strY: 380,
      color: 'white',
      // visContainer: vis,
    },
  ],
  labels: [
    {
      label1: '9cm',
      label2: 'BRYANT DENTAL',
      x: LEFT_LABEL,
      y: 80,
      color: BLUE_COLOR_MAIN,
    },
    {
      label1: '8cm',
      label2: '2ND BEST',
      x: LEFT_LABEL,
      y: 230,
      color: 'white',
    },
    {
      label1: '6.4cm',
      label2: '3RD BEST',
      x: LEFT_LABEL,
      y: 370,
      color: 'white',
    },
    {
      label1: '4.4cm',
      label2: '4TH BEST',
      x: LEFT_LABEL,
      y: 510,
      color: 'white',
    },
  ],
};

let FieldOfViewSVG;

function initFieldOfViewChart(node) {
  FieldOfViewSVG = d3
    .select(node)
    .append('div')
    .classed('svg-container', true)
    .classed('svg-container-2', true)
    .append('svg')
    .attr('preserveAspectRatio', 'xMinYMin meet')
    .attr('viewBox', '0 0 850 600')
    .classed('svg-content-responsive', true);

  drawCircles(
    0,
    FieldOfViewSVG,
    undefined,
    undefined,
    _computeStartDataCirclularChart(fieldOfView2dot5Initial.circles),
    false
  );

  fieldOfView2dot5.labels.map(label => {
    buildLabel(
      label.label1,
      label.label2,
      label.x,
      label.y,
      label.color,
      FieldOfViewSVG
    );
  });

  _computeStartDataCirclularChartLine(fieldOfView2dot5.lines).map(line => {
    drawLineToLabel(
      line.strX,
      line.midX,
      line.endX,
      line.y,
      line.strY,
      line.color,
      FieldOfViewSVG,
      line.midY
    );
  });
}

function buildFieldOfViewChart() {
  fadeInCircularChartLabels(FieldOfViewSVG);
  fadeInCircularChartLines(FieldOfViewSVG);

  updateCircularChartLines(
    fieldOfView2dot5.lines,
    FieldOfViewSVG,
    BUILD_DURATION,
    FADE_IN_DELAY
  );
  updateCircularChartCircles(
    fieldOfView2dot5.circles,
    FieldOfViewSVG,
    BUILD_DURATION
  );
}

//

function buildFieldOfView5dot0Chart() {
  fadeInCircularChartLabels(FieldOfViewSVG);
  fadeInCircularChartLines(FieldOfViewSVG);

  updateCircularChartLines(
    fieldOfView5dot0.lines,
    FieldOfViewSVG,
    BUILD_DURATION,
    FADE_IN_DELAY
  );
  updateCircularChartCircles(
    fieldOfView5dot0.circles,
    FieldOfViewSVG,
    BUILD_DURATION
  );
  updateCircularChartLabels(fieldOfView5dot0.labels, FieldOfViewSVG);
}

// ---------------------

function switchTo2dot5() {
  switchDepthOfFocusGraphTo2dot5();
  switchFieldOfViewGraphTo2dot5();
}

function switchDepthOfFocusGraphTo2dot5() {
  DepthOfFocusSVG.selectAll('.circle-graph-circle')
    .data(depthOfFocus2dot5.circles)
    .transition()
    .duration(500)
    .attr('cx', d => d.cx)
    .attr('cy', d => d.cy)
    .attr('r', d => d.r);

  updateCircularChartCircles(
    depthOfFocus2dot5.circles,
    DepthOfFocusSVG,
    SWITCH_DURATION
  );
  updateCircularChartLines(
    depthOfFocus2dot5.lines,
    DepthOfFocusSVG,
    SWITCH_DURATION
  );
  updateCircularChartLabels(depthOfFocus2dot5.labels, DepthOfFocusSVG);
}

function switchFieldOfViewGraphTo2dot5() {
  updateCircularChartCircles(
    fieldOfView2dot5.circles,
    FieldOfViewSVG,
    SWITCH_DURATION
  );
  updateCircularChartLines(
    fieldOfView2dot5.lines,
    FieldOfViewSVG,
    SWITCH_DURATION
  );
  updateCircularChartLabels(fieldOfView2dot5.labels, FieldOfViewSVG);
}

///

function switchTo5dot0() {
  switchDepthOfFocusGraphTo5dot0();
  switchFieldOfViewGraphTo5dot0();
}

function switchDepthOfFocusGraphTo5dot0() {
  DepthOfFocusSVG.selectAll('.circle-graph-circle')
    .data(depthOfFocus5dot0.circles)
    .transition()
    .duration(500)
    .attr('cx', d => d.cx)
    .attr('cy', d => d.cy)
    .attr('r', d => d.r);

  updateCircularChartCircles(
    depthOfFocus5dot0.circles,
    DepthOfFocusSVG,
    SWITCH_DURATION
  );
  updateCircularChartLines(
    depthOfFocus5dot0.lines,
    DepthOfFocusSVG,
    SWITCH_DURATION
  );
  updateCircularChartLabels(depthOfFocus5dot0.labels, DepthOfFocusSVG);
}

function switchFieldOfViewGraphTo5dot0() {
  updateCircularChartCircles(
    fieldOfView5dot0.circles,
    FieldOfViewSVG,
    SWITCH_DURATION
  );
  updateCircularChartLines(
    fieldOfView5dot0.lines,
    FieldOfViewSVG,
    SWITCH_DURATION
  );
  updateCircularChartLabels(fieldOfView5dot0.labels, FieldOfViewSVG);
}
