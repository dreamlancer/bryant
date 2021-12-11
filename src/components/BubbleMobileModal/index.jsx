import React from 'react';
import ReactModal from 'react-modal';

import './index.scss';

export default class BubbleMobileModal extends React.Component {
  handleOpenModal = () => {
    const {
      props: { onOpenModal },
    } = this;

    onOpenModal();
  };

  handleCloseModal = () => {
    const {
      props: { onCloseModal },
    } = this;

    onCloseModal();
  };

  render() {
    const {
      handleCloseModal,
      props: { isModalOpen, text, title },
    } = this;

    return (
      <ReactModal
        isOpen={isModalOpen}
        ariaHideApp={false}
        className="bubble-modal"
        overlayClassName="bubble-modal-underlay"
        onRequestClose={handleCloseModal}
        shouldCloseOnOverlayClick
        shouldCloseOnEsc
      >
        <div className="bubble-modal-content">
          <button className="close-modal-button" onClick={handleCloseModal} />
          {title && <h1>{title}</h1>}
          <div>{text}</div>
        </div>
      </ReactModal>
    );
  }
}
