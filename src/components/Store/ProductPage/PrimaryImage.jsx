/* global $ Sirv */
import React from 'react';
import ReactImageZoom from 'react-image-zoom';
// import SimpleZoom from 'react-simple-zoom';
import getEventPath from '../../../helpers/getEventPath';

let imageInstance = undefined;

export default class PrimaryImage extends React.Component {
  state = {
    showHit: false,
    imageWidth: undefined,
    imageHeight: undefined,
    width: undefined,
    height: undefined,
  };

  componentDidMount() {
    imageInstance = new Image();
    imageInstance.src = this.props.image;
    imageInstance.addEventListener('load', this.setSize);
    window.addEventListener('resize', this.updateSize);
  }

  componentWillUnmount() {
    imageInstance && imageInstance.removeEventListener('load', this.setSize);
    imageInstance = undefined;
    window.removeEventListener('resize', this.updateSize);
  }

  setSize = event => {
    const path = getEventPath(event);

    if (
      path &&
      path[0] &&
      path[0].naturalWidth !== 0 &&
      path[0].naturalHeight !== 0
    ) {
      this.setState(
        {
          imageWidth: path[0].naturalWidth,
          imageHeight: path[0].naturalHeight,
        },
        () => {
          this.updateSize();
        }
      );
    }
  };

  updateSize = () => {
    const {
      state: { imageWidth, imageHeight },
    } = this;

    let newWidth = 0;
    let newHeight = 0;

    const maxWidth = $('.product-images').width();
    let aspectRatio = 0;
    if (imageWidth > maxWidth) {
      aspectRatio = maxWidth / imageWidth;
      newWidth = imageWidth * aspectRatio;
      newHeight = imageHeight * aspectRatio;
    }

    this.setState({
      width: newWidth,
      height: newHeight,
    });
  };

  renderZoomButton = () => {
    return (
      <div className="zoom-button-container">
        <div className="zoom-button-wrapper">
          <div className="zoom-button" />
        </div>
      </div>
    );
  };

  render() {
    const {
      props: { image, onImageClick, zoomIcon },
      state: { width, height },
      state: { showHit },
    } = this;

    if (width && height) {
      return (
        <div className="primary-product-image" onClick={onImageClick}>
          {this.renderZoomButton()}
          <div className="react-image-zoom-wrapper">
            <ReactImageZoom
              width={width}
              height={height}
              scale={1.5}
              img={image}
              offset={{ vertical: 0, horizontal: 10 }}
              zoomStyle="z-index: 100; border: 0px solid black;"
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="primary-product-image">
          {/* {this.renderZoomButton()} */}
          <div
            className="product-image full"
            style={{ backgroundImage: `url(${image})` }}
            onClick={onImageClick}
          />
        </div>
      );
    }

    // return (
    //   <div className="simple-zoom-wrapper" onClick={onImageClick}>
    // <div className="zoom-button" />
    //     <SimpleZoom
    //       thumbUrl={image}
    //       fullUrl={image}
    //       zoomScale={3.6}
    //       onEnterCallback={() => this.setState({ showHit: true })}
    //       onExitCallback={() => this.setState({ showHit: false })}
    //     />
    //     {/* {showHit && <div className="hit-to-click">Click for full screen</div>} */}
    //   </div>
    // );
  }
}
