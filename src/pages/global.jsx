import React, { Component } from 'react';
import styled from 'styled-components';
import { colors, screens } from '../constants/theme';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

// COMPONENTS
import Button from '../components/Shared/Button';
import InfoBubble from '../components/Shared/InfoBubble';
import SectionWrapper from '../components/Shared/SectionWrapper';
import Bubble from '../components/Shared/Bubble';
import TextSwap from '../components/Shared/TextSwap';
import Observer from '../components/Shared/Observer';

class Global extends Component {
  state = {
    step: 0,
  };
  render() {
    return (
      <GlobalWrapperCss>
        <SectionWrapper>
          <h1>Welcome to our Global components showcase</h1>

          <ComponentWrapperCss>
            <h3>Colors</h3>
            <ComponentExamplesCss position="space-between">
              <ColorExampleBoxCss text="dark" color={colors.primaryBlue}>
                {colors.primaryBlue} primaryBlue
              </ColorExampleBoxCss>
              <ColorExampleBoxCss text="light" color={colors.primaryBlack}>
                {colors.primaryBlack} primaryBlack
              </ColorExampleBoxCss>
              <ColorExampleBoxCss text="dark" color={colors.primaryWhite}>
                {colors.primaryWhite} primaryWhite
              </ColorExampleBoxCss>
              <ColorExampleBoxCss text="dark" color={colors.secondaryBlue}>
                {colors.secondaryBlue} secondaryBlue
              </ColorExampleBoxCss>
              <ColorExampleBoxCss text="light" color={colors.secondaryViolet}>
                {colors.secondaryViolet} secondaryViolet
              </ColorExampleBoxCss>
              <ColorExampleBoxCss text="light" color={colors.secondaryBlack1}>
                {colors.secondaryBlack1} secondaryBlack1
              </ColorExampleBoxCss>
              <ColorExampleBoxCss text="light" color={colors.secondaryBlack2}>
                {colors.secondaryBlack2} secondaryBlack2
              </ColorExampleBoxCss>
              <ColorExampleBoxCss text="light" color={colors.secondaryGray1}>
                {colors.secondaryGray1} secondaryGray1
              </ColorExampleBoxCss>
              <ColorExampleBoxCss text="dark" color={colors.secondaryGray2}>
                {colors.secondaryGray2} secondaryGray2
              </ColorExampleBoxCss>
              <ColorExampleBoxCss text="dark" color={colors.secondaryGray3}>
                {colors.secondaryGray3} secondaryGray3
              </ColorExampleBoxCss>
              <ColorExampleBoxCss text="dark" color={colors.secondaryWhite}>
                {colors.secondaryWhite} secondaryWhite
              </ColorExampleBoxCss>
            </ComponentExamplesCss>

            <CodeExampleCss>
              <SyntaxHighlighter language="javascript" style={docco}>
                {
                  'import { colors } from "../path/to/src/constants/theme.js"; \ncss => \ncolor: ${colors.primaryWhite};'
                }
              </SyntaxHighlighter>
            </CodeExampleCss>
          </ComponentWrapperCss>

          <ComponentWrapperCss>
            <h3>Text swap</h3>
            <h5>Inside textArray can be added any valid dom element</h5>
            <h5>For more than 1 element use React.Fragment</h5>
            <TextSwapButtonWrapperCss>
              <button onClick={() => this.setState({ step: 0 })}>0</button>
              <button onClick={() => this.setState({ step: 1 })}>1</button>
              <button onClick={() => this.setState({ step: 2 })}>2</button>
            </TextSwapButtonWrapperCss>
            <ComponentExamplesCss>
              <TextSwap
                step={this.state.step}
                textArray={[
                  <h4>2.8x Loupes3.5x Loupes</h4>,
                  <h4>4.0x Boxes4.5x Lights</h4>,
                  <h4>5.9x Loupes3.5x Loupes</h4>,
                ]}
              />
            </ComponentExamplesCss>
            <CodeExampleCss>
              <SyntaxHighlighter language="javascript" style={docco}>
                {`<TextSwap
  step={this.state.step}
  textArray={[
    <>
      <h1>2.8x Loupes3.5x Loupes</h1>
      <p>
        These 2.8x magnifcation loupes (often referred to as 3x by
        many brands) offer extreme versatility and are perfectly
      </p>
    </>,
    <>
      <h1>2.8x Loupes3.5x Loupes</h1>
      <p>
        These 2.8x magnifcation loupes (often referred to as 3x by
        many brands) offer extreme versatility and are perfectly
      </p>
    </>,
    <>
      <h1>2.8x Loupes3.5x Loupes</h1>
      <p>
        These 2.8x magnifcation loupes (often referred to as 3x by
        many brands) offer extreme versatility and are perfectly
      </p>
    </>,
  ]}
/>`}
              </SyntaxHighlighter>
            </CodeExampleCss>
          </ComponentWrapperCss>

          <ComponentWrapperCss>
            <h3>Button</h3>
            <ComponentExamplesCss>
              <Button>Hi there</Button>
              <Button type="primary">Hi there</Button>
            </ComponentExamplesCss>
            <CodeExampleCss>
              <SyntaxHighlighter language="javascript" style={docco}>
                {'<Button type="primary">Hi there</Button>'}
              </SyntaxHighlighter>
            </CodeExampleCss>
          </ComponentWrapperCss>

          <ComponentWrapperCss>
            <h3>Tooltip</h3>
            <ComponentExamplesCss position="space-between">
              <InfoBubble
                type="button"
                buttonText="ABBERATIONS"
                title="FIG. 1"
                text="Back pain can be worsened by a poorly measured
                  working distance & neck pain by poor declination
                  angles."
              />
              <InfoBubble
                type="bubble"
                title="FIG. 1"
                text="Back pain can be worsened by a poorly measured
                  working distance & neck pain by poor declination
                  angles."
              />
              <InfoBubble
                type="info"
                title="FIG. 1"
                text="Back pain can be worsened by a poorly measured
                  working distance & neck pain by poor declination
                  angles."
              />
            </ComponentExamplesCss>
            <CodeExampleCss>
              <SyntaxHighlighter language="javascript" style={docco}>
                {`<InfoBubble
  type="info"
  title="FIG. 1"
  text="Back pain can be worsened by a poorly measured
      working distance & neck pain by poor declination
      angles."
/>`}
              </SyntaxHighlighter>
            </CodeExampleCss>
          </ComponentWrapperCss>

          <ComponentWrapperCss>
            <h3>Simple Bubble</h3>
            <ComponentExamplesCss>
              <Bubble onClick={() => console.log('clicked 1')} />
              <Bubble onClick={() => console.log('clicked 2')} noAnimation />
            </ComponentExamplesCss>
            <CodeExampleCss>
              <SyntaxHighlighter language="javascript" style={docco}>
                {
                  '<Bubble onClick={() => console.log("clicked")} noAnimation={false} />'
                }
              </SyntaxHighlighter>
            </CodeExampleCss>
          </ComponentWrapperCss>

          <ComponentWrapperCss>
            <h3>Useful functions</h3>
            <h5>
              If we need to detect if is a mobile device or not we can use some
              functions from: `src/js/isMobile.js`;
            </h5>
            <h5>
              By running the function we will get a boolean value so we know if
              is a mobile device or not.
            </h5>
            <h5>
              "getScreenSize" will return an object size with width and height
              of the screen
            </h5>
            <CodeExampleCss>
              <SyntaxHighlighter language="javascript" style={docco}>
                {`import computeIsMobile from "path/to/src/js/isMobile.js";
const isMobile = computeIsMobile();

import { getScreenSize } from "path/to/src/js/isMobile.js";
const size = getScreenSize();
=> size = { width: .. , height: .. }
`}
              </SyntaxHighlighter>
            </CodeExampleCss>
          </ComponentWrapperCss>
          <ComponentWrapperCss>
            <h3>Font</h3>
            <h5>
              The fonts should be already set for all text tags.
              (src/layouts/index.css.js)
            </h5>
            <CodeExampleCss>
              <SyntaxHighlighter language="javascript" style={docco}>
                {'font-family: Yantramanav, sans-serif;'}
              </SyntaxHighlighter>
            </CodeExampleCss>

            <h5>Fontsizes - showcase</h5>
            <CodeExampleCss>
              <h1>H1</h1>
              <h2>H2</h2>
              <h3>H3</h3>
              <h4>H4</h4>
              <h5>H5</h5>
              <h6>H6</h6>
              <p>P</p>
            </CodeExampleCss>
          </ComponentWrapperCss>
          <ComponentWrapperCss>
            <h3>Break points</h3>
            <h5>
              This projects runs with bootstrap. Check documentation:{' '}
              <a
                href="https://getbootstrap.com/docs/4.0/layout/grid/"
                target="_blank"
              >
                https://getbootstrap.com/docs/4.0/layout/grid/
              </a>
            </h5>
            <ComponentExamplesCss display="block" position="space-between">
              <div className="row">
                <div className="col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <BreakPointLineCss>col-12</BreakPointLineCss>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <BreakPointLineCss>col-6</BreakPointLineCss>
                </div>
                <div className="col-6">
                  <BreakPointLineCss>col-6</BreakPointLineCss>
                </div>
              </div>
            </ComponentExamplesCss>
            <h5>For media we can access "screens" from "constants/theme.js"</h5>
            <CodeExampleCss>
              <SyntaxHighlighter language="javascript" style={docco}>
                {`import { screens } from "../path/to/src/constants/theme.js";

css =>
  @media (max-width: \${screens.md}) {
    ...code here
  }
screens = {
  xs: '479px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
};`}
              </SyntaxHighlighter>
            </CodeExampleCss>
          </ComponentWrapperCss>

          <ComponentWrapperCss>
            <h3>Section container</h3>

            <h5>Example is this page</h5>
            <h5>
              SectionWrapper should be used around each new section to ensure
              consistency of section paddings and alignments
            </h5>
            <h5>
              Component accepts "fluid" as props and will add a
              "container-fluid" instead a normal "container"
            </h5>
            <h5>Path: "src/components/Shared/SectionWrapper/index.js"</h5>

            <CodeExampleCss>
              <SyntaxHighlighter language="javascript" style={docco}>
                {
                  '<SectionWrapper fluid={true/false}>Test content</SectionWrapper>'
                }
              </SyntaxHighlighter>
            </CodeExampleCss>
          </ComponentWrapperCss>
          <ComponentWrapperCss>
            <h3>Observer / fade in when on screen</h3>

            <h5>
              When the elemnt gets in view a function will get triggered and if
              needed this information can be used with `onChange` method
            </h5>
            <h5>
              When the element gets inview it will fade in with a nice
              animation. Values for the animation can be customised
            </h5>
            <Observer
              threshold={0}
              onChange={({ isIntersecting }) =>
                console.log('isIntersecting', isIntersecting)
              }
            >
              <h1>HI THERE 👋</h1>
            </Observer>

            <CodeExampleCss>
              <SyntaxHighlighter language="javascript" style={docco}>
                {`import Observer from 'src/components/Shared/Observer/index.js';

<Observer
  threshold={0}
  onChange={({ isIntersecting }) =>
    console.log('isIntersecting', isIntersecting)
  }
>
  <h1>HI THERE 👋</h1>
</Observer>

Optional Props:

 threshold - it represents the height percentage where the element must be in current view
    number - default: 0 - possible: 0 - 1

 disabled: - it will prevent the observer from triggering
    boolean - dafault: false  - possible: true / false

 runOnce: - it will prevent the observer from triggering more than once
    boolean - dafault: false  - possible: true / false

 delay: - the time that will wait untill will fade in
    number - dafault: 0  - possible: amount in ms

 transition: - animation function that will be used for fadding in
    number - dafault: 1000ms  - possible: amount in ms

 animationTime: - the time that animation will take to complete
    number - dafault: cubic-bezier(0.64, 0.04, 0.35, 1)  - possible: any css transition
`}
              </SyntaxHighlighter>
            </CodeExampleCss>
          </ComponentWrapperCss>
        </SectionWrapper>
      </GlobalWrapperCss>
    );
  }
}

export default Global;

const GlobalWrapperCss = styled.div`
  background: ${colors.primaryBlack};
  color: ${colors.primaryWhite};
  padding: 5rem 0rem;
  h1 {
    display: block;
    margin-bottom: 3rem;
  }
  h3 {
    color: #67ffabbf;
  }
  @media (max-width: ${screens.sm}) {
    padding: 2rem 1rem;

    h1 {
      font-size: 4rem;
      line-height: 4rem;
    }
  }
`;

const ColorExampleBoxCss = styled.div`
  align-items: center;
  background: ${props => props.color};
  border-radius: 10px;
  border: 1px solid #e1e1e1;
  color: ${props =>
    props.text === 'dark' ? colors.primaryBlack : colors.primaryWhite};
  display: flex;
  font-size: 15px;
  height: 60px;
  justify-content: center;
  text-align: center;
  width: 120px;
`;

const ComponentWrapperCss = styled.div`
  position: relative;
  margin-bottom: 2rem;
`;

const ComponentExamplesCss = styled.div`
  display: ${props => (props.display ? props.display : 'flex')};
  width: 100%;
  flex-wrap: wrap;
  justify-content: ${props => (props.position ? props.position : 'flex-start')};
  background: ${props =>
    props.white ? colors.primaryWhite : colors.primaryBlack};

  & > * {
    margin-right: ${props => (props.position ? 0 : '15px')};
    margin-bottom: 15px;
  }
`;

const CodeExampleCss = styled.div`
  display: inline-block;
  margin-top: 15px;
  width: 100%;
`;

const BreakPointLineCss = styled.div`
  text-align: center;
  color: ${colors.primaryBlack};
  padding: 4px;
  width: 100%;
  background: ${colors.secondaryBlue};
  margin-bottom: 15px;
`;

const TextSwapButtonWrapperCss = styled.div`
  button {
    color: white;
  }
`;
