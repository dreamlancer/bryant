/**
 * Text Swap animates the transition between 2 text
 * 
 * Props:
 * - textArray: an array with any valid dom elements
 * - step: a value between 0 and textArray.length that will make the specific element visible
 * 
 * Usage:
 * 
 * <TextSwap
    step={this.state.step}
    textArray={[
      <span>Hei there</span>,
      <h3>my name is 🐋</h3>,
      <p>WHAT 🤦‍♂️?</p>,
      <>
        <h1>2.8 x Loupes3.5 x Loupes</h1>
        <p>
          These 2.8x magnifcation loupes (often referred to as 3x by
          many brands) offer extreme versatility and are perfectly
          suited for general dentistry and those early on in their
          careers. With such a large depth of focus, they are
          particularly easy to use with a range of nurses and
          patients.For those seeking more detail than the 2.8x, and
          don’t mind the extra weight of the prismatic optics, the
          3.5x magnifcation is the ideal choice. These are
          particularly suited to those doing crown and bridge work,
          as well as more comp
        </p>
      </>,
    ]}
  />
 */

import React, { Component } from 'react';
import styled from 'styled-components';

class TextSwap extends Component {
  render() {
    const { textArray, step } = this.props;

    return (
      <TextSwapCss>
        {textArray.map((text, index) => {
          return (
            <TextWrapperCss
              key={index}
              active={step === index}
              position={index - step}
            >
              {text}
            </TextWrapperCss>
          );
        })}
        <TextPlaceholderCss>{textArray[step]}</TextPlaceholderCss>
      </TextSwapCss>
    );
  }
}
export default TextSwap;

const TextSwapCss = styled.div`
  position: relative;
  width: 100%;
`;

const TextWrapperCss = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  max-width: 100vw;
  transform: ${props => {
    if (props.position > 0) {
      return 'translateY(20px)';
    } else if (props.position < 0) {
      return 'translateY(-20px)';
    } else {
      return 'translateY(0)';
    }
  }};

  opacity: ${props => (props.active ? 1 : 0)};
  pointer-events: ${props => (props.active ? 'auto' : 'none')};

  transition: all 980ms cubic-bezier(0.64, 0.04, 0.35, 1);
  transition-delay: ${props => (props.active ? '0.2s' : 0)};
`;

const TextPlaceholderCss = styled.div`
  opacity: 0;
`;
