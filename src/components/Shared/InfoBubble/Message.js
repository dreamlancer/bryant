import React from 'react';
import ReactDOM from 'react-dom';
import { MessageCss, MessageInnerCss, OverlayCss } from './index.css';

class Message extends React.Component {
  render() {
    const {
      active,
      height,
      ready,
      width,
      messagePosition,
      messageRef,
      title,
      text,
    } = this.props;

    if (typeof window === 'undefined') return null;

    return ReactDOM.createPortal(
      <>
        <OverlayCss active={active} ready={ready} />
        <MessageCss
          active={active}
          height={height}
          ready={ready}
          width={width}
          position={messagePosition}
          ref={messageRef}
        >
          <MessageInnerCss>
            <h6>{title}</h6>
            <p>{text}</p>
          </MessageInnerCss>
        </MessageCss>
      </>,
      document.getElementById('bubble-root')
    );
  }
}
export default Message;
