/**
 * Observer wrapper
 *
 * Props:
 *
 * threshold - it represents the height percentage where the element must be in current view
 *    number - default: 0 - possible: 0 - 1
 *
 * disabled: - it will prevent the observer from triggering
 *    boolean - dafault: false  - possible: true / false
 *
 * runOnce: - it will prevent the observer from triggering more than once
 *    boolean - dafault: false  - possible: true / false
 *
 * delay: - the time that will wait untill will fade in
 *    number - dafault: 0  - possible: amount in ms
 *
 * transition: - animation function that will be used for fadding in
 *    number - dafault: 1000ms  - possible: amount in ms
 *
 * animationTime: - the time that animation will take to complete
 *    number - dafault: cubic-bezier(0.64, 0.04, 0.35, 1)  - possible: any css transition
 *
 */

import React from 'react';
import Observer from '@researchgate/react-intersection-observer';
import { InnerDiv } from './index.css';

class ObserverWrapper extends React.Component {
  state = {
    visible: false,
    stopObserver: false,
  };

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.state.visible !== nextState.visible ||
      this.state.stopObserver !== nextState.stopObserver
    );
  }

  handleOnChange = changeProps => {
    const { onChange, runOnce } = this.props;

    if (onChange) {
      onChange(changeProps);
    }
    this.setState({
      visible: changeProps.isIntersecting,
      stopObserver: changeProps.isIntersecting === true && runOnce,
    });
  };

  render() {
    const {
      props: {
        threshold,
        disabled,
        children,
        delay,
        transition,
        animationTime,
      },
      state: { visible, stopObserver },
      handleOnChange,
    } = this;

    return (
      <Observer
        disabled={disabled || stopObserver}
        onChange={handleOnChange}
        threshold={threshold}
      >
        <InnerDiv
          animationTime={animationTime}
          delay={delay}
          transition={transition}
          visible={visible}
        >
          {children}
        </InnerDiv>
      </Observer>
    );
  }
}

ObserverWrapper.defaultProps = {
  animationTime: null,
  delay: 100,
  disabled: false,
  threshold: 0,
  transition: null,
  onChange: null,
};

export default ObserverWrapper;
