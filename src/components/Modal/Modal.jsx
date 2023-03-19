import { Backdrop, ModalWindow } from './Modal.styled';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

const Modal = ({ image, closeModal, imageTag }) => {
  useEffect(() => {
    const onKeyDown = event => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [closeModal]);

  const handleBackdropClick = event => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  return (
    <>
      <Backdrop onClick={handleBackdropClick}>
        <ModalWindow src={image} alt={imageTag} />
      </Backdrop>
    </>
  );
};

Modal.propTypes = {
  image: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  imageTag: PropTypes.string.isRequired,
};

export default Modal;
