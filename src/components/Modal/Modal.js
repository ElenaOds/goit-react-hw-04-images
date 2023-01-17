import {useEffect} from 'react';
import PropTypes from 'prop-types';

import {Overlay, ModalWindow} from './Modal.styled';

export function Modal({image: { src, alt}, onClose}) {
    
    useEffect(() => {
      const handleKeyClose = evt => {
        if (evt.code === 'Escape') {
          onClose();
        }
      };

      window.addEventListener('keydown', handleKeyClose);
      return () => {
        window.removeEventListener('keydown', handleKeyClose);
      };
    }, [onClose]);
     
    const closeModal = ({ currentTarget, target }) => {
      if (currentTarget === target) {
        onClose();
      }
    };
  
      return (
        <Overlay onClick={closeModal}>
          <ModalWindow>
            <img src={src} alt={alt} />
          </ModalWindow>
        </Overlay>
      );
  }

  Modal.propTypes = {
    image: PropTypes.exact({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
    }).isRequired,
    onClose: PropTypes.func.isRequired,
  };