import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {Overlay, ModalWindow} from './Modal.styled';

export class Modal extends Component {
    static propTypes = {
      image: PropTypes.exact({
        src: PropTypes.string.isRequired,
        alt: PropTypes.string.isRequired,
      }).isRequired,
      onClose: PropTypes.func.isRequired,
    };
  
    componentDidMount() {
      window.addEventListener('keydown', this.handleKeyClose);
    }
  
    componentWillUnmount() {
      window.removeEventListener('keydown', this.handleKeyClose);
    }
  
    handleKeyClose = evt => {
      if (evt.code === 'Escape') {
        this.props.onClose();
      }
    };
  
    closeModal = ({ currentTarget, target }) => {
      if (currentTarget === target) {
        this.props.onClose();
      }
    };
  
    render() {
      const {
        image: { src, alt },
      } = this.props;
      return (
        <Overlay onClick={this.closeModal}>
          <ModalWindow>
            <img src={src} alt={alt} />
          </ModalWindow>
        </Overlay>
      );
    }
  }

