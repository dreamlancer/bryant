import React from 'react';

import {
  ContainerCss,
  TitleCss,
  TabTitleCss,
  ContentZoneCss,
  ContentCss,
} from './index.css';

class TabBar extends React.Component {
  constructor(props) {
    super(props);

    // Reference for the tab bar's header
    this.tabsRef = React.createRef();
    // References for each content
    this.contentRefs = [];

    // Boolean to see if a touch action is a swipe or just a "click" on the header of tab bar
    this.tabsIsSwipeX = false;
    // Initial position for the swipe event
    this.tabsInitSwipeX = null;
    // Current position for the swipe event
    this.tabsCurrSwipeX = null;
    // Current tab bar's header translate X value
    this.tabTranslateX = 0;
    // Last tab bar's header translate X value
    this.tabLastTranslateX = 0;

    this.state = {
      idFadingOut: undefined,
      openedContentId: 0,
      idFadingIn: 0,
      contentZoneHeight: 0,
    };
  }

  componentDidMount() {
    this.setContentZoneHeight();

    // Adding screen resize event for computing height
    window.addEventListener('resize', () => {
      this.setContentZoneHeight();
      this.scrollHeaderBarTo(this.state.openedContentId);
    });

    // Adding event listeners for touch actions (for swiping functionality)
    if (this.tabsRef.current) {
      this.tabsRef.current.addEventListener(
        'touchstart',
        this.handleTouchStart,
        false
      );
      this.tabsRef.current.addEventListener(
        'touchmove',
        this.handleTouchMove,
        false
      );
      this.tabsRef.current.addEventListener(
        'touchend',
        this.handleTouchEnd,
        false
      );
      this.tabsRef.current.addEventListener(
        'touchcancel',
        this.handleTouchCancel,
        false
      );
    }
  }

  shouldComponentUpdate(newProps) {
    // Update the component only if another tab is selected
    if (this.state.openedContentId !== newProps.openedTab) {
      this.switchToContent(newProps.openedTab);
    }

    return true;
  }

  componentWillUnmount() {
    // Removing screen resize event for computing height
    window.removeEventListener('resize', () => {
      this.setContentZoneHeight();
      this.scrollHeaderBarTo(this.state.openedContentId);
    });

    // Removing event listeners for touch actions (for swiping functionality)
    if (this.tabsRef.current) {
      this.tabsRef.current.removeEventListener(
        'touchstart',
        this.handleTouchStart,
        false
      );
      this.tabsRef.current.removeEventListener(
        'touchmove',
        this.handleTouchMove,
        false
      );
      this.tabsRef.current.removeEventListener(
        'touchend',
        this.handleTouchEnd,
        false
      );
      this.tabsRef.current.removeEventListener(
        'touchcancel',
        this.handleTouchCancel,
        false
      );
    }
  }

  keepInBounds(value, min, max) {
    if (value > max) {
      return max;
    } else if (value < min) {
      return min;
    } else {
      return value;
    }
  }

  keepTabBarInBounds() {
    this.tabTranslateX = this.keepInBounds(
      this.tabTranslateX,
      -this.tabsRef.current.clientWidth +
        this.tabsRef.current.parentNode.clientWidth,
      0
    );
  }

  handleTouchStart = e => {
    this.tabsInitSwipeX = e.touches[0].clientX;
    this.tabsRef.current.style.transition = 'transform 0s';
    this.tabLastTranslateX = this.tabTranslateX;
  };

  handleTouchMove = e => {
    if (!this.tabsInitSwipeX) {
      return;
    }

    // The touch event is a swipe
    this.tabsIsSwipeX = true;

    this.tabsCurrSwipeX = e.touches[0].clientX;
    this.tabTranslateX =
      this.tabLastTranslateX + (this.tabsCurrSwipeX - this.tabsInitSwipeX);

    this.keepTabBarInBounds();

    this.tabsRef.current.style.transform = `translate3d(${
      this.tabTranslateX
    }px, 0, 0)`;
  };

  handleTouchEnd = e => {
    // Run only if the touch event was a swipe, not only a click
    if (this.tabsIsSwipeX) {
      this.tabLastTranslateX = this.tabTranslateX;
      // Diferrence between last 2 points of the touch event
      let deltaSwipeX = e.changedTouches[0].clientX - this.tabsCurrSwipeX;

      this.tabsRef.current.style.transition = 'transform 0.5s ease-out';

      // Inertial scroll until stop
      deltaSwipeX *= 15;

      while (Math.abs(deltaSwipeX) > 0.01) {
        this.tabTranslateX += deltaSwipeX;
        this.keepTabBarInBounds();

        this.tabsRef.current.style.transform = `translate3d(${
          this.tabTranslateX
        }px, 0, 0)`;

        if (deltaSwipeX > 100) {
          deltaSwipeX *= 0.8;
        } else if (deltaSwipeX > 60) {
          deltaSwipeX *= 0.6;
        } else {
          deltaSwipeX *= 0.4;
        }
      }
    }

    this.tabsIsSwipeX = false;
    this.tabsInitSwipeX = null;
  };

  handleTouchCancel = e => this.handleTouchEnd(e);

  switchToContent(id) {
    // Auto scroll header bar
    this.scrollHeaderBarTo(id);

    // Change content zone
    this.setState({ idFadingOut: this.state.openedContentId }, () => {
      this.setState({ openedContentId: id, idFadingIn: id });
    });
  }

  scrollHeaderBarTo(id) {
    if (typeof id !== 'undefined') {
      const header = this.tabsRef.current.children[id];
      const headerPosition = -(
        header.offsetLeft +
        header.clientWidth / 2 -
        window.innerWidth / 2
      );

      this.tabTranslateX = headerPosition;
      this.keepTabBarInBounds();

      this.tabsRef.current.style.transition =
        'transform 0.5s cubic-bezier(0.45, 0.88, 0.21, 0.96)';
      this.tabsRef.current.style.transform = `translate3d(${
        this.tabTranslateX
      }px, 0, 0)`;
    }
  }

  setContentZoneHeight() {
    const contentHeights = this.contentRefs.map(ref => ref.clientHeight);
    this.setState({ contentZoneHeight: Math.max(...contentHeights) });
  }

  render() {
    const {
      openedContentId,
      idFadingIn,
      idFadingOut,
      contentZoneHeight,
    } = this.state;
    const { title, tabTitles, tabContents } = this.props;

    return (
      <ContainerCss>
        <TitleCss>{title}</TitleCss>

        <TabTitleCss ref={this.tabsRef}>
          {tabTitles.map((tabTitle, id) => (
            <div key={id}>{tabTitle}</div>
          ))}
        </TabTitleCss>

        <ContentZoneCss height={contentZoneHeight}>
          {tabContents.map((content, id) => (
            <ContentCss
              key={id}
              ref={ref => {
                this.contentRefs[id] = ref;
              }}
              isFadingIn={idFadingIn === id}
              isActive={openedContentId === id}
              isFadingOut={idFadingOut === id}
            >
              {content}
            </ContentCss>
          ))}
        </ContentZoneCss>
      </ContainerCss>
    );
  }
}

export default TabBar;
