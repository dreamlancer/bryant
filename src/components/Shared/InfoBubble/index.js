/**
 * USAGE
 *
 * PROPS
 * - type : [bubble (selected by default), button, info]
 * - buttonText - if the type is button we accept a button text option
 * - title - Title for message box
 * - text - Text for message box
 *
 *  <InfoBubble
 *    type="button"
 *    buttonText="ABBERATIONS"
 *    title="FIG. 1"
 *    text="Back pain can be worsened by a poorly measured
 *      working distance & neck pain by poor declination
 *      angles."
 *  />
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { InfoWrapperCss, ButtonWrapperCss } from './index.css';
import Bubble from '../Bubble';
import Message from './Message';
import computeIsMobile from '../../../js/isMobile';
import getOffsetTop from '../../../js/getOffsetTop';
const isMobile = computeIsMobile();

class InfoBubble extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: true,
      height: 0,
      initialHeight: null,
      ready: false, // Init ready false to get tooltip height
      messagePosition: {},
    };

    this.bubbleMessageRef = React.createRef();
    this.bubbleRef = React.createRef();
  }

  componentDidMount() {
    if (this.props.loaded === undefined) {
      // If we dont have loaded parameter wait 2s then calculate position
      setTimeout(this.calculateMessagePosition, 2000);
    }

    // Throttle function for resize
    const throttle = (type, name, obj) => {
      obj = obj || window;
      let running = false;
      const func = () => {
        if (running) {
          return;
        }
        running = true;
        requestAnimationFrame(() => {
          obj.dispatchEvent(new CustomEvent(name));
          running = false;
        });
      };
      obj.addEventListener(type, func);
    };

    /* init - you can init any event */
    throttle('resize', 'optimizedResize');
    // handle event
    window.addEventListener(
      'optimizedResize',
      this.calculateMessagePosition,
      false
    );

    document.addEventListener('click', this.handleClick, false);
  }

  componentWillUnmount() {
    // make sure you remove the listener when the component is destroyed
    window.removeEventListener(
      'optimizedResize',
      this.calculateMessagePosition,
      false
    );
    document.removeEventListener('click', this.handleClick, false);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.loaded !== this.props.loaded) {
      this.calculateMessagePosition();
    }
  }

  calculateMessagePosition = () => {
    if (this.bubbleMessageRef && this.bubbleMessageRef.current) {
      let dotPosition = null;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const messageWidth = this.bubbleMessageRef.current.offsetWidth;
      const messageHeight = this.bubbleMessageRef.current.offsetHeight;

      const messagePosition = {};
      if (this.bubbleRef && this.bubbleRef.current) {
        dotPosition = this.bubbleRef.current.getBoundingClientRect();

        const offsetTop = getOffsetTop(this.bubbleRef.current);

        const dotOffsetWidth = 5;
        const dotOffsetHeight = dotPosition.height / 2;
        messagePosition.top = offsetTop + dotOffsetHeight;

        if (windowWidth < 479) {
          // If the screen is less than 479px width (mobile view)
          // then make the message width full screen - 30px
          // and center it
          messagePosition.left = dotOffsetWidth;
          messagePosition.width = windowWidth - dotOffsetWidth * 2;
        } else if (dotPosition.left - messageWidth - dotOffsetWidth > 0) {
          // Check if there is enough space in the left part for the message box
          messagePosition.left =
            dotPosition.left - messageWidth - dotOffsetWidth;
        } else if (
          dotPosition.right + messageWidth + dotOffsetWidth <
          windowWidth
        ) {
          // Check if there is enough space in the right part for the message box
          messagePosition.left = dotPosition.right + dotOffsetWidth;
        } else {
          // If not space in left or right then center it
          messagePosition.left = (windowWidth - messageWidth) / 2;
          messagePosition.top = offsetTop + dotPosition.height;
        }
      }

      if (isMobile) {
        messagePosition.top =
          window.scrollY + windowHeight / 2 - this.state.initialHeight / 2;
      }

      this.setState({
        initialHeight: this.state.initialHeight
          ? this.state.initialHeight
          : messageHeight,
        height: messageHeight || 'auto',
        width: messageWidth,
        ready: true,
        active: false,
        messagePosition,
      });
    }
  };

  handleClick = e => {
    if (!ReactDOM.findDOMNode(this).contains(e.target)) {
      // OUTSIDE click so close the tooltip

      this.setState({
        active: false,
      });
    }
  };

  handleMouseEnter = () => {
    if (isMobile) {
      this.calculateMessagePosition();
    }
    this.setState({
      active: true,
    });
  };

  handleMouseLeave = () => {
    this.setState({
      active: false,
    });
  };

  handleToggle = () => {
    if (isMobile) {
      this.calculateMessagePosition();
    }
    this.setState({
      active: !this.state.active,
    });
  };

  render() {
    const {
      bubbleMessageRef,
      bubbleRef,
      handleMouseEnter,
      handleMouseLeave,
      handleToggle,
      state: { active, height, ready, width, messagePosition },
      props: { type, buttonText, title, text },
    } = this;

    const SharedMessage = () => (
      <Message
        active={active}
        height={height}
        ready={ready}
        width={width}
        messagePosition={messagePosition}
        messageRef={bubbleMessageRef}
        title={title}
        text={text}
      />
    );

    if (type === 'button') {
      // BUTTON TEXT OPTION
      return (
        <ButtonWrapperCss
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleToggle}
          ref={bubbleRef}
        >
          <p className="bubble-button-text">{buttonText}</p>
          {SharedMessage()}
        </ButtonWrapperCss>
      );
    } else if (type === 'info') {
      // INFO (i) OPTION
      return (
        <InfoWrapperCss
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleToggle}
          ref={bubbleRef}
        >
          <div className="lil-info">i</div>
          {SharedMessage()}
        </InfoWrapperCss>
      );
    }

    // BUBBLE OPTION
    return (
      <Bubble
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleToggle}
        bubbleRef={bubbleRef}
      >
        {SharedMessage()}
      </Bubble>
    );
  }
}

export default InfoBubble;
