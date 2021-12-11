// Bubble component the little white dot with pulsating circle
// If the animation is not needed use prop: noAnimation
// It will pulsate with blue by default and purple on lights page
/**
 * Props
 *  - noAnimation: true (will disable the pulsating effect)
 *  - bubbleRef if you want to pass a ref to the bubble in order 
 * to access the item
 *  - onClick/onMouseEnter/onMouseLeave and all normal div props
 * 
 * Usage
 * 
 * <Bubble
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleToggle}
      bubbleRef={bubbleRef}
    >
      Message here
    </Bubble>
 */

import React from 'react';
import styled from 'styled-components';
import { colors } from '../../../constants/theme';

const BubbleWrapperCss = styled.div`
  cursor: default;
  display: inline-block;
  height: 14px;
  position: relative;
  width: 14px;

  .lil-bubble {
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    &::after {
      animation: pulsate 2s ease-out infinite;
      border-radius: 30px;
      border: 12px solid ${colors.primaryBlue};
      content: '';
      display: block;
      height: 22px;
      opacity: 0;
      text-align: center;
      width: 22px;
      z-index: 1;
    }

    @keyframes pulsate {
      0% {
        opacity: 0;
        transform: scale(0.6, 0.6);
      }
      50% {
        opacity: 1;
      }
      100% {
        opacity: 0;
        transform: scale(1.3, 1.3);
      }
    }
  }

  .lil-center {
    background: ${colors.primaryWhite};
    border-radius: 50%;
    height: 14px;
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 14px;
    z-index: 3;
  }
`;

const Bubble = props => {
  const { children, bubbleRef, noAnimation } = props;
  return (
    <BubbleWrapperCss noAnimation={noAnimation} ref={bubbleRef} {...props}>
      <div className="lil-center" />
      <div className="lil-bubble" />
      {children}
    </BubbleWrapperCss>
  );
};
export default Bubble;
