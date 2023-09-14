import PropTypes from 'prop-types';
import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalContainer, Image } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ imageURL, tags, toggleModal }) => {
  const onKeyDown = useCallback(
    e => {
      if (e.code === 'Escape') {
        toggleModal();
      }
    },
    [toggleModal]
  );

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onKeyDown]);

  const overlayClick = e => {
    if (e.target === e.currentTarget) {
      toggleModal();
    }
  };

  return createPortal(
    <Overlay onClick={overlayClick}>
      <ModalContainer>
        <Image src={imageURL} alt={tags} />
      </ModalContainer>
    </Overlay>,
    modalRoot
  );
};

export default Modal;

Modal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  imageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};