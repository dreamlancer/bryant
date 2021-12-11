import React from 'react';
import ReactModal from 'react-modal';
import Swiper from 'swiper';
import './index.scss';

export default class ImagesModal extends React.Component {
  handleOpenModal = () => {
    const { onOpenModal } = this.props;
    onOpenModal();
  };

  handleCloseModal = () => {
    const { onCloseModal } = this.props;
    onCloseModal();
  };

  render() {
    const {
      handleCloseModal,
      props: { images, isModalOpen, imageIndexClicked, isMobile },
    } = this;

    return (
      <ReactModal
        isOpen={isModalOpen}
        ariaHideApp={false}
        className="images-modal"
        overlayClassName="images-modal-underlay"
        onRequestClose={handleCloseModal}
        shouldCloseOnOverlayClick
        shouldCloseOnEsc
        closeTimeoutMS={300}
      >
        <ImagesModalContent
          images={images}
          onCloseModal={handleCloseModal}
          isModalOpen={isModalOpen}
          imageIndexClicked={imageIndexClicked}
          isMobile={isMobile}
        />
      </ReactModal>
    );
  }
}

let modalSwiper = null;

class ImagesModalContent extends React.Component {
  componentDidMount() {
    modalSwiper = new Swiper('.images-modal-swiper-container', {
      containerModifierClass: 'images-modal-swiper-container',
      // grabCursor: true,
      autoHeight: true,
      spaceBetween: 50,
      initialSlide: this.props.imageIndexClicked,
      pagination: {
        el: '.swiper-pagination',
        type: 'fraction',
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }

  componentWillUnmount() {
    if (modalSwiper) {
      modalSwiper.destroy(true, true);
      modalSwiper = null;
    }
  }

  render() {
    const {
      props: { images, onCloseModal, isMobile },
    } = this;

    // TODO: needs to be proper tested with images on different review items

    return (
      <div className="images-modal-content">
        <button className="close-modal-button" onClick={onCloseModal} />
        <div className="images-modal-swiper-container">
          <div className="swiper-wrapper" onClick={onCloseModal}>
            {images &&
              images.length > 0 &&
              images.map((image, index) => (
                <div key={index} className="swiper-slide">
                  <img
                    src={image}
                    style={{ maxHeight: isMobile ? 'auto' : '100%' }}
                  />
                </div>
              ))}
          </div>
          <div className="swiper-pagination" />
          <div className="swiper-button-next" />
          <div className="swiper-button-prev" />
        </div>
      </div>
    );
  }
}
